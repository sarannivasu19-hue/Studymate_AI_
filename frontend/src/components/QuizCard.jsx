export default function QuizCard({
  question,
  selectedAnswer,
  setSelectedAnswer,
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 20,
        padding: 30,
        boxShadow: "0 5px 15px rgba(0,0,0,.1)",
      }}
    >
      <h2>{question.question}</h2>

      <br />

      {question.options.map((option, index) => (
        <label
          key={index}
          style={{
            display: "block",
            padding: 12,
            marginBottom: 12,
            border: "1px solid #ddd",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          <input
            type="radio"
            checked={selectedAnswer === option}
            onChange={() => setSelectedAnswer(option)}
          />

          <span style={{ marginLeft: 10 }}>
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}