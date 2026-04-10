import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 1, 0.5, 1] 
      } 
    },
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />

      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* <motion.div variants={itemVariants} className="hero-tag">
          <span className="hero-tag-dot" />
          // Available for work
        </motion.div> */}
        
        <motion.h1 variants={itemVariants} className="hero-name">
          Divyang <span className="accent">Solanki</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="hero-role-title">
          IT Student & Aspiring AI Engineer
        </motion.div>
        
        <motion.p variants={itemVariants} className="hero-desc">
          Building scalable full-stack applications with Ai intergrated and intelligent data-driven solutions with Python, and AI/ML.
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-btns">
          <a href="/Divyang_Solanki_Resume.pdf" download className="btn-primary">
            <span className="btn-icon">📄</span>
            Resume
          </a>
          <div className="hero-socials">
            <a href="https://github.com/Divyang20040709" target="_blank" rel="noreferrer" className="social-btn" title="GitHub">
              <span className="btn-icon">⌥</span> GitHub
            </a>
            <a href="https://www.linkedin.com/in/divyang-solanki-b5037a2a3/" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn">
              <span className="btn-icon">⊞</span> LinkedIn
            </a>
          </div>
        </motion.div>

        <div className="hero-scroll">
          <div className="hero-stat-main">
            <span className="stat-num">06</span>
            <span className="stat-label">PROJECTS</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="hero-image-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      >
        <div className="hero-image-border" />
        <div className="hero-image-overlay" />
        <img src="/Divyang.jpeg" alt="Divyang Solanki" className="hero-image" />
      </motion.div>
    </section>
  );
}
