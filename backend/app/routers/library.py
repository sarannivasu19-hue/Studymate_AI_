from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import User, PDFDocument

router = APIRouter(
    prefix="/api/library",
    tags=["Library"],
)


@router.get("/my-pdfs")
def get_my_pdfs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Return all PDFs uploaded by the logged-in user.
    """

    pdfs = (
        db.query(PDFDocument)
        .filter(PDFDocument.user_id == current_user.id)
        .order_by(PDFDocument.uploaded_at.desc())
        .all()
    )

    return pdfs


@router.get("/{pdf_id}")
def get_pdf(
    pdf_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Return one PDF.
    """

    pdf = (
        db.query(PDFDocument)
        .filter(
            PDFDocument.id == pdf_id,
            PDFDocument.user_id == current_user.id,
        )
        .first()
    )

    if not pdf:
        raise HTTPException(
            status_code=404,
            detail="PDF not found.",
        )

    return pdf


@router.delete("/{pdf_id}")
def delete_pdf(
    pdf_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Delete a PDF.
    """

    pdf = (
        db.query(PDFDocument)
        .filter(
            PDFDocument.id == pdf_id,
            PDFDocument.user_id == current_user.id,
        )
        .first()
    )

    if not pdf:
        raise HTTPException(
            status_code=404,
            detail="PDF not found.",
        )

    db.delete(pdf)
    db.commit()

    return {
        "message": "PDF deleted successfully."
    }