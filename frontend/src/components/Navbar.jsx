import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getCurrentUser } from "../api/auth";
import { getAiStatus } from "../api/ai";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [aiStatus, setAiStatus] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    getAiStatus()
      .then((data) => setAiStatus(data))
      .catch(() => {});
  }, []);

  return (
    <header
      style={{
        height: "68px",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 32px",
        borderBottom: "1px solid #E2E8F0",
        position: "sticky",
        top: 0,
        zIndex: 40,
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <h2
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "700",
            color: "#0F172A",
            letterSpacing: "-0.3px",
          }}
        >
          StudyMate AI Workspace
        </h2>

        {aiStatus && (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              background: aiStatus.live_gemini ? "#ECFDF5" : "#EFF6FF",
              color: aiStatus.live_gemini ? "#059669" : "#2563EB",
              border: `1px solid ${aiStatus.live_gemini ? "#A7F3D0" : "#BFDBFE"}`,
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: aiStatus.live_gemini ? "#10B981" : "#3B82F6",
                boxShadow: `0 0 8px ${aiStatus.live_gemini ? "#10B981" : "#3B82F6"}`,
              }}
            />
            {aiStatus.live_gemini ? "Gemini Pro Live" : "Fast AI Engine Active"}
          </span>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#F8FAFC",
            padding: "6px 14px",
            borderRadius: "30px",
            border: "1px solid #E2E8F0",
          }}
        >
          <FaUserCircle size={26} color="#64748B" />
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#1E293B",
                lineHeight: "1.2",
              }}
            >
              {user?.full_name || "Student"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748B",
                textTransform: "capitalize",
              }}
            >
              {localStorage.getItem("studymate_role") || "Student"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}