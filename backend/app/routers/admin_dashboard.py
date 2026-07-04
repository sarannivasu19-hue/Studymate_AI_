from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models

router = APIRouter(
    prefix="/api/admin/dashboard",
    tags=["Admin Dashboard"],
)


@router.get("/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):

    total_users = db.query(models.User).count()

    return {
        "total_users": total_users,
        "ai_requests": 0,
        "voice_sessions": 0,
        "quiz_attempts": 0,
        "notes_generated": 0,
        "flashcards": 0,
    }