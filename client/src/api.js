export const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
export const API_ORIGIN = API_BASE.replace(/\/api$/, "");
export function assetUrl(path) { return path?.startsWith("http") ? path : path ? `${API_ORIGIN}${path}` : ""; }
export async function api(path, options = {}) {
  const headers = { ...(options.headers || {}) };
  const token = localStorage.getItem("zc_admin_token");
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!(options.body instanceof FormData) && options.body) headers["Content-Type"] = "application/json";
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  return data;
}