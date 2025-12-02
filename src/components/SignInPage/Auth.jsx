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
    role: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signIn = async () => {
    const response = await fetch("https://localhost:7153/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Username: form.username,
        password: form.password
      })
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
        Role: form.role
      })
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
      if (!form.username.trim()) return "Username required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    setError("");

    if (mode === "signin") {
      try {
        const data = await signIn();   // signUp throws if not ok
        console.log("logging account:", data);

        localStorage.setItem("token", data.Token);
        localStorage.setItem("refreshToken", data.RefreshToken);
        localStorage.setItem("tokenExpiry", data.Expiration);

        navigate('/app/devices');

      } catch (err) {
        setError(err.message);
        console.log(err.message);  // show backend error
      }
    } else if (mode === "signup") {
      try {
        const res = await signUp();   // signUp throws if not ok

        console.log("Creating account:", form);
        alert("Account created. Please sign in.");
        window.location.hash = "signin";

      } catch (err) {
        setError(err.message);
        console.log(err.message);  // show backend error
      }
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

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />

          {mode === "signup" && (
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
            />
          )}
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
          {mode === "signup" && (
            <select
              name="role"
              className="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Finance">Finance</option>
              <option value="Auditor">Auditor</option>
            </select>
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
