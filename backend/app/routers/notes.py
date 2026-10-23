from fastapi import APIRouter
from pydantic import BaseModel

from app.services.notes_service import generate_notes

router = APIRouter(
    prefix="/api/notes",
    tags=["AI Notes"],
)


class NotesRequest(BaseModel):
    topic: str


class NotesResponse(BaseModel):
    notes: str


@router.post("/generate", response_model=NotesResponse)
def generate_notes_api(request: NotesRequest):
    notes = generate_notes(request.topic)
    return NotesResponse(notes=notes)