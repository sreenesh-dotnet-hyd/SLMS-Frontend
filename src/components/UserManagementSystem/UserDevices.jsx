import React from "react";
import "./UserDevices.css";

export default function UserDevices({ user }) {
  var search="";
  const devices = user.devices || [
    { id: 1, deviceId: "LPT-5521", hostname: "Sree-Laptop", department: "Engineering", location: "Hyderabad", lastSeen: "2025-01-18T14:32:00Z" },
    { id: 2, deviceId: "PC-3309", hostname: "Alice-PC", department: "Finance", location: "Mumbai", lastSeen: "2025-01-15T10:12:00Z" },
  ];

  return (
    <div className="container">
       <div className="device-header">
        <h1>Device List</h1>

        <input
          className="device-search"
          placeholder="Search by Device ID, Hostname, Department, Location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    <table className="userdevices-table">
      <thead>
        <tr>
          <th>Device ID</th>
          <th>Hostname</th>
          <th>Department</th>
          <th>Location</th>
          <th>Last Seen</th>
        </tr>
      </thead>
      <tbody>
        {devices.map(d => (
          <tr key={d.id}>
            <td>{d.deviceId}</td>
            <td>{d.hostname}</td>
            <td>{d.department}</td>
            <td>{d.location}</td>
            <td>{new Date(d.lastSeen).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}
