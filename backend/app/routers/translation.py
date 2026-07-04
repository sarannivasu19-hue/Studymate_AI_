from fastapi import APIRouter
from pydantic import BaseModel

from app.services.translation_service import ask_ai_in_language

router = APIRouter(
    prefix="/api/language",
    tags=["Multi Language AI Tutor"],
)


class LanguageRequest(BaseModel):
    question: str
    language: str


class LanguageResponse(BaseModel):
    answer: str


@router.post("/ask", response_model=LanguageResponse)
def ask_ai(request: LanguageRequest):

    answer = ask_ai_in_language(
        request.question,
        request.language,
    )

    return LanguageResponse(
        answer=answer,
    )