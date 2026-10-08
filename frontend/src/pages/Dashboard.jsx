import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import WelcomeBanner from "../components/WelcomeBanner";
import DashboardCard from "../components/DashboardCard";

import {
  FaBook,
  FaRobot,
  FaClipboardCheck,
  FaClock,
  FaFilePdf,
  FaMicrophone,
  FaStickyNote,
  FaClone,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "AI Tutor",
      desc: "Instant answers & explanations",
      icon: <FaRobot />,
      path: "/ai-tutor",
      color: "#2563EB",
      bg: "#EFF6FF",
    },
    {
      title: "Upload PDF",
      desc: "Extract summaries & flashcards",
      icon: <FaFilePdf />,
      path: "/pdf-learning",
      color: "#7C3AED",
      bg: "#F5F3FF",
    },
    {
      title: "Adaptive Quiz",
      desc: "Test knowledge with AI questions",
      icon: <FaClipboardCheck />,
      path: "/adaptive-quiz",
      color: "#059669",
      bg: "#ECFDF5",
    },
    {
      title: "Study Flashcards",
      desc: "Spaced repetition practice",
      icon: <FaClone />,
      path: "/flashcards",
      color: "#D97706",
      bg: "#FFFBEB",
    },
    {
      title: "AI Notes",
      desc: "Generate structured revision notes",
      icon: <FaStickyNote />,
      path: "/ai-notes",
      color: "#DB2777",
      bg: "#FDF2F8",
    },
    {
      title: "Voice Learning",
      desc: "Speak your questions directly",
      icon: <FaMicrophone />,
      path: "/voice-learning",
      color: "#0284C7",
      bg: "#F0F9FF",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        background: "#F1F5F9",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div style={{ padding: "30px 36px", flex: 1 }}>
          <WelcomeBanner />

          {/* Statistics Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              marginTop: "26px",
            }}
          >
            <DashboardCard
              icon={<FaBook />}
              title="Active Subjects"
              value="6"
              color="#2563EB"
            />
            <DashboardCard
              icon={<FaRobot />}
              title="AI Study Sessions"
              value="32"
              color="#7C3AED"
            />
            <DashboardCard
              icon={<FaClipboardCheck />}
              title="Avg Quiz Score"
              value="92%"
              color="#10B981"
            />
            <DashboardCard
              icon={<FaClock />}
              title="Total Study Time"
              value="156 hrs"
              color="#F59E0B"
            />
          </div>

          {/* Main Grid: Learning Path + Quick Actions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1.2fr",
              gap: "26px",
              marginTop: "32px",
            }}
          >
            {/* Continue Learning */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "26px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                border: "1px solid #E2E8F0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#0F172A",
                  }}
                >
                  📚 Current Courses & Mastery
                </h3>
                <span style={{ fontSize: "12px", color: "#64748B" }}>
                  Updated today
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ fontWeight: "600", fontSize: "14px", color: "#1E293B" }}>
                      Python & Data Structures
                    </span>
                    <span style={{ fontWeight: "700", fontSize: "13px", color: "#2563EB" }}>
                      80%
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      background: "#E2E8F0",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        height: "100%",
                        background: "linear-gradient(90deg, #2563EB, #3B82F6)",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ fontWeight: "600", fontSize: "14px", color: "#1E293B" }}>
                      Machine Learning & Neural Nets
                    </span>
                    <span style={{ fontWeight: "700", fontSize: "13px", color: "#7C3AED" }}>
                      65%
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      background: "#E2E8F0",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "65%",
                        height: "100%",
                        background: "linear-gradient(90deg, #7C3AED, #A855F7)",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ fontWeight: "600", fontSize: "14px", color: "#1E293B" }}>
                      Database Management Systems (DBMS)
                    </span>
                    <span style={{ fontWeight: "700", fontSize: "13px", color: "#059669" }}>
                      55%
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      background: "#E2E8F0",
                      borderRadius: "6px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "55%",
                        height: "100%",
                        background: "linear-gradient(90deg, #059669, #10B981)",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Tutor CTA Banner */}
              <div
                style={{
                  marginTop: "28px",
                  background: "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 100%)",
                  border: "1px solid #DBEAFE",
                  borderRadius: "14px",
                  padding: "16px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h4 style={{ margin: "0 0 4px 0", color: "#1E293B", fontSize: "15px" }}>
                    🤖 Need quick exam prep?
                  </h4>
                  <p style={{ margin: 0, color: "#64748B", fontSize: "13px" }}>
                    Your AI Tutor is available 24/7 with zero latency.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/ai-tutor")}
                  style={{
                    background: "#2563EB",
                    color: "#FFFFFF",
                    border: "none",
                    padding: "9px 18px",
                    borderRadius: "10px",
                    fontWeight: "600",
                    fontSize: "13px",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(37,99,235,0.3)",
                  }}
                >
                  Launch Tutor →
                </button>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "26px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                border: "1px solid #E2E8F0",
              }}
            >
              <h3
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#0F172A",
                }}
              >
                ⚡ Quick Study Actions
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {quickActions.map((action, i) => (
                  <div
                    key={i}
                    onClick={() => navigate(action.path)}
                    style={{
                      background: action.bg,
                      border: `1px solid ${action.color}25`,
                      borderRadius: "14px",
                      padding: "16px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 6px 16px ${action.color}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: action.color,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                      }}
                    >
                      {action.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#1E293B",
                        }}
                      >
                        {action.title}
                      </div>
                      <div
                        style={{
                          fontSize: "11.5px",
                          color: "#64748B",
                          marginTop: "2px",
                          lineHeight: "1.3",
                        }}
                      >
                        {action.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}