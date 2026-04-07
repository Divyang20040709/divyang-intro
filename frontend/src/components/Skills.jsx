import React from "react";
import { useReveal } from "../hooks/useReveal";
import "./Skills.css";

const skillData = [
  { icon: "⚛️", name: "Frontend", tags: ["React","HTML/CSS"] },
  { icon: "🔧", name: "Backend",  tags: ["Node.js","Python","FastAPI","REST APIs"] },
  { icon: "🗄️", name: "Databases",tags: ["MongoDB","Firebase"] },
  { icon: "☁️", name: "DevOps & Cloud", tags: ["AWS","GitHub Actions"] },
  { icon: "🛠️", name: "Tools",    tags: ["Git","VS Code","Postman","Anaconda"] },
  { icon: "🤖", name: "AI / ML",  tags: ["Hugging Face"] },
];

export default function Skills() {
  const h = useReveal();

  return (
    <section id="skills" className="section">
      <div ref={h} className="section-header reveal">
        <span className="section-num">02 /</span>
        <h2 className="section-title">Skills</h2>
        <div className="section-line" />
      </div>

      <div className="skills-grid">
        {skillData.map((s, i) => (
          <SkillCard key={s.name} data={s} delay={i * 80} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ data, delay }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="skill-card reveal" style={{ transitionDelay: `${delay}ms` }}>
      <div className="skill-icon">{data.icon}</div>
      <div className="skill-name">{data.name}</div>
      <div className="skill-tags">
        {data.tags.map((t) => <span key={t} className="skill-tag">{t}</span>)}
      </div>
    </div>
  );
}
