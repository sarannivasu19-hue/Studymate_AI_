import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AIChat from "../components/AIChat";

export default function AITutor() {
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

        <main style={{ padding: "26px 32px", flex: 1 }}>
          <div style={{ marginBottom: "20px" }}>
            <h1
              style={{
                margin: "0 0 6px 0",
                fontSize: "24px",
                fontWeight: "800",
                color: "#0F172A",
                letterSpacing: "-0.5px",
              }}
            >
              🤖 Personal AI Tutor
            </h1>
            <p style={{ margin: 0, color: "#64748B", fontSize: "14.5px" }}>
              High-speed study assistance, exam explanations, formula breakdowns, and revision guidance.
            </p>
          </div>

          <AIChat />
        </main>
      </div>
    </div>
  );
}