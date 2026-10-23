import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, saveSession } from "../api/auth";
import AuthSignaturePanel from "../components/AuthSignaturePanel";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      console.log("Sending Login Request...");

      const data = await login({
        email: email.trim(),
        password,
      });

      console.log("Login Success:", data);

      saveSession(data);

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {

      console.error("Login Error:", err);

      if (err.response) {
        console.log("Backend Response:", err.response.data);

        setError(
          err.response.data.detail ||
          "Invalid Email or Password"
        );

      } else if (err.request) {

        console.log("No response from backend");

        setError(
          "Cannot connect to Backend Server.\nPlease make sure FastAPI is running."
        );

      } else {

        setError(err.message);

      }

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="auth-shell">

      <AuthSignaturePanel
        heading="Pick up right where you left off."
        body="Your AI tutor, notes and quizzes stay in sync."
      />

      <div className="auth-form-panel">

        <div className="auth-card">

          <p className="auth-card-eyebrow">
            Welcome Back
          </p>

          <h2>StudyMate AI Login</h2>

          <p className="auth-subtitle">
            Login as Student or Administrator
          </p>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="field">

              <label>Email / Admin Username</label>

              <input
                type="text"
                placeholder="Student Email or admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <div className="field">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="auth-switch">

            New User?{" "}

            <Link to="/signup">
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}