import os
import shutil
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import User

from app.services.pdf_database_service import save_pdf

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.pdf_service import extract_text_from_pdf

from app.services.gemini_service import (
    summarize_text,
    generate_notes,
    generate_flashcards,
    generate_quiz,
)

router = APIRouter(
    prefix="/api/pdf",
    tags=["PDF"],
)

UPLOAD_FOLDER = "app/uploads/pdfs"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename,
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text found in PDF.",
        )

    # Limit text sent to Gemini
    extracted_text = extracted_text[:12000]

    summary = summarize_text(extracted_text)

    notes = generate_notes(extracted_text)

    flashcards = generate_flashcards(extracted_text)

    quiz = generate_quiz(extracted_text)

    return {
        "message": "PDF uploaded successfully.",
        "filename": file.filename,
        "summary": summary,
        "notes": notes,
        "flashcards": flashcards,
        "quiz": quiz,
    }