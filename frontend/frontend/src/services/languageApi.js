import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/language";

export async function askAI(question, language) {
  const response = await axios.post(`${API_URL}/ask`, {
    question,
    language,
  });

  return response.data;
}