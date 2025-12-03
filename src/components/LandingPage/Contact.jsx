import { useState } from "react";
import HomeNav from "./HomeNav";
import "./Landing.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    licenseCount: "",
    message: "",
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // you can add validation if needed
    // for now just show toast and reset
    setShowToast(true);
    setForm({
      name: "",
      email: "",
      company: "",
      role: "",
      licenseCount: "",
      message: "",
    });

    // auto-hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="contact-page">
      <HomeNav />

      {/* background soft orbits re-used look */}
      <div className="contact-orbit contact-orbit-1" />
      <div className="contact-orbit contact-orbit-2" />

      <div className="contact-container">
        <div className="contact-shell">
          <div className="contact-left">
            <h2>Talk to our IT team</h2>
            <p>
              Share a few details so our admins can help you onboard, size your
              licenses, or answer any questions.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-row">
                <div className="contact-field">
                  <label htmlFor="name">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Alex Johnson"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="email">Work email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-field">
                  <label htmlFor="company">Company / Team</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Acme Technologies"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="role">Your role</label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    placeholder="IT Admin, Finance, Auditor…"
                    value={form.role}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-field">
                  <label htmlFor="licenseCount">
                    Approx. number of licenses
                  </label>
                  <input
                    id="licenseCount"
                    name="licenseCount"
                    type="number"
                    min="0"
                    placeholder="e.g. 250"
                    value={form.licenseCount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="message">How can we help?</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell us about your current tools, challenges, or what you’d like to achieve…"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                Submit request
              </button>
            </form>
          </div>

          <div className="contact-right">
            <div className="contact-right-inner">
              <p className="contact-kicker">License request desk</p>
              <h3>Centralize software requests.</h3>
              <p className="contact-copy">
                Users submit their needs here, and IT admins get a clean queue
                of requests with license counts, use cases, and urgency.
              </p>

              <div className="contact-tiles">
                <div className="contact-tile">
                  <span className="contact-tile-label">Pending requests</span>
                  <span className="contact-tile-value">08</span>
                  <span className="contact-tile-sub">Waiting for review</span>
                </div>
                <div className="contact-tile">
                  <span className="contact-tile-label">Avg. response</span>
                  <span className="contact-tile-value">2h</span>
                  <span className="contact-tile-sub">IT team SLA</span>
                </div>
              </div>

              <div className="contact-bubbles">
                <div className="bubble bubble-green" />
                <div className="bubble bubble-blue" />
                <div className="bubble bubble-purple" />
              </div>

              <p className="contact-footer">
                Your request will be securely forwarded to the IT admins of this
                workspace.
              </p>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="contact-toast">
          <div className="contact-toast-dot" />
          <span>Request forwarded to the admin team.</span>
        </div>
      )}
    </div>
  );
}
