import time
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

from app.services.gemini_service import (
    generate_response,
    get_ai_status,
    update_api_key,
)

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"],
)


class ChatRequest(BaseModel):
    message: str
    topic: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    latency_ms: float
    model: str
    status: str = "success"


class ApiKeyRequest(BaseModel):
    api_key: str


@router.get("/status")
def get_status():
    return get_ai_status()


@router.post("/set-key")
def set_gemini_key(req: ApiKeyRequest):
    success = update_api_key(req.api_key)
    return {
        "success": success,
        "message": "Gemini API key updated successfully!" if success else "Invalid or empty key.",
        "status": get_ai_status(),
    }


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    start = time.perf_counter()
    reply = generate_response(request.message)
    latency_ms = round((time.perf_counter() - start) * 1000, 1)

    status_info = get_ai_status()
    model_name = status_info.get("active_model", "StudyMate AI")

    return ChatResponse(
        response=reply,
        latency_ms=latency_ms,
        model=model_name,
        status="success",
    )