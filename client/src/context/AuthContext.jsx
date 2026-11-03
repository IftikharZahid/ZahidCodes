import { createContext, useContext, useState } from "react";
import { api } from "../api";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const raw = localStorage.getItem("zc_admin");
    try { return raw ? JSON.parse(raw) : null; } catch { return null; }
  });
  async function login(email, password) {
    const data = await api("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    localStorage.setItem("zc_admin_token", data.token);
    localStorage.setItem("zc_admin", JSON.stringify(data.admin));
    setAdmin(data.admin);
  }
  function logout() { localStorage.removeItem("zc_admin_token"); localStorage.removeItem("zc_admin"); setAdmin(null); }
  return <AuthContext.Provider value={{ admin, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);