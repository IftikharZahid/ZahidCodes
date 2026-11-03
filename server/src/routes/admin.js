import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import Project from "../models/Project.js";
import Visit from "../models/Visit.js";
const router = Router();
router.use(requireAdmin);
router.get("/dashboard", async (_req, res, next) => {
  try {
    const [projects, visits, topProjects, featured, published] = await Promise.all([
      Project.countDocuments(), Visit.countDocuments(),
      Project.find().sort({ views: -1 }).limit(5).select("title slug views clicks").lean(),
      Project.countDocuments({ featured: true }), Project.countDocuments({ published: true })
    ]);
    const views = await Project.aggregate([{ $group: { _id: null, total: { $sum: "$views" }, clicks: { $sum: "$clicks" } } }]);
    res.json({ projects, visits, featured, published, projectViews: views[0]?.total || 0, linkClicks: views[0]?.clicks || 0, topProjects });
  } catch (e) { next(e); }
});
export default router;