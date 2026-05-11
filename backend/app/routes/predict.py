from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime

from keybert import KeyBERT

from app.database import history_collection
from app.schemas.prediction import TextRequest, URLRequest, PredictionResponse
from app.services.classifier import predict_bias
from app.services.sentiment import get_sentiment
from app.services.ner import extract_entities
from app.services.scraper import extract_article_text
from app.routes.auth import get_current_user

router = APIRouter(tags=["Prediction"])

# 🔥 NEW KEYBERT MODEL
kw_model = KeyBERT()


# 🔥 NEW PHRASE EXTRACTOR
def extract_key_phrases(text):
    keywords = kw_model.extract_keywords(
        text,
        keyphrase_ngram_range=(1, 3),
        stop_words="english",
        top_n=5
    )

    return [kw[0] for kw in keywords]


# 🔹 TEXT PREDICTION
@router.post("/predict", response_model=PredictionResponse)
def predict_news(data: TextRequest, user=Depends(get_current_user)):
    try:
        text = data.text.strip()

        if not text:
            raise HTTPException(status_code=400, detail="Text cannot be empty")

        bias, confidence, _ = predict_bias(text)

        # 🔥 REAL IMPORTANT PHRASES
        phrases = extract_key_phrases(text)

        sentiment = get_sentiment(text)
        entities = extract_entities(text)

        # Explanation + Keywords
        if bias == "Left":
            explanation = (
                "This article is classified as Left because it focuses on "
                "social justice, climate policies, and progressive viewpoints."
            )
            keywords = ["climate policy", "social justice", "workers rights"]

        elif bias == "Right":
            explanation = (
                "This article is classified as Right because it emphasizes "
                "national security, traditional values, and conservative viewpoints."
            )
            keywords = ["national security", "border control", "traditional values"]

        else:
            explanation = (
                "This article is classified as Center because it presents "
                "information in a balanced and factual tone."
            )
            keywords = ["balanced tone", "facts", "neutral reporting"]

        history_collection.insert_one({
            "type": "text",
            "input": text,
            "bias": bias,
            "confidence": confidence,
            "sentiment": sentiment,
            "entities": entities,
            "important_phrases": phrases,
            "explanation": explanation,
            "keywords": keywords,
            "created_at": datetime.utcnow(),
            "user": user["email"],
        })

        return PredictionResponse(
            bias=bias,
            confidence=confidence,
            sentiment=sentiment,
            entities=entities,
            important_phrases=phrases,
            explanation=explanation,
            keywords=keywords
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 🔹 URL PREDICTION
@router.post("/analyze-url", response_model=PredictionResponse)
def analyze_news_url(data: URLRequest, user=Depends(get_current_user)):
    try:
        article_text = extract_article_text(str(data.url))

        if not article_text:
            raise HTTPException(
                status_code=400,
                detail="Could not extract article text from URL"
            )

        bias, confidence, _ = predict_bias(article_text)

        # 🔥 REAL IMPORTANT PHRASES
        phrases = extract_key_phrases(article_text)

        sentiment = get_sentiment(article_text)
        entities = extract_entities(article_text)

        # Explanation + Keywords
        if bias == "Left":
            explanation = (
                "This article is classified as Left because it focuses on "
                "social justice and progressive viewpoints."
            )
            keywords = ["climate policy", "social justice", "workers rights"]

        elif bias == "Right":
            explanation = (
                "This article is classified as Right because it emphasizes "
                "security, borders, and traditional values."
            )
            keywords = ["national security", "border control", "traditional values"]

        else:
            explanation = (
                "This article is classified as Center due to neutral and balanced reporting."
            )
            keywords = ["balanced tone", "facts", "neutral reporting"]

        history_collection.insert_one({
            "type": "url",
            "input": str(data.url),
            "article_text": article_text[:1000],
            "bias": bias,
            "confidence": confidence,
            "sentiment": sentiment,
            "entities": entities,
            "important_phrases": phrases,
            "explanation": explanation,
            "keywords": keywords,
            "created_at": datetime.utcnow(),
            "user": user["email"],
        })

        return PredictionResponse(
            bias=bias,
            confidence=confidence,
            sentiment=sentiment,
            entities=entities,
            important_phrases=phrases,
            explanation=explanation,
            keywords=keywords
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))