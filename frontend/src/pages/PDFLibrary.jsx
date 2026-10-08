import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { FaFilePdf, FaTrash, FaBookOpen, FaFolderPlus } from "react-icons/fa";

export default function PDFLibrary() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadPDFs();
  }, []);

  const loadPDFs = async () => {
    try {
      const res = await apiClient.get("/api/library/my-pdfs");
      setPdfs(res.data);
    } catch (err) {
      console.warn("Unable to load PDFs:", err);
    } finally {
      setLoading(false);
    }
  };

  const deletePDF = async (id) => {
    if (!window.confirm("Are you sure you want to remove this PDF from your library?")) return;

    try {
      await apiClient.delete(`/api/library/${id}`);
      loadPDFs();
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "26px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: "0 0 6px 0",
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#0F172A",
                }}
              >
                📚 My Study PDF Library
              </h1>
              <p style={{ margin: 0, color: "#64748B", fontSize: "14px" }}>
                Access and review your previously uploaded textbook chapters and notes.
              </p>
            </div>

            <button
              onClick={() => navigate("/pdf-learning")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#2563EB",
                color: "#FFFFFF",
                border: "none",
                padding: "10px 18px",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(37,99,235,0.25)",
              }}
            >
              <FaFolderPlus size={15} /> Upload New PDF
            </button>
          </div>

          {loading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#64748B" }}>
              Loading your study library...
            </div>
          ) : pdfs.length === 0 ? (
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                padding: "60px 20px",
                textAlign: "center",
                border: "1px dashed #CBD5E1",
                maxWidth: "600px",
                margin: "40px auto",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#EFF6FF",
                  color: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                  margin: "0 auto 16px auto",
                }}
              >
                <FaFilePdf />
              </div>
              <h3 style={{ margin: "0 0 8px 0", color: "#0F172A", fontSize: "18px" }}>
                No PDFs uploaded yet
              </h3>
              <p style={{ color: "#64748B", fontSize: "14px", marginBottom: "20px" }}>
                Upload textbooks, lecture slides, or revision notes to generate automatic flashcards and quizzes.
              </p>
              <button
                onClick={() => navigate("/pdf-learning")}
                style={{
                  background: "#2563EB",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Upload First Document
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "20px",
              }}
            >
              {pdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "22px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    border: "1px solid #E2E8F0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: "#FEE2E2",
                        color: "#DC2626",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "22px",
                        flexShrink: 0,
                      }}
                    >
                      <FaFilePdf />
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      <h4
                        style={{
                          margin: "0 0 4px 0",
                          fontSize: "15px",
                          fontWeight: "700",
                          color: "#1E293B",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {pdf.filename}
                      </h4>
                      <p style={{ margin: 0, fontSize: "12px", color: "#64748B" }}>
                        Uploaded {new Date(pdf.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "20px",
                      paddingTop: "14px",
                      borderTop: "1px solid #F1F5F9",
                    }}
                  >
                    <button
                      onClick={() => navigate("/pdf-learning")}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        background: "#EFF6FF",
                        color: "#2563EB",
                        border: "1px solid #BFDBFE",
                        padding: "7px 14px",
                        borderRadius: "8px",
                        fontSize: "12.5px",
                        fontWeight: "600",
                        cursor: "pointer",
                      }}
                    >
                      <FaBookOpen size={12} /> View Study Cards
                    </button>

                    <button
                      onClick={() => deletePDF(pdf.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#EF4444",
                        cursor: "pointer",
                        padding: "6px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "12.5px",
                      }}
                      title="Delete document"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}