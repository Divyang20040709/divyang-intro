import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-glass admin-login-card">
        <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Admin Login</h2>
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        <form onSubmit={handleLogin} className="admin-form">
          <input
            type="text"
            className="admin-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="admin-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
