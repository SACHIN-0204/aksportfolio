import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 16) {
  console.error("JWT_SECRET is missing or too short. Set a long random value in server/.env");
  process.exit(1);
}

const app = express();
app.set("trust proxy", 1); // correct client IPs behind Render/Railway/Nginx for rate limiting
app.use(helmet());
const origins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map(s => s.trim());
app.use(cors({ origin: origins }));
app.use(express.json({ limit: "100kb" }));

app.use("/api/auth/login", rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, message: { message: "Too many login attempts. Try again later." } }));
app.use("/api/enquiries", (req, res, next) => req.method === "POST"
  ? rateLimit({ windowMs: 60 * 60 * 1000, limit: 10, message: { message: "Too many enquiries. Please try again later." } })(req, res, next)
  : next());

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "Abhishek Kirana Store API" }));
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB().then(() => app.listen(PORT, () => console.log(`API listening on ${PORT}`)))
  .catch(error => { console.error("Startup failed:", error.message); process.exit(1); });
