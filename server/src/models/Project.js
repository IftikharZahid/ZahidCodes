import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 90 },
  slug: { type: String, required: true, unique: true, index: true },
  summary: { type: String, required: true, maxlength: 220 },
  description: { type: String, default: "", maxlength: 6000 },
  category: { type: String, required: true, enum: ["Web App", "Web & Mobile", "Mobile App", "AI & Automation", "Other"] },
  technologies: [{ type: String, trim: true }],
  coverImage: { type: String, default: "" },
  demoUrl: { type: String, default: "" },
  githubUrl: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 }
}, { timestamps: true });
export default mongoose.model("Project", projectSchema);