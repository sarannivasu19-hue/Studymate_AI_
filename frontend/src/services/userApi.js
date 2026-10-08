import apiClient from "../api/client";

export async function getCurrentUserProfile() {
  const response = await apiClient.get("/api/auth/me");
  return response.data;
}
