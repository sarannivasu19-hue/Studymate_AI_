import MarkdownRenderer from "./MarkdownRenderer";

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
          maxWidth: "85%",
          background: isUser ? "#2563EB" : "#ffffff",
          color: isUser ? "white" : "#111827",
          padding: "16px 20px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          border: isUser ? "none" : "1px solid #E5E7EB",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            marginBottom: "8px",
            color: isUser ? "#FFFFFF" : "#14213D",
          }}
        >
          {isUser ? "👨 You" : "🤖 StudyMate AI"}
        </div>

        {isUser ? (
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
            {message}
          </div>
        ) : (
          <MarkdownRenderer content={message} />
        )}
      </div>
    </div>
  );
}