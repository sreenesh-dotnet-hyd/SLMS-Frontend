// src/auth/Auth.js
import { useState, useEffect } from "react";
import "./Auth.css";

export default function Auth() {
  const [mode, setMode] = useState("signin"); // signin | signup | forgot
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

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

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (mode === "signup") {
      if (!form.username.trim()) return "Username required";
      if (!form.email.includes("@")) return "Valid email required";
      if (form.password.length < 6) return "Password must be ≥ 6 chars";
      if (form.password !== form.confirmPassword)
        return "Passwords do not match";
    }
    if (mode === "signin") {
      if (!form.email.includes("@")) return "Valid email required";
      if (!form.password) return "Password required";
    }
    if (mode === "forgot") {
      if (!form.email.includes("@")) return "Enter registered email";
    }
    return "";
  };

  const fakeApi = () => {
    // simulate token creation
    return { token: "fake-jwt-token" };
  };

  const handleSubmit = e => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    setError("");

    if (mode === "signin") {
      console.log("Logging in:", form.email);
      const res = fakeApi();
      localStorage.setItem("token", res.token);
      alert("Login successful!");
    } else if (mode === "signup") {
      console.log("Creating account:", form);
      alert("Account created. Please sign in.");
      window.location.hash = "signin";
    } else {
      console.log("Forgot password email sent");
      alert("Reset instructions sent to your email");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>
          {mode === "signin"
            ? "Sign In"
            : mode === "signup"
            ? "Create Account"
            : "Reset Password"}
        </h2>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
          />

          {mode !== "forgot" && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          )}

          {mode === "signup" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          )}

          <button type="submit">
            {mode === "signin"
              ? "Sign In"
              : mode === "signup"
              ? "Sign Up"
              : "Send Reset Link"}
          </button>
        </form>

        <div className="auth-links">
          {mode !== "signin" && <a href="#signin">Sign In</a>}
          {mode !== "signup" && <a href="#signup">Create Account</a>}
          {mode !== "forgot" && <a href="#forgot">Forgot Password?</a>}
        </div>
      </div>
    </div>
  );
}
