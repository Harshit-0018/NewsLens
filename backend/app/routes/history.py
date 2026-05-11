from fastapi import APIRouter, HTTPException, Depends
from bson import ObjectId

from app.database import history_collection
from app.routes.auth import get_current_user  # 🔥 FIX IMPORT

router = APIRouter(prefix="/history", tags=["History"])


# ✅ FIXED (no trailing slash)
@router.get("")
def get_history(user=Depends(get_current_user)):
    history = []

    items = history_collection.find({"user": user["email"]}).sort("created_at", -1).limit(50)

    for item in items:
        history.append({
            "id": str(item["_id"]),
            "type": item.get("type"),
            "input": item.get("input"),
            "bias": item.get("bias"),
            "confidence": item.get("confidence"),
            "sentiment": item.get("sentiment"),
            "created_at": item.get("created_at"),
            "explanation": item.get("explanation"),
            "keywords": item.get("keywords", []),
        })

    return history


# ✅ FIXED
@router.delete("/{history_id}")
def delete_history_item(history_id: str):
    result = history_collection.delete_one({"_id": ObjectId(history_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="History item not found")

    return {"message": "History item deleted successfully"}


# ✅ FIXED (no trailing slash)
@router.delete("")
def clear_history():
    result = history_collection.delete_many({})

    return {
        "message": f"Deleted {result.deleted_count} history items"
    }