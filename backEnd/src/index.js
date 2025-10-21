import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import * as Sentry from "@sentry/node";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { requestLogger, logger } from "./middleware/logger.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { specs, swaggerUi } from "./config/swagger.js";
import usersRouter from "./routes/users.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import loginRouter from "./routes/login.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Initialize Sentry for error tracking
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
  });
}

const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "production" ? 100 : 1000, // requests per window
  message: {
    error: "Too many requests from this IP, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window for auth endpoints
  message: {
    error: "Too many authentication attempts, please try again later.",
  },
});

app.use(limiter);
app.use("/login", authLimiter);

// CORS configuration for production
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? [process.env.FRONTEND_URL, "https://bookingapp-front-backend.onrender.com"]
      : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Global middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(requestLogger);

// API Documentation
if (process.env.NODE_ENV !== "production") {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
    })
  );
}

// Route mounting
app.use("/users", usersRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);
app.use("/login", loginRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Booking API is running",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});

// Serve React static files in production
if (process.env.NODE_ENV === "production") {
  // Calculate path to frontend build directory
  const frontendBuildPath = path.join(__dirname, "../../frontEnd/build");
  
  // Serve static files
  app.use(express.static(frontendBuildPath));
  
  // Handle React Router - send all non-API requests to index.html
  app.get("*", (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith("/api") || 
        req.path.startsWith("/users") || 
        req.path.startsWith("/hosts") || 
        req.path.startsWith("/properties") || 
        req.path.startsWith("/bookings") || 
        req.path.startsWith("/reviews") || 
        req.path.startsWith("/login") || 
        req.path.startsWith("/auth") ||
        req.path.startsWith("/health")) {
      return res.status(404).json({ error: "API endpoint not found" });
    }
    
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`🚀 Server is running on port ${port}`);
    logger.info(`📚 API Documentation: http://localhost:${port}/api-docs`);
    logger.info(`🏥 Health check: http://localhost:${port}/health`);
    logger.info(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

export default app;
