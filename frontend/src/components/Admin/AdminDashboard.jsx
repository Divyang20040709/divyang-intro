import React, { useState } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import ProjectManager from "./ProjectManager";
import SkillManager from "./SkillManager";
import "./Admin.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="nav-logo">Admin<span>Panel</span></h1>
        <button className="social-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="admin-nav">
        <div 
          className={`admin-nav-item ${activeTab === "projects" ? "active" : ""}`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </div>
        <div 
          className={`admin-nav-item ${activeTab === "skills" ? "active" : ""}`}
          onClick={() => setActiveTab("skills")}
        >
          Skills
        </div>
      </div>

      <div className="admin-glass">
        {activeTab === "projects" ? <ProjectManager /> : <SkillManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;
