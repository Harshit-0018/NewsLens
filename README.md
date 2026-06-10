<div align="center">

# 📰 NewsLens

### AI-Powered News Bias Detection & Perspective Analysis Platform

[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![PyTorch](https://img.shields.io/badge/PyTorch-Deep%20Learning-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-Transformers-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co)
[![AWS](https://img.shields.io/badge/AWS-EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com)

</div>

---

## Overview

**NewsLens** is an intelligent full-stack news analysis platform that detects political bias in news articles using a fine-tuned **RoBERTa** transformer model. The platform classifies articles as **Left**, **Center**, or **Right** leaning while surfacing the key phrases that drove the prediction — giving readers genuine insight into the ideological framing behind the news they consume.

Unlike simple keyword-based checkers, NewsLens understands **context**. The same topic can be framed with identical words yet carry an entirely different political lean depending on sentence structure, framing, and implicit assumptions. NewsLens captures this through transformer-based deep learning trained on a 3-class political bias dataset, achieving ~**89% accuracy**.

The project covers the full engineering spectrum — from model training and a REST API backend, to a polished React frontend, analysis history with charts, a daily India news feed, and a Chrome Extension for in-browser analysis.

---

## Demo Video

> 📽️ **[paste your video link / embed here]**

<!-- To embed a YouTube video, replace YOUR_VIDEO_ID below:
[![NewsLens Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)
-->

---

## Live Screenshots

> All screenshots are from the running application.

### Home & Login
![Home & Login](https://github.com/Harshit-0018/NewsLens/assets/183278873/Screenshot_2026-06-10_125624.png)

### Analyze — Article Text Input
![Analyze Article Text](https://github.com/Harshit-0018/NewsLens/assets/183278873/Screenshot_2026-06-10_130349.png)

### Analyze — URL Input
![Analyze URL](https://github.com/Harshit-0018/NewsLens/assets/183278873/Screenshot_2026-06-10_130453.png)

### Daily India News Feed
![Daily News](https://github.com/Harshit-0018/NewsLens/assets/183278873/Screenshot_2026-06-10_130609.png)

### Analysis History with Charts
![History](https://github.com/Harshit-0018/NewsLens/assets/183278873/Screenshot_2026-06-10_130641.png)

### About Page
![About](https://github.com/Harshit-0018/NewsLens/assets/183278873/Screenshot_2026-06-10_130708.png)

---

## Key Highlights

| Metric | Value |
|---|---|
| Bias Classification Accuracy | ~89% (3-class: Left / Center / Right) |
| Model | Fine-tuned RoBERTa (HuggingFace Transformers) |
| Bias Analysis Latency (Chrome Extension) | < 2 seconds |
| Keyword Extraction | KeyBERT top-5 phrases |
| Auth | JWT with bcrypt password hashing |
| Database | MongoDB Atlas (cloud) |
| Deployment | AWS EC2 |

---

## Features

### Core Analysis
- **Political Bias Detection** — Classifies any news article as Left, Center, or Right leaning using a fine-tuned RoBERTa transformer
- **Confidence Score** — Returns a softmax probability score alongside every prediction
- **Important Phrase Extraction** — Identifies the most influential phrases that drove the classification using KeyBERT
- **Sentiment Analysis** — Determines whether the article's tone is Positive, Neutral, or Negative
- **Named Entity Recognition (NER)** — Extracts people, organizations, and locations mentioned in the article

### Input Modes
- **Article Text** — Paste raw article text directly
- **Article URL** — Submit a news article URL; the backend scrapes and parses the text automatically using `newspaper3k` and `BeautifulSoup4`

### User Experience
- **JWT Authentication** — Secure sign-up and login with hashed passwords
- **Analysis History** — Every analysis is saved per user; browse past results with timestamps
- **History Charts** — Pie chart of bias distribution (Left/Center/Right) and bar chart of sentiment distribution across all past analyses
- **Daily India News Feed** — Curated daily headlines from Indian news sources, refreshed every day
- **Live Preview** — Real-time word count and reading time estimate as you type
- **Chrome Extension** — One-click bias analysis of the page you are currently reading in any browser tab

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React.js + Vite | Fast, component-based UI |
| Styling | CSS Modules + Custom CSS | Responsive design |
| Backend | FastAPI (Python) | High-performance REST API |
| Database | MongoDB Atlas | Cloud-hosted document store |
| Authentication | JWT + bcrypt | Secure stateless auth |
| Deep Learning | PyTorch | Model training and inference |
| NLP / Transformers | HuggingFace Transformers | RoBERTa tokenizer & model |
| Bias Model | Fine-tuned RoBERTa | 3-class political bias classification |
| Keyword Extraction | KeyBERT | Top-5 bias-driving phrase extraction |
| Sentence Embeddings | Sentence Transformers | Semantic similarity for KeyBERT |
| NER | spaCy | Named entity recognition |
| Web Scraping | newspaper3k + BeautifulSoup4 | Article URL parsing |
| Text Processing | trafilatura + lxml_html_clean | Clean article extraction |
| Extension | Chrome Extension API (Manifest V3) | Browser-native analysis |
| Deployment | AWS EC2 | Backend hosting |
| Server | Uvicorn | ASGI server |

---

## System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         End User                             │
│          (Web Browser / Chrome Extension)                    │
└───────────────────────────┬──────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                    React Frontend (Vite)                     │
│   Home · Analyze · News Feed · History · About · Login       │
└───────────────────────────┬──────────────────────────────────┘
                            │  REST API (JSON over HTTP)
                            ▼
┌──────────────────────────────────────────────────────────────┐
│                  FastAPI Backend (Uvicorn)                   │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│  /auth       │  /predict    │  /analyze-url│  /history       │
│  Register    │  Text Bias   │  URL Scrape  │  User History   │
│  Login       │  + NER       │  + Predict   │  CRUD           │
│  JWT Issue   │  + Sentiment │              │                 │
└──────────────┴──────┬───────┴──────────────┴─────────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
┌─────────────────┐   ┌───────────────────────┐
│  ML Services    │   │   MongoDB Atlas        │
│  ─────────────  │   │   ──────────────────── │
│  classifier.py  │   │   users collection     │
│  sentiment.py   │   │   history collection   │
│  ner.py         │   │                        │
│  keybert.py     │   └───────────────────────┘
│  scraper.py     │
└─────────────────┘
```

---

## ML Pipeline

### Why RoBERTa?

Traditional keyword-based approaches fail to capture context. Consider:

> "The government successfully reduced inflation."

vs

> "The government *claims* inflation was reduced."

Both sentences contain identical keywords — but carry very different implied trust in the government's narrative. RoBERTa's attention mechanism captures this distinction. It was pre-trained on 160GB of text and fine-tuned here on a labeled 3-class political bias dataset.

### Training Pipeline

```
Raw Political News Dataset
          │
          ▼
Text Cleaning & Normalization
          │
          ▼
RoBERTa Tokenizer (max 512 tokens)
          │
          ▼
Fine-tune RoBERTa-base
  (Classification Head added)
          │
          ▼
Evaluate on Validation Set
  (~89% accuracy, 3 classes)
          │
          ▼
Save model weights + tokenizer
  (model.safetensors + config.json)
          │
          ▼
Load in FastAPI for inference
```

### Inference Pipeline (per request)

```
Article Text Input
       │
       ▼
Tokenize (RoBERTa tokenizer)
       │
       ▼
RoBERTa Forward Pass (PyTorch)
       │
       ▼
Softmax → [P(Left), P(Center), P(Right)]
       │
       ▼
argmax → Prediction Label
       │
       ▼
KeyBERT → Top-5 Important Phrases
       │
       ▼
spaCy NER → People / Orgs / Locations
       │
       ▼
Sentiment model → Positive / Neutral / Negative
       │
       ▼
Return JSON response to frontend
```

---

## API Reference

All endpoints are prefixed under the FastAPI backend (default: `http://localhost:8000`).

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create a new user account |
| `POST` | `/auth/login` | Authenticate and receive JWT token |

### Analysis

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/predict` | Analyze article text for bias, sentiment, NER, and key phrases |
| `POST` | `/analyze-url` | Scrape a URL and run the full analysis pipeline |

### News & History

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/news` | Fetch daily India news headlines |
| `GET` | `/history` | Get all past analyses for the authenticated user |
| `DELETE` | `/history/{id}` | Delete a specific analysis entry |

### Sample Response — `/predict`

```json
{
  "prediction": "Center",
  "confidence": 0.91,
  "sentiment": "Neutral",
  "important_phrases": [
    "government announced new policy",
    "inflation rates under control",
    "fiscal measures implemented"
  ],
  "entities": {
    "persons": ["Finance Minister"],
    "organizations": ["RBI", "Ministry of Finance"],
    "locations": ["New Delhi"]
  }
}
```

---

## Project Structure

```
NewsLens/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   │   └── bias_model/          # Saved RoBERTa weights
│   │   │       ├── model.safetensors
│   │   │       ├── config.json
│   │   │       ├── tokenizer_config.json
│   │   │       └── tokenizer.json
│   │   ├── routes/
│   │   │   ├── auth.py              # Register & login endpoints
│   │   │   ├── history.py           # History CRUD endpoints
│   │   │   ├── news.py              # Daily news feed endpoint
│   │   │   └── predict.py           # Bias prediction endpoint
│   │   ├── schemas/                 # Pydantic request/response models
│   │   ├── services/
│   │   │   ├── classifier.py        # RoBERTa bias inference
│   │   │   ├── sentiment.py         # Sentiment analysis
│   │   │   ├── ner.py               # Named entity recognition (spaCy)
│   │   │   ├── scraper.py           # URL article scraping
│   │   │   └── history.py           # History service logic
│   │   ├── utils/
│   │   │   └── database.py          # MongoDB connection
│   │   └── main.py                  # FastAPI app entrypoint
│   ├── training/                    # Model fine-tuning scripts
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ArticleInput.jsx     # Text/URL input tabs
│   │   │   ├── ConfidenceChart.jsx  # Prediction confidence bar
│   │   │   ├── EntityList.jsx       # NER results display
│   │   │   ├── Navbar.jsx           # Top navigation
│   │   │   ├── ProtectedRoute.jsx   # Auth guard
│   │   │   ├── ResultCard.jsx       # Analysis result card
│   │   │   └── SentimentBox.jsx     # Sentiment display
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── Analyze.jsx          # Main analysis page
│   │   │   ├── History.jsx          # History + charts
│   │   │   ├── Home.jsx             # Landing / login page
│   │   │   ├── Login.jsx
│   │   │   ├── NewsDashboard.jsx    # Daily India news feed
│   │   │   └── Signup.jsx
│   │   ├── services/
│   │   │   └── api.js               # Axios API calls
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── extension/                       # Chrome Extension (Manifest V3)
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── content.js
│
├── .gitignore
└── README.md
```

---

## Database Schema

### `users` Collection

```json
{
  "_id": "ObjectId",
  "username": "harshit",
  "email": "user@example.com",
  "hashed_password": "$2b$12$...",
  "created_at": "2026-05-17T10:00:00Z"
}
```

### `history` Collection

```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "input": "https://example.com/article or article text",
  "prediction": "Center",
  "confidence": 0.91,
  "sentiment": "Neutral",
  "important_phrases": ["phrase one", "phrase two"],
  "entities": {
    "persons": [],
    "organizations": [],
    "locations": []
  },
  "timestamp": "2026-05-17T10:08:03Z"
}
```

---

## Authentication Flow

### Registration
```
User fills Signup form
        │
        ▼
POST /auth/register
        │
        ▼
Email uniqueness check (MongoDB)
        │
        ▼
bcrypt password hashing
        │
        ▼
User document saved to MongoDB
        │
        ▼
JWT token returned
```

### Login & Session
```
POST /auth/login  →  Credential verification
        │
        ▼
JWT token issued (signed, expiring)
        │
        ▼
Token stored in frontend (localStorage)
        │
        ▼
All subsequent requests: Authorization: Bearer <token>
        │
        ▼
FastAPI dependency extracts user_id from token
        │
        ▼
Logout: token cleared, redirect to login
```

---

## Chrome Extension

The Chrome Extension integrates the full NewsLens ML pipeline directly into the browser. On any news article page:

1. Click the NewsLens extension icon in the toolbar
2. The content script extracts the article's visible text
3. Text is sent to the FastAPI `/predict` endpoint
4. Results (bias label, confidence, key phrases) are rendered in the extension popup — **all within ~2 seconds**

```
News Website (active tab)
        │
        ▼
content.js  →  Extract article text from DOM
        │
        ▼
popup.js  →  POST to FastAPI /predict
        │
        ▼
ML Inference (RoBERTa)
        │
        ▼
Popup UI  →  Display bias + confidence + phrases
```

---

## Local Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- The trained model weights (placed in `backend/app/models/bias_model/`)

### Backend

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env: MONGODB_URI, JWT_SECRET_KEY, etc.

# Start the server
uvicorn app.main:app --reload
```

The API will be live at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be live at `http://localhost:5173`.

### Chrome Extension

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer Mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `extension/` directory from this repo

The extension will now appear in your Chrome toolbar.

---

## Python Dependencies

```
fastapi
uvicorn
transformers
torch
spacy
textblob
beautifulsoup4
requests
pydantic
pymongo
python-dotenv
keybert
sentence-transformers
newspaper3k
lxml_html_clean
trafilatura
python-jose[cryptography]
passlib[bcrypt]
bcrypt
python-multipart
email-validator
```

---

## Future Enhancements

- **Multi-language support** — Bias detection for Hindi, Spanish, French, and other major languages
- **Explainable AI visualizations** — Attention heatmaps overlaid on article text showing token-level importance
- **Source credibility scoring** — Separate model to rate the historical reliability of the publication domain
- **Fact-check integration** — Cross-reference claims against Google Fact Check API
- **Comparative view** — Side-by-side analysis of the same event across multiple outlets
- **Mobile application** — React Native companion app
- **Real-time monitoring** — WebSocket-based live bias tracking as articles are published
- **Personalized media diet** — Dashboard tracking a user's own reading bias over time

---

## About the Author

**Harshit Singh**

Building AI systems that make complex information more transparent and accessible. NewsLens is a personal project built to explore the intersection of NLP, transformer models, and full-stack engineering — from raw dataset training to production deployment.

- GitHub: [@Harshit-0018](https://github.com/Harshit-0018)

---

<div align="center">

Built with React · FastAPI · MongoDB Atlas · PyTorch · HuggingFace Transformers · AWS EC2

© 2026 NewsLens

</div>
