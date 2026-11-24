import { useState } from "react";
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import api from "../services/api";
import { store } from "../config";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState({ text: "", error: false });
  const [sending, setSending] = useState(false);
  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault(); setSending(true); setStatus({ text: "Sending...", error: false });
    try {
      const r = await api.post("/enquiries", form);
      setStatus({ text: r.data.message, error: false });
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      setStatus({ text: err.response?.data?.message || "Could not send your enquiry. Please try again.", error: true });
    } finally { setSending(false); }
  }

  return <main className="page-section container">
    <span className="eyebrow">LET'S CONNECT</span>
    <h1 className="page-title">We'd love to <em>hear from you.</em></h1>
    <div className="contact-grid">
      <div className="contact-details">
        <div><MapPin/><span><b>Visit our store</b><br/>{store.address}</span></div>
        <div><Phone/><span><b>Call us</b><br/>{store.phone ? <a href={`tel:${store.phone}`}>{store.phone}</a> : "Phone number coming soon"}</span></div>
        {store.whatsapp && <div><MessageCircle/><span><b>WhatsApp</b><br/><a href={`https://wa.me/${store.whatsapp}`} target="_blank" rel="noreferrer">Chat with us</a></span></div>}
        <div><Clock/><span><b>Store hours</b><br/>{store.hours}</span></div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label>Your name<input name="name" value={form.name} onChange={change} required maxLength="80" autoComplete="name"/></label>
        <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={change} required maxLength="20" autoComplete="tel"/></label>
        <label>How can we help?<textarea name="message" value={form.message} onChange={change} required maxLength="1000" rows="4"/></label>
        <button className="button button-primary" disabled={sending}>{sending ? "Sending…" : "Send enquiry ↗"}</button>
        {status.text && <p className={status.error ? "form-status error" : "form-status"} role="status">{status.text}</p>}
      </form>
    </div>
  </main>;
}
