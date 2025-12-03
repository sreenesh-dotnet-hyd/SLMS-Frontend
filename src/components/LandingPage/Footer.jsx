 import "./Landing.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-wrapper">
        {/* Soft gradient divider */}
        <div className="footer-divider" />

        {/* Main footer content */}
        <span className="footer-text">
          © 2025 Encora Software Asset Management Suite. All rights reserved.
        </span>

        <div className="footer-links">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Support</span>
        </div>
      </div>
    </div>
  );
}
