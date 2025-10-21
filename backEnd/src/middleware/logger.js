import winston from "winston";

// Configure Winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "booking-api" },
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// Add console transport for development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

// HTTP request logger middleware
export function requestLogger(req, res, next) {
  const start = Date.now();

  // Log request
  logger.info("HTTP Request", {
    method: req.method,
    url: req.originalUrl,
    userAgent: req.get("User-Agent"),
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? "error" : "info";

    logger.log(logLevel, "HTTP Response", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
  });

  next();
}

// Export logger for use in other modules
export { logger };
