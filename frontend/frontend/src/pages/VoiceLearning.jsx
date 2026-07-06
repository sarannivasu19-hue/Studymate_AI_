import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import VoiceRecorder from "../components/VoiceRecorder";
import { askVoiceAI } from "../services/voiceApi";

export default function VoiceLearning() {
  const [language, setLanguage] = useState("English");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleVoice(questionText) {
    setQuestion(questionText);
    setLoading(true);

    try {
      // Get AI answer only (No AI Speech)
      const result = await askVoiceAI(
        questionText,
        language
      );

      setAnswer(result.answer);

    } catch (err) {
      console.error(err);
      alert("Unable to get AI response.");
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F3F4F6",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Navbar />

        <div
          style={{
            maxWidth: "900px",
            margin: "30px auto",
            padding: "20px",
          }}
        >
          <h1 style={{ color: "#2563EB" }}>
            🎤 AI Voice Tutor
          </h1>

          <p style={{ color: "#6B7280" }}>
            Ask your question by voice. StudyMate AI will understand your speech
            and display the answer in your selected language.
          </p>

          <br />

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            style={{
              width: "250px",
              padding: "12px",
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
          </select>

          <br /><br />

          <VoiceRecorder
            language={language}
            onResult={handleVoice}
          />

          {question && (
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                marginTop: "20px",
                boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              }}
            >
              <h3>🎤 Your Question</h3>
              <p>{question}</p>
            </div>
          )}

          <br />

          {loading && (
            <h3 style={{ textAlign: "center" }}>
              🤖 StudyMate AI is thinking...
            </h3>
          )}

          {answer && (
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0,0,0,.08)",
              }}
            >
              <h3>🤖 AI Answer ({language})</h3>

              <p
                style={{
                  lineHeight: "1.8",
                  whiteSpace: "pre-wrap",
                }}
              >
                {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}