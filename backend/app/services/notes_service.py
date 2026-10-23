from app.services.gemini_service import generate_response


def generate_notes(topic: str):
    prompt = f"""
You are an expert teacher.

Create well-structured study notes for the following topic.

Topic:
{topic}

Format:

# Title

## Definition

## Key Concepts

## Types

## Advantages

## Disadvantages

## Applications

## Real World Example

## Important Interview Questions

Keep the notes concise, easy to understand and suitable for college students.
"""

    return generate_response(prompt)