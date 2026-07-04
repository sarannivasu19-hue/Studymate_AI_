import axios from "axios";

const API = "http://127.0.0.1:8000/api/translate";

export async function translateText(text, targetLanguage) {
  const response = await axios.post(`${API}/text`, {
    text: text,
    target_language: targetLanguage,
  });

  return response.data;
}