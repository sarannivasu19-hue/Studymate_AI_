import os
import logging
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# IMPORTANT: Import models before create_all()
from . import models
from .database import Base, engine

from .routers import (
    auth,
    ai,
    pdf,
    quiz,
    notes,
    translation,
    flashcards,
    voice,
    library,
    admin,
    admin_dashboard,
    admin_users,
    admin_stats,
)

# -----------------------------------
# Load Environment Variables & Setup
# -----------------------------------

load_dotenv()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("studymate.main")

# -----------------------------------
# Create Database Tables Safely
# -----------------------------------

try:
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables verified/created successfully.")
except Exception as e:
    logger.warning(f"Warning during database table creation: {e}")

# -----------------------------------
# FastAPI App
# -----------------------------------

app = FastAPI(
    title="StudyMate AI API",
    description="High-Speed AI Study Partner Backend",
    version="1.2.0",
)

# -----------------------------------
# CORS Configuration (Rock-solid for all origins)
# -----------------------------------

frontend_origin = os.getenv(
    "FRONTEND_ORIGIN",
    "https://studymate-frontend-4qh0.onrender.com",
).rstrip("/")

allowed_origins = [
    frontend_origin,
    "https://studymate-frontend-4qh0.onrender.com",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"^https?:\/\/.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


# Global Exception Handler ensuring CORS headers on all errors
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    origin = request.headers.get("origin", "*")
    logger.error(f"Global unhandled error at {request.url.path}: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": f"Internal Server Error: {str(exc)}"},
        headers={
            "Access-Control-Allow-Origin": origin,
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
        },
    )


# -----------------------------------
# Register Routers
# -----------------------------------

app.include_router(auth.router)
app.include_router(ai.router)
app.include_router(pdf.router)
app.include_router(library.router)
app.include_router(quiz.router)
app.include_router(notes.router)
app.include_router(translation.router)
app.include_router(flashcards.router)
app.include_router(voice.router)

app.include_router(admin.router)
app.include_router(admin_dashboard.router)
app.include_router(admin_users.router)
app.include_router(admin_stats.router)

# -----------------------------------
# Root & Health Endpoints
# -----------------------------------

@app.get("/")
def root():
    return {
        "status": "success",
        "service": "StudyMate AI Backend 🚀",
        "version": "1.2.0",
        "docs_url": "/docs",
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "StudyMate AI Backend",
        "version": "1.2.0",
        "database": "connected",
    }