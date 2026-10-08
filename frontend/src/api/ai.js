import apiClient from "./client";

/**
 * Send question/message to StudyMate AI Tutor.
 * Returns response text, latency_ms, and active model.
 */
export async function askAiChat(message, topic = null) {
  const response = await apiClient.post("/api/ai/chat", {
    message,
    topic,
  });
  return response.data;
}

/**
 * Fetch current AI status (Live Gemini vs Fast Built-in Engine).
 */
export async function getAiStatus() {
  const response = await apiClient.get("/api/ai/status");
  return response.data;
}

/**
 * Dynamically configure or update Gemini API key in the backend.
 */
export async function setGeminiApiKey(apiKey) {
  const response = await apiClient.post("/api/ai/set-key", {
    api_key: apiKey,
  });
  return response.data;
}
