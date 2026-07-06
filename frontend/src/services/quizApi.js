import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/quiz";

export async function generateQuiz(
  topic,
  difficulty,
  numberOfQuestions = 5
) {
  const response = await axios.post(`${API_URL}/generate`, {
    topic,
    difficulty,
    number_of_questions: numberOfQuestions,
  });

  return response.data;
}