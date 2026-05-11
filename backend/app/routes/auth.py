from fastapi import APIRouter, HTTPException, Depends, status
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from pydantic import BaseModel, EmailStr
from app.database import db
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/auth", tags=["Auth"])

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

users_collection = db["users"]

# 🔐 ADD THIS
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# -------------------------
# SCHEMAS
# -------------------------
class UserSignup(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str


# -------------------------
# HELPERS
# -------------------------
def hash_password(password: str):
    password_bytes = password.encode('utf-8')[:72]
    return pwd_context.hash(password_bytes)

def verify_password(password, hashed):
    return pwd_context.verify(password[:72], hashed)

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=1)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# 🔥 ADD THIS FUNCTION (VERY IMPORTANT)
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        email: str = payload.get("sub")  # ✅ matches your login

        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token payload",
            )

        user = users_collection.find_one({"email": email})

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is invalid or expired",
        )


# -------------------------
# SIGNUP
# -------------------------
@router.post("/signup")
def signup(user: UserSignup):
    existing = users_collection.find_one({"email": user.email})

    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    if len(user.password.encode('utf-8')) > 72:
        raise HTTPException(
            status_code=400,
            detail="Password too long (max 72 bytes)"
        )

    hashed_password = hash_password(user.password)

    users_collection.insert_one({
        "email": user.email,
        "password": hashed_password,
        "created_at": datetime.utcnow()
    })

    return {"message": "User created successfully"}


# -------------------------
# LOGIN
# -------------------------
@router.post("/login")
def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid password")

    token = create_token({"sub": user.email})  # ✅ correct

    return {
        "access_token": token,
        "token_type": "bearer"
    }