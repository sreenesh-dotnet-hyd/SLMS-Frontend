// src/components/LandingPage/Company.jsx
import HomeNav from "./HomeNav";
import "./Landing.css";

export default function Company() {
  return (
    <div className="lp-page company-page">
      <HomeNav />

      <div className="lp-orbit lp-orbit-1" />
      <div className="lp-orbit lp-orbit-2" />

      <div className="lp-container">
        <div className="lp-section-header">
          <span className="lp-pill">About icense</span>
          <h1>Built for teams who are tired of license chaos.</h1>
          <p>
            icense started as an internal tool to help an IT team keep up with
            hundreds of devices and vendor audits. Now it powers a modern
            Software Asset Management experience for growing organizations.
          </p>
        </div>

        <div className="lp-grid company-grid">
          <div className="lp-card">
            <h2 className="lp-card-title">Our mission</h2>
            <p className="lp-card-body">
              Give IT and finance teams clarity and control over every software
              license – without spreadsheets, guesswork, or last-minute
              true-ups.
            </p>
            <p className="lp-card-body">
              We believe license data should be trustworthy, real-time, and easy
              to explain to anyone in the room.
            </p>
          </div>

          <div className="lp-card">
            <h2 className="lp-card-title">How we work</h2>
            <ul className="lp-list">
              <li>Engineering-first culture focused on clean data models</li>
              <li>Security by design: role-based access & audit trails</li>
              <li>Close feedback loop with IT admins and license managers</li>
            </ul>
          </div>

          <div className="lp-card">
            <h2 className="lp-card-title">Who we serve</h2>
            <p className="lp-card-body">
              icense is ideal for mid-size and enterprise teams managing
              licenses across:
            </p>
            <ul className="lp-list">
              <li>Engineering & product organizations</li>
              <li>Shared IT & infrastructure teams</li>
              <li>Finance, procurement, and audit groups</li>
            </ul>
          </div>

          <div className="lp-card">
            <h2 className="lp-card-title">Where we&apos;re going</h2>
            <p className="lp-card-body">
              Our roadmap focuses on deeper vendor insights, native cost
              optimization, and tighter integrations with device management and
              identity platforms.
            </p>
            <p className="lp-card-body">
              The goal: a single pane of glass for everything related to
              software ownership in your organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
