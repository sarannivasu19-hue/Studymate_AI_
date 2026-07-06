import { useState } from "react";

export default function FlashCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{
        width: "100%",
        maxWidth: "700px",
        minHeight: "320px",
        margin: "30px auto",
        background: "#ffffff",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: "40px",
        transition: "0.4s",
        textAlign: "center",
      }}
    >
      <div>
        <h2
          style={{
            color: "#2563EB",
            marginBottom: "20px",
          }}
        >
          {flipped ? "Answer" : "Question"}
        </h2>

        <p
          style={{
            fontSize: "22px",
            lineHeight: "1.8",
            fontWeight: "500",
          }}
        >
          {flipped ? back : front}
        </p>

        <br />

        <small
          style={{
            color: "#6B7280",
          }}
        >
          🔄 Click the card to flip
        </small>
      </div>
    </div>
  );
}