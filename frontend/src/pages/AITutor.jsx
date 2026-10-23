import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AIChat from "../components/AIChat";

function AITutor() {
  return (
    <div
      style={{
        display: "flex",
        background: "#F3F4F6",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div
          style={{
            padding: "30px",
            maxWidth: "1100px",
            width: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          <h1 style={{ color: "#2563EB", margin: 0 }}>🤖 AI Tutor</h1>

          <p style={{ color: "#6B7280", marginTop: "6px", marginBottom: "20px" }}>
            Ask any study-related question and StudyMate AI will provide structured, step-by-step guidance.
          </p>

          <AIChat />
        </div>
      </div>
    </div>
  );
}

export default AITutor;