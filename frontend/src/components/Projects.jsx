import React, { useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal";
import "./Projects.css";

export default function Projects() {
  const h = useReveal();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use relative path locally (Vite proxy handles it) or full URL in production
    const base = import.meta.env.VITE_API_URL || "";
    console.log("[Projects] Fetching from:", `${base}/api/projects`);

    fetch(`${base}/api/projects`)
      .then((r) => {
        if (!r.ok) throw new Error(`Server responded with ${r.status}`);
        return r.json();
      })
      .then((data) => {
        console.log("[Projects] Loaded:", data.projects?.length, "projects");
        setProjects(data.projects);
      })
      .catch((err) => {
        console.error("[Projects] Fetch error:", err.message);
        setError("Could not load projects.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section" style={{ background: "var(--bg2)" }}>
      <div ref={h} className="section-header reveal">
        <span className="section-num">03 /</span>
        <h2 className="section-title">Projects</h2>
        <div className="section-line" />
      </div>

      {loading && (
        <div className="projects-loading">
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span className="loading-dot" />
          <span style={{ marginLeft: "1rem", color: "var(--text-dim)", fontSize: "0.8rem" }}>
            Loading projects...
          </span>
        </div>
      )}

      {error && (
        <p style={{ color: "var(--text-dim)", fontSize: "0.85rem" }}>⚠ {error}</p>
      )}

      {!loading && !error && (
        <div className="projects-list">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 80} />
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="project-card reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="project-num">{project.num}</div>

      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-stack">
          {project.stack.map((s) => (
            <span key={s} className="stack-tag">{s}</span>
          ))}
        </div>
      </div>

      <div className="project-actions">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="project-link" title="GitHub">
            ⌥
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="project-link" title="Live">
            ↗
          </a>
        )}
      </div>
    </div>
  );
}
