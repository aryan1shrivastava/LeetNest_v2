import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import problemRoutes from "./routes/problem.routes.js";
import authRoutes from "./routes/auth.routes.js";
import executionRoutes from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";
import userRoutes from "./routes/user.routes.js";
import { db } from "./libs/db.js";

dotenv.config();

const app = express();

// CORS configuration
// In development, always allow localhost:5173, otherwise use FRONTEND_URL
const isDevelopment = process.env.NODE_ENV !== "production";
let corsOrigin = isDevelopment 
  ? "http://localhost:5173"
  : (process.env.FRONTEND_URL || "http://localhost:5173");

// Remove trailing slash to avoid CORS issues
if (corsOrigin && corsOrigin.endsWith('/')) {
  corsOrigin = corsOrigin.slice(0, -1);
}

// Log CORS configuration for debugging
console.log("CORS Origin configured:", corsOrigin);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("FRONTEND_URL from env:", process.env.FRONTEND_URL);

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    cookies: req.cookies,
    headers: req.headers,
  });
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.get("/", (req, res) => {
  res.send("Welcome to LeetNest");
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executionRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  console.log("404 Not Found:", req.method, req.path);
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

// Test database connection on startup
const testDatabaseConnection = async () => {
  try {
    await db.$connect();
    console.log("✅ Database connection successful");
    
    // Try a simple query to verify tables exist
    const userCount = await db.user.count();
    console.log(`✅ Database tables accessible. Current user count: ${userCount}`);
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("Error details:", {
      code: error.code,
      meta: error.meta,
    });
  }
};

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  console.log("Available routes:");
  console.log("- GET /health");
  console.log("- GET /api/v1/users/activity");
  console.log("- GET /api/v1/users/stats");
  
  // Test database connection
  await testDatabaseConnection();
});