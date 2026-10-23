from fastapi import APIRouter

from app.schemas import QuizRequest, QuizResponse
from app.services.quiz_service import generate_quiz

router = APIRouter(
    prefix="/api/quiz",
    tags=["Adaptive Quiz"],
)


@router.post("/generate", response_model=QuizResponse)
def generate_quiz_api(request: QuizRequest):

    return generate_quiz(
        topic=request.topic,
        difficulty=request.difficulty,
        number_of_questions=request.number_of_questions,
    )