import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { generateNotes } from "../services/notesApi";

export default function AINotes() {
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);

    try {
      const data = await generateNotes(topic);
      setNotes(data.notes);
    } catch (err) {
      console.error(err);
      alert("Unable to generate notes.");
    }

    setLoading(false);
  }

  function copyNotes() {
    navigator.clipboard.writeText(notes);
    alert("Notes copied successfully!");
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

        <div style={{ padding: 30 }}>

          <h1>📝 AI Notes Generator</h1>

          <br />

          <input
            type="text"
            placeholder="Enter Topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={{
              width: "60%",
              padding: 12,
              fontSize: 16,
              borderRadius: 10,
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={handleGenerate}
            style={{
              marginLeft: 15,
              padding: "12px 25px",
              background: "#2563EB",
              color: "white",
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            {loading ? "Generating..." : "Generate Notes"}
          </button>

          <br />
          <br />

          <div
            style={{
              background: "white",
              padding: 25,
              borderRadius: 15,
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            }}
          >
            <h2>📚 AI Generated Notes</h2>

            <hr />

            <div
              style={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.8,
                minHeight: 250,
              }}
            >
              {notes || "Generated notes will appear here..."}
            </div>

            {notes && (
              <>
                <br />

                <button
                  onClick={copyNotes}
                  style={{
                    padding: "10px 20px",
                    background: "#10B981",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  📋 Copy Notes
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}