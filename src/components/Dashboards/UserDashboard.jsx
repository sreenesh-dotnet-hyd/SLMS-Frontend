// src/dashboard/UserDashboard.jsx
import React from "react";
import "./ItAdminDashboard.css";

// ----- DUMMY DATA FOR CURRENT USER -----
const me = {
  name: "Alice Johnson",
  userId: "alice@corp",
  department: "IT",
  location: "Hyderabad",
};

const myDevices = [
  {
    id: 1,
    hostname: "DEV-LAPTOP-01",
    deviceId: "DEV01",
    lastSeen: "2025-01-07 09:30",
  },
  {
    id: 2,
    hostname: "DEV-DESKTOP-02",
    deviceId: "DEV02",
    lastSeen: "2025-01-06 18:10",
  },
];

const myEntitlements = [
  {
    id: 1,
    product: "Office 365",
    vendor: "Microsoft",
    assignedAt: "2024-02-01",
    expiresAt: "2025-01-31",
  },
  {
    id: 2,
    product: "Visual Studio",
    vendor: "Microsoft",
    assignedAt: "2024-04-10",
    expiresAt: null,
  },
];

const myExpiringSoon = myEntitlements.filter((e) => e.expiresAt !== null);

export default function UserDashboard() {
  return (
    <div className="dash-root">
      <header className="dash-header">
        <h1>My Software & Devices</h1>
        <p>Personal dashboard for {me.name}</p>
      </header>

      {/* KPIs */}
      <section className="dash-kpi-row">
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Devices I Own</div>
          <div className="dash-kpi-value">{myDevices.length}</div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Assigned Licenses</div>
          <div className="dash-kpi-value">{myEntitlements.length}</div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Licenses Expiring Soon</div>
          <div className="dash-kpi-value">{myExpiringSoon.length}</div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Department</div>
          <div className="dash-kpi-value" style={{ fontSize: 20 }}>
            {me.department}
          </div>
        </div>
      </section>

      {/* Row 2: Profile + devices */}
      <section className="dash-row">
        <div className="dash-card">
          <div className="dash-card-title">My Profile</div>
          <div style={{ fontSize: 14 }}>
            <p>
              <strong>Name:</strong> {me.name}
            </p>
            <p>
              <strong>User Id:</strong> {me.userId}
            </p>
            <p>
              <strong>Department:</strong> {me.department}
            </p>
            <p>
              <strong>Location:</strong> {me.location}
            </p>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">My Devices</div>
          <div className="dash-chart-container" style={{ paddingTop: 4 }}>
            <table style={{ width: "100%", fontSize: 13, borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th align="left">Hostname</th>
                  <th align="left">Device Id</th>
                  <th align="right">Last Seen</th>
                </tr>
              </thead>
              <tbody>
                {myDevices.map((d) => (
                  <tr key={d.id}>
                    <td>{d.hostname}</td>
                    <td>{d.deviceId}</td>
                    <td align="right">{d.lastSeen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Row 3: My entitlements */}
      <section className="dash-row">
        <div className="dash-card">
          <div className="dash-card-title">My Licenses</div>
          <div className="dash-chart-container" style={{ paddingTop: 4 }}>
            <table style={{ width: "100%", fontSize: 13, borderSpacing: 0 }}>
              <thead>
                <tr>
                  <th align="left">Product</th>
                  <th align="left">Vendor</th>
                  <th align="right">Assigned</th>
                  <th align="right">Expires</th>
                </tr>
              </thead>
              <tbody>
                {myEntitlements.map((e) => (
                  <tr key={e.id}>
                    <td>{e.product}</td>
                    <td>{e.vendor}</td>
                    <td align="right">{e.assignedAt}</td>
                    <td align="right">{e.expiresAt || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Self-Service</div>
          <div className="dash-quick-actions">
            <a href="#request-software" className="dash-btn">
              Request new software
            </a>
            <a href="#request-upgrade" className="dash-btn">
              Request license upgrade
            </a>
            <a href="#report-issue" className="dash-btn">
              Report a device issue
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
