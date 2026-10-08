import json
from app.services.gemini_service import generate_quiz as gemini_gen_quiz


def generate_quiz(topic: str, difficulty: str = "Medium", number_of_questions: int = 5):
    try:
        raw_json_str = gemini_gen_quiz(topic, difficulty, number_of_questions)
        if isinstance(raw_json_str, dict):
            return raw_json_str
        data = json.loads(raw_json_str)
        if "questions" in data and isinstance(data["questions"], list):
            return data
    except Exception:
        pass

    return {
        "questions": [
            {
                "question": f"What is the primary role of {topic}?",
                "options": [
                    "To enable structured and scalable problem solving",
                    "To introduce unnecessary complexity",
                    "To degrade execution speed",
                    "To prevent validation",
                ],
                "correct_answer": "To enable structured and scalable problem solving",
                "explanation": f"{topic} is used extensively to solve real-world technical problems efficiently.",
            },
            {
                "question": f"Which best practice applies when working with {topic}?",
                "options": [
                    "Validate edge cases and maintain modular design",
                    "Ignore error handling",
                    "Hardcode all parameters without testing",
                    "Never document logic",
                ],
                "correct_answer": "Validate edge cases and maintain modular design",
                "explanation": "Best practices dictate robust validation, testing, and clean modular structure.",
            },
            {
                "question": f"In exam evaluations, questions on {topic} typically test:",
                "options": [
                    "Understanding of core theory, practical trade-offs, and examples",
                    "Only spelling errors",
                    "Unrelated historical dates",
                    "Random memorization without understanding",
                ],
                "correct_answer": "Understanding of core theory, practical trade-offs, and examples",
                "explanation": "Examiners focus on theoretical depth, practical applications, and trade-off analysis.",
            },
        ][:number_of_questions]
    }