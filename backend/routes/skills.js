const express = require("express");
const router = express.Router();
const { getAllSkills, addSkill, deleteSkill } = require("../controllers/skillController");
const { protect } = require("../middleware/auth");

// Public route
router.get("/", getAllSkills);

// Protected routes
router.post("/", protect, addSkill);
router.delete("/:id", protect, deleteSkill);

module.exports = router;
