import express from "express";
import * as authService from "../services/authService.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post("/refresh", authService.refreshToken);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", authService.logout);

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verify token and get user info
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid token
 */
router.get("/verify", authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
    },
  });
});

export default router;
