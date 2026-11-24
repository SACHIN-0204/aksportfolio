
import { Router } from "express";
import {
  createEnquiry
} from "../controllers/enquiryController.js";
import {
  getDashboardStats,
  listAdminEnquiries,
  updateEnquiryStatus
} from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Public customer contact form
router.post("/", createEnquiry);

// Protected admin routes
router.get("/stats", requireAdmin, getDashboardStats);
router.get("/", requireAdmin, listAdminEnquiries);
router.patch("/:id/status", requireAdmin, updateEnquiryStatus);

export default router;
