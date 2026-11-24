import { Router } from "express";
import { createEnquiry } from "../controllers/enquiryController.js";
import { getDashboardStats, listAdminEnquiries, updateEnquiryStatus, deleteEnquiry } from "../controllers/adminController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";
import { asyncHandler as h } from "../middleware/asyncHandler.js";
import { validateId } from "../middleware/validateId.js";

const router = Router();

// Public customer contact form
router.post("/", h(createEnquiry));

// Protected admin routes
router.get("/stats", requireAdmin, h(getDashboardStats));
router.get("/", requireAdmin, h(listAdminEnquiries));
router.patch("/:id/status", requireAdmin, validateId, h(updateEnquiryStatus));
router.delete("/:id", requireAdmin, validateId, h(deleteEnquiry));

export default router;
