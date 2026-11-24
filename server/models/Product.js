import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  category: { type: String, required: true, trim: true },
  description: { type: String, trim: true, maxlength: 500, default: "" },
  imageUrl: { type: String, trim: true, default: "" },
  price: { type: Number, min: 0, default: null },
  unit: { type: String, trim: true, default: "" },
  featured: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
