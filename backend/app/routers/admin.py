from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os

router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"],
)

# Read from .env
ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "1906")


class AdminLoginRequest(BaseModel):
    username: str
    password: str


class AdminLoginResponse(BaseModel):
    success: bool
    message: str


@router.post("/login", response_model=AdminLoginResponse)
def admin_login(data: AdminLoginRequest):

    if (
        data.username == ADMIN_USERNAME
        and data.password == ADMIN_PASSWORD
    ):
        return AdminLoginResponse(
            success=True,
            message="Admin login successful",
        )

    raise HTTPException(
        status_code=401,
        detail="Invalid username or password",
    )