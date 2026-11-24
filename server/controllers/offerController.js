import Offer from "../models/Offer.js";

export async function listOffers(req, res) {
  const offers = await Offer.find({ active: true, $or: [{ expiresAt: null }, { expiresAt: { $gte: new Date() } }] }).sort({ createdAt: -1 });
  res.json({ offers });
}
export async function createOffer(req, res) {
  if (!req.body.title?.trim()) return res.status(400).json({ message: "Offer title is required" });
  const offer = await Offer.create(req.body);
  res.status(201).json({ offer });
}
export async function deleteOffer(req, res) {
  const offer = await Offer.findByIdAndDelete(req.params.id);
  if (!offer) return res.status(404).json({ message: "Offer not found" });
  res.json({ message: "Offer deleted" });
}
