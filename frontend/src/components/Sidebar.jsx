import {
  FaHome,
  FaRobot,
  FaBrain,
  FaMicrophone,
  FaLanguage,
  FaFilePdf,
  FaStickyNote,
  FaClone,
  FaChartLine,
  FaGlobe,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: <FaHome />, name: "Dashboard", path: "/dashboard" },
    { icon: <FaRobot />, name: "AI Tutor", path: "/ai-tutor" },
    { icon: <FaBrain />, name: "Adaptive Quiz", path: "/adaptive-quiz" },
    { icon: <FaMicrophone />, name: "Voice Learning", path: "/voice-learning" },
    { icon: <FaLanguage />, name: "Multi Language", path: "/multi-language" },
    { icon: <FaFilePdf />, name: "PDF Learning", path: "/pdf-learning" },
    { icon: <FaStickyNote />, name: "AI Notes", path: "/ai-notes" },
    { icon: <FaClone />, name: "Flash Cards", path: "/flashcards" },,
  ];

  return (
    <div
      style={{
        width: collapsed ? "80px" : "250px",
        background: "#111827",
        color: "white",
        height: "100vh",
        padding: "20px",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: collapsed ? "center" : "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        {!collapsed && (
          <h2 style={{ color: "#3B82F6", margin: 0 }}>
            StudyMate AI
          </h2>
        )}

        <FaBars
          style={{ cursor: "pointer" }}
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.path)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            padding: "14px",
            marginBottom: "10px",
            cursor: "pointer",
            borderRadius: "10px",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2563EB";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <span style={{ fontSize: "20px" }}>{item.icon}</span>
          {!collapsed && <span>{item.name}</span>}
        </div>
      ))}

      <div
        style={{
          marginTop: "auto",
          paddingTop: "20px",
        }}
      >
        <div
          onClick={() => {
            localStorage.removeItem("studymate_token");
            navigate("/login");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            cursor: "pointer",
            color: "#F87171",
            padding: "14px",
          }}
        >
          <FaSignOutAlt />
          {!collapsed && "Logout"}
        </div>
      </div>
    </div>
  );
}