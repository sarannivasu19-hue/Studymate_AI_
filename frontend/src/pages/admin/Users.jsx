import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/AdminSidebar";
import AdminNavbar from "../../components/AdminNavbar";

const API = "http://127.0.0.1:8000/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const res = await axios.get(`${API}/admin/users/`);
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteUser(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/admin/users/${id}`);
      loadUsers();
    } catch (err) {
      alert("Unable to delete user.");
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        background: "#F3F4F6",
        minHeight: "100vh",
      }}
    >
      <AdminSidebar />

      <div style={{ flex: 1 }}>
        <AdminNavbar />

        <div style={{ padding: "30px" }}>
          <h1
            style={{
              color: "#2563EB",
              marginBottom: "10px",
            }}
          >
            👥 User Management
          </h1>

          <p
            style={{
              color: "#6B7280",
              marginBottom: "25px",
            }}
          >
            Manage all registered StudyMate AI users.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "25px",
            }}
          >
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "350px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #D1D5DB",
              }}
            />

            <div
              style={{
                background: "#2563EB",
                color: "white",
                padding: "12px 25px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              Total Users : {filteredUsers.length}
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead
                style={{
                  background: "#2563EB",
                  color: "white",
                }}
              >
                <tr>
                  <th style={{ padding: "15px" }}>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    style={{
                      textAlign: "center",
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  >
                    <td style={{ padding: "15px" }}>{user.id}</td>

                    <td>{user.full_name}</td>

                    <td>{user.email}</td>

                    <td>{user.role}</td>

                    <td>
                      {user.is_active ? (
                        <span style={{ color: "green" }}>Active</span>
                      ) : (
                        <span style={{ color: "red" }}>Inactive</span>
                      )}
                    </td>

                    <td>
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>

                    <td>
                      <button
                        onClick={() => deleteUser(user.id)}
                        style={{
                          background: "#EF4444",
                          color: "white",
                          border: "none",
                          padding: "8px 15px",
                          borderRadius: "8px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      style={{
                        padding: "30px",
                        textAlign: "center",
                      }}
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}