import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Header
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.auth_utils import decode_access_token
from app.services.pdf_database_service import save_pdf
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

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads", "pdfs")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...),
    authorization: Optional[str] = Header(None),
    db: Session = Depends(get_db),
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed.",
        )

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)

    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No readable text found in PDF.",
        )

    # If user is authenticated, save record to database for their library
    user_id = None
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        payload = decode_access_token(token)
        if payload and "sub" in payload:
            try:
                user_id = int(payload["sub"])
                save_pdf(
                    db=db,
                    filename=file.filename,
                    filepath=file_path,
                    extracted_text=extracted_text[:10000],
                    user_id=user_id,
                )
            except Exception as e:
                # Log and continue so the upload never fails
                print(f"Failed to record PDF to DB: {e}")

    # Limit text sent to AI
    truncated_text = extracted_text[:12000]

    summary = summarize_text(truncated_text)
    notes = generate_notes(truncated_text[:6000])
    flashcards = generate_flashcards(truncated_text[:4000], 5)
    quiz = generate_quiz(truncated_text[:4000], "Medium", 5)

    return {
        "message": "PDF uploaded successfully.",
        "filename": file.filename,
        "summary": summary,
        "notes": notes,
        "flashcards": flashcards,
        "quiz": quiz,
    }