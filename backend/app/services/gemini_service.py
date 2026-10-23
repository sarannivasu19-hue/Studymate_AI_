import os
from typing import Generator, Optional

from dotenv import load_dotenv
from google import genai
from google.genai import types

# ---------------------------------------------------------
# LOAD ENVIRONMENT VARIABLES & INITIALIZE CLIENT
# ---------------------------------------------------------

load_dotenv()

def get_client() -> Optional[genai.Client]:
    """Retrieve or initialize Gemini client safely."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None
    try:
        return genai.Client(
            api_key=api_key,
            http_options=types.HttpOptions(
                timeout=25000,
                retry_options=types.HttpRetryOptions(
                    attempts=1,
                ),
            ),
        )
    except Exception as e:
        print(f"Failed to initialize Gemini client: {e}")
        return None

PRIMARY_MODEL = os.getenv("GEMINI_MODEL", "gemini-3-flash-preview")
FALLBACK_MODELS = ["gemini-3.5-flash", "gemma-4-26b-a4b-it", "gemini-3.6-flash"]

# Unique list of candidate models in priority order
CANDIDATE_MODELS = [PRIMARY_MODEL] + [m for m in FALLBACK_MODELS if m != PRIMARY_MODEL]

STUDY_TUTOR_SYSTEM_INSTRUCTION = """You are an expert AI Study Tutor for StudyMateAI.
Provide clear, well-structured, educational answers using Markdown formatting.

When explaining concepts or answering educational questions, structure your answer using these sections when appropriate:

**Definition**
- Explain the concept clearly and concisely in simple English.

**Key Points**
- Highlight key facts and principles using short, clear bullet points.
- Keep each point short and clear.

**Step-by-Step Explanation**
1. Explain the first step.
2. Explain the second step.
3. Explain the next step when necessary.

**Example**
- Provide a simple, practical example or analogy.
- For programming questions, format code using proper fenced code blocks with the correct language identifier (e.g., ```python) and explain code in separate, easy-to-understand points.

**Summary**
- End with a short recap when useful.

Formatting rules:
- Never put the entire answer into one long paragraph when structured formatting would improve readability.
- Use Markdown headings, bullet points, numbered lists, bold text, and code blocks appropriately.
- Use numbered steps for procedures and bullet points for lists of facts.
- For programming questions, format code using proper fenced code blocks with the correct language identifier and explain the code in clear bullet points.
- Avoid unnecessary headings for simple or conversational questions.
- Do not force every answer into the same template. Choose the format that best suits the question.
- Preserve the original meaning and accuracy of AI-generated answers.
"""

# ---------------------------------------------------------
# GEMINI STREAMING RESPONSE
# ---------------------------------------------------------

def stream_response(prompt: str, system_instruction: Optional[str] = STUDY_TUTOR_SYSTEM_INSTRUCTION) -> Generator[str, None, None]:
    """
    Stream chunks from Gemini AI with immediate fallback to secondary models on error.
    """
    client = get_client()
    if not client:
        yield "Gemini Error: GEMINI_API_KEY is not configured on the backend server."
        return

    last_error = None

    for model in CANDIDATE_MODELS:
        try:
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
            )
            response_stream = client.models.generate_content_stream(
                model=model,
                contents=prompt,
                config=config,
            )

            yielded_any = False
            for chunk in response_stream:
                if hasattr(chunk, "text") and chunk.text:
                    yielded_any = True
                    yield chunk.text

            if yielded_any:
                return

        except Exception as e:
            last_error = e
            print(f"Stream attempt on model {model} failed: {e}. Trying fallback model...")
            continue

    if last_error:
        yield f"Error generating response: {last_error}"

# ---------------------------------------------------------
# GEMINI SYNCHRONOUS RESPONSE
# ---------------------------------------------------------

def generate_response(prompt: str, system_instruction: Optional[str] = STUDY_TUTOR_SYSTEM_INSTRUCTION) -> str:
    """
    Send prompt to Gemini AI with immediate model fallback.
    """
    client = get_client()
    if not client:
        return "Gemini Error: GEMINI_API_KEY is not configured on the backend server."

    last_error = None

    for model in CANDIDATE_MODELS:
        try:
            config = types.GenerateContentConfig(
                system_instruction=system_instruction,
            )
            response = client.models.generate_content(
                model=model,
                contents=prompt,
                config=config,
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