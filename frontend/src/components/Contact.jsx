import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";

const contactLinks = [
  { icon: "✉️", label: "Email", val: "divyangsolanki2004@gmail.com", href: "mailto:divyangsolanki2004@gmail.com" },
  { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/divyang-solanki", href: "https://www.linkedin.com/in/divyang-solanki-657534292/" },
  { icon: "🐙", label: "GitHub", val: "github.com/Divyang20040709", href: "https://github.com/Divyang20040709" },
];

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const revealProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 },
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    const formData = new FormData(event.target);
    formData.append("access_key", "0e9dabf2-2e3e-4b15-aa63-77950dfd5538");
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) { setStatus("success"); event.target.reset(); }
      else { setStatus("error"); setErrorMsg("Something went wrong. Please try again."); }
    } catch { setStatus("error"); setErrorMsg("Network error. Please try again."); }
  };

  return (
    <section id="contact" className="section">
      <motion.div {...revealProps} className="section-header">
        <span className="section-num">05 /</span>
        <h2 className="section-title">Get In Touch</h2>
        <div className="section-line" />
      </motion.div>
      <div className="contact-grid">
        <motion.div {...revealProps} transition={{ duration: 0.6, delay: 0.1 }}>
          <h3 className="contact-heading">
            Let&apos;s build something <span style={{ color: "var(--cyan)" }}>amazing</span> together.
          </h3>
          <p className="contact-subtext">
            I&apos;m currently open to new opportunities — full-time roles, internships, or freelance projects.
            Whether you have a question, a project idea, or just want to say hi, my inbox is always open!
          </p>
          <div className="contact-links">
            {contactLinks.map((link) => (
              <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="contact-link-card" whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <div className="contact-link-icon-box">{link.icon}</div>
                <div className="contact-link-info">
                  <span className="contact-link-label">{link.label}</span>
                  <span className="contact-link-val">{link.val}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
        <motion.div {...revealProps} transition={{ duration: 0.6, delay: 0.2 }} className="contact-form-container">
          {status === "success" ? (
            <motion.div className="contact-success" initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} style={{ borderRadius: "var(--radius)" }}>
              <div className="success-icon">✓</div>
              <h4>Message Received!</h4>
              <p>Thanks for reaching out. I&apos;ll get back to you soon.</p>
              <button className="btn-ghost" style={{ marginTop: "2rem", fontSize: "0.8rem" }} onClick={() => setStatus("idle")}>
                Send Another →
              </button>
            </motion.div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Your Name</label>
                <input id="contact-name" type="text" name="name" className="form-input" placeholder="Divyang Solanki" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email Address</label>
                <input id="contact-email" type="email" name="email" className="form-input" placeholder="you@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject" className="form-label">Subject</label>
                <input id="contact-subject" type="text" name="subject" className="form-input" placeholder="Project Collaboration / Internship / Say Hi" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">Message</label>
                <textarea id="contact-message" name="message" className="form-textarea" placeholder="Tell me about your project or opportunity..." required />
              </div>
              {status === "error" && <p className="form-error">⚠ {errorMsg}</p>}
              <button type="submit" className="btn-primary form-submit" disabled={status === "sending"}
                style={{ width: "100%", justifyContent: "center" }}>
                {status === "sending" ? "Sending…" : "Send Message →"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
