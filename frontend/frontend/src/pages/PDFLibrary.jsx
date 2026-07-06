import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function PDFLibrary() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("studymate_token");

  useEffect(() => {
    loadPDFs();
  }, []);

  const loadPDFs = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/library/my-pdfs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPdfs(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load PDFs");
    }

    setLoading(false);
  };

  const deletePDF = async (id) => {
    if (!window.confirm("Delete this PDF?")) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/library/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadPDFs();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

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
          <h1>📚 My PDF Library</h1>

          <br />

          {loading ? (
            <h3>Loading...</h3>
          ) : pdfs.length === 0 ? (
            <h3>No PDFs uploaded.</h3>
          ) : (
            pdfs.map((pdf) => (
              <div
                key={pdf.id}
                style={{
                  background: "white",
                  padding: 20,
                  borderRadius: 15,
                  marginBottom: 20,
                  boxShadow: "0 5px 15px rgba(0,0,0,.1)",
                }}
              >
                <h3>📄 {pdf.filename}</h3>

                <p>ID : {pdf.id}</p>

                <p>Uploaded : {pdf.uploaded_at}</p>

                <button
                  style={{ marginRight: 10 }}
                  onClick={() => alert("Open PDF feature coming next")}
                >
                  Open
                </button>

                <button
                  style={{ marginRight: 10 }}
                  onClick={() => alert("Summary page coming next")}
                >
                  Summary
                </button>

                <button
                  style={{ marginRight: 10 }}
                  onClick={() => alert("Notes page coming next")}
                >
                  Notes
                </button>

                <button
                  style={{ marginRight: 10 }}
                  onClick={() => alert("Quiz page coming next")}
                >
                  Quiz
                </button>

                <button
                  style={{
                    background: "red",
                    color: "white",
                  }}
                  onClick={() => deletePDF(pdf.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PDFLibrary;