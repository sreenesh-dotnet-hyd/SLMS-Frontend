// src/dashboard/FinanceDashboard.jsx
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

const financeLicenses = [
  { product: "Office 365", vendor: "Microsoft", cost: 5000, seats: 50, usedSeats: 48, expiryMonth: "Jan" },
  { product: "Visual Studio", vendor: "Microsoft", cost: 2000, seats: 10, usedSeats: 7, expiryMonth: "Apr" },
  { product: "Adobe CC", vendor: "Adobe", cost: 3000, seats: 30, usedSeats: 9, expiryMonth: "May" },
  { product: "Jira", vendor: "Atlassian", cost: 1500, seats: 25, usedSeats: 20, expiryMonth: "Feb" },
];

const spendByVendorRaw = [
  { vendor: "Microsoft", cost: 7000 },
  { vendor: "Adobe", cost: 3000 },
  { vendor: "Atlassian", cost: 1500 },
];

const renewalsByMonth = [
  { month: "Jan", cost: 5000 },
  { month: "Feb", cost: 1500 },
  { month: "Mar", cost: 0 },
  { month: "Apr", cost: 2000 },
  { month: "May", cost: 3000 },
];

const underUtilizedLicenses = financeLicenses.filter(
  (l) => l.usedSeats / l.seats < 0.6
);

const totalSpend = spendByVendorRaw.reduce((sum, v) => sum + v.cost, 0);

const topVendor = spendByVendorRaw.slice().sort((a, b) => b.cost - a.cost)[0];

const renewalsNext90Cost = renewalsByMonth
  .filter((m) => ["Jan", "Feb", "Mar"].includes(m.month))
  .reduce((sum, m) => sum + m.cost, 0);

const spendByVendorPie = spendByVendorRaw.map((v) => ({
  name: v.vendor,
  value: v.cost,
}));

const pieColors = ["#1976d2", "#ff9800", "#4caf50", "#9c27b0"];

export default function FinanceDashboard() {
  return (
    <div className="dash-root">
      <header className="dash-header">
        <h1>Finance Dashboard</h1>
        <p>Cost, renewals and optimization opportunities</p>
      </header>

      {/* KPIs */}
      <section className="dash-kpi-row">
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Total Annual Spend</div>
          <div className="dash-kpi-value">${totalSpend}</div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Top Vendor</div>
          <div className="dash-kpi-value">{topVendor.vendor}</div>
          <div className="dash-kpi-sub">${topVendor.cost} / year</div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Under-utilized Licenses</div>
          <div className="dash-kpi-value">{underUtilizedLicenses.length}</div>
          <div className="dash-kpi-sub">Usage &lt; 60%</div>
        </div>
        <div className="dash-kpi-card">
          <div className="dash-kpi-label">Renewals Next 90 Days</div>
          <div className="dash-kpi-value">${renewalsNext90Cost}</div>
          <div className="dash-kpi-sub">Projected renewal cost</div>
        </div>
      </section>

      {/* Row 2: Spend by vendor + renewal cost timeline */}
      <section className="dash-row">
        <div className="dash-card">
          <div className="dash-card-title">Spend by Vendor</div>
          <div className="dash-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={spendByVendorPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {spendByVendorPie.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`$${value}`, name]}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Renewal Cost by Month</div>
          <div className="dash-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={renewalsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Renewal cost"]}
                  cursor={{ fill: "rgba(0,0,0,0.04)" }}
                />
                <Bar dataKey="cost" fill="#ff9800" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Row 3: Under-utilized details + quick links */}
      <section className="dash-row">
        <div className="dash-card">
          <div className="dash-card-title">Under-utilized Licenses</div>
          <div className="dash-chart-container" style={{ padding: "4px 0" }}>
            {underUtilizedLicenses.length === 0 ? (
              <p style={{ fontSize: 13 }}>No under-utilized licenses (dummy).</p>
            ) : (
              <table style={{ width: "100%", fontSize: 13, borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th align="left">Product</th>
                    <th align="left">Vendor</th>
                    <th align="right">Used / Seats</th>
                    <th align="right">Usage %</th>
                  </tr>
                </thead>
                <tbody>
                  {underUtilizedLicenses.map((l) => {
                    const usage = Math.round((l.usedSeats / l.seats) * 100);
                    return (
                      <tr key={l.product}>
                        <td>{l.product}</td>
                        <td>{l.vendor}</td>
                        <td align="right">
                          {l.usedSeats}/{l.seats}
                        </td>
                        <td align="right">{usage}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-title">Finance Quick Actions</div>
          <div style={{ fontSize: 13, marginBottom: 12 }}>
            Use these to coordinate with IT for cost optimization and renewals.
          </div>
          <div className="dash-quick-actions">
            <a href="#high-cost-low-usage" className="dash-btn">
              High cost, low usage
            </a>
            <a href="#renewals-this-quarter" className="dash-btn">
              Renewals this quarter
            </a>
            <a href="#vendor-spend-report" className="dash-btn">
              Vendor spend report
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
