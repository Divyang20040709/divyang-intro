const express = require("express");
const router = express.Router();
const { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} = require("../controllers/projectController");
const { protect } = require("../middleware/auth");

// Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Protected routes (Admin only)
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
