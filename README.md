# FaceDetectionPlatform

FaceDetectionPlatform is a full-stack face detection web application built using **OpenCV**, **FastAPI**, and **React**.  
The application allows users to upload images, automatically detects faces using computer vision techniques, draws bounding boxes, and maintains a history of all detections.

---

## Features Running the project locally

- Upload images for face detection
- Detect faces and generate bounding box coordinates
- Display processed images with detected faces highlighted
- Store detection results (file name, face count, time)
- View detection history in a separate page
- Full-stack integration with REST APIs

---

## Tech Stack

### Frontend
- React (Vite)
- JavaScript
- HTML & CSS
- React Router

### Backend
- FastAPI
- Python
- OpenCV (Haar Cascade)
- SQLAlchemy
- SQLite
- Uvicorn

---

## Project Architecture
face-detection-platform/
│
├── backend/
│ ├── main.py
│ ├── requirements.txt
│ ├── haarcascade_frontalface_default.xml
│ ├── database.py
│ ├── models.py
│ └── uploads/ (generated)
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api.js
│ │ ├── App.jsx
│ │ └── App.css
│ └── package.json
│
└── README.md

---

##  Application Workflow (End-to-End)

### Frontend – Image Upload
- User selects an image from the browser
- React frontend sends the image to the backend using a `POST` request (`multipart/form-data`) 

---

###  Backend – Image Processing
- FastAPI receives the uploaded image
- Image is temporarily stored on the server
- Image is converted to grayscale
- Haar Cascade classifier detects faces
- Bounding box coordinates `(x, y, w, h)` are generated for each face

---

### Backend – Response Generation
- Detected faces are drawn on the image
- Processed image is saved
- Detection details are stored in the database:
- File name
- Face count
- Bounding boxes
- Timestamp
- JSON response is returned to frontend

Example response:
json
{
"file_name": "group.jpg",
"face_count": 3,
"boxes": [
  {"x": 100, "y": 60, "w": 80, "h": 80}
],
"timestamp": "2025-12-12T10:30:00"
}
---

## Running the Project Locally

### Backend Setup

bash:
cd face-backend
pip install -r requirements.txt
uvicorn main:app --reload

#### Backend runs at: 
http://127.0.0.1:8000

#### Swagger UI:

http://127.0.0.1:8000/docs

### Frontend Setup
cd face-frontend
npm install
npm run dev


#### Frontend runs at:

http://localhost:5173




