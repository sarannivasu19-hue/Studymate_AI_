import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/notes";

export async function generateNotes(topic) {
  const response = await axios.post(`${API_URL}/generate`, {
    topic,
  });

  return response.data;
}