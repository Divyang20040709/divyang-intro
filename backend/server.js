require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const connectDB = require("./config/db");

const contactRoutes = require("./routes/contact");
const projectRoutes = require("./routes/projects");
const skillRoutes = require("./routes/skills");
const authRoutes = require("./routes/auth");

connectDB();

const app = express();

// 1. GLOBAL HEADER MIDDLEWARE (TOP PRIORITY)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// 2. MIDDLEWARE ORDER (VERY IMPORTANT)
app.use(cors());
app.use(express.json());
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(morgan("dev"));

// ✅ 5. RATE LIMIT (AFTER CORS)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// ─── ROUTES ─────────────────────────
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);

// ─── ERROR HANDLER ──────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});