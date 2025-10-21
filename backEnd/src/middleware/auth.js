import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { UnauthorizedError } from "../utils/errors.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Access token required"));
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(new UnauthorizedError("Access token required"));
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(new UnauthorizedError("Access token expired"));
    }
    return next(new UnauthorizedError("Invalid access token"));
  }
}

// Optional authentication - doesn't throw error if no token
export function optionalAuth(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    req.user = null;
  }

  next();
}
