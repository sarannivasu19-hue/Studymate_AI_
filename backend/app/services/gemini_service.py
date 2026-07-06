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

client = genai.Client(api_key=API_KEY)

MODEL_NAME = "gemini-2.5-flash"

# ---------------------------------------------------------
# GEMINI RESPONSE
# ---------------------------------------------------------

def generate_response(prompt: str) -> str:
    """
    Send prompt to Gemini AI with automatic retry.
    """

    max_retries = 3

    for attempt in range(max_retries):

        try:
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt,
            )

            if hasattr(response, "text") and response.text:
                return response.text

            return "Gemini returned an empty response."

        except Exception as e:

            error = str(e)

            print(f"Gemini Error: {error}")

            # Retry only for temporary server errors
            if (
                "503" in error
                or "UNAVAILABLE" in error
                or "429" in error
            ):

                if attempt < max_retries - 1:

                    wait_time = 2 * (attempt + 1)

                    print(
                        f"Retrying in {wait_time} seconds..."
                    )

                    time.sleep(wait_time)

                    continue

            return f"Gemini Error: {error}"

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