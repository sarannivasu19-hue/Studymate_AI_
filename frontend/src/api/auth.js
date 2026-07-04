import axios from "axios";

const API = "http://127.0.0.1:8000/api";

// =======================
// Login
// =======================
export async function login({ email, password }) {

  // Admin Login
  if (email.trim().toLowerCase() === "admin") {

    await axios.post(`${API}/admin/login`, {
      username: email,
      password: password,
    });

    return {
      access_token: "admin-token",
      token_type: "bearer",
      role: "admin",
      user: {
        full_name: "Administrator",
        email: "admin",
      },
    };
  }

  // Student Login
  const form = new URLSearchParams();

  form.append("username", email);
  form.append("password", password);

  const response = await axios.post(
    `${API}/auth/login`,
    form,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return {
    ...response.data,
    role: "student",
  };
}

// =======================
// Signup
// =======================
export async function signup({ full_name, email, password }) {

  const response = await axios.post(
    `${API}/auth/signup`,
    {
      full_name,
      email,
      password,
    }
  );

  return response.data;
}

// =======================
// Save Session
// =======================
export function saveSession(data) {

  localStorage.setItem(
    "studymate_token",
    data.access_token
  );

  localStorage.setItem(
    "studymate_role",
    data.role || "student"
  );

  localStorage.setItem(
    "studymate_user",
    JSON.stringify(data.user)
  );
}

// =======================
// Logout
// =======================
export function logout() {

  localStorage.removeItem("studymate_token");
  localStorage.removeItem("studymate_role");
  localStorage.removeItem("studymate_user");
}

// =======================
// Get Token
// =======================
export function getToken() {
  return localStorage.getItem("studymate_token");
}

// =======================
// Get Role
// =======================
export function getRole() {
  return localStorage.getItem("studymate_role");
}

// =======================
// Get Current User
// =======================
export function getCurrentUser() {
  const user = localStorage.getItem("studymate_user");
  return user ? JSON.parse(user) : null;
}