import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/voice";

export async function askVoiceAI(question, language) {
  const response = await axios.post(`${API_URL}/ask`, {
    question: question,
    language: language,
  });

  return response.data;
}