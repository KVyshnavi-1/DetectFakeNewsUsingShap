from fastapi import FastAPI, UploadFile, File,Depends
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from fastapi.responses import FileResponse
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from datetime import datetime
import json



# ===== Database setup =====
DATABASE_URL = "sqlite:///./history.db"  # file 'history.db' will be created in backend folder

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


class DetectionHistory(Base):
    __tablename__ = "detection_history"

    id = Column(Integer, primary_key=True, index=True)
    file_name = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    face_count = Column(Integer)
    boxes = Column(String)  # will store JSON string of boxes list


# Create tables
Base.metadata.create_all(bind=engine)


# Dependency to get DB session in routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()


# Allow requests from any frontend (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # later you can restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Allow requests from any frontend (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # later you can restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load pre-trained face detection model (Haar Cascade)
face_cascade = cv2.CascadeClassifier("models/haarcascade_frontalface_default.xml")

@app.get("/")
def root():
    return {"message": "Face Detection Backend is running ✅"}

@app.post("/detect-faces")
async def detect_faces(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Read file bytes
    image_bytes = await file.read()

    # Convert bytes → numpy array → image
    np_array = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    if img is None:
        return {"error": "Could not read image"}

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30)
    )

    boxes = []
    for (x, y, w, h) in faces:
        boxes.append({
            "x": int(x),
            "y": int(y),
            "w": int(w),
            "h": int(h)
        })
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # Save processed image
    cv2.imwrite("output.jpg", img)

    face_count = len(boxes)

    # ===== Save history in DB =====
    history_item = DetectionHistory(
        file_name=file.filename,
        face_count=face_count,
        boxes=json.dumps(boxes),
        timestamp=datetime.utcnow()
    )
    db.add(history_item)
    db.commit()
    db.refresh(history_item)

    # Return response (you can include id if you want)
    return {
        "id": history_item.id,
        "file_name": history_item.file_name,
        "face_count": face_count,
        "boxes": boxes,
        "note": "Annotated image saved as output.jpg and history stored in DB"
    }


@app.get("/history")
def get_history(limit: int = 20, db: Session = Depends(get_db)):
    # Get latest `limit` records, newest first
    records = (
        db.query(DetectionHistory)
        .order_by(DetectionHistory.timestamp.desc())
        .limit(limit)
        .all()
    )

    result = []
    for r in records:
        result.append({
            "id": r.id,
            "file_name": r.file_name,
            "timestamp": r.timestamp.isoformat(),
            "face_count": r.face_count,
            "boxes": json.loads(r.boxes) if r.boxes else []
        })

    return result





@app.get("/processed-image")
def get_processed_image():
    return FileResponse("output.jpg")