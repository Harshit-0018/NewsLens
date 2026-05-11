import os
import certifi
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(".env")

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(
    MONGODB_URI,
    tls=True,
    tlsCAFile=certifi.where()
)

db = client[DATABASE_NAME]

history_collection = db["history"]
users_collection = db["users"]