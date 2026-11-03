import slugify from "slugify";
import Project from "../models/Project.js";
export async function uniqueSlug(title, excludeId = null) {
  const base = slugify(title, { lower: true, strict: true }) || "project";
  let slug = base, n = 2;
  while (await Project.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) slug = `${base}-${n++}`;
  return slug;
}