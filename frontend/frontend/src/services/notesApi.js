import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/notes";

export async function generateNotes(topic) {
  const response = await axios.post(`${API_URL}/generate`, {
    topic,
  });

  return response.data;
}