import express from "express"
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import urlRoutes from "./routes/url.route.js";


const app = express();

// ─── CORS ────────────────────────────────────────────────
// In production, restrict to your actual frontend domain.
const FRONTEND_URL = process.env.FRONTEND_URL || "*";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// ─── Rate Limiting (simple in-memory) ────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute per IP

function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return res.status(429).json({
      success: false,
      error: "Too many requests. Please wait a minute and try again.",
    });
  }

  entry.count++;
  return next();
}

// Apply rate limiter to the heavy pipeline endpoint
app.use("/api/v1/url", rateLimiter);

// ─── Static File Serving ─────────────────────────────────
// Serve generated clips and source videos as static files
const tempRoot = path.join(process.cwd(), "..", "temp");
app.use("/media/clips", express.static(path.join(tempRoot, "clips")));
app.use("/media/video", express.static(path.join(tempRoot, "video")));

// ─── Health Check ────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "shortify-backend",
    version: "1.0.0",
    uptime: process.uptime(),
  });
});

// ─── Routes ──────────────────────────────────────────────
app.use("/api/v1", authRoutes);
app.use("/api/v1", urlRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Shortify Backend API — Running",
    docs: {
      health: "/health",
      pipeline: "POST /api/v1/url",
      auth: "/api/v1/register | /api/v1/login",
    },
  });
});

export default app