import { useState } from "react";
import { useDropzone } from "react-dropzone";
import apiClient from "../api/client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaFilePdf, FaCloudUploadAlt, FaBookOpen, FaListAlt, FaClone, FaBrain } from "react-icons/fa";

export default function PDFLearning() {
  const [summary, setSummary] = useState("");
  const [notes, setNotes] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setFileName(file.name);
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await apiClient.post("/api/pdf/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;
      setSummary(data.summary || "");
      setNotes(data.notes || "");

      if (data.flashcards) {
        try {
          const parsed = typeof data.flashcards === "string" ? JSON.parse(data.flashcards) : data.flashcards;
          setFlashcards(parsed.flashcards || []);
        } catch (e) {
          setFlashcards([]);
        }
      }

      if (data.quiz) {
        try {
          const parsedQ = typeof data.quiz === "string" ? JSON.parse(data.quiz) : data.quiz;
          setQuiz(parsedQ.questions || []);
        } catch (e) {
          setQuiz([]);
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.friendlyMessage || "PDF upload failed. Please verify that FastAPI is running.");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    multiple: false,
    onDrop,
  });

  return (
    <div
      style={{
        display: "flex",
        background: "#F1F5F9",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />

        <div style={{ padding: "30px 36px", flex: 1 }}>
          <div style={{ marginBottom: "24px" }}>
            <h1
              style={{
                margin: "0 0 6px 0",
                fontSize: "24px",
                fontWeight: "800",
                color: "#0F172A",
              }}
            >
              📄 AI PDF Learning Studio
            </h1>
            <p style={{ margin: 0, color: "#64748B", fontSize: "14px" }}>
              Upload any syllabus chapter, lecture PDF, or research paper for instant AI summaries, notes, and study cards.
            </p>
          </div>

          {/* Upload Zone */}
          <div
            {...getRootProps()}
            style={{
              border: `2.5px dashed ${isDragActive ? "#2563EB" : "#94A3B8"}`,
              padding: "45px 30px",
              textAlign: "center",
              borderRadius: "20px",
              cursor: "pointer",
              background: isDragActive ? "#EFF6FF" : "#FFFFFF",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
            }}
          >
            <input {...getInputProps()} />

            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#EFF6FF",
                color: "#2563EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                margin: "0 auto 14px auto",
              }}
            >
              <FaCloudUploadAlt />
            </div>

            <h3 style={{ margin: "0 0 6px 0", fontSize: "17px", color: "#1E293B" }}>
              {isDragActive ? "Drop PDF file here..." : "Drag & Drop your PDF file here"}
            </h3>
            <p style={{ margin: 0, color: "#64748B", fontSize: "13px" }}>
              or click to browse your computer (.pdf format supported)
            </p>
          </div>

          {fileName && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px 18px",
                background: "#EFF6FF",
                border: "1px solid #BFDBFE",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#1E40AF",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              <FaFilePdf size={18} />
              <span>Uploaded: {fileName}</span>
            </div>
          )}

          {loading && (
            <div
              style={{
                marginTop: "24px",
                padding: "24px",
                background: "#FFFFFF",
                borderRadius: "16px",
                textAlign: "center",
                border: "1px solid #E2E8F0",
              }}
            >
              <h3 style={{ margin: "0 0 6px 0", color: "#2563EB" }}>
                ⚡ Processing Document with StudyMate AI...
              </h3>
              <p style={{ margin: 0, color: "#64748B", fontSize: "13px" }}>
                Extracting text, analyzing key concepts, generating executive summary and revision cards.
              </p>
            </div>
          )}

          {summary && !loading && (
            <div style={{ marginTop: "28px" }}>
              {/* Tab Navigation */}
              <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                <button
                  onClick={() => setActiveTab("summary")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    border: "none",
                    background: activeTab === "summary" ? "#2563EB" : "#FFFFFF",
                    color: activeTab === "summary" ? "#FFFFFF" : "#475569",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <FaBookOpen size={14} /> Executive Summary
                </button>

                <button
                  onClick={() => setActiveTab("notes")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    borderRadius: "10px",
                    border: "none",
                    background: activeTab === "notes" ? "#2563EB" : "#FFFFFF",
                    color: activeTab === "notes" ? "#FFFFFF" : "#475569",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <FaListAlt size={14} /> Full Notes
                </button>

                {flashcards.length > 0 && (
                  <button
                    onClick={() => setActiveTab("cards")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      borderRadius: "10px",
                      border: "none",
                      background: activeTab === "cards" ? "#2563EB" : "#FFFFFF",
                      color: activeTab === "cards" ? "#FFFFFF" : "#475569",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    <FaClone size={14} /> Flashcards ({flashcards.length})
                  </button>
                )}
              </div>

              {/* Tab Content Card */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "28px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                  border: "1px solid #E2E8F0",
                }}
              >
                {activeTab === "summary" && (
                  <div>
                    <h2 style={{ margin: "0 0 16px 0", color: "#0F172A", fontSize: "20px" }}>
                      📚 Document Summary
                    </h2>
                    <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#334155", fontSize: "15px" }}>
                      {summary}
                    </div>
                  </div>
                )}

                {activeTab === "notes" && (
                  <div>
                    <h2 style={{ margin: "0 0 16px 0", color: "#0F172A", fontSize: "20px" }}>
                      📝 Comprehensive Notes
                    </h2>
                    <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#334155", fontSize: "15px" }}>
                      {notes || summary}
                    </div>
                  </div>
                )}

                {activeTab === "cards" && (
                  <div>
                    <h2 style={{ margin: "0 0 16px 0", color: "#0F172A", fontSize: "20px" }}>
                      🃏 AI Flashcards
                    </h2>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "16px",
                      }}
                    >
                      {flashcards.map((card, i) => (
                        <div
                          key={i}
                          style={{
                            background: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "14px",
                            padding: "18px",
                          }}
                        >
                          <div style={{ fontSize: "12px", color: "#2563EB", fontWeight: "700", marginBottom: "6px" }}>
                            CARD #{i + 1}
                          </div>
                          <div style={{ fontWeight: "700", fontSize: "14.5px", color: "#0F172A", marginBottom: "8px" }}>
                            {card.front}
                          </div>
                          <div style={{ fontSize: "13.5px", color: "#475569", lineHeight: "1.5" }}>
                            {card.back}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}