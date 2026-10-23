from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models

router = APIRouter(
    prefix="/api/admin/stats",
    tags=["Admin Statistics"],
)

@router.get("/")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total_users = db.query(models.User).count()

    return {
        "total_users": total_users,
        "total_notes": 0,
        "total_voice": 0,
        "total_flashcards": 0,
    }
