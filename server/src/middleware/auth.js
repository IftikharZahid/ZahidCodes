import jwt from "jsonwebtoken";
export function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Authentication required." });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ message: "Session expired. Please sign in again." });
  }
}