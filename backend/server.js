require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const mongoose = require("mongoose");

// const contactRoutes = require("./routes/contact"); // Removed for Web3Forms migration
const projectRoutes = require("./routes/projects");
const skillRoutes = require("./routes/skills");
const authRoutes = require("./routes/auth");
const { corsOptions } = require("./config/corsConfig");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

// 2. MIDDLEWARE CONFIGURATION
app.use(cors(corsOptions));

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
// app.use("/api/contact", contactRoutes); // Removed for Web3Forms migration
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