export default function FlashNavigation({
  current,
  total,
  onPrevious,
  onNext,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "25px",
      }}
    >
      <button
        onClick={onPrevious}
        disabled={current === 0}
        style={{
          background: "#2563EB",
          color: "white",
          border: "none",
          padding: "12px 25px",
          borderRadius: "10px",
          cursor: current === 0 ? "not-allowed" : "pointer",
          opacity: current === 0 ? 0.5 : 1,
        }}
      >
        ⬅ Previous
      </button>

      <h3>
        Card {current + 1} / {total}
      </h3>

      <button
        onClick={onNext}
        disabled={current === total - 1}
        style={{
          background: "#2563EB",
          color: "white",
          border: "none",
          padding: "12px 25px",
          borderRadius: "10px",
          cursor: current === total - 1 ? "not-allowed" : "pointer",
          opacity: current === total - 1 ? 0.5 : 1,
        }}
      >
        Next ➡
      </button>
    </div>
  );
}