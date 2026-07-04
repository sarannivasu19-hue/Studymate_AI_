import axios from "axios";

const API = "http://127.0.0.1:8000/api";

// Dashboard Statistics
export async function getDashboardStats() {
  const res = await axios.get(`${API}/admin/stats/`);
  return res.data;
}

// Get Users
export async function getUsers() {
  const res = await axios.get(`${API}/admin/users/`);
  return res.data;
}

// Delete User
export async function deleteUser(id) {
  return axios.delete(`${API}/admin/users/${id}`);
}