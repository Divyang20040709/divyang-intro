import React from "react";
import { motion } from "framer-motion";
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
  const revealProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  return (
    <section id="skills" className="section">
      <motion.div {...revealProps} className="section-header">
        <span className="section-num">02 /</span>
        <h2 className="section-title">Skills</h2>
        <div className="section-line" />
      </motion.div>

      <div className="skills-grid">
        {skillData.map((s, i) => (
          <SkillCard key={s.name} data={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function SkillCard({ data, index }) {
  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="skill-icon">{data.icon}</div>
      <div className="skill-name">{data.name}</div>
      <div className="skill-tags">
        {data.tags.map((t) => <span key={t} className="skill-tag">{t}</span>)}
      </div>
    </motion.div>
  );
}
