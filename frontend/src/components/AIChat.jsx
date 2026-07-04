import { useState } from "react";
import axios from "axios";

function AIChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    console.log("Send button clicked");

    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      console.log("Sending:", userQuestion);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/ai/chat",
        {
          message: userQuestion,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: response.data.response,
        },
      ]);
    } catch (error) {
      console.error(error);

      let errorMessage = "Unable to connect to AI.";

      if (error.response) {
        errorMessage =
          error.response.data.detail ||
          JSON.stringify(error.response.data);
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          height: "350px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <strong>{msg.sender}</strong>
            <p>{msg.text}</p>
          </div>
        ))}

        {loading && <p><strong>AI:</strong> Thinking...</p>}
      </div>

      <input
        type="text"
        placeholder="Ask anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
        style={{
          width: "75%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginLeft: "10px",
          padding: "12px 20px",
          background: "#2563EB",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default AIChat;