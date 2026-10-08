import apiClient from "../api/client";

export async function askAI(question, language) {
  const response = await apiClient.post("/api/language/ask", {
    question,
    language,
  });
  return response.data;
}