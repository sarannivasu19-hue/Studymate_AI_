import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import WelcomeBanner from "../components/WelcomeBanner";
import DashboardCard from "../components/DashboardCard";

import {
  FaBook,
  FaRobot,
  FaClipboardCheck,
  FaClock,
} from "react-icons/fa";

function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        background: "#F3F4F6",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1 }}>

        {/* Navbar */}
        <Navbar />

        <div style={{ padding: "30px" }}>

          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Statistics Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: "20px",
              marginTop: "25px",
            }}
          >
            <DashboardCard
              icon={<FaBook />}
              title="Subjects"
              value="6"
              color="#2563EB"
            />

            <DashboardCard
              icon={<FaRobot />}
              title="AI Sessions"
              value="32"
              color="#7C3AED"
            />

            <DashboardCard
              icon={<FaClipboardCheck />}
              title="Quiz Score"
              value="92%"
              color="#10B981"
            />

            <DashboardCard
              icon={<FaClock />}
              title="Study Hours"
              value="156 hrs"
              color="#F59E0B"
            />
          </div>

          {/* Continue Learning */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "25px",
              marginTop: "40px",
            }}
          >
            {/* Learning Progress */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h2>📚 Continue Learning</h2>

              <br />

              <h4>Python Programming</h4>
              <progress value="80" max="100" style={{ width: "100%" }} />

              <br /><br />

              <h4>Machine Learning</h4>
              <progress value="65" max="100" style={{ width: "100%" }} />

              <br /><br />

              <h4>Cloud Computing</h4>
              <progress value="55" max="100" style={{ width: "100%" }} />
            </div>

            {/* Quick Actions */}
            <div
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h2>⚡ Quick Actions</h2>

              <br />

              <button style={{ width: "100%", padding: "10px" }}>
                📄 Upload PDF
              </button>

              <br /><br />

              <button style={{ width: "100%", padding: "10px" }}>
                🤖 AI Tutor
              </button>

              <br /><br />

              <button style={{ width: "100%", padding: "10px" }}>
                🧠 Adaptive Quiz
              </button>

              <br /><br />

              <button style={{ width: "100%", padding: "10px" }}>
                🎤 Voice Learning
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;