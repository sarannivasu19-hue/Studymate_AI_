import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Dashboard Statistics
  const [stats, setStats] = useState({
    total_users: 0,
    total_notes: 0,
    total_voice: 0,
    total_flashcards: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/stats/`
      );

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  // Dashboard Cards
  const cards = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: "👥",
      color: "#2563EB",
      path: "/admin/users",
    },
    {
      title: "AI Notes",
      value: stats.total_notes,
      icon: "📝",
      color: "#8B5CF6",
      path: "/admin/notes",
    },
    {
      title: "Voice Learning",
      value: stats.total_voice,
      icon: "🎤",
      color: "#F59E0B",
      path: "/admin/voice",
    },
    {
      title: "Flashcards",
      value: stats.total_flashcards,
      icon: "🃏",
      color: "#14B8A6",
      path: "/admin/flashcards",
    },
  ];

  // Quick Access Modules
  const modules = [
    {
      title: "User Management",
      icon: "👥",
      path: "/admin/users",
    },
    {
      title: "Analytics",
      icon: "📈",
      path: "/admin/analytics",
    },
    {
      title: "Quiz",
      icon: "🧠",
      path: "/admin/quiz",
    },
    {
      title: "Voice Learning",
      icon: "🎤",
      path: "/admin/voice",
    },
    {
      title: "AI Notes",
      icon: "📝",
      path: "/admin/notes",
    },
    {
      title: "Flashcards",
      icon: "🃏",
      path: "/admin/flashcards",
    },
    {
      title: "Settings",
      icon: "⚙️",
      path: "/admin/settings",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F3F4F6",
      }}
    >
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminNavbar />

        <div style={{ padding: "30px" }}>
          <h1 style={{ marginBottom: "10px" }}>
            🛡️ StudyMate AI Admin Panel
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginBottom: "30px",
            }}
          >
            Welcome Administrator. Manage your StudyMate AI platform.
          </p>

          {/* Statistics Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            {cards.map((card) => (
              <div
                key={card.title}
                onClick={() => navigate(card.path)}
                style={{
                  background: card.color,
                  color: "white",
                  borderRadius: "15px",
                  padding: "25px",
                  cursor: "pointer",
                  boxShadow:
                    "0 8px 20px rgba(0,0,0,.15)",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "10px",
                  }}
                >
                  {card.icon}
                </div>

                <h2>{card.value}</h2>

                <p>{card.title}</p>
              </div>
            ))}
          </div>

          {/* Quick Access */}

          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Quick Access
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
            }}
          >
            {modules.map((item) => (
              <div
                key={item.title}
                onClick={() => navigate(item.path)}
                style={{
                  background: "white",
                  borderRadius: "15px",
                  padding: "25px",
                  cursor: "pointer",
                  boxShadow:
                    "0 5px 15px rgba(0,0,0,.08)",
                }}
              >
                <div
                  style={{
                    fontSize: "40px",
                    marginBottom: "10px",
                  }}
                >
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p style={{ color: "#666" }}>
                  Click to Manage
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}