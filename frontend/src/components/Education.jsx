import React from "react";
import { useReveal } from "../hooks/useReveal";
import "./Education.css";

const eduData = [
  {
    period: "2022 — 2026",
    degree: "BTech in Information and Technology",
    school: "Indus University, Ahmedabad",
  },
];

export default function Education() {
  const h = useReveal();

  return (
    <section id="education" className="section">
      <div ref={h} className="section-header reveal">
        <span className="section-num">04 /</span>
        <h2 className="section-title">Education</h2>
        <div className="section-line" />
      </div>

      <div className="edu-timeline">
        {eduData.map((e, i) => (
          <EduItem key={i} data={e} delay={i * 120} />
        ))}
      </div>
    </section>
  );
}

function EduItem({ data, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="edu-item reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="edu-dot" />
      <div className="edu-year">{data.period}</div>
      <h3 className="edu-degree">{data.degree}</h3>
      <p className="edu-school">{data.school}</p>
      <p className="edu-detail">{data.detail}</p>
      <span className="edu-badge">{data.badge}</span>
    </div>
  );
}
