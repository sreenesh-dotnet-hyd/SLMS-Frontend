import "./Landing.css";

export default function Dashboards() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <span className="title">A Glimpse</span>
        <p className="dashboard-subtitle">
          See how your software license posture looks in a live, interactive dashboard.
        </p>
      </div>

      <div className="img-container dashboard-showcase tilt-card">
        {/* Top chips */}
        <div className="dashboard-chip-row">
          <span className="dashboard-chip chip-live">Live overview</span>
          <span className="dashboard-chip chip-sync">Synced with inventory</span>
        </div>

        {/* Main dashboard preview */}
        <img src="./glimpse-2.png" alt="glimpse" />

        {/* Gradient overlay */}
        <div className="dashboard-overlay-gradient" />

        {/* Bottom tags */}
        <div className="dashboard-bottom-row">
          <span className="dashboard-tag">Compliance snapshot</span>
          <span className="dashboard-tag">Overuse · Underuse · Expiry</span>
        </div>
      </div>
    </div>
  );
}
