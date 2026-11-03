import { Router } from "express";
import Project from "../models/Project.js";
import { requireAdmin } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { uniqueSlug } from "../utils/slug.js";
import fs from "fs";
import path from "path";

const router = Router();
const publicFields = "title slug summary description category technologies coverImage demoUrl githubUrl featured views clicks createdAt updatedAt";
router.get("/", async (req, res, next) => {
  try {
    const { category, q, featured } = req.query;
    const filter = { published: true };
    if (category && category !== "All") filter.category = category;
    if (featured === "true") filter.featured = true;
    if (q) filter.$or = [{ title: new RegExp(escapeRegex(q), "i") }, { summary: new RegExp(escapeRegex(q), "i") }, { technologies: new RegExp(escapeRegex(q), "i") }];
    const items = await Project.find(filter).select(publicFields).sort({ featured: -1, createdAt: -1 }).lean();
    res.json(items);
  } catch (e) { next(e); }
});
router.get("/:slug", async (req, res, next) => {
  try {
    const item = await Project.findOneAndUpdate({ slug: req.params.slug, published: true }, { $inc: { views: 1 } }, { new: true }).select(publicFields);
    if (!item) return res.status(404).json({ message: "Project not found." });
    res.json(item);
  } catch (e) { next(e); }
});
router.get("/admin/all", requireAdmin, async (_req, res, next) => {
  try { res.json(await Project.find().sort({ updatedAt: -1 })); } catch (e) { next(e); }
});
router.post("/admin", requireAdmin, upload.single("cover"), async (req, res, next) => {
  try {
    const data = parseBody(req.body);
    if (!data.title || !data.summary || !data.category) return res.status(400).json({ message: "Title, summary and category are required." });
    const slug = await uniqueSlug(data.title);
    const item = await Project.create({ ...data, slug, coverImage: req.file ? `/uploads/${req.file.filename}` : "" });
    res.status(201).json(item);
  } catch (e) { next(e); }
});
router.put("/admin/:id", requireAdmin, upload.single("cover"), async (req, res, next) => {
  try {
    const item = await Project.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Project not found." });
    const data = parseBody(req.body);
    if (data.title && data.title !== item.title) item.slug = await uniqueSlug(data.title, item._id);
    Object.assign(item, data);
    if (req.file) {
      if (item.coverImage?.startsWith("/uploads/")) fs.rmSync(path.resolve("uploads", path.basename(item.coverImage)), { force: true });
      item.coverImage = `/uploads/${req.file.filename}`;
    }
    await item.save();
    res.json(item);
  } catch (e) { next(e); }
});
router.delete("/admin/:id", requireAdmin, async (req, res, next) => {
  try {
    const item = await Project.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Project not found." });
    if (item.coverImage?.startsWith("/uploads/")) fs.rmSync(path.resolve("uploads", path.basename(item.coverImage)), { force: true });
    res.json({ message: "Project deleted." });
  } catch (e) { next(e); }
});
function parseBody(body) {
  let technologies = body.technologies || [];
  try { if (typeof technologies === "string") technologies = JSON.parse(technologies); } catch { technologies = technologies.split(","); }
  return {
    title: String(body.title || "").trim(),
    summary: String(body.summary || "").trim(),
    description: String(body.description || "").trim(),
    category: body.category || "Other",
    technologies: Array.isArray(technologies) ? technologies.map(x => String(x).trim()).filter(Boolean) : [],
    demoUrl: safeUrl(body.demoUrl),
    githubUrl: safeUrl(body.githubUrl),
    featured: body.featured === true || body.featured === "true",
    published: body.published === undefined ? true : body.published === true || body.published === "true"
  };
}
function safeUrl(value) {
  const v = String(value || "").trim();
  if (!v) return "";
  try { const u = new URL(v); return ["http:", "https:"].includes(u.protocol) ? v : ""; } catch { return ""; }
}
function escapeRegex(value) { return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
export default router;