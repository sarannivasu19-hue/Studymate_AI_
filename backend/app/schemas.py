from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


# ==========================================================
# AUTH SCHEMAS
# ==========================================================

class UserSignup(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: str
    created_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ==========================================================
# PDF SCHEMAS
# ==========================================================

class PDFUploadResponse(BaseModel):
    message: str
    filename: str
    summary: Optional[str] = None
    notes: Optional[str] = None
    flashcards: Optional[str] = None
    quiz: Optional[str] = None


class PDFDocumentOut(BaseModel):
    id: int
    filename: str
    filepath: str
    uploaded_at: datetime

    class Config:
        from_attributes = True


# ==========================================================
# AI RESPONSE SCHEMAS
# ==========================================================

class SummaryResponse(BaseModel):
    summary: str


class NotesResponse(BaseModel):
    notes: str


class FlashcardResponse(BaseModel):
    flashcards: str


class QuizResponse(BaseModel):
    quiz: str

# ==========================================================
# QUIZ SCHEMAS
# ==========================================================

from typing import List


class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    correct_answer: str
    explanation: str


class QuizRequest(BaseModel):
    topic: str
    difficulty: str
    number_of_questions: int = 5


class QuizResponse(BaseModel):
    questions: List[QuizQuestion]