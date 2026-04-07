import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />

      <div className="hero-content">
        <div className="hero-tag">// Available for work</div>
        <h1 className="hero-name">
          Divyang<br /><span className="accent">Solanki.</span>
        </h1>
        <p className="hero-role">Python & Ai/ML Engineer</p>
        <p className="hero-desc">
          I build intelligent, data-driven applications using Python and AI/ML—transforming raw data into smart solutions. Obsessed with clean code, efficient models, and real-world impact.
        </p>
        <div className="hero-btns">
          <a href="#projects" className="btn-primary">→ View Projects</a>
          <a href="#contact" className="btn-ghost">↗ Let's Talk</a>
        </div>
      </div>

      <div className="hero-image-container">
        <div className="hero-image-border" />
        <img src="/Divyang.jpeg" alt="Divyang Solanki" className="hero-image" />
      </div>

      <div className="hero-stats">
        {[
          // { num: "0", label: "Years Exp" },
          { num: "05", label: "Projects" },
        ].map(({ num, label }) => (
          <div key={label} className="stat-item">
            <div className="stat-num">{num}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
