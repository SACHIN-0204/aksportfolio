import { useState } from "react";
import { MapPin, Phone, Clock } from "lucide-react";
import api from "../services/api";
export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState("");
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });
  async function submit(e) {
    e.preventDefault(); setStatus("Sending...");
    try { const r = await api.post("/enquiries", form); setStatus(r.data.message); setForm({ name:"", phone:"", message:"" }); }
    catch (err) { setStatus(err.response?.data?.message || "Could not send your enquiry. Please try again."); }
  }
  return <main className="page-section container"><span className="eyebrow">LET'S CONNECT</span><h1 className="page-title">We'd love to <em>hear from you.</em></h1><div className="contact-grid"><div className="contact-details"><div><MapPin/><span><b>Visit our store</b><br/>Ambamoliya, Indore, Madhya Pradesh</span></div><div><Phone/><span><b>Call or WhatsApp</b><br/>Add your verified store number</span></div><div><Clock/><span><b>Store hours</b><br/>Update with your actual business hours</span></div></div><form className="contact-form" onSubmit={submit}><label>Your name<input name="name" value={form.name} onChange={change} required maxLength="80"/></label><label>Phone number<input name="phone" value={form.phone} onChange={change} required maxLength="20"/></label><label>How can we help?<textarea name="message" value={form.message} onChange={change} required maxLength="1000" rows="4"/></label><button className="button button-primary">Send enquiry ↗</button>{status && <p className="form-status">{status}</p>}</form></div></main>;
}
