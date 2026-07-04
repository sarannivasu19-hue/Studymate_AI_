from fastapi import APIRouter
from pydantic import BaseModel

from app.services.voice_service import ask_voice_tutor

router = APIRouter(
    prefix="/api/voice",
    tags=["AI Voice Tutor"],
)


class VoiceRequest(BaseModel):
    question: str
    language: str


class VoiceResponse(BaseModel):
    answer: str


@router.post("/ask", response_model=VoiceResponse)
def ask_voice(request: VoiceRequest):

    answer = ask_voice_tutor(
        question=request.question,
        language=request.language,
    )

    return VoiceResponse(answer=answer)