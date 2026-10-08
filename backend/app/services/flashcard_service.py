import json
import re
from app.services.gemini_service import generate_flashcards as gemini_gen_flashcards


def generate_flashcards(topic: str, number_of_cards: int = 10):
    try:
        raw_json_str = gemini_gen_flashcards(topic, number_of_cards)
        if isinstance(raw_json_str, dict):
            return raw_json_str
        data = json.loads(raw_json_str)
        if "flashcards" in data and isinstance(data["flashcards"], list):
            return data
    except Exception as e:
        pass

    return {
        "flashcards": [
            {
                "front": f"Core Concept of {topic}",
                "back": f"{topic} is essential for problem solving in this academic subject."
            },
            {
                "front": f"Key Application of {topic}",
                "back": f"Used in industry systems to ensure speed, reliability, and correctness."
            },
            {
                "front": f"High-Yield Exam Tip for {topic}",
                "back": "Remember to write clear definitions, highlight time/space trade-offs, and cite examples."
            }
        ]
    }