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
    admin,
    admin_dashboard,
    admin_users,
    admin_stats,
)

# -----------------------------------
# Load Environment Variables
# -----------------------------------

load_dotenv()

# -----------------------------------
# Create Database Tables
# -----------------------------------

Base.metadata.create_all(bind=engine)

# -----------------------------------
# FastAPI App
# -----------------------------------

app = FastAPI(
    title="StudyMate AI API",
    version="1.0.0",
)

# -----------------------------------
# CORS Configuration
# -----------------------------------

frontend_origin = os.getenv(
    "FRONTEND_ORIGIN",
    "https://studymate-frontend-4qh0.onrender.com",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        frontend_origin,
        "https://studymate-frontend-4qh0.onrender.com",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
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

app.include_router(admin.router)
app.include_router(admin_dashboard.router)
app.include_router(admin_users.router)
app.include_router(admin_stats.router)

# -----------------------------------
# Root Endpoint
# -----------------------------------

@app.get("/")
def root():
    return {
        "status": "success",
        "message": "Welcome to StudyMate AI Backend 🚀",
    }


# -----------------------------------
# Health Check
# -----------------------------------

@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "StudyMate AI Backend",
        "version": "1.0.0",
    }