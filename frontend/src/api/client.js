import axios from "axios";

/**
 * Intelligently resolve the API base URL:
 * - If running locally in browser (localhost / 127.0.0.1) and VITE_API_URL is unset
 *   or pointing to render, use http://localhost:8000
 * - In production, use VITE_API_URL or current origin
 */
export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL;
  const isLocalHost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  if (isLocalHost) {
    if (!envUrl || envUrl.includes("onrender.com")) {
      return "http://localhost:8000";
    }
    return envUrl;
  }

  return envUrl || "";
}

export const API_BASE_URL = getApiBaseUrl();

// Axios instance configured with defaults
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Interceptor to automatically attach JWT auth token
apiClient.interceptors.request.use(
  (config) => {
    // Dynamically ensure correct base URL
    config.baseURL = getApiBaseUrl();

    const token = localStorage.getItem("studymate_token");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for uniform error messages
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const detail = error.response.data?.detail || error.response.data?.message;
      if (detail) {
        error.friendlyMessage = detail;
      }
    } else if (error.request) {
      error.friendlyMessage =
        "Cannot connect to StudyMate Backend server. Please ensure FastAPI is running.";
    } else {
      error.friendlyMessage = error.message;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
