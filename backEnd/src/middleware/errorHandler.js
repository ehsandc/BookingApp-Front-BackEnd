import * as Sentry from "@sentry/node";
import { logger } from "./logger.js";
import { AppError, DatabaseError } from "../utils/errors.js";
import { Prisma } from "@prisma/client";

export function errorHandler(err, req, res, next) {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error("Error occurred", {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        error = new AppError("Duplicate field value entered", 409);
        break;
      case "P2014":
        error = new AppError("Invalid ID provided", 400);
        break;
      case "P2003":
        error = new AppError("Invalid input data", 400);
        break;
      case "P2025":
        error = new AppError("Record not found", 404);
        break;
      default:
        error = new DatabaseError("Database operation failed");
    }
  }

  // Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    error = new AppError("Invalid data provided", 400);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    error = new AppError("Token expired", 401);
  }

  // Capture in Sentry only for non-operational errors
  if (!error.isOperational || process.env.NODE_ENV === "production") {
    Sentry.captureException(err);
  }

  // Send error response
  const statusCode = error.statusCode || 500;
  const message = error.isOperational ? error.message : "Something went wrong";

  const response = {
    success: false,
    error: message,
  };

  // Add error details in development
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
    response.details = error.details || null;
  }

  // Add error ID for tracking in production
  if (process.env.NODE_ENV === "production") {
    response.errorId = Math.random().toString(36).substr(2, 9);
  }

  res.status(statusCode).json(response);
}

// 404 handler for undefined routes
export function notFoundHandler(req, res, next) {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  next(error);
}

// Async error wrapper
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
