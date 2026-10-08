import apiClient from "../api/client";

// Dashboard Statistics
export async function getDashboardStats() {
  const res = await apiClient.get("/api/admin/stats/");
  return res.data;
}

// Get Users
export async function getUsers() {
  const res = await apiClient.get("/api/admin/users/");
  return res.data;
}

// Delete User
export async function deleteUser(id) {
  const res = await apiClient.delete(`/api/admin/users/${id}`);
  return res.data;
}