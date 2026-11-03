import { useState } from "react";
import { Navigate,useNavigate,Link } from "react-router-dom";
import { LockKeyhole,ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
export default function Login(){
 const {admin,login}=useAuth(),nav=useNavigate();const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState(""),[busy,setBusy]=useState(false);
 if(admin)return <Navigate to="/admin" replace/>;
 async function submit(e){e.preventDefault();setError("");setBusy(true);try{await login(email,password);nav("/admin")}catch(err){setError(err.message)}finally{setBusy(false)}}
 return <div className="auth-page"><form className="auth-card" onSubmit={submit}><Link className="back-home" to="/"><ArrowLeft size={15}/> Back to website</Link><div className="auth-icon"><LockKeyhole/></div><p className="kicker">ZAHIDCODES CMS</p><h1>Admin sign in</h1><p className="auth-hint">Sign in to manage your portfolio projects.</p>{error&&<div className="error-box">{error}</div>}<label>Email address<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="username"/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/></label><button className="button primary full" disabled={busy}>{busy?"Signing in…":"Sign in to dashboard"}</button><small>Admin access only. Credentials are configured on the server.</small></form></div>;
}