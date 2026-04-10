const Project = require("../models/Project");

// @route   GET /api/projects
// @desc    Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const { featured } = req.query;
    const query = featured === "true" ? { featured: true } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.status(200).json({ projects });
  } catch (err) {
    console.error("Error fetching projects:", err.message);
    res.status(500).json({ error: "Failed to fetch projects." });
  }
};

// @route   GET /api/projects/:id
// @desc    Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    console.error("Error fetching project:", err.message);
    res.status(500).json({ error: "Failed to fetch project." });
  }
};

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private/Admin
exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private/Admin
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private/Admin
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

