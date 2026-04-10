const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret_for_dev", {
    expiresIn: "30d",
  });
};

// @route   POST /api/auth/login
// @desc    Authenticate admin & get token
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/auth/register-initial-admin
// @desc    Register the first admin (only works if no admin exists)
router.post("/register-initial-admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminExists = await User.countDocuments({});
    if (adminExists > 0) {
      return res.status(400).json({ error: "Admin already exists. Use login instead." });
    }

    const user = await User.create({ username, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
