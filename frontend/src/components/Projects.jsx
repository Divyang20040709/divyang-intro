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
          {project.githubLink && (
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="action-btn" title="GitHub Source">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              GitHub
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="action-btn primary" title="View Live">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Live
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
