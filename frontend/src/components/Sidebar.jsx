import {
  FaHome,
  FaRobot,
  FaBrain,
  FaMicrophone,
  FaLanguage,
  FaFilePdf,
  FaFolderOpen,
  FaStickyNote,
  FaClone,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../api/auth";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <FaHome />, name: "Dashboard", path: "/dashboard" },
    { icon: <FaRobot />, name: "AI Tutor", path: "/ai-tutor", badge: "Fast" },
    { icon: <FaBrain />, name: "Adaptive Quiz", path: "/adaptive-quiz" },
    { icon: <FaClone />, name: "Flash Cards", path: "/flashcards" },
    { icon: <FaStickyNote />, name: "AI Notes", path: "/ai-notes" },
    { icon: <FaFilePdf />, name: "PDF Learning", path: "/pdf-learning" },
    { icon: <FaFolderOpen />, name: "PDF Library", path: "/pdf-library" },
    { icon: <FaMicrophone />, name: "Voice Learning", path: "/voice-learning" },
    { icon: <FaLanguage />, name: "Multi Language", path: "/multi-language" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      style={{
        width: collapsed ? "80px" : "260px",
        background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
        color: "#F8FAFC",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "20px 14px",
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "4px 0 24px rgba(0,0,0,0.25)",
        zIndex: 50,
        position: "sticky",
        top: 0,
      }}
    >
      {/* Brand Header */}
      <div
        style={{
          display: "flex",
          justifyContent: collapsed ? "center" : "space-between",
          alignItems: "center",
          marginBottom: "28px",
          padding: "0 8px",
        }}
      >
        {!collapsed && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "24px" }}>🎓</span>
            <div>
              <h2
                style={{
                  color: "#60A5FA",
                  margin: 0,
                  fontSize: "19px",
                  fontWeight: "700",
                  letterSpacing: "-0.5px",
                }}
              >
                StudyMate <span style={{ color: "#A855F7" }}>AI</span>
              </h2>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                Next-Gen Study Partner
              </span>
            </div>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#CBD5E1",
            padding: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FaBars size={16} />
        </button>
      </div>

      {/* Nav List */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 14px",
                cursor: "pointer",
                borderRadius: "10px",
                transition: "all 0.2s ease",
                background: isActive
                  ? "linear-gradient(90deg, #2563EB 0%, #3B82F6 100%)"
                  : "transparent",
                color: isActive ? "#FFFFFF" : "#CBD5E1",
                boxShadow: isActive
                  ? "0 4px 14px rgba(37,99,235,0.4)"
                  : "none",
                fontWeight: isActive ? "600" : "500",
                fontSize: "14.5px",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.color = "#FFFFFF";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#CBD5E1";
                }
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  color: isActive ? "#FFFFFF" : "#60A5FA",
                }}
              >
                {item.icon}
              </span>

              {!collapsed && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span
                      style={{
                        background: "rgba(168,85,247,0.25)",
                        color: "#C084FC",
                        border: "1px solid rgba(168,85,247,0.4)",
                        fontSize: "10px",
                        fontWeight: "700",
                        padding: "2px 6px",
                        borderRadius: "10px",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout Action */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "16px",
          marginTop: "auto",
        }}
      >
        <div
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "12px 14px",
            cursor: "pointer",
            borderRadius: "10px",
            color: "#F87171",
            transition: "all 0.2s ease",
            fontSize: "14.5px",
            fontWeight: "500",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239,68,68,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <FaSignOutAlt size={18} />
          {!collapsed && <span>Logout</span>}
        </div>
      </div>
    </aside>
  );
}