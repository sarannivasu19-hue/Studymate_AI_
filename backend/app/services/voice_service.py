from app.services.gemini_service import generate_response


def ask_voice_tutor(question: str, language: str):

    prompt = f"""
You are StudyMate AI.

The student selected this language:

{language}

Student Question:

{question}

Instructions:

- Answer ONLY in {language}.
- Explain simply.
- Use examples if possible.
- Do NOT answer in English unless the selected language is English.
- Return only the answer.
"""

    return generate_response(prompt)