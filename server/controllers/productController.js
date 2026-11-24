import Product from "../models/Product.js";

const escapeRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function pickProduct(body = {}) {
  const out = {};
  for (const key of ["name", "category", "description", "imageUrl", "unit"]) {
    if (body[key] !== undefined) out[key] = String(body[key]);
  }
  if (body.price !== undefined) out.price = body.price === "" || body.price === null ? null : Number(body.price);
  if (body.featured !== undefined) out.featured = Boolean(body.featured);
  if (body.active !== undefined) out.active = Boolean(body.active);
  return out;
}

export async function listProducts(req, res) {
  const filter = { active: true };
  if (typeof req.query.category === "string" && req.query.category) filter.category = req.query.category;
  if (req.query.featured === "true") filter.featured = true;
  if (typeof req.query.q === "string" && req.query.q.trim()) filter.name = new RegExp(escapeRegex(req.query.q.trim().slice(0, 50)), "i");
  const products = await Product.find(filter).sort({ featured: -1, createdAt: -1 }).limit(200);
  res.json({ products });
}

export async function listCategories(_req, res) {
  const categories = await Product.distinct("category", { active: true });
  res.json({ categories: categories.sort() });
}

export async function listAllProducts(_req, res) {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(500);
  res.json({ products });
}

export async function getProduct(req, res) {
  const product = await Product.findOne({ _id: req.params.id, active: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
}

export async function createProduct(req, res) {
  const data = pickProduct(req.body);
  if (!data.name?.trim() || !data.category?.trim()) return res.status(400).json({ message: "Name and category are required" });
  if (data.price != null && Number.isNaN(data.price)) return res.status(400).json({ message: "Price must be a number" });
  const product = await Product.create(data);
  res.status(201).json({ product });
}

export async function updateProduct(req, res) {
  const data = pickProduct(req.body);
  if (data.price != null && Number.isNaN(data.price)) return res.status(400).json({ message: "Price must be a number" });
  const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ product });
}

export async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json({ message: "Product deleted" });
}
