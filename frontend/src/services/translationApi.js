import axios from "axios";

const API = (import.meta.env.VITE_API_URL || "") + "/api/translate";

export async function translateText(text, targetLanguage) {
  const response = await axios.post(`${API}/text`, {
    text: text,
    target_language: targetLanguage,
  });

  return response.data;
}