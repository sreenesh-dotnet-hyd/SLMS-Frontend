// src/dashboard/AuditorDashboard.jsx
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
  Legend,
  CartesianGrid,
} from "recharts";

// ----- DUMMY DATA -----

const complianceSummary = {
  licensedInstalls: 120,
  unlicensedInstalls: 7,
  expiredLicenseInstalls: 3,
};

const violationsByDept = [
  { dept: "IT", unlicensed: 2, expired: 1 },
  { dept: "HR", unlicensed: 3, expired: 1 },
  { dept: "Finance", unlicensed: 1, expired: 1 },
  { dept: "QA", unlicensed: 1, expired: 0 },
];

const recentChanges = [
  "2025-01-07 10:15 – Office 365 license updated (seats +5)",
  "2025-01-07 09:40 – Entitlement revoked for Bob (Adobe CC)",
  "2025-01-06 17:20 – New device added: HR-LAPTOP-02",
  "2025-01-06 14:05 – Installed Jira on DEV-LAPTOP-01",
  "2025-01-05 11:30 – SQL Server license renewed",
];

const totalInstalls =
  complianceSummary.licensedInstalls +
  complianceSummary.unlicensedInstalls +
  complianceSummary.expiredLicenseInstalls;

const complianceScore =
  totalInstalls > 0
    ? Math.round(
        (complianceSummary.licensedInstalls / totalInstalls) * 100
      )
    : 0;

const totalViolations =
  complianceSummary.unlicensedInstalls +
  complianceSummary.expiredLicenseInstalls;

const pieData = [
  { name: "Licensed", value: complianceSummary.licensedInstalls },
  { name: "Unlicensed", value: complianceSummary.unlicensedInstalls },
  { name: "Expired", value: complianceSummary.expiredLicenseInstalls },
];

const pieColors = ["#4caf50", "#ff9800", "#f44336"];

export default function AuditorDashboard() {
  return (
    <div className="dash-root">
      <header className="dash-header">
        <h1>Auditor Dashboard</h1>
        <p>Compliance status, violations and recent changes</p>
      </header>

      {/* KPIs */}
      <section className="dash-kpi-row">
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Compliance Score</div>
          <div className="dash-kpi-value">{complianceScore}%</div>
          <div className="dash-kpi-sub">
            {complianceSummary.licensedInstalls} of {totalInstalls} installs
            licensed
          </div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Unlicensed Installs</div>
          <div className="dash-kpi-value">
            {complianceSummary.unlicensedInstalls}
          </div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Expired License Installs</div>
          <div className="dash-kpi-value">
            {complianceSummary.expiredLicenseInstalls}
          </div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Total Violations</div>
          <div className="dash-kpi-value">{totalViolations}</div>
          <div className="dash-kpi-sub">Across all departments</div>
        </div>
      </section>

      {/* Row 2: Compliance overview + violations by dept */}
      <section className="dash-row">
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

        <div className="dash-card">
          <div className="dash-card-title">Violations by Department</div>
          <div className="dash-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={violationsByDept}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dept" stroke="#666" />
                <YAxis allowDecimals={false} stroke="#666" />
                <Tooltip
                  formatter={(value, name) => [`${value}`, name]}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Legend />
                <Bar dataKey="unlicensed" fill="#ff9800" />
                <Bar dataKey="expired" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Row 3: Recent changes + audit quick filters */}
      <section className="dash-row">
        <div className="dash-card">
          <div className="dash-card-title">Recent Changes</div>
          <ul className="dash-activity-list">
            {recentChanges.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Audit Views</div>
          <div className="dash-quick-actions">
            <a href="#devices-unlicensed" className="dash-btn">
              Devices with unlicensed software
            </a>
            <a href="#expired-still-installed" className="dash-btn">
              Expired licenses still installed
            </a>
            <a href="#install-history" className="dash-btn">
              Installation history
            </a>
            <a href="#entitlement-changes" className="dash-btn">
              Entitlement changes
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
