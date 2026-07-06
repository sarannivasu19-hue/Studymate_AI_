import { FaFire } from "react-icons/fa";

function WelcomeBanner() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg,#2563EB,#7C3AED)",
        color: "white",
        borderRadius: "20px",
        padding: "30px",
        marginBottom: "25px",
      }}
    >
      <h1>👋 Welcome Back, Saran</h1>

      <p>
        Continue your AI-powered learning journey with StudyMate AI.
      </p>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "20px",
        }}
      >
        <div>
          <FaFire />

          <strong> 15 Day Streak</strong>
        </div>

        <div>

🎯 Today's Goal: 2 Hours

        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;