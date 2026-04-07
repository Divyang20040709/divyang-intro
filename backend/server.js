require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const contactRoutes = require("./routes/contact");
const projectRoutes = require("./routes/projects");

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV?.trim() || "development";

// ─── CORS ────────────────────────────────────────────────────
// Normalize CLIENT_URL: strip trailing slash to avoid mismatch
const rawClientUrl = (process.env.CLIENT_URL || "http://localhost:5173").trim().replace(/\/$/, "");

const allowedOrigins = [
  rawClientUrl,
  "http://localhost:5173",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    // Normalize incoming origin too (strip trailing slash)
    const normalized = origin.replace(/\/$/, "");
    if (allowedOrigins.includes(normalized)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// ─── Middleware ───────────────────────────────────────────────
app.use(helmet());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Pre-flight for all routes
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ─── Root Route (Render health check) ────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", environment: NODE_ENV, timestamp: new Date().toISOString() });
});

// ─── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.originalUrl });
});

// ─── Global Error Handler ─────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR:`, err.message);
  if (NODE_ENV !== "production") console.error(err.stack);

  // CORS errors return 403
  if (err.message?.startsWith("CORS:")) {
    return res.status(403).json({ error: err.message });
  }

  res.status(err.status || 500).json({
    error: NODE_ENV === "production" ? "Internal server error" : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} [${NODE_ENV}]`);
  console.log(`   Allowed origin: ${rawClientUrl}`);
});
