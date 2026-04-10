import React from "react";
import { motion } from "framer-motion";
import "./Education.css";

const eduData = [
  {
    period: "2022 — 2026",
    degree: "BTech in Information and Technology",
    school: "Indus University, Ahmedabad",
  },
];

export default function Education() {
  const revealProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="education" className="section">
      <motion.div {...revealProps} className="section-header">
        <span className="section-num">04 /</span>
        <h2 className="section-title">Education</h2>
        <div className="section-line" />
      </motion.div>

      <div className="edu-timeline">
        {eduData.map((e, i) => (
          <EduItem key={i} data={e} index={i} />
        ))}
      </div>
    </section>
  );
}

function EduItem({ data, index }) {
  return (
    <motion.div
      className="edu-item"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="edu-dot" />
      <div className="edu-year">{data.period}</div>
      <h3 className="edu-degree">{data.degree}</h3>
      <p className="edu-school">{data.school}</p>
      <p className="edu-detail">{data.detail}</p>
      <span className="edu-badge">{data.badge}</span>
    </motion.div>
  );
}
