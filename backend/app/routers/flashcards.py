from fastapi import APIRouter
from pydantic import BaseModel

from app.services.flashcard_service import generate_flashcards

router = APIRouter(
    prefix="/api/flashcards",
    tags=["AI Flashcards"],
)


class FlashcardRequest(BaseModel):
    topic: str
    number_of_cards: int = 10


class FlashcardResponse(BaseModel):
    flashcards: list


@router.post("/generate", response_model=FlashcardResponse)
def generate_flashcards_api(request: FlashcardRequest):

    flashcards = generate_flashcards(
        request.topic,
        request.number_of_cards,
    )

    return FlashcardResponse(
        flashcards=flashcards["flashcards"]
    )