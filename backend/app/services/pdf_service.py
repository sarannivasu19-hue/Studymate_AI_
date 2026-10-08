import pymupdf as fitz


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text cleanly from every page of a PDF document.
    """
    document = fitz.open(file_path)
    text = ""
    for page in document:
        text += page.get_text() + "\n"
    document.close()
    return text.strip()