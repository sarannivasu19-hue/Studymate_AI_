import AIChat from "../components/AIChat";

function AITutor() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>🤖 AI Tutor</h1>

      <p>
        Ask any study-related question and StudyMate AI will help you.
      </p>

      <AIChat />
    </div>
  );
}

export default AITutor;