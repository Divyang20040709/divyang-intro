import React, { useState, useEffect } from "react";
import "./Admin.css";
import { API_URL } from "../../api";



const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
    featured: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...formData,
      techStack: typeof formData.techStack === "string" 
        ? formData.techStack.split(",").map(s => s.trim()) 
        : formData.techStack
    };

    try {
      const url = editingId ? `${API_URL}/api/projects/${editingId}` : `${API_URL}/api/projects`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        setFormData({ title: "", description: "", techStack: "", githubLink: "", liveLink: "", featured: false });
        setEditingId(null);
        fetchProjects();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setFormData({
      title: p.title,
      description: p.description,
      techStack: p.techStack.join(", "),
      githubLink: p.githubLink || "",
      liveLink: p.liveLink || "",
      featured: p.featured || false,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${API_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>{editingId ? "Edit Project" : "Add New Project"}</h3>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          className="admin-input"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          className="admin-textarea"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          className="admin-input"
          placeholder="Tech Stack (comma separated: React, Node, etc.)"
          value={formData.techStack}
          onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
          required
        />
        <input
          className="admin-input"
          placeholder="GitHub Link"
          value={formData.githubLink}
          onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
        />
        <input
          className="admin-input"
          placeholder="Live Demo Link"
          value={formData.liveLink}
          onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
        />
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          Featured Project
        </label>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Saving..." : editingId ? "Update Project" : "Add Project"}
        </button>
        {editingId && (
          <button type="button" className="btn-ghost" onClick={() => {
            setEditingId(null);
            setFormData({ title: "", description: "", techStack: "", githubLink: "", liveLink: "", featured: false });
          }}>Cancel</button>
        )}
      </form>

      <hr style={{ margin: "2rem 0", borderColor: "var(--border)" }} />

      <h3>Project List</h3>
      <div className="admin-grid">
        {projects.map((p) => (
          <div key={p._id} className="admin-item-card">
            <div className="admin-item-info">
              <h4>{p.title}</h4>
              <div className="admin-item-status">
                {p.githubLink ? <span className="status-tag success">GitHub ✓</span> : <span className="status-tag dim">No GitHub</span>}
                {p.liveLink ? <span className="status-tag success">Live ✓</span> : <span className="status-tag dim">No Live</span>}
              </div>
            </div>
            <div className="admin-item-actions">
              <button className="admin-btn-edit" onClick={() => handleEdit(p)}>Edit</button>
              <button className="admin-btn-delete" onClick={() => handleDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
