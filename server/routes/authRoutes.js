import { Router } from "express";
import { login, me } from "../controllers/authController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";
import { asyncHandler as h } from "../middleware/asyncHandler.js";
const router = Router();
router.post("/login", h(login));
router.get("/me", requireAdmin, h(me));
export default router;
