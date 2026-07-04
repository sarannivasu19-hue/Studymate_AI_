export default function QuizProgress({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div style={{ marginBottom: 25 }}>
      <div
        style={{
          height: 12,
          background: "#E5E7EB",
          borderRadius: 30,
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: 12,
            background: "#2563EB",
            borderRadius: 30,
            transition: "0.4s",
          }}
        />
      </div>

      <p
        style={{
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        Question {current} of {total}
      </p>
    </div>
  );
}