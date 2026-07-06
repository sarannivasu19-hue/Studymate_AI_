export default function QuizResult({
  score,
  total,
  restartQuiz,
}) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div
      style={{
        background: "white",
        padding: 40,
        borderRadius: 20,
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
      }}
    >
      <h1>🎉 Quiz Completed</h1>

      <br />

      <h2>
        {score} / {total}
      </h2>

      <h3>{percentage}%</h3>

      <br />

      <button
        onClick={restartQuiz}
        style={{
          background: "#2563EB",
          color: "white",
          border: "none",
          padding: "12px 30px",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        Retry Quiz
      </button>
    </div>
  );
}