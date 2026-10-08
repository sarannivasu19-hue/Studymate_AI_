import apiClient from "../api/client";

export async function generateQuiz(topic, difficulty = "Medium", numberOfQuestions = 5) {
  const response = await apiClient.post("/api/quiz/generate", {
    topic,
    difficulty,
    number_of_questions: numberOfQuestions,
  });
  return response.data;
}