import { useState, useEffect, useRef } from "react";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaCopy,
  FaCheck,
  FaTrash,
  FaDownload,
  FaBolt,
  FaKey,
  FaVolumeUp,
} from "react-icons/fa";
import { askAiChat, getAiStatus, setGeminiApiKey } from "../api/ai";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "👋 Hello! I am your **StudyMate AI Tutor**.\n\nAsk me anything about your syllabus, homework, programming, mathematics, or exam preparation. What would you like to master today?",
      latency: null,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [aiStatus, setAiStatus] = useState(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKeyInput, setCustomKeyInput] = useState("");
  const [keySaveMsg, setKeySaveMsg] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      const data = await getAiStatus();
      setAiStatus(data);
    } catch (e) {
      console.warn("Failed to get AI status", e);
    }
  };

  const quickPrompts = [
    "Explain Machine Learning vs Deep Learning",
    "Python OOP: Classes & Inheritance with code",
    "Calculus: Chain Rule & Derivative examples",
    "ACID Properties in DBMS with simple examples",
    "Binary Search: Step-by-Step logic & Big-O",
    "Top 5 High-Yield Exam Preparation Hacks",
  ];

  const handleSend = async (textToSend = null) => {
    const text = (textToSend || question).trim();
    if (!text || loading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: text,
        timestamp: timeStr,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const data = await askAiChat(text);

      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: data.response || "No response received.",
          latency: data.latency_ms,
          model: data.model,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (error) {
      console.error("AI Error:", error);
      const friendly = error.friendlyMessage || "Unable to reach StudyMate AI backend.";
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: `⚠️ **Connection Note:** ${friendly}\n\nPlease check that the FastAPI server is running.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSpeak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    // Clean markdown before speaking
    const cleanText = text.replace(/[#*`_$\n]/g, " ");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleClear = () => {
    if (window.confirm("Clear current conversation?")) {
      setMessages([
        {
          sender: "AI",
          text: "Chat cleared! What new topic would you like to study?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  };

  const handleExport = () => {
    const chatText = messages
      .map((m) => `[${m.timestamp}] ${m.sender}:\n${m.text}\n`)
      .join("\n------------------------------------\n\n");
    const blob = new Blob([chatText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `StudyMate_Notes_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
  };

  const handleSaveApiKey = async () => {
    if (!customKeyInput.trim()) return;
    try {
      const res = await setGeminiApiKey(customKeyInput.trim());
      setKeySaveMsg(res.message);
      loadStatus();
      setTimeout(() => {
        setKeySaveMsg("");
        setShowKeyModal(false);
      }, 1500);
    } catch (e) {
      setKeySaveMsg("Failed to update API key.");
    }
  };

  // Helper to format text with code blocks and headings
  const renderMessageContent = (content) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, i) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        const language = lines[0].match(/^[a-zA-Z0-9_-]+$/) ? lines[0] : "";
        const code = language ? lines.slice(1).join("\n") : lines.join("\n");

        return (
          <div
            key={i}
            style={{
              margin: "12px 0",
              background: "#0F172A",
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #334155",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "6px 14px",
                background: "#1E293B",
                color: "#94A3B8",
                fontSize: "12px",
                fontFamily: "monospace",
              }}
            >
              <span>{language || "code"}</span>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#38BDF8",
                  cursor: "pointer",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FaCopy size={12} /> Copy
              </button>
            </div>
            <pre
              style={{
                margin: 0,
                padding: "14px",
                color: "#38BDF8",
                fontFamily: "Consolas, Menlo, Monaco, monospace",
                fontSize: "13.5px",
                lineHeight: "1.6",
                overflowX: "auto",
              }}
            >
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      // Format bullet points and bolding simply
      const formattedLines = part.split("\n").map((line, idx) => {
        if (line.startsWith("### ")) {
          return (
            <h3 key={idx} style={{ color: "#1E293B", margin: "14px 0 6px 0", fontSize: "17px", fontWeight: "700" }}>
              {line.replace("### ", "")}
            </h3>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h2 key={idx} style={{ color: "#1E293B", margin: "16px 0 8px 0", fontSize: "19px", fontWeight: "700" }}>
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("# ")) {
          return (
            <h1 key={idx} style={{ color: "#1E293B", margin: "18px 0 10px 0", fontSize: "21px", fontWeight: "800" }}>
              {line.replace("# ", "")}
            </h1>
          );
        }
        if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
          return (
            <li key={idx} style={{ margin: "4px 0", paddingLeft: "4px" }}>
              {line.trim().replace(/^[-*]\s*/, "")}
            </li>
          );
        }
        return (
          <p key={idx} style={{ margin: "6px 0", lineHeight: "1.65" }}>
            {line}
          </p>
        );
      });

      return <div key={i}>{formattedLines}</div>;
    });
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
        border: "1px solid #E2E8F0",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 180px)",
        minHeight: "550px",
        overflow: "hidden",
      }}
    >
      {/* Tutor Topbar */}
      <div
        style={{
          padding: "16px 24px",
          background: "linear-gradient(90deg, #F8FAFC 0%, #FFFFFF 100%)",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "20px",
            }}
          >
            <FaRobot />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#0F172A" }}>
                StudyMate AI Tutor
              </h3>
              <span
                style={{
                  background: "#EFF6FF",
                  color: "#2563EB",
                  border: "1px solid #BFDBFE",
                  padding: "2px 8px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: "700",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FaBolt size={10} color="#2563EB" /> Ultra-Fast
              </span>
            </div>
            <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#64748B" }}>
              {aiStatus?.active_model || "High-Speed AI Study Engine"}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setShowKeyModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#F1F5F9",
              border: "1px solid #CBD5E1",
              color: "#334155",
              padding: "7px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12.5px",
              fontWeight: "600",
            }}
            title="Configure Gemini API Key"
          >
            <FaKey size={12} color="#64748B" /> API Key
          </button>

          <button
            onClick={handleExport}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#F1F5F9",
              border: "1px solid #CBD5E1",
              color: "#334155",
              padding: "7px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12.5px",
              fontWeight: "600",
            }}
            title="Export chat as study notes"
          >
            <FaDownload size={12} color="#64748B" /> Export
          </button>

          <button
            onClick={handleClear}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              color: "#EF4444",
              padding: "7px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12.5px",
              fontWeight: "600",
            }}
            title="Clear Chat"
          >
            <FaTrash size={12} /> Clear
          </button>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "16px",
              padding: "26px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", color: "#0F172A", fontSize: "18px" }}>
              🔑 Configure Gemini API Key
            </h3>
            <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#64748B", lineHeight: "1.5" }}>
              StudyMate AI includes an ultra-fast built-in study brain that works offline and instantly. If you
              wish to connect directly to Google's live Gemini 2.0 Flash API, enter your Gemini API key below:
            </p>

            <input
              type="password"
              placeholder="AIzaSy..."
              value={customKeyInput}
              onChange={(e) => setCustomKeyInput(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #CBD5E1",
                fontSize: "14px",
                marginBottom: "14px",
                fontFamily: "monospace",
              }}
            />

            {keySaveMsg && (
              <p style={{ fontSize: "13px", color: "#10B981", margin: "0 0 12px 0", fontWeight: "600" }}>
                {keySaveMsg}
              </p>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              <button
                onClick={() => setShowKeyModal(false)}
                style={{
                  background: "#F1F5F9",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#475569",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                style={{
                  background: "#2563EB",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                Save & Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Scrollable Container */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          background: "#FAFAFA",
        }}
      >
        {messages.map((msg, index) => {
          const isAI = msg.sender === "AI";

          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isAI ? "flex-start" : "flex-end",
                maxWidth: "85%",
                alignSelf: isAI ? "flex-start" : "flex-end",
              }}
            >
              {/* Message Header info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "6px",
                  fontSize: "12px",
                  color: "#64748B",
                  padding: "0 4px",
                }}
              >
                <span style={{ fontWeight: "700", color: isAI ? "#2563EB" : "#0F172A" }}>
                  {isAI ? "🤖 StudyMate AI" : "👤 You"}
                </span>
                <span>• {msg.timestamp}</span>
                {msg.latency !== null && msg.latency !== undefined && (
                  <span
                    style={{
                      background: "#EFF6FF",
                      color: "#1D4ED8",
                      padding: "1px 6px",
                      borderRadius: "10px",
                      fontSize: "10.5px",
                      fontWeight: "700",
                    }}
                  >
                    ⚡ {msg.latency} ms
                  </span>
                )}
              </div>

              {/* Message Bubble Card */}
              <div
                style={{
                  background: isAI ? "#FFFFFF" : "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                  color: isAI ? "#1E293B" : "#FFFFFF",
                  padding: isAI ? "18px 22px" : "14px 18px",
                  borderRadius: isAI ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
                  boxShadow: isAI
                    ? "0 4px 14px rgba(0,0,0,0.05)"
                    : "0 4px 14px rgba(37,99,235,0.3)",
                  border: isAI ? "1px solid #E2E8F0" : "none",
                  fontSize: "14.5px",
                  width: "100%",
                  wordBreak: "break-word",
                }}
              >
                {isAI ? renderMessageContent(msg.text) : msg.text}
              </div>

              {/* Action Toolbar for AI responses */}
              {isAI && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginTop: "6px",
                    padding: "0 6px",
                  }}
                >
                  <button
                    onClick={() => handleCopy(msg.text, index)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: copiedIndex === index ? "#10B981" : "#64748B",
                      cursor: "pointer",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "4px 0",
                    }}
                  >
                    {copiedIndex === index ? <FaCheck size={11} /> : <FaCopy size={11} />}
                    {copiedIndex === index ? "Copied" : "Copy"}
                  </button>

                  <button
                    onClick={() => handleSpeak(msg.text)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#64748B",
                      cursor: "pointer",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "4px 0",
                    }}
                  >
                    <FaVolumeUp size={11} /> Read Aloud
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#FFFFFF",
              border: "1px solid #E2E8F0",
              padding: "14px 18px",
              borderRadius: "4px 18px 18px 18px",
              width: "fit-content",
              boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            }}
          >
            <FaRobot color="#2563EB" size={18} />
            <span style={{ fontSize: "14px", color: "#64748B", fontWeight: "500" }}>
              ⚡ StudyMate AI is generating high-yield explanation...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div
        style={{
          padding: "10px 20px",
          background: "#FFFFFF",
          borderTop: "1px solid #F1F5F9",
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={loading}
            style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              color: "#334155",
              padding: "6px 12px",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#EFF6FF";
              e.currentTarget.style.borderColor = "#93C5FD";
              e.currentTarget.style.color = "#1D4ED8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F8FAFC";
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.color = "#334155";
            }}
          >
            💡 {prompt}
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <div
        style={{
          padding: "16px 20px",
          background: "#FFFFFF",
          borderTop: "1px solid #E2E8F0",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Ask a question, formula, code problem, or concept..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={loading}
          style={{
            flex: 1,
            padding: "14px 18px",
            borderRadius: "12px",
            border: "1.5px solid #CBD5E1",
            fontSize: "15px",
            outline: "none",
            transition: "border 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
          onBlur={(e) => (e.target.style.borderColor = "#CBD5E1")}
        />

        <button
          onClick={() => handleSend()}
          disabled={loading || !question.trim()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 24px",
            background: loading || !question.trim() ? "#94A3B8" : "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "12px",
            cursor: loading || !question.trim() ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "15px",
            boxShadow: loading || !question.trim() ? "none" : "0 4px 14px rgba(37,99,235,0.35)",
            transition: "all 0.2s",
          }}
        >
          <FaPaperPlane size={14} /> Send
        </button>
      </div>
    </div>
  );
}