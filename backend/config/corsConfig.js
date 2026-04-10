const rawClientUrl = (process.env.CLIENT_URL || "https://my-portfolio-qows.onrender.com").trim().replace(/\/$/, "");

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    const normalized = origin.replace(/\/$/, "");
    
    // We only allow CLIENT_URL as instructed for security.
    if (normalized === rawClientUrl || origin === rawClientUrl) {
      callback(null, true);
    } else if (process.env.NODE_ENV !== "production" && ["http://localhost:5173", "http://localhost:3000"].includes(normalized)) {
      // Allow localhost in dev
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

module.exports = { corsOptions, rawClientUrl };
