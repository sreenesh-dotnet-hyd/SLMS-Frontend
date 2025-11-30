// src/dashboard/ItAdminDashboard.jsx
import React from "react";
import "./ItAdminDashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from "recharts";

// ---------- DUMMY DATA ----------

const licenseUsageData = [
  { product: "Office 365", used: 48, total: 50 },
  { product: "Visual Studio", used: 7, total: 10 },
  { product: "Adobe CC", used: 9, total: 30 },
  { product: "SQL Server", used: 12, total: 15 },
];

const complianceSummary = {
  licensed: 120,
  unlicensed: 7,
  expired: 3,
};

const installsOverTime = [
  { date: "2025-01-01", installs: 3 },
  { date: "2025-01-02", installs: 5 },
  { date: "2025-01-03", installs: 2 },
  { date: "2025-01-04", installs: 8 },
  { date: "2025-01-05", installs: 4 },
  { date: "2025-01-06", installs: 6 },
  { date: "2025-01-07", installs: 3 },
];

const complianceByDevice = [
  { name: "DEV-LAPTOP-01", licensed: 12, unlicensed: 1 },
  { name: "HR-LAPTOP-02", licensed: 9, unlicensed: 3 },
  { name: "QA-DESKTOP-01", licensed: 7, unlicensed: 0 },
  { name: "FIN-LAPTOP-01", licensed: 5, unlicensed: 2 },
];

const expiringLicenses = [
  { month: "Jan", seats: 30, cost: 2000 },
  { month: "Feb", seats: 10, cost: 500 },
  { month: "Mar", seats: 0, cost: 0 },
  { month: "Apr", seats: 15, cost: 900 },
  { month: "May", seats: 5, cost: 300 },
];

const recentActivity = [
  "2025-01-07 10:15 – Assigned Office 365 to Alice",
  "2025-01-07 09:40 – Installed Visual Studio on DEV-LAPTOP-01",
  "2025-01-06 17:20 – Removed Adobe CC from QA-DESKTOP-01",
  "2025-01-06 14:05 – Added new SQL Server license",
  "2025-01-05 11:30 – Assigned Adobe CC to Bob",
];

// ---------- KPI CALCULATIONS FROM DUMMY DATA ----------

const totalLicenses = licenseUsageData.length;
const totalSeats = licenseUsageData.reduce((sum, l) => sum + l.total, 0);
const usedSeats = licenseUsageData.reduce((sum, l) => sum + l.used, 0);
const usagePercent =
  totalSeats > 0 ? Math.round((usedSeats / totalSeats) * 100) : 0;

const totalViolations = complianceSummary.unlicensed + complianceSummary.expired;
const expiringSoonCount = expiringLicenses.filter((m) => m.seats > 0).length;

// pie data
const pieData = [
  { name: "Licensed", value: complianceSummary.licensed },
  { name: "Unlicensed", value: complianceSummary.unlicensed },
  { name: "Expired", value: complianceSummary.expired },
];

const pieColors = ["#4caf50", "#ff9800", "#f44336"];

// add usage% for bar chart
const licenseUsageChartData = licenseUsageData.map((l) => ({
  product: l.product,
  usage: l.total > 0 ? Math.round((l.used / l.total) * 100) : 0,
}));

export default function ItAdminDashboard() {
  return (
    <div className="dash-root">
      <header className="dash-header">
        <h1>IT Admin Dashboard</h1>
        <p>Overview of licenses, usage, compliance and activity</p>
      </header>

      {/* KPI TILES */}
      <section className="dash-kpi-row">
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Total Licenses</div>
          <div className="dash-kpi-value">{totalLicenses}</div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Seat Usage</div>
          <div className="dash-kpi-value">{usagePercent}%</div>
          <div className="dash-kpi-sub">
            {usedSeats} / {totalSeats} seats
          </div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Compliance Violations</div>
          <div className="dash-kpi-value">{totalViolations}</div>
          <div className="dash-kpi-sub">
            {complianceSummary.unlicensed} Unlicensed,{" "}
            {complianceSummary.expired} Expired
          </div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Expiring Soon</div>
          <div className="dash-kpi-value">{expiringSoonCount}</div>
          <div className="dash-kpi-sub">Next 5 months (dummy)</div>
        </div>
      </section>

      {/* ROW 2: USAGE + COMPLIANCE PIE */}
      <section className="dash-row">
        <div className="dash-card">
          <div className="dash-card-title">License Usage by Product</div>
          <div className="dash-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={licenseUsageChartData}
                layout="vertical"
                margin={{ left: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal />
                <XAxis type="number" domain={[0, 100]} stroke="#666" />
                <YAxis type="category" dataKey="product" stroke="#666" />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Usage"]}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Bar dataKey="usage">
                  {licenseUsageChartData.map((entry, index) => {
                    const v = entry.usage;
                    let color = "#4caf50";
                    if (v >= 90) color = "#f44336";
                    else if (v >= 70) color = "#ff9800";
                    return <Cell key={index} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Compliance Overview</div>
          <div className="dash-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}`, name]}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ROW 3: INSTALLS OVER TIME + COMPLIANCE BY DEVICE */}
      <section className="dash-row">
        <div className="dash-card">
          <div className="dash-card-title">Installations Over Time</div>
          <div className="dash-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={installsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  stroke="#666"
                  tickFormatter={(value) => {
                    const d = new Date(value);
                    return d.toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    });
                  }}
                />
                <YAxis allowDecimals={false} stroke="#666" />
                <Tooltip
                  formatter={(value) => [`${value} installs`, "Count"]}
                  labelFormatter={(v) =>
                    new Date(v).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "2-digit",
                    })
                  }
                  cursor={{ stroke: "#1976d2", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="installs"
                  stroke="#1976d2"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Compliance by Device</div>
          <div className="dash-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={complianceByDevice}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis allowDecimals={false} stroke="#666" />
                <Tooltip
                  formatter={(value, name) => [`${value}`, name]}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Legend />
                <Bar dataKey="licensed" stackId="a" fill="#4caf50" />
                <Bar dataKey="unlicensed" stackId="a" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ROW 4: EXPIRY + RECENT ACTIVITY */}
      <section className="dash-row">
        <div className="dash-card">
          <div className="dash-card-title">
            Expiring Licenses (Seats per Month)
          </div>
          <div className="dash-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={expiringLicenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis allowDecimals={false} stroke="#666" />
                <Tooltip
                  formatter={(value) => [`${value} seats`, "Seats"]}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Bar dataKey="seats" fill="#ff9800" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Recent Activity</div>
          <ul className="dash-activity-list">
            {recentActivity.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <div className="dash-quick-actions">
            <a href="#add-license" className="dash-btn">
              + Add License
            </a>
            <a href="#assign-seat" className="dash-btn">
              + Assign Seat
            </a>
            <a href="#manage-devices" className="dash-btn">
              Manage Devices
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
