
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Offer from "../models/Offer.js";
import Enquiry from "../models/Enquiry.js";

export async function getDashboardStats(req, res) {
  try {
    const now = new Date();

    const [
      totalProducts,
      activeOffers,
      totalEnquiries,
      pendingEnquiries,
      recentEnquiries
    ] = await Promise.all([
      Product.countDocuments({}),
      Offer.countDocuments({
        active: true,
        $or: [
          { expiresAt: null },
          { expiresAt: { $gte: now } }
        ]
      }),
      Enquiry.countDocuments({}),
      Enquiry.countDocuments({ status: "new" }),
      Enquiry.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .select("name phone message status createdAt")
    ]);

    res.json({
      stats: {
        totalProducts,
        activeOffers,
        totalEnquiries,
        pendingEnquiries
      },
      recentEnquiries
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Could not load dashboard statistics" });
  }
}

export async function listAdminEnquiries(req, res) {
  try {
    const enquiries = await Enquiry.find({})
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ enquiries });
  } catch (error) {
    console.error("List enquiries error:", error);
    res.status(500).json({ message: "Could not load enquiries" });
  }
}

export async function updateEnquiryStatus(req, res) {
  try {
    const { status } = req.body;
    const allowedStatuses = ["new", "contacted", "closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid enquiry status" });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid enquiry ID" });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    res.json({ message: "Enquiry status updated", enquiry });
  } catch (error) {
    console.error("Update enquiry error:", error);
    res.status(500).json({ message: "Could not update enquiry status" });
  }
}

export async function deleteEnquiry(req, res) {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ message: "Enquiry not found" });
    res.json({ message: "Enquiry deleted" });
  } catch (error) {
    console.error("Delete enquiry error:", error);
    res.status(500).json({ message: "Could not delete enquiry" });
  }
}
