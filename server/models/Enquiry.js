import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  phone: { type: String, required: true, trim: true, maxlength: 20 },
  message: { type: String, required: true, trim: true, maxlength: 1000 },
  status: { type: String, enum: ["new", "contacted", "closed"], default: "new" }
}, { timestamps: true });

export default mongoose.model("Enquiry", enquirySchema);
