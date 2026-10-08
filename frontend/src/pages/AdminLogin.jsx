import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import { saveSession } from "../api/auth";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await apiClient.post("/api/admin/login", {
        username: username.trim(),
        password,
      });

      if (response.data.success) {
        saveSession({
          access_token: "admin-token",
          role: "admin",
          user: { full_name: "Administrator", email: username.trim() },
        });
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      alert("Invalid Admin Credentials (Default: admin / 1906)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "420px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "40px",
          borderRadius: "20px",
          color: "white",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "8px",
            fontSize: "24px",
          }}
        >
          🔐 Admin Portal
        </h1>

        <p
          style={{
            textAlign: "center",
            opacity: ".7",
            marginBottom: "30px",
            fontSize: "14px",
          }}
        >
          StudyMate AI Management Console
        </p>

        <label style={{ fontSize: "13px", fontWeight: "600", color: "#CBD5E1" }}>
          Admin Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin"
          required
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <label style={{ fontSize: "13px", fontWeight: "600", color: "#CBD5E1" }}>
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            marginTop: "15px",
            marginBottom: "25px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            id="showPass"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPass" style={{ marginLeft: "8px", fontSize: "13px", color: "#94A3B8", cursor: "pointer" }}>
            Show Password
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)",
            color: "white",
            fontSize: "15px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 14px rgba(37,99,235,0.4)",
          }}
        >
          {loading ? "Authenticating..." : "Sign In to Admin Panel"}
        </button>
      </form>
    </div>
  );
}