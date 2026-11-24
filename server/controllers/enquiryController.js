import Enquiry from "../models/Enquiry.js";

export async function createEnquiry(req, res) {
  const { name, phone, message } = req.body || {};
  if (![name, phone, message].every(v => typeof v === "string" && v.trim())) {
    return res.status(400).json({ message: "Name, phone and message are required" });
  }
  if (!/^[+\d][\d\s-]{6,18}$/.test(phone.trim())) {
    return res.status(400).json({ message: "Please enter a valid phone number" });
  }
  const enquiry = await Enquiry.create({ name, phone, message });
  res.status(201).json({ message: "Enquiry received. Thank you!", enquiryId: enquiry._id });
}
