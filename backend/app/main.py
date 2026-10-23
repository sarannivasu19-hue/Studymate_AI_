import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI
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
# Load Environment Variables
# -----------------------------------

load_dotenv()
logger = logging.getLogger("studymate")

# -----------------------------------
# FastAPI App
# -----------------------------------

app = FastAPI(
    title="StudyMate AI API",
    version="1.0.0",
)


# -----------------------------------
# Database Initialization
# -----------------------------------

@app.on_event("startup")
def startup_db():
    try:
        Base.metadata.create_all(bind=engine)
        logger.info("Database tables initialized successfully.")
    except Exception as e:
        logger.warning(f"Database initialization warning (tables may already exist or DB connecting): {e}")


# -----------------------------------
# CORS Configuration
# -----------------------------------

# Allowed origins for development and production
default_origins = [
    "https://studymate-frontend-4qh0.onrender.com",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

env_origin = os.getenv("FRONTEND_ORIGIN", "")
if env_origin:
    for origin in env_origin.split(","):
        cleaned = origin.strip().rstrip("/")
        if cleaned and cleaned not in default_origins:
            default_origins.append(cleaned)

app.add_middleware(
    CORSMiddleware,
    allow_origins=default_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------
# Register Routers
# -----------------------------------

app.include_router(auth.router)
app.include_router(ai.router)
app.include_router(pdf.router)
app.include_router(quiz.router)
app.include_router(notes.router)
app.include_router(translation.router)
app.include_router(flashcards.router)
app.include_router(voice.router)
app.include_router(library.router)

app.include_router(admin.router)
app.include_router(admin_dashboard.router)
app.include_router(admin_users.router)
app.include_router(admin_stats.router)

# -----------------------------------
# Root & Health Check Endpoints
# -----------------------------------

@app.get("/")
def root():
    return {
        "status": "success",
        "message": "Welcome to StudyMate AI Backend 🚀",
    }


@app.get("/health")
@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "StudyMate AI Backend",
        "version": "1.0.0",
    }


# -----------------------------------
# Production Entry Point
# -----------------------------------

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=False)