import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const terminalLines = [
  { prompt: true, cmd: "whoami --verbose" },
  { out: "{" },
  { key: "name", val: '"Divyang Solanki"' },
  { key: "role", val: '"Aspiring AI/ML Engineer"' },
  { key: "location", val: '"Ahmedabad, Gujarat, India"' },
  { key: "experience", val: '"Fresher"' },
  { key: "focus", val: '["AI/ML", "Cloud (AWS)", "Python", "Data Engineering"]' },
  { key: "aspiration", val: '"AI/ML Engineer @ Tech Innovation"' },
  { key: "openToWork", val: "true", green: true },
  { out: "}" },
];

export default function About() {
  const revealProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="about" className="section" style={{ background: "var(--bg2)" }}>
      <motion.div {...revealProps} className="section-header">
        <span className="section-num">01 /</span>
        <h2 className="section-title">About Me</h2>
        <div className="section-line" />
      </motion.div>

      <div className="about-grid">
        <motion.div {...revealProps} transition={{ duration: 0.6, delay: 0.1 }}>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            Hey! I'm <strong style={{ color: "var(--cyan)" }}>Divyang T. Solanki</strong> — an IT student with a strong interest in AI and how it can be applied to solve real-world problems.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            I initially got into tech through curiosity about how digital products work, which gave me a solid foundation in development and how real systems are built.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            Over time, I became more interested in the intelligence behind these systems — how machines can learn from data, make decisions, and automate tasks. That’s what pushed me toward AI/ML.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            Right now, I’m focused on learning AI/ML fundamentals and exploring how to turn ideas into practical solutions. Alongside that, I’m also diving into cloud technologies like Amazon Web Services to understand how real-world applications are deployed and scaled.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            I also use AI tools in my workflow to experiment, learn faster, and explore different approaches while building things.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--text-dim)", marginBottom: "1.5rem" }}>
            My goal is to become an <strong style={{ color: "var(--cyan)" }}>AI/ML engineer</strong> who can build not just models, but complete, real-world systems that are scalable, efficient, and actually useful.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#contact" className="btn-primary" style={{ fontSize: "0.75rem", padding: "0.7rem 1.5rem" }}>Hire Me →</a>
            <a href="/Divyang_Solanki_Resume.pdf" download="Divyang_Solanki_Resume.pdf" className="btn-ghost" style={{ fontSize: "0.75rem", padding: "0.7rem 1.5rem" }}>Download Resume 📄</a>
          </div>
        </motion.div>

        <motion.div {...revealProps} transition={{ duration: 0.6, delay: 0.2 }} style={{
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
        </motion.div>
      </div>
    </section>
  );
}
