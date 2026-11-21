import { Router } from "express";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();
const uploadDir = path.resolve("uploads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9._-]/g, ""))
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file || !file.mimetype) return cb(null, false);
    cb(null, /^image\/(png|jpeg|webp|gif|svg\+xml)$/i.test(file.mimetype));
  }
});

function parseList(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val.map((x) => String(x).trim()).filter(Boolean);
  if (typeof val === "string") return val.split(",").map((x) => x.trim()).filter(Boolean);
  return [];
}

function parseBoolean(val) {
  return val === true || val === "true" || val === "on" || val === 1 || val === "1";
}

async function generateUniqueSlug(title, currentId = null) {
  const base = (title || "project")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "project";
  let slug = base;
  let counter = 1;
  while (true) {
    const query = { slug };
    if (currentId) query._id = { $ne: currentId };
    const exists = await Project.findOne(query);
    if (!exists) return slug;
    counter++;
    slug = `${base}-${counter}`;
  }
}

// GET all projects
router.get("/", async (req, res) => {
  try {
    const filter = { status: "published" };
    if (req.query.admin === "true") delete filter.status;
    const items = await Project.find(filter).sort({ featured: -1, createdAt: -1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// GET single project by slug or ID
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    let project = null;
    if (mongoose.Types.ObjectId.isValid(slug)) {
      project = await Project.findById(slug);
    }
    if (!project) {
      project = await Project.findOne({ slug });
    }
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// POST new project
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, summary, category, description, role, year, videoUrl, liveUrl, githubUrl } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Project title is required." });
    }
    if (!summary || !summary.trim()) {
      return res.status(400).json({ message: "Project summary is required." });
    }

    const slug = await generateUniqueSlug(req.body.slug || title);
    const data = {
      title: title.trim(),
      slug,
      category: category && category.trim() ? category.trim() : "Web Development",
      summary: summary.trim(),
      description: description ? description.trim() : "",
      role: role ? role.trim() : "",
      year: year ? year.trim() : "",
      videoUrl: videoUrl ? videoUrl.trim() : "",
      liveUrl: liveUrl ? liveUrl.trim() : "",
      githubUrl: githubUrl ? githubUrl.trim() : "",
      technologies: parseList(req.body.technologies),
      features: parseList(req.body.features),
      status: req.body.status === "draft" ? "draft" : "published",
      featured: parseBoolean(req.body.featured)
    };

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl && req.body.imageUrl.trim()) {
      data.image = req.body.imageUrl.trim();
    } else {
      data.image = "/assets/projects/web-platform.svg";
    }

    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ message: e.message || "Failed to create project." });
  }
});

// PUT update project
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    let project = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      project = await Project.findById(id);
    }
    if (!project) {
      project = await Project.findOne({ slug: id });
    }
    if (!project) {
      return res.status(404).json({ message: "Project not found to update." });
    }

    const updates = {};
    if (req.body.title !== undefined && req.body.title.trim()) {
      updates.title = req.body.title.trim();
    }
    if (req.body.category !== undefined) updates.category = req.body.category.trim();
    if (req.body.summary !== undefined) updates.summary = req.body.summary.trim();
    if (req.body.description !== undefined) updates.description = req.body.description.trim();
    if (req.body.role !== undefined) updates.role = req.body.role.trim();
    if (req.body.year !== undefined) updates.year = req.body.year.trim();
    if (req.body.videoUrl !== undefined) updates.videoUrl = req.body.videoUrl.trim();
    if (req.body.liveUrl !== undefined) updates.liveUrl = req.body.liveUrl.trim();
    if (req.body.githubUrl !== undefined) updates.githubUrl = req.body.githubUrl.trim();

    if (req.body.technologies !== undefined) {
      updates.technologies = parseList(req.body.technologies);
    }
    if (req.body.features !== undefined) {
      updates.features = parseList(req.body.features);
    }
    if (req.body.status !== undefined) {
      updates.status = req.body.status === "draft" ? "draft" : "published";
    }
    if (req.body.featured !== undefined) {
      updates.featured = parseBoolean(req.body.featured);
    }

    if (req.body.slug && req.body.slug !== project.slug) {
      updates.slug = await generateUniqueSlug(req.body.slug, project._id);
    } else if (updates.title && updates.title !== project.title && !project.slug) {
      updates.slug = await generateUniqueSlug(updates.title, project._id);
    }

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl !== undefined && req.body.imageUrl.trim()) {
      updates.image = req.body.imageUrl.trim();
    }

    const updated = await Project.findByIdAndUpdate(project._id, updates, {
      new: true,
      runValidators: true
    });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message || "Failed to update project." });
  }
});

// DELETE project
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let project = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      project = await Project.findByIdAndDelete(id);
    }
    if (!project) {
      project = await Project.findOneAndDelete({ slug: id });
    }
    if (!project) {
      return res.status(404).json({ message: "Project not found or already deleted." });
    }
    res.json({ ok: true, id: project._id });
  } catch (e) {
    res.status(400).json({ message: e.message || "Failed to delete project." });
  }
});

export default router;
