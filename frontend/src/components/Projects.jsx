import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProjects } from "../api";
import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const revealProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
  };

  return (
    <section id="projects" className="section">
      <motion.div {...revealProps} className="section-header">
        <span className="section-num">03 /</span>
        <h2 className="section-title">Projects</h2>
        <div className="section-line" />
      </motion.div>

      {loading && (
        <div className="projects-loading">
          <div className="loader" />
          <p>Fetching architectural designs...</p>
        </div>
      )}

      {error && (
        <div className="projects-error">
          <p>⚠ {error}</p>
          <button className="btn-ghost" onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p._id || i} project={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project, index }) {
  // Use generated placeholders if image missing
  const imageSrc = project.image || (index % 2 === 0 ? "/project1.png" : "/project2.png");

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
    >
      <div className="project-image-wrapper">
        <img src={imageSrc} alt={project.title} className="project-card-image" />
        <div className="project-num-tag">{String(index + 1).padStart(2, "0")}</div>
      </div>

      <div className="project-body">
        <h3 className="project-card-title">{project.title}</h3>
        
        <div className="project-card-stack">
          {(project.techStack || project.stack || []).map((s) => (
            <span key={s} className="card-stack-tag">{s}</span>
          ))}
        </div>

        <p className="project-card-desc">{project.description}</p>
        
        <div className="project-actions">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="action-btn" title="GitHub Source">
              ⌥ Source Code
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="action-btn primary" title="View Live">
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
