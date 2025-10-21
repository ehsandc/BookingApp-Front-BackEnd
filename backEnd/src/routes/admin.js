import express from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /admin/seed:
 *   post:
 *     summary: Seed the database with sample data
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Database seeded successfully
 *       500:
 *         description: Seeding failed
 */
router.post("/seed", async (req, res) => {
  try {
    // Load JSON data
    const dataPath = path.join(__dirname, "../data");
    
    const users = JSON.parse(
      await fs.readFile(path.join(dataPath, "users.json"), "utf-8")
    ).users;
    const hosts = JSON.parse(
      await fs.readFile(path.join(dataPath, "hosts.json"), "utf-8")
    ).hosts;
    const properties = JSON.parse(
      await fs.readFile(path.join(dataPath, "properties.json"), "utf-8")
    ).properties;
    const bookings = JSON.parse(
      await fs.readFile(path.join(dataPath, "bookings.json"), "utf-8")
    ).bookings;
    const reviews = JSON.parse(
      await fs.readFile(path.join(dataPath, "reviews.json"), "utf-8")
    ).reviews;

    let stats = {
      users: 0,
      hosts: 0,
      properties: 0,
      bookings: 0,
      reviews: 0,
    };

    // Seed Users
    for (const user of users) {
      const hashed = await bcrypt.hash(user.password || "password", 10);
      await prisma.user.upsert({
        where: { username: user.username },
        update: {},
        create: { ...user, password: hashed },
      });
      stats.users++;
    }

    // Seed Hosts
    for (const host of hosts) {
      const hashed = await bcrypt.hash(host.password || "password", 10);
      await prisma.host.upsert({
        where: { username: host.username },
        update: {},
        create: { ...host, password: hashed },
      });
      stats.hosts++;
    }

    // Seed Properties
    for (const property of properties) {
      await prisma.property.upsert({
        where: { id: property.id },
        update: {},
        create: property,
      });
      stats.properties++;
    }

    // Seed Bookings
    for (const booking of bookings) {
      await prisma.booking.upsert({
        where: { id: booking.id },
        update: {},
        create: booking,
      });
      stats.bookings++;
    }

    // Seed Reviews
    for (const review of reviews) {
      await prisma.review.upsert({
        where: { id: review.id },
        update: {},
        create: review,
      });
      stats.reviews++;
    }

    res.status(200).json({
      success: true,
      message: "Database seeded successfully",
      stats,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to seed database",
      details: error.message,
    });
  }
});

/**
 * @swagger
 * /admin/status:
 *   get:
 *     summary: Get database status
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Database status
 */
router.get("/status", async (req, res) => {
  try {
    const stats = {
      users: await prisma.user.count(),
      hosts: await prisma.host.count(),
      properties: await prisma.property.count(),
      bookings: await prisma.booking.count(),
      reviews: await prisma.review.count(),
    };

    res.status(200).json({
      success: true,
      database: "connected",
      stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to get database status",
      details: error.message,
    });
  }
});

export default router;
