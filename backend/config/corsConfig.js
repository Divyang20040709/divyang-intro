const rawClientUrl = (process.env.CLIENT_URL || "https://my-portfolio-qows.onrender.com").trim().replace(/\/$/, "");

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://divyang-intro.vercel.app",
    "https://divyang-intro.onrender.com",
    process.env.CLIENT_URL,
  ].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = { corsOptions, rawClientUrl };
