import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function PDFLearning() {
  const [summary, setSummary] = useState("");
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

      const response = await axios.post(
        "http://127.0.0.1:8000/api/pdf/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
      alert("PDF upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div style={{ padding: "30px" }}>
      <h1>📄 AI PDF Learning</h1>

      <div
        {...getRootProps()}
        style={{
          border: "3px dashed #2563EB",
          padding: "50px",
          textAlign: "center",
          borderRadius: "15px",
          cursor: "pointer",
          marginTop: "25px",
          background: "#F8FAFC",
        }}
      >
        <input {...getInputProps()} />

        <h2>📄 Drag & Drop PDF Here</h2>

        <p>or Click to Upload</p>
      </div>

      {fileName && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#E0F2FE",
            borderRadius: "10px",
          }}
        >
          <strong>Uploaded File:</strong> {fileName}
        </div>
      )}

      {loading && (
        <h3 style={{ marginTop: "20px" }}>
          🤖 Generating AI Summary...
        </h3>
      )}

      {summary && (
        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>📚 AI Summary</h2>

          <p style={{ whiteSpace: "pre-wrap" }}>
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}

export default PDFLearning;