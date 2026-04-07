import React, { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./Contact.css";

const socialLinks = [
  { icon: "✉", label: "divyangsolanki2004@gmail.com",        href: "mailto:divyangsolanki2004@gmail.com" },
  { icon: "⌥", label: "github.com/Divyang20040709",  href: "https://github.com/Divyang20040709" },
  { icon: "⊞", label: "linkedin.com/in/DivyangSolanki", href: "https://www.linkedin.com/in/divyang-solanki-b5037a2a3/" },

];

const INIT = { name: "", email: "", message: "" };

export default function Contact() {
  const h = useReveal();
  const left = useReveal();
  const right = useReveal();

  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");

    // Prepare Web3Forms form data
    const formData = new FormData();
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE"); // USER: Replace with your actual key from web3forms.com
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("message", form.message);
    formData.append("subject", "New Portfolio Inquiry from " + form.name);
    formData.append("from_name", "Portfolio Contact Form");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
        setForm(INIT);
      } else {
        throw new Error(data.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      setErrMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section" style={{ background: "var(--bg2)" }}>
      <div ref={h} className="section-header reveal">
        <span className="section-num">05 /</span>
        <h2 className="section-title">Contact</h2>
        <div className="section-line" />
      </div>

      <div className="contact-grid">
        {/* Left */}
        <div ref={left} className="reveal">
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
                className="contact-link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <span className="contact-link-icon">{l.icon}</span>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div ref={right} className="reveal">
          {status === "success" ? (
            <div className="contact-success">
              <div className="success-icon">✓</div>
              <h4>Message sent!</h4>
              <p>Thanks for reaching out. I'll get back to you soon.</p>
              <button className="btn-ghost" style={{ marginTop: "1.5rem", fontSize: "0.75rem" }}
                onClick={() => setStatus("idle")}>
                Send another →
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
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
                />
              </div>

              {status === "error" && (
                <p className="form-error">⚠ {errMsg}</p>
              )}

              <button
                type="submit"
                className="btn-primary form-submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
