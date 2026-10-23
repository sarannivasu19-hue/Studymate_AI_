from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..services.admin_user_service import (
    get_all_users,
    delete_user,
)

router = APIRouter(
    prefix="/api/admin/users",
    tags=["Admin Users"],
)


@router.get("/")
def get_users(db: Session = Depends(get_db)):
    users = get_all_users(db)

    return [
        {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": str(user.role),
            "is_active": user.is_active,
            "created_at": user.created_at,
        }
        for user in users
    ]


@router.delete("/{user_id}")
def remove_user(
    user_id: int,
    db: Session = Depends(get_db),
):
    success = delete_user(db, user_id)

    if not success:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "message": "User deleted successfully"
    }