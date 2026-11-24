import Offer from "../models/Offer.js";

function pickOffer(body = {}) {
  const out = {};
  for (const key of ["title", "description", "priceLabel", "imageUrl"]) {
    if (body[key] !== undefined) out[key] = String(body[key]);
  }
  if (body.active !== undefined) out.active = Boolean(body.active);
  if (body.expiresAt !== undefined) out.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null;
  return out;
}

export async function listOffers(_req, res) {
  const offers = await Offer.find({ active: true, $or: [{ expiresAt: null }, { expiresAt: { $gte: new Date() } }] }).sort({ createdAt: -1 });
  res.json({ offers });
}

export async function listAllOffers(_req, res) {
  const offers = await Offer.find({}).sort({ createdAt: -1 }).limit(200);
  res.json({ offers });
}

export async function createOffer(req, res) {
  const data = pickOffer(req.body);
  if (!data.title?.trim()) return res.status(400).json({ message: "Offer title is required" });
  if (data.expiresAt && Number.isNaN(data.expiresAt.getTime())) return res.status(400).json({ message: "Invalid expiry date" });
  const offer = await Offer.create(data);
  res.status(201).json({ offer });
}

export async function updateOffer(req, res) {
  const data = pickOffer(req.body);
  if (data.expiresAt && Number.isNaN(data.expiresAt.getTime())) return res.status(400).json({ message: "Invalid expiry date" });
  const offer = await Offer.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!offer) return res.status(404).json({ message: "Offer not found" });
  res.json({ offer });
}

export async function deleteOffer(req, res) {
  const offer = await Offer.findByIdAndDelete(req.params.id);
  if (!offer) return res.status(404).json({ message: "Offer not found" });
  res.json({ message: "Offer deleted" });
}
