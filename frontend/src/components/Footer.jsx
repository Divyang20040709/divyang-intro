import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      padding: "2rem 6rem",
      borderTop: "1px solid var(--border)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1rem",
    }}>
      <p style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>
        © {year} <span style={{ color: "var(--cyan)" }}>Divyang Solanki</span> — Crafted with precision.
      </p>
      <div style={{ display: "flex", gap: "1.2rem", fontSize: "0.68rem" }}>
        <a href="mailto:divyangsolanki2004@gmail.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-dim)", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "var(--cyan)"} onMouseOut={(e) => e.target.style.color = "var(--text-dim)"}>Gmail</a>
        <a href="https://github.com/Divyang20040709" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-dim)", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "var(--cyan)"} onMouseOut={(e) => e.target.style.color = "var(--text-dim)"}>GitHub</a>
        <a href="https://www.linkedin.com/in/divyang-solanki-b5037a2a3/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-dim)", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "var(--cyan)"} onMouseOut={(e) => e.target.style.color = "var(--text-dim)"}>LinkedIn</a>
      </div>
    </footer>
  );
}
