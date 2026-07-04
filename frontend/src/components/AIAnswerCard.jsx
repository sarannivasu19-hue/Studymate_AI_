export default function AIAnswerCard({
  question,
  answer,
  language,
  onCopy,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "25px",
        marginTop: "25px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          borderRadius: "12px",
          background: "#EEF4FF",
        }}
      >
        <h3 style={{ margin: 0 }}>👨 Student</h3>

        <p
          style={{
            marginTop: "10px",
            whiteSpace: "pre-wrap",
          }}
        >
          {question}
        </p>
      </div>

      <div
        style={{
          padding: "15px",
          borderRadius: "12px",
          background: "#F9FAFB",
        }}
      >
        <h3 style={{ margin: 0 }}>
          🤖 StudyMate AI ({language})
        </h3>

        <div
          style={{
            marginTop: "15px",
            lineHeight: "1.8",
            whiteSpace: "pre-wrap",
          }}
        >
          {answer}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <button
          onClick={onCopy}
          style={{
            background: "#10B981",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          📋 Copy
        </button>

        <button
          disabled
          style={{
            background: "#E5E7EB",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
          }}
        >
          🔊 Listen (Coming Soon)
        </button>
      </div>
    </div>
  );
}