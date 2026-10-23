import os
import time

from dotenv import load_dotenv
from google import genai

# ---------------------------------------------------------
# LOAD ENVIRONMENT VARIABLES
# ---------------------------------------------------------

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("GEMINI_API_KEY not found in .env file")

from google.genai import types

client = genai.Client(
    api_key=API_KEY,
    http_options=types.HttpOptions(
        timeout=25000,
        retry_options=types.HttpRetryOptions(attempts=1),
    ),
)

PRIMARY_MODEL = os.getenv("GEMINI_MODEL", "gemini-3-flash-preview")
FALLBACK_MODELS = ["gemini-3.5-flash", "gemma-4-26b-a4b-it", "gemini-3.6-flash"]
CANDIDATE_MODELS = [PRIMARY_MODEL] + [m for m in FALLBACK_MODELS if m != PRIMARY_MODEL]

# ---------------------------------------------------------
# GEMINI RESPONSE
# ---------------------------------------------------------

def generate_response(prompt: str) -> str:
    """
    Send prompt to Gemini AI with immediate model fallback.
    """
    last_error = None
    for model in CANDIDATE_MODELS:
        try:
            response = client.models.generate_content(
                model=model,
                contents=prompt,
            )

            if hasattr(response, "text") and response.text:
                return response.text

        except Exception as e:
            last_error = e
            print(f"Generate attempt on model {model} failed: {e}. Trying fallback model...")
            continue

    return f"Gemini Error: {last_error}" if last_error else "Gemini returned an empty response."

# ---------------------------------------------------------
# PDF SUMMARY
# ---------------------------------------------------------

def summarize_text(text: str) -> str:

    prompt = f"""
You are an AI Tutor.

Read the study material below.

Generate:

1. Short Summary

2. Key Points

3. Important Definitions

4. Exam Tips

Study Material:

{text}
"""

    return generate_response(prompt)

# ---------------------------------------------------------
# AI NOTES
# ---------------------------------------------------------

def generate_notes(text: str) -> str:

    prompt = f"""
You are an expert teacher.

Generate clean revision notes.

Requirements:

• Use headings

• Use bullet points

• Highlight important concepts

• Include formulas if available

• Easy for revision

Study Material:

{text}
"""

    return generate_response(prompt)

# ---------------------------------------------------------
# FLASHCARDS
# ---------------------------------------------------------

def generate_flashcards(text: str) -> str:

    prompt = f"""
You are an AI Teacher.

Generate at least 10 flashcards.

Each flashcard must follow this format:

Flashcard 1

Question:
...

Answer:
...

Flashcard 2

Question:
...

Answer:
...

Study Material:

{text}
"""

    return generate_response(prompt)

# ---------------------------------------------------------
# QUIZ GENERATOR
# ---------------------------------------------------------

def generate_quiz(text: str) -> str:

    prompt = f"""
Generate a quiz from the following study material.

Create:

• 10 MCQs

• 5 True/False

• 5 Fill in the Blanks

• 5 Short Answer Questions

Also provide the answers.

Study Material:

{text}
"""

    return generate_response(prompt)