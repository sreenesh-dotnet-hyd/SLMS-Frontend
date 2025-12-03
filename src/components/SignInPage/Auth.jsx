// src/auth/Auth.js
import { useState, useEffect } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState("signin"); // signin | signup | forgot
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    const response = await fetch("https://localhost:7153/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: form.username,
        password: form.password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || "Login failed");
    }

    return data;
  };

  const signUp = async () => {
    const response = await fetch("https://localhost:7153/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: form.username,
        Email: form.email,
        Password: form.password,
        Role: form.role,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err || "Signup failed");
    }

    return await response.text();
  };

  useEffect(() => {
    // detect mode from hash change (#signin / #signup / #forgot)
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) setMode(hash);
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (mode === "signup") {
      if (!form.username.trim()) return "Username required";
      if (!form.email.includes("@")) return "Valid email required";
      if (form.password.length < 6) return "Password must be ≥ 6 chars";
      if (form.password !== form.confirmPassword)
        return "Passwords do not match";
      if (!form.role) return "Please select a role";
    }
    if (mode === "signin") {
      if (!form.username.trim()) return "Username required";
      if (!form.password) return "Password required";
    }
    if (mode === "forgot") {
      if (!form.email.includes("@")) return "Enter registered email";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    setError("");

    if (mode === "signin") {
      try {
        const data = await signIn();
        console.log("logging account:", data);

        localStorage.setItem("token", data.Token);
        localStorage.setItem("refreshToken", data.RefreshToken);
        localStorage.setItem("tokenExpiry", data.Expiration);

        navigate("/app/devices");
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
    } else if (mode === "signup") {
      try {
        const res = await signUp();
        console.log("Creating account:", form, res);
        alert("Account created. Please sign in.");
        window.location.hash = "signin";
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
    } else {
      console.log("Forgot password email sent");
      alert("Reset instructions sent to your email");
    }
  };

  const heading =
    mode === "signin"
      ? "Welcome back 👋"
      : mode === "signup"
      ? "Create your workspace"
      : "Reset your password";

  const subheading =
    mode === "signin"
      ? "Access your software license cockpit in seconds."
      : mode === "signup"
      ? "Spin up a secure license management space for your team."
      : "We’ll send a secure link to your registered email.";

  return (
    <div className="auth-container">
      {/* floating gradient blobs */}
      <div className="auth-orbit orbit-1" />
      <div className="auth-orbit orbit-2" />
      <div className="auth-orbit orbit-3" />

      <div className="auth-shell">
        {/* window header */}
        <div className="auth-window-header">
          <div className="auth-dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="auth-brand">
            <div className="auth-logo-badge">L</div>
            <span>icense Control</span>
          </div>
        </div>

        {/* split layout */}
        <div className="auth-main">
          {/* LEFT – FORM */}
          <div className="auth-left">
            <div className="auth-mode-pill">
              <span className={mode === "signin" ? "active" : ""}>
                Sign in
              </span>
              <span className={mode === "signup" ? "active" : ""}>
                Sign up
              </span>
              <span className={mode === "forgot" ? "active" : ""}>
                Reset
              </span>
            </div>

            <h2 className="auth-title">{heading}</h2>
            <p className="auth-subtitle">{subheading}</p>

            {error && <p className="auth-error">{error}</p>}

            <form className="auth-form" onSubmit={handleSubmit}>
              {/* username always */}
              <div className="auth-field">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>

              {mode === "signup" && (
                <div className="auth-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              )}

              {mode !== "forgot" && (
                <div className="auth-field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                  />
                  {mode === "signup" && (
                    <span className="auth-hint">
                      Must be at least 6 characters
                    </span>
                  )}
                </div>
              )}

              {mode === "signup" && (
                <>
                  <div className="auth-field">
                    <label>Confirm password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="auth-field">
                    <label>Role</label>
                    <select
                      name="role"
                      className="auth-select"
                      value={form.role}
                      onChange={handleChange}
                    >
                      <option value="">Select role</option>
                      <option value="Admin">Admin</option>
                      <option value="Finance">Finance</option>
                      <option value="Auditor">Auditor</option>
                    </select>
                  </div>
                </>
              )}

              {mode === "forgot" && (
                <div className="auth-field">
                  <label>Registered email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              )}

              <button type="submit" className="auth-submit">
                {mode === "signin"
                  ? "Sign in"
                  : mode === "signup"
                  ? "Create account"
                  : "Send reset link"}
              </button>
            </form>

            <div className="auth-links">
              {mode !== "signin" && (
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => (window.location.hash = "signin")}
                >
                  Already have an account? Sign in
                </button>
              )}
              {mode !== "signup" && (
                <button
                  type="button"
                  className="auth-link-btn"
                  onClick={() => (window.location.hash = "signup")}
                >
                  New here? Create account
                </button>
              )}
              {mode !== "forgot" && (
                <button
                  type="button"
                  className="auth-link-btn subtle"
                  onClick={() => (window.location.hash = "forgot")}
                >
                  Forgot password?
                </button>
              )}
            </div>
          </div>

          {/* RIGHT – LICENSE ILLUSTRATION */}
          <div className="auth-right">
            <div className="auth-right-content">
              <p className="auth-right-title">
                All your licenses. One live dashboard.
              </p>
              <p className="auth-right-sub">
                Track Microsoft, Adobe, Autodesk and more in a single pane of
                glass. Spot overuse, underuse and upcoming renewals at a glance.
              </p>

              <div className="auth-illustration">
                <div className="ill-main-card">
                  <div className="ill-header">
                    <span className="ill-pill danger">Over-licensed</span>
                    <span className="ill-pill safe">Compliant</span>
                  </div>
                  <div className="ill-body">
                    <div className="ill-bar-group">
                      <div className="ill-bar bar-1" />
                      <div className="ill-bar bar-2" />
                      <div className="ill-bar bar-3" />
                    </div>
                    <div className="ill-metrics">
                      <div>
                        <span className="ill-label">Office 365</span>
                        <span className="ill-value">82% used</span>
                      </div>
                      <div>
                        <span className="ill-label">Adobe CC</span>
                        <span className="ill-value warning">Underused 23%</span>
                      </div>
                      <div>
                        <span className="ill-label">Autodesk CAD</span>
                        <span className="ill-value alert">
                          Renewal in 14 days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* floating license chips */}
                <div className="ill-float chip-1">MS Office</div>
                <div className="ill-float chip-2">Adobe</div>
                <div className="ill-float chip-3">JetBrains</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
