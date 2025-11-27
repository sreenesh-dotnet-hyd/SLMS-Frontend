import React, { useState } from "react";
import "./AssignedLicenses.css";

export default function AssignedLicenses({ user }) {
  const [entitlements, setEntitlements] = useState([
    { id: 1, licenseName: "Adobe Photoshop", licenseType: "PerUser", assignedAt: "2024-02-01" },
    { id: 2, licenseName: "Visual Studio", licenseType: "PerUser", assignedAt: "2024-03-05" },
  ]);

  return (
    <div className="assignedlicenses-container">
      <button className="assign-btn">Assign License</button>
      <table className="assignedlicenses-table">
        <thead>
          <tr>
            <th>License</th>
            <th>Type</th>
            <th>Assigned At</th>
          </tr>
        </thead>
        <tbody>
          {entitlements.map(e => (
            <tr key={e.id}>
              <td>{e.licenseName}</td>
              <td>{e.licenseType}</td>
              <td>{new Date(e.assignedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
