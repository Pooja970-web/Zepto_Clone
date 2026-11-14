import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: Number,
    unit: String,
    emoji: { type: String, default: "🛒" },
    stock: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);