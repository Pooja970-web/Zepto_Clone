import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = Router();

function makeResponse(user) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email, address: user.address },
  };
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;

  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({ message: "Name, email and a password of 6+ characters are required" });
  }
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(409).json({ message: "This email is already registered" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, address, password: hashed });
  res.status(201).json(makeResponse(user));
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: (req.body.email || "").toLowerCase() });
  const ok = user && (await bcrypt.compare(req.body.password || "", user.password));

  if (!ok) return res.status(401).json({ message: "Email or password is incorrect" });
  res.json(makeResponse(user));
});

// GET /api/auth/me (login zaroori)
router.get("/me", auth, async (req, res) => {
  res.json(await User.findById(req.userId).select("-password"));
});

export default router;