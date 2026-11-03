import mongoose from "mongoose";
const visitSchema = new mongoose.Schema({ path: { type: String, default: "/" }, createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 400 } });
export default mongoose.model("Visit", visitSchema);