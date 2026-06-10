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

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/Harshit-0018/NewsLens?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/Harshit-0018/NewsLens?style=flat-square)
![GitHub language count](https://img.shields.io/github/languages/count/Harshit-0018/NewsLens?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/Harshit-0018/NewsLens?style=flat-square)

</div>

</div>

---

## Overview

**NewsLens** is an intelligent full-stack news analysis platform that detects political bias in news articles using a fine-tuned **RoBERTa** transformer model. The platform classifies articles as **Left**, **Center**, or **Right** leaning while surfacing the key phrases that drove the prediction — giving readers genuine insight into the ideological framing behind the news they consume.

Unlike simple keyword-based checkers, NewsLens understands **context**. The same topic can be framed with identical words yet carry an entirely different political lean depending on sentence structure, framing, and implicit assumptions. NewsLens captures this through transformer-based deep learning trained on a 3-class political bias dataset, achieving ~**89% accuracy**.

The project covers the full engineering spectrum — from model training and a REST API backend, to a polished React frontend, analysis history with charts, a daily India news feed, and a Chrome Extension for in-browser analysis.

---

## Demo Video

 https://github.com/user-attachments/assets/503148a4-23aa-4419-92b0-3e0b417c02ab 

---

## Live Screenshots

> All screenshots are from the running application.

### Home & Login
<img width="1916" height="941" alt="image" src="https://github.com/user-attachments/assets/c4b489aa-d351-45c9-9fce-aaf3572cf5eb" />

### Analyze — Article Text Input
<img width="1917" height="946" alt="image" src="https://github.com/user-attachments/assets/9abc0a69-bf5c-4565-a91b-9c31b1185dc0" />

### Analyze — URL Input
<img width="1919" height="945" alt="image" src="https://github.com/user-attachments/assets/3b897f44-40f2-4edd-955d-86cf43712db6" />

### Daily India News Feed
<img width="1919" height="948" alt="image" src="https://github.com/user-attachments/assets/49548dae-1390-44c7-96a2-6f5cf535972f" />

### Analysis History with Charts
<img width="1918" height="942" alt="image" src="https://github.com/user-attachments/assets/0f2f2df9-e2c7-4ff4-b00e-ba213fe8a83c" />

### About Page
<img width="1918" height="944" alt="image" src="https://github.com/user-attachments/assets/69b7080c-ef96-41e3-8017-d61601ad4317" />

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

### How the Confidence Score is Computed

The RoBERTa classification head outputs raw **logits** for each of the 
three classes `[Left, Center, Right]`. These logits are passed through a 
**softmax function** to produce a probability distribution that sums to 1.

```python
import torch.nn.functional as F

logits = model(**inputs).logits        # e.g. tensor([-0.42, 2.31, 0.18])
probs  = F.softmax(logits, dim=-1)     # e.g. tensor([0.07, 0.85, 0.08])
confidence = probs.max().item()        # 0.85  (Center)
label      = probs.argmax().item()     # 1     → "Center"
```

The **confidence score** returned to the user is the maximum softmax 
probability — i.e. how certain the model is about its top prediction. 
A score of 0.91 means the model assigned 91% probability to the predicted 
class across all three.

---

### How Important Phrase Extraction Works

**KeyBERT** uses a BERT-based sentence encoder to extract the phrases most 
semantically similar to the article's overall embedding.

**Pipeline:**
1. The full article text is encoded into a document-level embedding using 
   `sentence-transformers` (`all-MiniLM-L6-v2`)
2. N-gram candidates (1–3 words) are generated from the article body
3. Each candidate phrase is independently encoded
4. **Cosine similarity** is computed between each phrase embedding and the 
   document embedding
5. The top-5 phrases with the highest similarity scores are returned

This means the extracted phrases are not just frequent words — they are the 
phrases that best *represent* the article's overall topic and framing, making 
them meaningful signals for why the bias label was assigned.

---

### Named Entity Recognition (NER)

Entity extraction uses **spaCy's `en_core_web_sm`** pipeline, which runs a 
CNN-based NER model trained on the OntoNotes 5 corpus.

Entities are filtered to three categories relevant to news analysis:

| spaCy Label | Mapped To | Example |
|---|---|---|
| `PERSON` | Persons | "Narendra Modi", "Elon Musk" |
| `ORG` | Organizations | "RBI", "Supreme Court", "Meta" |
| `GPE` | Locations | "New Delhi", "United States" |

Duplicate entities are deduplicated and returned as structured JSON 
alongside the bias prediction in a single API response.

---

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

## Model Performance

The bias classifier was fine-tuned on a 3-class political news dataset 
(Left / Center / Right) using RoBERTa-base from HuggingFace.

| Metric | Value |
|---|---|
| Model Architecture | `roberta-base` (125M parameters) |
| Training Objective | Sequence Classification (3-class) |
| Optimizer | AdamW |
| Learning Rate | 2e-5 with linear warmup |
| Max Sequence Length | 512 tokens |
| Evaluation Accuracy | ~89% |
| Loss Function | CrossEntropyLoss |
| Inference Device | CPU (AWS EC2) |

### Per-Class Performance (approximate)

| Class | Precision | Recall | F1 |
|---|---|---|---|
| Left | ~0.87 | ~0.85 | ~0.86 |
| Center | ~0.91 | ~0.93 | ~0.92 |
| Right | ~0.88 | ~0.88 | ~0.88 |

> Confidence scores are derived from the softmax probability distribution 
> over the three output logits. A prediction with confidence > 0.85 is 
> considered high-confidence; scores between 0.60–0.85 indicate moderate 
> certainty and are surfaced to the user accordingly.

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

## Environment Variables

Create a `.env` file in the `backend/` directory with the following keys:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/newslens

# JWT
JWT_SECRET_KEY=your_secret_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# News API (for daily feed)
NEWS_API_KEY=your_newsapi_key_here
```

> Never commit `.env` to version control. The `.gitignore` already excludes it.

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
