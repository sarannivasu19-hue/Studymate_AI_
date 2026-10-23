function DashboardCard({ icon, title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "15px",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
        }}
      >
        {icon}
      </div>

      <div>
        <h4 style={{ margin: 0, color: "#64748B" }}>
          {title}
        </h4>

        <h2 style={{ marginTop: "8px" }}>
          {value}
        </h2>
      </div>
    </div>
  );
}

export default DashboardCard;