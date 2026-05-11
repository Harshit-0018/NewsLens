from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.predict import router as predict_router
from app.routes.history import router as history_router
from app.routes.news import router as news_router
from app.routes import auth

app = FastAPI(
    title="Political Bias Detection API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change later for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
app.include_router(history_router)
app.include_router(news_router)
app.include_router(auth.router)

@app.get("/")
def home():
    return {
        "message": "Political Bias Detection API is running"
    }