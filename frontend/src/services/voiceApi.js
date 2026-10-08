import apiClient from "../api/client";

export async function askVoiceAI(question, language) {
  const response = await apiClient.post("/api/voice/ask", {
    question,
    language,
  });
  return response.data;
}