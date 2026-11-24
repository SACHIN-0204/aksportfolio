import Enquiry from "../models/Enquiry.js";

export async function createEnquiry(req, res) {
  const { name, phone, message } = req.body;
  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return res.status(400).json({ message: "Name, phone and message are required" });
  }
  const enquiry = await Enquiry.create({ name, phone, message });
  res.status(201).json({ message: "Enquiry received. Thank you!", enquiryId: enquiry._id });
}
