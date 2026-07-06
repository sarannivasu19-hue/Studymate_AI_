import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/flashcards";

export async function generateFlashcards(topic, numberOfCards = 10) {
  const response = await axios.post(`${API_URL}/generate`, {
    topic,
    number_of_cards: numberOfCards,
  });

  return response.data;
}