import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/flashcards";

export async function generateFlashcards(topic, numberOfCards = 10) {
  const response = await axios.post(`${API_URL}/generate`, {
    topic,
    number_of_cards: numberOfCards,
  });

  return response.data;
}