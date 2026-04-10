const express = require("express");
const router = express.Router();
const { validateContact, submitContact } = require("../controllers/contactController");

// POST /api/contact
router.post("/", validateContact, submitContact);

module.exports = router;
