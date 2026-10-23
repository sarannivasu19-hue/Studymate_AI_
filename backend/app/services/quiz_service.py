import json

from app.services.gemini_service import generate_response


def generate_quiz(topic: str, difficulty: str, number_of_questions: int = 5):
    prompt = f"""
You are an expert AI teacher.

Generate exactly {number_of_questions} multiple-choice questions.

Topic:
{topic}

Difficulty:
{difficulty}

Return ONLY valid JSON.

Format:

{{
  "questions":[
    {{
      "question":"Question here",
      "options":[
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correct_answer":"Option A",
      "explanation":"Short explanation."
    }}
  ]
}}

Rules:

- No markdown
- No ```json
- No extra text
- Exactly 4 options
- Exactly {number_of_questions} questions
"""

    response = generate_response(prompt)

    try:
        return json.loads(response)

    except Exception:
        return {
            "questions": [
                {
                    "question": "Unable to generate quiz.",
                    "options": [
                        "Retry",
                        "Retry",
                        "Retry",
                        "Retry",
                    ],
                    "correct_answer": "Retry",
                    "explanation": response,
                }
            ]
        }