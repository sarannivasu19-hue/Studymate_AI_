import apiClient from "../api/client";

export async function generateNotes(topic) {
  const response = await apiClient.post("/api/notes/generate", {
    topic,
  });
  return response.data;
}