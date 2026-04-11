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

// 2. MIDDLEWARE CONFIGURATION
const allowedOrigins = [
  "https://divyang-intro.vercel.app",
  "http://localhost:5173", // Vite default dev port
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
                     origin.match(/^https:\/\/divyang-intro-.*\.vercel\.app$/); // Vercel previews

    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`[CORS Blocked] Origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

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