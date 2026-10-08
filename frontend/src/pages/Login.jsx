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
      const data = await login({
        email: email.trim(),
        password,
      });

      saveSession(data);

      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err.friendlyMessage) {
        setError(err.friendlyMessage);
      } else if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Invalid credentials or server unavailable. Please ensure FastAPI is running.");
      }
    } finally {
      setLoading(false);
    }
  }

  const fillDemoAdmin = () => {
    setEmail("admin");
    setPassword("1906");
  };

  return (
    <div className="auth-shell">
      <AuthSignaturePanel
        heading="Pick up right where you left off."
        body="Your AI tutor, notes and quizzes stay in sync with zero latency."
      />

      <div className="auth-form-panel">
        <div className="auth-card">
          <p className="auth-card-eyebrow">Welcome Back</p>
          <h2>StudyMate AI Login</h2>
          <p className="auth-subtitle">
            Sign in as Student or Administrator
          </p>

          {error && (
            <div className="auth-error" style={{ whiteSpace: "pre-wrap" }}>
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
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>

          {/* Quick Demo Credentials Assistant */}
          <div
            style={{
              marginTop: "20px",
              padding: "12px 16px",
              background: "#F8FAFC",
              border: "1px dashed #CBD5E1",
              borderRadius: "10px",
              fontSize: "12.5px",
              color: "#64748B",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>Quick Demo Admin: <strong>admin</strong> / <strong>1906</strong></span>
              <button
                type="button"
                onClick={fillDemoAdmin}
                style={{
                  background: "#EFF6FF",
                  border: "1px solid #BFDBFE",
                  color: "#2563EB",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "11px",
                  fontWeight: "600",
                }}
              >
                Auto Fill
              </button>
            </div>
          </div>

          <p className="auth-switch">
            New User? <Link to="/signup">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}