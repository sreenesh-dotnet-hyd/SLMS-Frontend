// src/components/LandingPage/Pricing.jsx
import HomeNav from "./HomeNav";
import "./Landing.css";

export default function Pricing() {
  return (
    <div className="lp-page pricing-page">
      <HomeNav />

      <div className="lp-orbit lp-orbit-1" />
      <div className="lp-orbit lp-orbit-2" />

      <div className="lp-container">
        <div className="lp-section-header">
          <span className="lp-pill">Pricing</span>
          <h1>Plans that scale with your license estate.</h1>
          <p>
            Start small, then grow into advanced compliance and optimization as
            your Microsoft, Adobe, Autodesk, and other key vendors expand.
          </p>
        </div>

        <div className="pricing-grid">
          <div className="pricing-card">
            <span className="pricing-pill">Starter</span>
            <h2 className="pricing-title">Team</h2>
            <p className="pricing-price">₹9,999 / month</p>
            <p className="pricing-sub">Up to 250 managed licenses</p>
            <ul className="lp-list">
              <li>Device & user inventory</li>
              <li>Basic license catalog (e.g. M365, Zoom)</li>
              <li>Simple utilization reports</li>
              <li>Email alerts for upcoming renewals</li>
            </ul>
          </div>

          <div className="pricing-card pricing-card-highlight">
            <span className="pricing-pill hot">Most popular</span>
            <h2 className="pricing-title">Growth</h2>
            <p className="pricing-price">₹24,999 / month</p>
            <p className="pricing-sub">Up to 1,000 managed licenses</p>
            <ul className="lp-list">
              <li>All Team features</li>
              <li>Advanced license compliance engine</li>
              <li>Underuse / reclaim recommendations</li>
              <li>
                Support for complex suites like Adobe CC, Autodesk, Atlassian
              </li>
            </ul>
          </div>

          <div className="pricing-card">
            <span className="pricing-pill">Enterprise</span>
            <h2 className="pricing-title">Enterprise</h2>
            <p className="pricing-price">Let&apos;s talk</p>
            <p className="pricing-sub">Designed for multi-region estates</p>
            <ul className="lp-list">
              <li>Unlimited licenses & custom vendors</li>
              <li>Custom dashboards for IT, finance & audit</li>
              <li>Dedicated success engineer</li>
              <li>SSO, advanced RBAC, and audit exports</li>
            </ul>
          </div>
        </div>

        <div className="pricing-extra">
          <h3>Popular license packs we typically manage</h3>
          <div className="lp-chip-row">
            <span className="lp-chip">Microsoft 365</span>
            <span className="lp-chip">Adobe Creative Cloud</span>
            <span className="lp-chip">Autodesk Collections</span>
            <span className="lp-chip">Slack Enterprise Grid</span>
            <span className="lp-chip">Zoom / Google Workspace</span>
            <span className="lp-chip">JetBrains All-in-one</span>
          </div>
          <p className="pricing-footnote">
            Need a custom mix? Our team can help you model costs and compliance
            for your exact vendor list.
          </p>
        </div>
      </div>
    </div>
  );
}
