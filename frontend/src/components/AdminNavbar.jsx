import { useNavigate } from "react-router-dom";

export default function AdminNavbar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  }

  return (
    <div
      style={{
        height: "75px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #E5E7EB",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      {/* Left */}
      <div>
        <h2
          style={{
            color: "#2563EB",
            margin: 0,
          }}
        >
          🛡 StudyMate Admin
        </h2>
      </div>

      {/* Center */}
      <div>
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: "300px",
            padding: "10px 15px",
            borderRadius: "10px",
            border: "1px solid #D1D5DB",
            outline: "none",
          }}
        />
      </div>

      {/* Right */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <button
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          🔔
        </button>

        <button
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          🌙
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#2563EB",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
            }}
          >
            A
          </div>

          <span
            style={{
              fontWeight: "600",
            }}
          >
            Administrator
          </span>
        </div>

        <button
          onClick={logout}
          style={{
            background: "#EF4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}