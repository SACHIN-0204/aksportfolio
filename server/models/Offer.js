import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  description: { type: String, trim: true, maxlength: 500, default: "" },
  priceLabel: { type: String, trim: true, default: "" },
  imageUrl: { type: String, trim: true, default: "" },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model("Offer", offerSchema);
