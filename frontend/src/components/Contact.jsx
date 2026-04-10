import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendContact } from "../api";
import "./Contact.css";

const socialLinks = [
  { icon: "✉", label: "Email", val: "divyangsolanki2004@gmail.com", href: "mailto:divyangsolanki2004@gmail.com" },
  { icon: "⌥", label: "GitHub", val: "github.com/Divyang20040709", href: "https://github.com/Divyang20040709" },
  { icon: "⊞", label: "LinkedIn", val: "linkedin.com/in/Divyang-Solanki", href: "https://www.linkedin.com/in/divyang-solanki-b5037a2a3/" },
];

const INIT = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");

    try {
      await sendContact({
        name: form.name,
        email: form.email,
        message: form.message,
      });

      setStatus("success");
      setForm(INIT);
    } catch (err) {
      console.error("[Contact] Error:", err.message);
      setErrMsg(err.message);
      setStatus("error");
    }
  };

  const revealProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <section id="contact" className="section" style={{ background: "var(--bg2)" }}>
      <motion.div {...revealProps} className="section-header">
        <span className="section-num">05 /</span>
        <h2 className="section-title">Contact</h2>
        <div className="section-line" />
      </motion.div>

      <div className="contact-grid">
        {/* Left */}
        <motion.div {...revealProps} transition={{ duration: 0.6, delay: 0.1 }}>
          <h3 className="contact-heading">
            Let's build something{" "}
            <span style={{ color: "var(--cyan)" }}>great</span> together.
          </h3>
          <p className="contact-subtext">
            Have a project in mind? Looking for a developer who cares about
            quality? Drop me a message — I typically respond within 24 hours.
          </p>
          <div className="contact-links">
            {socialLinks.map((l) => (
              <a 
                key={l.label} 
                href={l.href} 
                className="contact-link-card" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <div className="contact-link-icon-box">{l.icon}</div>
                <div className="contact-link-info">
                  <span className="contact-link-label">{l.label}</span>
                  <span className="contact-link-val">{l.val}</span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div {...revealProps} transition={{ duration: 0.6, delay: 0.2 }} className="contact-form-container">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                key="success"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="contact-success"
              >
                <div className="success-icon">✓</div>
                <h4>Message sent!</h4>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button className="btn-ghost" style={{ marginTop: "1.5rem", fontSize: "0.75rem" }}
                  onClick={() => setStatus("idle")}>
                  Send another →
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="contact-form" 
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    disabled={status === "sending"}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    disabled={status === "sending"}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    minLength={10}
                    disabled={status === "sending"}
                  />
                </div>

                {status === "error" && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="form-error"
                  >
                    ⚠ {errMsg}
                  </motion.p>
                )}

                <button
                  type="submit"
                  className={`btn-primary form-submit ${status === "sending" ? "loading" : ""}`}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : "Send Message →"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
