import React, { useState, useEffect } from "react";
import "./Admin.css";

const categories = ["Frontend", "Backend", "Databases", "DevOps & Cloud", "Tools", "AI / ML"];

const API_URL = "https://divyang-intro.onrender.com";

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    tags: "",
    icon: ""
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await fetch(`${API_URL}/api/skills`);
      const data = await res.json();
      setSkills(data.skills || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()).filter(t => t !== "")
    };

    try {
      const res = await fetch(`${API_URL}/api/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        setFormData({ name: "", category: "Frontend", tags: "", icon: "" });
        fetchSkills();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`${API_URL}/api/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchSkills();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Add New Skill Group</h3>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          className="admin-input"
          placeholder="Group Name (e.g. Frontend)"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <select 
          className="admin-input"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          className="admin-input"
          placeholder="Icon (Emoji: ⚛️)"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
        />
        <input
          className="admin-input"
          placeholder="Skills (comma separated: React, HTML, CSS)"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          required
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Skill Group"}
        </button>
      </form>

      <hr style={{ margin: "2rem 0", borderColor: "var(--border)" }} />

      <h3>Skill Groups List</h3>
      <div className="admin-grid">
        {skills.map((s) => (
          <div key={s._id} className="admin-item-card">
            <h4>{s.icon} {s.name}</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>Category: {s.category}</p>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {s.tags.map(t => <span key={t} className="card-stack-tag">{t}</span>)}
            </div>
            <div className="admin-item-actions">
              <button className="admin-btn-delete" onClick={() => handleDelete(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;
