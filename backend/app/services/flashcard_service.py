import json
from app.services.gemini_service import generate_response


def generate_flashcards(topic: str, number_of_cards: int = 10):
    prompt = f"""
You are an expert teacher.

Generate exactly {number_of_cards} flashcards for the topic:

{topic}

Return ONLY valid JSON.

Format:

{{
  "flashcards": [
    {{
      "front": "Question",
      "back": "Answer"
    }}
  ]
}}

Rules:
1. Return only JSON.
2. Do not use markdown.
3. Do not use ```json.
4. Each flashcard should contain one important concept.
5. Make answers simple and suitable for college students.
"""

    response = generate_response(prompt)

    try:
        data = json.loads(response)

        if "flashcards" not in data:
            raise Exception("Invalid format")

        return data

    except Exception:
        return {
            "flashcards": [
                {
                    "front": "Error",
                    "back": "Unable to generate flashcards. Please try again."
                }
            ]
        }
    