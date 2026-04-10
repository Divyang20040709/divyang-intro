const Skill = require("../models/Skill");

// @route   GET /api/skills
// @desc    Get all skills
exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.status(200).json({ skills });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @route   POST /api/skills
// @desc    Add a new skill
// @access  Private/Admin
exports.addSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    const savedSkill = await skill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @route   DELETE /api/skills/:id
// @desc    Delete a skill
// @access  Private/Admin
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.status(200).json({ success: true, message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
