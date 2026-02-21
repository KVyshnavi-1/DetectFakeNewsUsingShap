from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import pickle
import re
import numpy as np
import shap

import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Download once
nltk.download("stopwords")
nltk.download("wordnet")

# Initialize FastAPI
app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and vectorizer
model = pickle.load(open("svm_model.pkl", "rb"))
vectorizer = pickle.load(open("tfidf_vectorizer.pkl", "rb"))

# NLP tools
stop_words = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()

# Request format
class NewsRequest(BaseModel):
    text: str


# Preprocess function
def preprocess(text):

    text = text.lower()

    text = re.sub(r"[^a-z\s]", " ", text)

    words = text.split()

    words = [
        lemmatizer.lemmatize(w)
        for w in words
        if w not in stop_words
    ]

    return " ".join(words)


# Prediction endpoint
@app.post("/predict")

def predict(news: NewsRequest):

    try:

        cleaned = preprocess(news.text)

        vector = vectorizer.transform([cleaned])

        prediction = model.predict(vector)[0]

        confidence = abs(model.decision_function(vector)[0])

        label = "FAKE" if prediction == 0 else "REAL"

        confidence_score = float(min(confidence / 5, 1))


        # SHAP explanation using coefficients

        feature_names = vectorizer.get_feature_names_out()

        coef = model.coef_[0]

        vector_dense = vector.toarray()[0]

        shap_scores = coef * vector_dense

        top_indices = np.argsort(np.abs(shap_scores))[-5:]

        important_words = []

        for i in top_indices:

            important_words.append({

                "word": feature_names[i],

                "impact": float(shap_scores[i])

            })


        return {
    "verdict": label,
    "confidence": confidence_score,
    "important_words": important_words,
    "cleaned_text": cleaned
}


    except Exception as e:

        print("ERROR:", str(e))

        return {

            "verdict": "ERROR",

            "confidence": 0,

            "important_words": []

        }

# Test endpoint
@app.get("/")
def home():

    return {

        "message": "Backend running successfully"

    }
