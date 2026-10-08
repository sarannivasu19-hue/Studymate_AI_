import os
import sys

# Ensure UTF-8 output on Windows console
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

from dotenv import load_dotenv

# Ensure backend root is on Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

load_dotenv()

from app.services.gemini_service import (
    generate_response,
    summarize_text,
    generate_notes,
    generate_flashcards,
    generate_quiz,
    get_ai_status,
)

print("=" * 60)
print("  StudyMate AI Test Suite")
print("=" * 60)

status = get_ai_status()
print(f"Status: {status['status']}")
print(f"Active Model / Engine: {status['active_model']}")
print(f"Live Gemini Connected: {status['live_gemini']}")
print(f"API Key Preview: {status['key_preview']}")
print("-" * 60)

print("\n1. Testing AI Tutor Chat...")
chat_res = generate_response("Explain Binary Search in 2 sentences.")
print(f"Chat Response:\n{chat_res[:200]}...")

print("\n2. Testing Notes Generator...")
notes_res = generate_notes("Python Decorators")
print(f"Notes Response:\n{notes_res[:200]}...")

print("\n3. Testing Flashcard Generator...")
cards_res = generate_flashcards("Operating Systems", 3)
print(f"Flashcards Response:\n{cards_res[:200]}...")

print("\n4. Testing Quiz Generator...")
quiz_res = generate_quiz("Data Structures", "Easy", 3)
print(f"Quiz Response:\n{quiz_res[:200]}...")

print("\n" + "=" * 60)
print("  All StudyMate AI tests completed successfully! 🎉")
print("=" * 60)