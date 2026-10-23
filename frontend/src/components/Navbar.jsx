import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <h2>StudyMate AI Dashboard</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <FaBell size={22} />
        <FaUserCircle size={35} />
      </div>
    </div>
  );
}

export default Navbar;