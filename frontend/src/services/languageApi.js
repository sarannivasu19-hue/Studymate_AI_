import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL + "/api/language";

export async function askAI(question, language) {
  const response = await axios.post(
    `${API_URL}/ask`,
    {
      question,
      language,
    }
  );

  return response.data;
}