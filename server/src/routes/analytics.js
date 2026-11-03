import { Router } from "express";
import Visit from "../models/Visit.js";
import Project from "../models/Project.js";
const router = Router();
router.post("/visit", async (req, res, next) => {
  try { await Visit.create({ path: String(req.body.path || "/").slice(0, 300) }); res.status(204).end(); } catch (e) { next(e); }
});
router.post("/click/:projectId", async (req, res, next) => {
  try { await Project.updateOne({ _id: req.params.projectId }, { $inc: { clicks: 1 } }); res.status(204).end(); } catch (e) { next(e); }
});
export default router;