import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChatBubble from "../components/ChatBubble";
import { askAI } from "../services/languageApi";

export default function MultiLanguage() {
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("English");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleAskAI() {
    if (!question.trim()) {
      alert("Please enter your question.");
      return;
    }

    const userQuestion = question;

    setQuestion("");
    setLoading(true);

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: userQuestion,
      },
    ]);

    try {
      const result = await askAI(userQuestion, language);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: result.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: "Unable to get AI response.",
        },
      ]);
    }

    setLoading(false);
  }

  function clearChat() {
    setMessages([]);
    setQuestion("");
  }

  return (
    <div
      style={{
        display: "flex",
        background: "#F3F4F6",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div
          style={{
            padding: "30px",
            maxWidth: "1100px",
            margin: "auto",
          }}
        >
          <h1 style={{ color: "#2563EB" }}>
            🌍 StudyMate AI Tutor
          </h1>

          <p style={{ color: "#6B7280" }}>
            Ask any question and receive the answer in your selected language.
          </p>

          <br />

          <textarea
            rows={4}
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              fontSize: "16px",
            }}
          />

          <br />
          <br />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              padding: "12px",
              width: "250px",
              borderRadius: "10px",
            }}
          >
            <option>English</option>
            <option>Tamil</option>
            <option>Hindi</option>
            <option>Telugu</option>
            <option>Malayalam</option>
            <option>Kannada</option>
            <option>French</option>
            <option>German</option>
            <option>Spanish</option>
            <option>Japanese</option>
            <option>Chinese</option>
          </select>

          <br />
          <br />

          <button
            onClick={handleAskAI}
            disabled={loading}
            style={{
              background: "#2563EB",
              color: "white",
              border: "none",
              padding: "12px 30px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            {loading ? "🤖 Thinking..." : "🤖 Ask AI"}
          </button>

          <button
            onClick={clearChat}
            style={{
              marginLeft: "15px",
              background: "#EF4444",
              color: "white",
              border: "none",
              padding: "12px 30px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            🗑 Clear
          </button>

          <br />
          <br />

          <div
            style={{
              background: "#F9FAFB",
              borderRadius: "20px",
              padding: "25px",
              minHeight: "450px",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >
            {messages.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "150px",
                  color: "#6B7280",
                }}
              >
                <h2>🤖 StudyMate AI</h2>

                <p>Start asking questions.</p>

                <p>
                  AI will answer in your selected language.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  sender={msg.sender}
                  message={msg.message}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}