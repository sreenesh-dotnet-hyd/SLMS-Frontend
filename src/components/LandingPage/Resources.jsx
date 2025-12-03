// src/components/LandingPage/Resources.jsx
import HomeNav from "./HomeNav";
import "./Landing.css";

export default function Resources() {
  return (
    <div className="lp-page resources-page">
      <HomeNav />

      <div className="lp-orbit lp-orbit-1" />
      <div className="lp-orbit lp-orbit-2" />

      <div className="lp-container">
        <div className="lp-section-header">
          <span className="lp-pill">Resources</span>
          <h1>Guides and templates to run smarter licensing.</h1>
          <p>
            Kick-start your Software Asset Management practice with ready-to-use
            playbooks and checklists designed for IT admins, finance leaders,
            and auditors.
          </p>
        </div>

        <div className="lp-grid">
          <div className="lp-card">
            <span className="lp-tag">Playbook</span>
            <h2 className="lp-card-title">License onboarding checklist</h2>
            <p className="lp-card-body">
              A step-by-step checklist for rolling out new tools like Microsoft
              365, Adobe Creative Cloud, or Zoom – from request to entitlement
              to installation.
            </p>
            <ul className="lp-list">
              <li>Standard questions to ask every vendor</li>
              <li>Fields to capture in your license catalog</li>
              <li>Best practices for assignment & de-provisioning</li>
            </ul>
          </div>

          <div className="lp-card">
            <span className="lp-tag">Template</span>
            <h2 className="lp-card-title">License policy starter pack</h2>
            <p className="lp-card-body">
              Copy-ready policy language you can adapt for your organization to
              define how tools like Slack, Atlassian, Autodesk, and JetBrains
              are requested and approved.
            </p>
            <ul className="lp-list">
              <li>Usage & access guidelines</li>
              <li>Owner responsibilities per application</li>
              <li>Audit & review cadence recommendations</li>
            </ul>
          </div>

          <div className="lp-card">
            <span className="lp-tag">Cheat sheet</span>
            <h2 className="lp-card-title">Most-requested license bundles</h2>
            <p className="lp-card-body">
              A quick view of common bundles your IT team will likely manage.
            </p>
            <div className="lp-chip-row">
              <span className="lp-chip">Microsoft 365 E3 / E5</span>
              <span className="lp-chip">Adobe Creative Cloud</span>
              <span className="lp-chip">Autodesk CAD Suites</span>
              <span className="lp-chip">JetBrains All Products</span>
              <span className="lp-chip">Slack Enterprise</span>
              <span className="lp-chip">Zoom Business / Pro</span>
            </div>
          </div>

          <div className="lp-card">
            <span className="lp-tag">Insights</span>
            <h2 className="lp-card-title">Preparing for a vendor audit</h2>
            <p className="lp-card-body">
              Practical guidance to walk into audits with confidence instead of
              panic.
            </p>
            <ul className="lp-list">
              <li>Data you should have at your fingertips</li>
              <li>How to respond to overuse and underuse findings</li>
              <li>Using icense dashboards to back your numbers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
