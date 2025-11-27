import React, { useEffect, useState } from "react";
import "./UsersList.css";

export default function UsersList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Dummy data
    setUsers([
      { id: 1, userId: "EMP1001", displayName: "Alice Johnson", department: "Finance" },
      { id: 2, userId: "EMP1002", displayName: "Bob Smith", department: "IT" },
      { id: 3, userId: "EMP1003", displayName: "Sree Nesh", department: "Engineering" },
    ]);
  }, []);

  const filtered = users.filter(
    (u) =>
      u.userId.toLowerCase().includes(search.toLowerCase()) ||
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="userlist-container">
      <h2>Users</h2>
      <input
        type="text"
        placeholder="Search by User ID, Name, Department..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="userlist-search"
      />

      <table className="userlist-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id} onClick={() => onSelectUser(u)}>
              <td>{u.userId}</td>
              <td>{u.displayName}</td>
              <td>{u.department}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="3" className="userlist-empty">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
