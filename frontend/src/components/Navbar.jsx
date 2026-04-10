import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Navbar.css"; // We'll create this file

const links = [
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Education", id: "education" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_theme");
    if (saved === "light") {
      setIsLight(true);
      document.body.classList.add("light-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isLight ? "light" : "dark";
    setIsLight(!isLight);
    document.body.classList.toggle("light-mode");
    localStorage.setItem("portfolio_theme", newTheme);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      let cur = "";
      links.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 160) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          Divyang<span>.dev</span>
        </a>

        {/* Desktop Links */}
        <div className="nav-links">
          {links.map(({ name, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link ${active === id ? "active" : ""}`}
            >
              {name}
              {active === id && (
                <motion.span
                  layoutId="nav-underline"
                  className="nav-underline"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button 
            onClick={toggleTheme}
            className="theme-toggle"
            title="Toggle color theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isLight ? "dark" : "light"}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isLight ? "🌙" : "☀"}
              </motion.span>
            </AnimatePresence>
          </button>
          
          <a 
            href="/Divyang_Solanki_Resume.pdf" 
            download
            className="resume-btn"
          >
            Resume 
            <span className="resume-icon">📄</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`hamburger ${mobileMenuOpen ? "open" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-menu"
          >
            {links.map(({ name, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
