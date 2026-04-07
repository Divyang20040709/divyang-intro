import React from "react";
import { useReveal } from "../hooks/useReveal";

const terminalLines = [
  { prompt: true, cmd: "whoami --verbose" },
  { out: "{" },
  { key: "name", val: '"Divyang Solanki"' },
  { key: "role", val: '"Python & Ai/ML Engineer"' },
  { key: "location", val: '"Ahmedabad, Gujarat, India"' },
  { key: "experience", val: '"Fresher"' },
  { key: "focus", val: '["Python", "Ai/ML", "AWS"]' },
  { key: "openToWork", val: "true", green: true },
  { out: "}" },
];

export default function About() {
  const h = useReveal();
  const t = useReveal();
  const txt = useReveal();

  return (
    <section id="about" className="section" style={{ background: "var(--bg2)" }}>
      <div ref={h} className="section-header reveal">
        <span className="section-num">01 /</span>
        <h2 className="section-title">About Me</h2>
        <div className="section-line" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
        <div ref={txt} className="reveal">
          <p style={{ fontSize: "0.9rem", lineHeight: 2, color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            Hey! I'm <strong style={{ color: "var(--cyan)" }}>Divyang T. Solanki</strong> — an Python and Ai/ML Engineer
            who loves turning complex problems into elegant, scalable solutions. I specialize in modern
            Python and AI/ML ecosystems and cloud-native architecture.
          </p>
          <p style={{ fontSize: "0.9rem", lineHeight: 2, color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            My approach is simple: <strong style={{ color: "var(--cyan)" }}>write code that works,
            then make it beautiful</strong>. I care deeply about developer experience, performance,
            and shipping products people actually enjoy using.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#contact" className="btn-primary" style={{ fontSize: "0.75rem", padding: "0.7rem 1.5rem" }}>Hire Me →</a>
            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: "0.75rem", padding: "0.7rem 1.5rem" }}>Resume ↗</a>
          </div>
        </div>

        <div ref={t} className="reveal" style={{
          background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 2, overflow: "hidden"
        }}>
          {/* Terminal header */}
          <div style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.75rem 1rem",
            background: "rgba(255,255,255,0.03)",
            borderBottom: "1px solid var(--border)"
          }}>
            {["#ff5f57","#febc2e","#28c840"].map((c) => (
              <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display:"inline-block" }} />
            ))}
            <span style={{ fontSize: "0.68rem", color: "var(--text-dim)", margin: "0 auto" }}>divyang@portfolio ~</span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: "1.5rem", fontSize: "0.8rem", lineHeight: 2.1 }}>
            {terminalLines.map((line, i) => (
              <div key={i} style={{ display: "flex", gap: "0.8rem" }}>
                {line.prompt && <span style={{ color: "var(--green)" }}>❯</span>}
                {line.cmd && <span style={{ color: "var(--text)" }}>{line.cmd}</span>}
                {line.out && <span style={{ color: "var(--text-dim)" }}>{line.out}</span>}
                {line.key && (
                  <span>
                    &nbsp;&nbsp;<span style={{ color: "var(--cyan)" }}>{line.key}:</span>{" "}
                    <span style={{ color: line.green ? "var(--green)" : "#fff" }}>{line.val}</span>
                  </span>
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
              <span style={{ color: "var(--green)" }}>❯</span>
              <span style={{ display: "inline-block", width: 8, height: 14, background: "var(--cyan)", animation: "blink 1s infinite", verticalAlign: "middle" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
