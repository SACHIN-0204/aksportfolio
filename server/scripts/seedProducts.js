import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const samples = [
  { name: "Basmati Rice", category: "Staples", description: "Long-grain aromatic rice for everyday meals.", price: 120, unit: "kg", featured: true },
  { name: "Toor Dal", category: "Staples", description: "Protein-rich split pigeon peas.", price: 150, unit: "kg", featured: true },
  { name: "Whole Wheat Atta", category: "Staples", description: "Stone-ground flour for soft rotis.", price: 55, unit: "kg", featured: true },
  { name: "Turmeric Powder", category: "Spices", description: "Pure, bright and fragrant haldi.", price: 45, unit: "100 g" },
  { name: "Mustard Oil", category: "Oils", description: "Cold-pressed oil for authentic flavour.", price: 180, unit: "litre" },
  { name: "Tea Leaves", category: "Beverages", description: "Strong, aromatic chai blend.", price: 90, unit: "250 g" }
];

try {
  await mongoose.connect(process.env.MONGO_URI);
  if (await Product.countDocuments()) { console.log("Products already exist — skipping sample seed."); }
  else { await Product.insertMany(samples); console.log(`Inserted ${samples.length} sample products`); }
} catch (e) { console.error(e.message); process.exitCode = 1; }
finally { await mongoose.disconnect(); }
