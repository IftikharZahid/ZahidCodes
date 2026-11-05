import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true }, slug: { type: String, required: true, unique: true },
    category: { type: String, default: "Web Development" }, summary: { type: String, required: true },
    description: { type: String, default: "" }, features: [String], videoUrl: { type: String, default: "" },
    role: { type: String, default: "" }, year: { type: String, default: "" },
    image: { type: String, default: "/assets/projects/web-platform.svg" },
    technologies: [String], liveUrl: { type: String, default: "" }, githubUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false }, status: { type: String, enum: ["published", "draft"], default: "published" },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.model("Project", projectSchema);
