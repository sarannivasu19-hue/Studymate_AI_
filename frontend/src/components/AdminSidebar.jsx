import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("studymate_token");
    localStorage.removeItem("studymate_role");
    localStorage.removeItem("studymate_user");

    navigate("/login");
  }

  const menus = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: "📊",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "👥",
    },
  ];

  return (
    <div
      style={{
        width: "270px",
        background: "#111827",
        color: "white",
        minHeight: "100vh",
        padding: "30px 20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        🛡 StudyMate Admin
      </h2>

      <div style={{ flex: 1 }}>
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            style={{
              display: "block",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "12px",
              color: "white",
              textDecoration: "none",
              background:
                location.pathname === menu.path
                  ? "#2563EB"
                  : "transparent",
              transition: "0.3s",
              fontWeight: "500",
            }}
          >
            <span style={{ marginRight: "10px" }}>
              {menu.icon}
            </span>
            {menu.name}
          </Link>
        ))}
      </div>

      <button
        onClick={handleLogout}
        style={{
          background: "#DC2626",
          color: "white",
          border: "none",
          padding: "15px",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}