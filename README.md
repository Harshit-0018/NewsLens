# 📰 NewsLens - AI-Powered News Bias Detection & Perspective Analysis

![Python](https://img.shields.io/badge/Python-3.11-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![PyTorch](https://img.shields.io/badge/PyTorch-DeepLearning-red)
![Transformers](https://img.shields.io/badge/HuggingFace-Transformers-yellow)
![AWS](https://img.shields.io/badge/AWS-EC2-orange)

##  Overview

NewsLens is a full-stack AI-powered news analysis platform that identifies political bias in news articles using a fine-tuned Transformer model. The application helps readers understand ideological leanings in news content by classifying articles into **Left**, **Center**, or **Right** perspectives while highlighting key phrases that influenced the prediction.

The platform combines:

* React.js frontend
* FastAPI backend
* MongoDB Atlas database
* Hugging Face Transformers
* PyTorch deep learning
* Chrome Extension integration

---

##  Problem Statement

Modern news consumers are exposed to information from hundreds of media outlets daily.

Different organizations often present the same event from varying political perspectives, making it difficult for readers to distinguish factual reporting from ideological framing.

### Challenges

* Difficulty identifying political bias
* Lack of balanced viewpoints
* Information overload
* Time-consuming manual analysis
* Limited tools for perspective comparison

NewsLens addresses these challenges using Artificial Intelligence and Natural Language Processing to automatically identify ideological bias in news content.

---

##  Solution

NewsLens provides:

* ✅ Political Bias Detection
* ✅ Left / Center / Right Classification
* ✅ Important Phrase Extraction
* ✅ News Article URL Scraping
* ✅ User Authentication
* ✅ Analysis History Tracking
* ✅ Chrome Extension Support
* ✅ Real-Time Predictions

---

#  System Architecture

## High-Level Architecture

```text
                        ┌──────────────────────┐
                        │      End User        │
                        └──────────┬───────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │    React Frontend    │
                        └──────────┬───────────┘
                                   │
                            REST API Calls
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │    FastAPI Backend   │
                        └──────────┬───────────┘
                                   │
        ┌──────────────┬───────────┼───────────┬──────────────┐
        ▼              ▼           ▼           ▼              ▼

 Authentication   Prediction   Scraping    History      Database
    Service        Service     Service     Service      Service

                                   │
                                   ▼
                            MongoDB Atlas
```

##WorkFlow

<img width="1693" height="929" alt="ChatGPT Image Jun 1, 2026, 02_26_18 PM" src="https://github.com/user-attachments/assets/12a1a7e9-b9a4-4fd5-a591-6ebd1d0c43c8" />


---

#  Machine Learning Pipeline

## Why ML?

Traditional keyword-based approaches fail to understand context.

Example:

"The government successfully reduced inflation."

vs

"The government claims inflation was reduced."

Both contain similar keywords but convey different meanings.

To understand contextual meaning, NewsLens uses a fine-tuned RoBERTa Transformer model.

---

## ML Workflow

```text
News Article
      │
      ▼
Text Cleaning
      │
      ▼
Tokenizer
      │
      ▼
RoBERTa Transformer
      │
      ▼
Classification Head
      │
      ▼
Softmax Layer
      │
      ▼
Left / Center / Right
```

## Model Training Details

### Dataset

The model was trained using a Kaggle news bias dataset containing approximately **100,000 news articles** labeled across different political viewpoints.

Dataset characteristics:

- ~100K news articles
- Left, Center, and Right political labels
- Long-form news content
- Diverse news sources
- Real-world political reporting

### Model Selection

Multiple NLP approaches were explored before finalizing the architecture.

Models considered:

- Traditional Machine Learning baselines
- BERT-based architectures
- RoBERTa Transformer

RoBERTa was selected because of:

- Better contextual language understanding
- Improved pretraining methodology
- Stronger text classification performance
- Higher robustness on long-form articles

### Fine-Tuning Process

1. Data preprocessing and cleaning
2. Tokenization using RoBERTa tokenizer
3. Dataset splitting into training and validation sets
4. Fine-tuning using PyTorch and Hugging Face Transformers
5. Evaluation using classification metrics
6. Model serialization and deployment

### Training Pipeline

1. Dataset Collection
2. Text Cleaning
3. Tokenization
4. Fine-Tuning RoBERTa
5. Validation
6. Model Saving
7. Deployment

### Prediction Pipeline

1. User submits article
2. Text tokenized
3. RoBERTa generates logits
4. Softmax computes probabilities
5. Highest probability selected
6. Confidence score returned
7. Important phrases extracted

---

#  Important Phrase Extraction

The platform extracts influential phrases from articles to help users understand why a prediction was made.

### Process

* Split article into sentences
* Remove duplicates
* Filter irrelevant content
* Select meaningful phrases
* Return top phrases

Example:

```json
{
  "important_phrases": [
    "The government announced a new economic initiative.",
    "Inflation rates showed significant improvement."
  ]
}
```

---

#  Authentication System

NewsLens uses JWT-based authentication.

## Registration Flow

```text
User
 │
 ▼
Signup Form
 │
 ▼
FastAPI Backend
 │
 ▼
Password Hashing
 │
 ▼
MongoDB
```

## Login Flow

```text
User
 │
 ▼
Login Request
 │
 ▼
Credential Verification
 │
 ▼
JWT Token Generation
 │
 ▼
Frontend Storage
```

## Logout Flow

* Remove JWT token from local storage
* Clear user session
* Redirect to login page

---

#  Database Design

## Users Collection

```json
{
  "_id": "...",
  "username": "harshit",
  "email": "user@example.com",
  "hashed_password": "..."
}
```

## History Collection

```json
{
  "_id": "...",
  "user_id": "...",
  "article": "...",
  "prediction": "Center",
  "confidence": 0.91,
  "timestamp": "2025-05-17"
}
```

---

#  News Scraping Workflow

```text
News URL
   │
   ▼
Requests
   │
   ▼
HTML Extraction
   │
   ▼
Article Parsing
   │
   ▼
Clean Text
   │
   ▼
Bias Prediction
```

---

#  Chrome Extension Workflow

```text
Open News Website
        │
        ▼
Content Script
        │
        ▼
Extract Article Text
        │
        ▼
FastAPI API
        │
        ▼
ML Prediction
        │
        ▼
Extension Popup Result
```

---

#  Tech Stack

| Layer              | Technology                |
| ------------------ | ------------------------- |
| Frontend           | React.js                  |
| Backend            | FastAPI                   |
| Database           | MongoDB Atlas             |
| Authentication     | JWT                       |
| Deep Learning      | PyTorch                   |
| NLP                | Hugging Face Transformers |
| Model              | RoBERTa                   |
| Keyword Extraction | KeyBERT                   |
| Embeddings         | Sentence Transformers     |
| Extension          | Chrome Extension API      |
| Deployment         | AWS EC2                   |

---

#  Project Structure

```text
NewsLens/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
│   │
│   ├── training/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── extension/
│   ├── manifest.json
│   ├── popup.js
│   ├── content.js
│   └── popup.html
│
└── README.md
```

---

#  Local Setup

## Backend

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

#  Future Enhancements

* Multi-language bias detection
* Explainable AI visualizations
* News source credibility scoring
* Fact-check integration
* Sentiment analysis
* Mobile application
* Personalized recommendations
* Real-time news monitoring

---

# 👨‍💻 Author

**Harshit Singh**

AI-Powered News Bias Detection & Perspective Analysis Platform

Built using React, FastAPI, MongoDB, PyTorch, Hugging Face Transformers, and AWS.
