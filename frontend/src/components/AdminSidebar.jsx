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
    {
      name: "AI Analytics",
      path: "/admin/analytics",
      icon: "📈",
    },
    {
      name: "Voice Learning",
      path: "/admin/voice",
      icon: "🎤",
    },
    {
      name: "Notes",
      path: "/admin/notes",
      icon: "📝",
    },
    {
      name: "Quiz",
      path: "/admin/quiz",
      icon: "🧠",
    },
    {
      name: "Flashcards",
      path: "/admin/flashcards",
      icon: "🃏",
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: "⚙️",
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
              marginBottom: "10px",
              borderRadius: "12px",
              color: "white",
              textDecoration: "none",
              background:
                location.pathname === menu.path
                  ? "#2563EB"
                  : "transparent",
              transition: "0.3s",
            }}
          >
            {menu.icon} {menu.name}
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
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}