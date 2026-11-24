import { Router } from "express";
import { createOffer, deleteOffer, listOffers } from "../controllers/offerController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";
const router = Router();
router.get("/", listOffers);
router.post("/", requireAdmin, createOffer);
router.delete("/:id", requireAdmin, deleteOffer);
export default router;
