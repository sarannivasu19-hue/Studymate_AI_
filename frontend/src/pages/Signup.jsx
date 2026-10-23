import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, saveSession } from "../api/auth";
import AuthSignaturePanel from "../components/AuthSignaturePanel";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const data = await signup({
        full_name: fullName,
        email,
        password,
      });

      saveSession(data);

      navigate("/dashboard");

    } catch (err) {

      console.error(err);

      if (err.response) {
        setError(
          err.response.data.detail ||
          "Signup failed."
        );
      } else {
        setError("Cannot connect to Backend Server.");
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-shell">

      <AuthSignaturePanel
        heading="One account. Every way you learn."
        body="Chat with your AI tutor, turn notes into quizzes, and track your progress in one place."
      />

      <div className="auth-form-panel">

        <div className="auth-card">

          <p className="auth-card-eyebrow">
            Get Started
          </p>

          <h2>Create your account</h2>

          <p className="auth-subtitle">
            Takes less than a minute.
          </p>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="field">
              <label>Full name</label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="field">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="field">
              <label>Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />

              <p className="field-hint">
                At least 8 characters.
              </p>
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">
              Log in
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}