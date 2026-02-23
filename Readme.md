# 📰 Fake News Detection Web Application

A full-stack web application that detects whether a news article is **Fake or Real** using Natural Language Processing (NLP) and Machine Learning.

The system uses a **Support Vector Machine (SVM)** model with **SHAP explainability** to provide transparent and interpretable predictions.

---

## 🚀 Features

- Analyze news articles for Fake or Real classification
- Real-time prediction using trained SVM model
- Confidence score display
- SHAP-based important word explanation
- Highlight influential words in the text
- Model comparison (SVM vs Naive Bayes)
- Interactive dashboard with performance charts

---

## 🧠 Tech Stack

### 🔹 Frontend
- React.js
- HTML5
- CSS3
- JavaScript (ES6+)
- Recharts (Dashboard charts)

### 🔹 Backend
- Python
- FastAPI
- Scikit-learn
- NLTK
- SHAP
- NumPy

### 🔹 Machine Learning
- TF-IDF Vectorization (5000 features)
- Support Vector Machine (99.53% Accuracy)
- Naive Bayes (94.48% Accuracy)

---

## 📂 Project Structure
FakeNewsDetection/
│
├── backend/
│ ├── main.py
│ ├── svm_model.pkl
│ ├── tfidf_vectorizer.pkl
│ └── requirements.txt
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── package.json
│ └── vite.config.js
│
├── .gitignore
└── README.md4

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
##### git clone https://github.com/yourusername/FakeNewsDetection.git

##### cd FakeNewsDetection

---

### 2️⃣ Backend Setup
##### cd backend
##### pip install -r requirements.txt
##### uvicorn main:app --reload

---

### 3️⃣ Frontend Setup
#### cd frontend
#### npm install
#### npm start

