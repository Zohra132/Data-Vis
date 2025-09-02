import express from "express";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = express.Router();

// Middleware to check JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Get datasets
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM datasets WHERE user_id = $1", [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Save dataset
router.post("/", authenticateToken, async (req, res) => {
  const { name, data } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO datasets (name, data, user_id) VALUES ($1, $2, $3) RETURNING *",
      [name, data, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
