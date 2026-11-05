import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import dns from "dns";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import chatRoutes from "./routes/chat.js";

// Fix for Windows DNS resolution with MongoDB SRV records
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // Ignore if custom DNS cannot be set
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") || true }));
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "ZahidCodes Portfolio API" }));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/chat", chatRoutes);

const port = process.env.PORT || 5000;

if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, { dbName: "zahidcodes_portfolio" })
    .then(() => console.log("MongoDB connected successfully to cluster0"))
    .catch((e) => {
      console.error("MongoDB connection error:", e.message);
      if (e.message.includes("SSL alert number 80") || e.message.includes("tlsv1 alert internal error")) {
        console.error("-> Atlas IP Whitelist Notice: Please ensure your current IP address is added to MongoDB Atlas -> Network Access (or add 0.0.0.0/0).");
      }
    });
} else {
  console.warn("MONGODB_URI not set. Configure server/.env before using the CMS.");
}

app.listen(port, () => console.log(`API running on port ${port}`));
