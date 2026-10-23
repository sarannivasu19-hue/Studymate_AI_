from sqlalchemy.orm import Session

from app.models import PDFDocument


def save_pdf(
    db: Session,
    filename: str,
    filepath: str,
    extracted_text: str,
    user_id: int,
):
    """
    Save uploaded PDF information into MySQL.
    """

    pdf = PDFDocument(
        filename=filename,
        filepath=filepath,
        extracted_text=extracted_text,
        user_id=user_id,
    )

    db.add(pdf)
    db.commit()
    db.refresh(pdf)

    return pdf


def get_user_pdfs(
    db: Session,
    user_id: int,
):
    """
    Return all PDFs uploaded by a user.
    """

    return (
        db.query(PDFDocument)
        .filter(PDFDocument.user_id == user_id)
        .order_by(PDFDocument.uploaded_at.desc())
        .all()
    )


def get_pdf(
    db: Session,
    pdf_id: int,
):
    """
    Return a single PDF by ID.
    """

    return (
        db.query(PDFDocument)
        .filter(PDFDocument.id == pdf_id)
        .first()
    )


def delete_pdf(
    db: Session,
    pdf_id: int,
):
    """
    Delete a PDF.
    """

    pdf = (
        db.query(PDFDocument)
        .filter(PDFDocument.id == pdf_id)
        .first()
    )

    if pdf:
        db.delete(pdf)
        db.commit()

    return pdf