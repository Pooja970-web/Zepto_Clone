import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  { name: "Banana", category: "Fruits & Veg", emoji: "🍌", price: 49, mrp: 59, unit: "6 pcs" },
  { name: "Tomato", category: "Fruits & Veg", emoji: "🍅", price: 32, mrp: 40, unit: "500 g" },
  { name: "Onion", category: "Fruits & Veg", emoji: "🧅", price: 38, mrp: 45, unit: "1 kg" },
  { name: "Toned Milk", category: "Dairy & Eggs", emoji: "🥛", price: 33, mrp: 33, unit: "500 ml" },
  { name: "Farm Eggs", category: "Dairy & Eggs", emoji: "🥚", price: 78, mrp: 90, unit: "12 pcs" },
  { name: "Paneer", category: "Dairy & Eggs", emoji: "🧀", price: 95, mrp: 110, unit: "200 g" },
  { name: "Potato Chips", category: "Snacks", emoji: "🍟", price: 20, mrp: 20, unit: "52 g" },
  { name: "Dark Chocolate", category: "Snacks", emoji: "🍫", price: 110, mrp: 130, unit: "80 g" },
  { name: "Instant Noodles", category: "Snacks", emoji: "🍜", price: 14, mrp: 14, unit: "70 g" },
  { name: "Cola", category: "Drinks", emoji: "🥤", price: 40, mrp: 40, unit: "750 ml" },
  { name: "Orange Juice", category: "Drinks", emoji: "🍊", price: 99, mrp: 115, unit: "1 L" },
  { name: "Bread", category: "Bakery", emoji: "🍞", price: 45, mrp: 50, unit: "400 g" },
  { name: "Croissant", category: "Bakery", emoji: "🥐", price: 70, mrp: 80, unit: "2 pcs" },
  { name: "Dish Wash Gel", category: "Household", emoji: "🧴", price: 99, mrp: 120, unit: "500 ml" },
  { name: "Tissue Roll", category: "Household", emoji: "🧻", price: 55, mrp: 65, unit: "2 rolls" },
];

await mongoose.connect(process.env.MONGO_URI);
await Product.deleteMany({});
await Product.insertMany(products);
console.log(`${products.length} products add ho gaye`);
process.exit(0);