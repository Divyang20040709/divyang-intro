import React, { useEffect, useState } from "react";

const links = ["about", "skills", "projects", "education", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = "";
      links.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1.2rem 6rem",
      background: scrolled ? "rgba(7,8,13,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s",
    }}>
      <a href="#" style={{
        fontFamily: "var(--font-display)", fontWeight: 800,
        fontSize: "1.1rem", color: "var(--cyan)", letterSpacing: "0.05em",
      }}>
        Divyang<span style={{ color: "var(--text-dim)", fontWeight: 400 }}>.dev</span>
      </a>

      <div style={{ display: "flex", gap: "2.5rem" }}>
        {links.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            style={{
              fontSize: "0.72rem", letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: active === id ? "var(--cyan)" : "var(--text-dim)",
              position: "relative", transition: "color 0.2s",
            }}
          >
            {id}
            <span style={{
              position: "absolute", bottom: -4, left: 0, right: 0,
              height: 1, background: "var(--cyan)",
              transform: active === id ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.2s",
            }} />
          </a>
        ))}
      </div>
    </nav>
  );
}
