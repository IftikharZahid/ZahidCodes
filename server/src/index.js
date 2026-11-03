import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bcrypt from "bcryptjs";
import path from "path";
import Admin from "./models/Admin.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import adminRoutes from "./routes/admin.js";
import analyticsRoutes from "./routes/analytics.js";

const app = express();
const port = process.env.PORT || 5000;
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" }, contentSecurityPolicy: false }));
app.use(cors({ origin: (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(",").map(x => x.trim()), credentials: false }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/uploads", express.static(path.resolve("uploads"), { maxAge: "7d" }));
app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "ZahidCodes Portfolio API" }));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.name === "MulterError" ? 400 : (err.status || 500);
  res.status(status).json({ message: err.message || "Something went wrong." });
});

async function start() {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    throw new Error("Missing required environment values. Configure server/.env using .env.example.");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  const email = process.env.ADMIN_EMAIL.toLowerCase().trim();
  const existing = await Admin.findOne({ email });
  if (!existing) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await Admin.create({ email, passwordHash });
    console.log(`Initial admin account created for ${email}`);
  }
  app.listen(port, () => console.log(`ZahidCodes API listening on ${port}`));
}
start().catch(err => { console.error(err); process.exit(1); });