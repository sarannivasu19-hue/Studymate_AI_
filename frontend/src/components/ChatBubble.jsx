export default function ChatBubble({
  sender,
  message,
}) {
  const isUser = sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "75%",
          background: isUser ? "#2563EB" : "#ffffff",
          color: isUser ? "white" : "#111827",
          padding: "16px",
          borderRadius: "18px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          whiteSpace: "pre-wrap",
          lineHeight: "1.8",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          {isUser ? "👨 You" : "🤖 StudyMate AI"}
        </div>

        {message}
      </div>
    </div>
  );
}