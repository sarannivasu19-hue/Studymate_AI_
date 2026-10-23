import { useState, useRef, useEffect } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const abortControllerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    "What is Python?",
    "Explain Python step by step.",
    "Write a Python program to check if a number is prime and explain how it works.",
  ];

  const stopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  const copyResponse = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sendMessage = async (overridePrompt) => {
    const textToSend = (overridePrompt || question).trim();

    if (!textToSend) {
      alert("Please enter a question.");
      return;
    }

    if (loading) {
      return;
    }

    // Append user question
    const updatedMessages = [
      ...messages,
      {
        sender: "You",
        text: textToSend,
      },
    ];

    setMessages(updatedMessages);
    setQuestion("");
    setLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
    const controller = new AbortController();
    abortControllerRef.current = controller;

    // Create an empty AI message placeholder to stream into
    const aiMessageIndex = updatedMessages.length;
    setMessages((prev) => [
      ...prev,
      {
        sender: "AI",
        text: "",
        isStreaming: true,
      },
    ]);

    let accumulatedText = "";

    try {
      const response = await fetch(`${apiUrl}/api/ai/chat/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textToSend }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;

          const dataPayload = trimmed.replace(/^data:\s*/, "");
          if (dataPayload === "[DONE]") {
            break;
          }

          try {
            const parsed = JSON.parse(dataPayload);
            if (parsed.text) {
              accumulatedText += parsed.text;
              setMessages((prev) => {
                const next = [...prev];
                if (next[aiMessageIndex]) {
                  next[aiMessageIndex] = {
                    ...next[aiMessageIndex],
                    text: accumulatedText,
                  };
                }
                return next;
              });
            } else if (parsed.error) {
              accumulatedText += `\n\n*Error: ${parsed.error}*`;
              setMessages((prev) => {
                const next = [...prev];
                if (next[aiMessageIndex]) {
                  next[aiMessageIndex] = {
                    ...next[aiMessageIndex],
                    text: accumulatedText,
                  };
                }
                return next;
              });
            }
          } catch {
            // Incomplete JSON or non-JSON chunk, skip
          }
        }
      }

      // If streaming produced no tokens, fall back to synchronous endpoint
      if (!accumulatedText.trim()) {
        const fallbackRes = await fetch(`${apiUrl}/api/ai/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: textToSend }),
          signal: controller.signal,
        });
        const fallbackData = await fallbackRes.json();
        accumulatedText = fallbackData.response || "No response received.";
        setMessages((prev) => {
          const next = [...prev];
          if (next[aiMessageIndex]) {
            next[aiMessageIndex] = {
              sender: "AI",
              text: accumulatedText,
              isStreaming: false,
            };
          }
          return next;
        });
      }
    } catch (error) {
      if (error.name === "AbortError") {
        accumulatedText += " *(Response paused)*";
      } else {
        console.error("AI chat error:", error);
        accumulatedText =
          accumulatedText ||
          `Unable to connect to StudyMate AI. (${error.message || "Network error"})`;
      }

      setMessages((prev) => {
        const next = [...prev];
        if (next[aiMessageIndex]) {
          next[aiMessageIndex] = {
            sender: "AI",
            text: accumulatedText,
            isStreaming: false,
          };
        }
        return next;
      });
    } finally {
      setMessages((prev) => {
        const next = [...prev];
        if (next[aiMessageIndex]) {
          next[aiMessageIndex] = {
            ...next[aiMessageIndex],
            isStreaming: false,
          };
        }
        return next;
      });
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const clearChat = () => {
    stopGenerating();
    setMessages([]);
    setQuestion("");
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        padding: "24px",
        borderRadius: "18px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.07)",
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 180px)",
        minHeight: "560px",
        maxHeight: "850px",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "14px",
          borderBottom: "1px solid #E5E7EB",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: loading ? "#F59E0B" : "#10B981",
              boxShadow: loading
                ? "0 0 8px rgba(245, 158, 11, 0.6)"
                : "0 0 8px rgba(16, 185, 129, 0.6)",
            }}
          />
          <span style={{ fontWeight: 600, color: "#14213D", fontSize: "15px" }}>
            StudyMate Interactive Tutor
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "#6B7280",
              background: "#F3F4F6",
              padding: "2px 8px",
              borderRadius: "12px",
            }}
          >
            Real-time Streaming
          </span>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearChat}
            type="button"
            style={{
              background: "transparent",
              color: "#EF4444",
              border: "1px solid #FCA5A5",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Clear Conversation
          </button>
        )}
      </div>

      {/* Messages Scroll Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 14px",
          background: "#F8FAFC",
          borderRadius: "14px",
          border: "1px solid #E2E8F0",
          marginBottom: "16px",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#6B7280",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: "42px", marginBottom: "12px" }}>💡</div>
            <h3 style={{ color: "#14213D", marginBottom: "8px", fontSize: "1.2rem" }}>
              How can StudyMate AI help you today?
            </h3>
            <p style={{ maxWidth: "480px", fontSize: "14px", lineHeight: "1.6" }}>
              Ask any educational question or concept. Answers will be structured with
              clear definitions, bullet points, step-by-step explanations, and code examples.
            </p>

            <div
              style={{
                marginTop: "24px",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                justifyContent: "center",
                maxWidth: "600px",
              }}
            >
              {quickPrompts.map((promptText, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendMessage(promptText)}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #CBD5E1",
                    color: "#2563EB",
                    padding: "8px 14px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#2563EB";
                    e.currentTarget.style.background = "#EFF6FF";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#CBD5E1";
                    e.currentTarget.style.background = "#FFFFFF";
                  }}
                >
                  ✨ {promptText}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.sender === "You";
            return (
              <div
                key={index}
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isUser ? "flex-end" : "flex-start",
                }}
              >
                {/* Sender badge */}
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: isUser ? "#2563EB" : "#14213D",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>{isUser ? "👨 Student" : "🤖 StudyMate AI"}</span>
                  {msg.isStreaming && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#2563EB",
                        animation: "pulse 1.2s infinite",
                      }}
                    />
                  )}
                </div>

                {/* Message Container */}
                <div
                  style={{
                    maxWidth: isUser ? "75%" : "92%",
                    width: isUser ? "auto" : "100%",
                    background: isUser ? "#2563EB" : "#FFFFFF",
                    color: isUser ? "#FFFFFF" : "#1F2937",
                    padding: "16px 20px",
                    borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    boxShadow: isUser
                      ? "0 4px 12px rgba(37, 99, 235, 0.25)"
                      : "0 4px 16px rgba(0, 0, 0, 0.06)",
                    border: isUser ? "none" : "1px solid #E5E7EB",
                    wordBreak: "break-word",
                  }}
                >
                  {isUser ? (
                    <div style={{ fontSize: "15px", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                      {msg.text}
                    </div>
                  ) : (
                    <div>
                      {msg.text ? (
                        <MarkdownRenderer content={msg.text} />
                      ) : (
                        <div style={{ color: "#9CA3AF", fontStyle: "italic", fontSize: "14px" }}>
                          Thinking and formulating response...
                        </div>
                      )}

                      {/* Action footer for AI messages */}
                      {msg.text && !msg.isStreaming && (
                        <div
                          style={{
                            marginTop: "12px",
                            paddingTop: "8px",
                            borderTop: "1px solid #F1F5F9",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => copyResponse(msg.text, index)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: copiedIndex === index ? "#10B981" : "#6B7280",
                              fontSize: "12px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            {copiedIndex === index ? "✓ Copied" : "📋 Copy Answer"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input / Control Bar */}
      <div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Ask anything... (e.g., 'What is Python?', 'Explain OOP concepts')"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            disabled={loading}
            style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: "12px",
              border: "1.5px solid #CBD5E1",
              fontSize: "15px",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
            }}
          />

          {loading ? (
            <button
              type="button"
              onClick={stopGenerating}
              style={{
                padding: "14px 24px",
                background: "#EF4444",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "14px",
                boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
              }}
            >
              ⏹ Stop
            </button>
          ) : (
            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={!question.trim()}
              style={{
                padding: "14px 26px",
                background: !question.trim() ? "#93C5FD" : "#2563EB",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "12px",
                cursor: !question.trim() ? "not-allowed" : "pointer",
                fontWeight: 600,
                fontSize: "15px",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
              }}
            >
              Send 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}