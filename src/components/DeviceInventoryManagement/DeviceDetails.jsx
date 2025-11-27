
import React from "react";
import "./DeviceDetails.css";

export default function DeviceDetails({ device }) {
  if (!device) return <div className="dd-empty">Select a device to view details.</div>;

  return (
    <div className="dd-container">
      <h2 className="dd-title">Device Details</h2>

      <div className="dd-section">
        <h3>Device Information</h3>
        <div className="dd-grid">
          <div><strong>Device ID:</strong> {device.deviceId}</div>
          <div><strong>Hostname:</strong> {device.hostname}</div>
          <div><strong>Department:</strong> {device.department}</div>
          <div><strong>Location:</strong> {device.location}</div>
          <div><strong>Last Seen:</strong> {new Date(device.lastSeen).toLocaleString()}</div>
        </div>
      </div>

      <div className="dd-section">
        <h3>Owner</h3>
        <div className="dd-grid">
          <div><strong>Name:</strong> {device.ownerUser?.displayName || "-"}</div>
          <div><strong>User ID:</strong> {device.ownerUser?.userId || "-"}</div>
          <div><strong>Department:</strong> {device.ownerUser?.department || "-"}</div>
          <div><strong>Location:</strong> {device.ownerUser?.location || "-"}</div>
        </div>
      </div>

      <div className="dd-section">
        <h3>Installed Software ({device.installedSoftware?.length || 0})</h3>
        {device.installedSoftware?.length > 0 ? (
          <table className="dd-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Version</th>
                <th>Installed On</th>
              </tr>
            </thead>
            <tbody>
              {device.installedSoftware.map((app, idx) => (
                <tr key={idx}>
                  <td>{app.productName}</td>
                  <td>{app.version || "-"}</td>
                  <td>{new Date(app.installDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="dd-empty">No installed software.</p>
        )}
      </div>
    </div>
  );
}






