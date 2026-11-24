import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
export default function AdminLogin() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState("");
  const navigate=useNavigate();
  async function submit(e) { e.preventDefault(); setError(""); try { const r=await api.post("/auth/login",{email,password}); localStorage.setItem("aks_admin_token",r.data.token); navigate("/admin"); } catch(err) { setError(err.response?.data?.message || "Login failed"); } }
  return <main className="login-wrap"><form className="login-card" onSubmit={submit}><span className="eyebrow">STORE MANAGEMENT</span><h1>Admin <em>sign in.</em></h1><p>Sign in to manage your store portfolio.</p><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></label><button className="button button-primary">Sign in</button>{error && <p className="form-status error">{error}</p>}</form></main>;
}
