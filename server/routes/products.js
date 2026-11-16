import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

// GET /api/products?category=Snacks&q=choc
router.get("/", async (req, res) => {
  const { category, q } = req.query;
  const filter = {};

  if (category && category !== "All") filter.category = String(category);
  if (q) {
    const safe = String(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.name = { $regex: safe, $options: "i" };
  }

  res.json(await Product.find(filter).sort({ category: 1, name: 1 }));
});

// GET /api/products/categories
router.get("/categories", async (req, res) => {
  res.json(await Product.distinct("category"));
});

export default router;