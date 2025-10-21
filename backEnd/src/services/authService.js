import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

const prisma = new PrismaClient();

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "username and password required" });

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    // Generate access token (15 minutes)
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: "15m" }
    );

    // Generate refresh token (7 days)
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET || process.env.AUTH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Set refresh token as httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token not provided" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || process.env.AUTH_SECRET_KEY
    );

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
}
