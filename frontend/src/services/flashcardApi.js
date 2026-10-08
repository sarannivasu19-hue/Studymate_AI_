import apiClient from "../api/client";

export async function generateFlashcards(topic, numberOfCards = 10) {
  const response = await apiClient.post("/api/flashcards/generate", {
    topic,
    number_of_cards: numberOfCards,
  });
  return response.data;
}