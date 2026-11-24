import Product from "../models/Product.js";

export async function listProducts(req, res) {
  const filter = { active: true };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured === "true") filter.featured = true;
  const products = await Product.find(filter).sort({ featured: -1, createdAt: -1 }).limit(200);
  res.json({ products });
}

export async function createProduct(req, res) {
  const { name, category, description, imageUrl, price, unit, featured } = req.body;
  if (!name?.trim() || !category?.trim()) return res.status(400).json({ message: "Name and category are required" });
  const product = await Product.create({ name, category, description, imageUrl, price: price === "" ? null : price, unit, featured });
  res.status(201).json({ product });
}

export async function updateProduct(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
}

export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
}
