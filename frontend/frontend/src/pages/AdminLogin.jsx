import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      alert("Invalid Admin Credentials");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#2563EB,#7C3AED)",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "420px",
          background: "rgba(255,255,255,.12)",
          backdropFilter: "blur(20px)",
          padding: "40px",
          borderRadius: "20px",
          color: "white",
          boxShadow: "0 15px 35px rgba(0,0,0,.25)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          🔐 Admin Login
        </h1>

        <p
          style={{
            textAlign: "center",
            opacity: ".8",
            marginBottom: "35px",
          }}
        >
          StudyMate AI Administration
        </p>

        <label>Username</label>

        <input
          type="text"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <label>Password</label>

        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <div
          style={{
            marginTop: "15px",
            marginBottom: "25px",
          }}
        >
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() =>
              setShowPassword(!showPassword)
            }
          />

          <span style={{ marginLeft: "8px" }}>
            Show Password
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            borderRadius: "10px",
            border: "none",
            background: "#22C55E",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}