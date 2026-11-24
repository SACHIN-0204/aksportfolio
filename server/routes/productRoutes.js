import { Router } from "express";
import { createProduct, deleteProduct, listProducts, updateProduct } from "../controllers/productController.js";
import { requireAdmin } from "../middleware/authMiddleware.js";
const router = Router();
router.get("/", listProducts);
router.post("/", requireAdmin, createProduct);
router.put("/:id", requireAdmin, updateProduct);
router.delete("/:id", requireAdmin, deleteProduct);
export default router;
