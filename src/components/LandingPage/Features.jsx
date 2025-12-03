// src/components/LandingPage/Features.jsx
import HomeNav from "./HomeNav";
import "./Landing.css";

export default function Features() {
  return (
    <div className="lp-page features-page">
      <HomeNav />

      <div className="lp-orbit lp-orbit-1" />
      <div className="lp-orbit lp-orbit-2" />

      <div className="lp-container">
        <div className="lp-section-header">
          <span className="lp-pill">Product features</span>
          <h1>Everything you need to tame software licenses.</h1>
          <p>
            icense gives IT, finance, and audit teams a single place to track
            devices, users, entitlements, and real usage – with clean dashboards
            instead of spreadsheets.
          </p>
        </div>

        <div className="lp-grid">
          <div className="lp-card">
            <span className="lp-tag">Inventory</span>
            <h2 className="lp-card-title">Unified asset catalog</h2>
            <p className="lp-card-body">
              Bring devices, users, software titles, and license keys into a
              single, queryable catalog. No more jumping between tools.
            </p>
            <ul className="lp-list">
              <li>Deep device inventory with ownership & location</li>
              <li>Normalized software titles across vendors</li>
              <li>Auto-linked installations, entitlements, and renewals</li>
            </ul>
          </div>

          <div className="lp-card">
            <span className="lp-tag">Compliance</span>
            <h2 className="lp-card-title">Overuse & underuse insights</h2>
            <p className="lp-card-body">
              Detect oversubscription, unused seats, and unlicensed installs
              before audits do – with clear, actionable signals.
            </p>
            <ul className="lp-list">
              <li>Per-license compliance status and risk level</li>
              <li>Under-utilized licenses flagged below 25% usage</li>
              <li>Audit-ready export of entitlements vs. installs</li>
            </ul>
          </div>

          <div className="lp-card">
            <span className="lp-tag">Automation</span>
            <h2 className="lp-card-title">Smart workflows</h2>
            <p className="lp-card-body">
              Replace manual tickets with approvals that know who owns what and
              how many seats are left.
            </p>
            <ul className="lp-list">
              <li>Request → approve → auto-assign entitlements</li>
              <li>License expiry reminders for IT & owners</li>
              <li>Suggested reclaim targets for dormant users</li>
            </ul>
          </div>

          <div className="lp-card">
            <span className="lp-tag">Reporting</span>
            <h2 className="lp-card-title">Real-time dashboards</h2>
            <p className="lp-card-body">
              Get a shared, trusted view of costs, vendors, and risk – tailored
              dashboards for IT, finance, and leadership.
            </p>
            <ul className="lp-list">
              <li>Spend by vendor, product, and department</li>
              <li>Forecasted renewals & true-up exposure</li>
              <li>Exportable summaries for QBRs and audits</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
