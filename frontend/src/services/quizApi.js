import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/quiz";

export async function generateQuiz(topic, difficulty, numberOfQuestions = 5) {
  const response = await axios.post(`${API_URL}/generate`, {
    topic: topic,
    difficulty: difficulty,
    number_of_questions: numberOfQuestions,
  });

  return response.data;
}