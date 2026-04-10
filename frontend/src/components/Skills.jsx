import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getSkills } from "../api";
import "./Skills.css";

export default function Skills() {
  const [skillData, setSkillData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkillData(data);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const revealProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6 }
  };

  if (loading && skillData.length === 0) {
    return null; // Or a skeleton
  }

  return (
    <section id="skills" className="section">
      <motion.div {...revealProps} className="section-header">
        <span className="section-num">02 /</span>
        <h2 className="section-title">Skills</h2>
        <div className="section-line" />
      </motion.div>

      <div className="skills-grid">
        {skillData.map((s, i) => (
          <SkillCard key={s._id || i} data={s} index={i} />
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
