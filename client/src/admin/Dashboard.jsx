import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const emptyProduct = { name: "", category: "", description: "", imageUrl: "", price: "", unit: "", featured: false };
const emptyOffer = { title: "", description: "", priceLabel: "", imageUrl: "", expiresAt: "" };
const errMsg = (e, fallback) => e.response?.data?.message || fallback;

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({ totalProducts: 0, activeOffers: 0, totalEnquiries: 0, pendingEnquiries: 0 });
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [offerForm, setOfferForm] = useState(emptyOffer);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadDashboard() {
    setLoading(true);
    try {
      const [s, p, o, e] = await Promise.all([
        api.get("/enquiries/stats"), api.get("/products/admin/all"),
        api.get("/offers/admin/all"), api.get("/enquiries")
      ]);
      setStats(s.data.stats);
      setProducts(p.data.products || []);
      setOffers(o.data.offers || []);
      setEnquiries(e.data.enquiries || []);
    } catch (error) {
      setMessage(errMsg(error, "Could not load dashboard data. Please sign in again if your session expired."));
    } finally { setLoading(false); }
  }
  useEffect(() => { loadDashboard(); }, []);

  async function run(action, success, fallback) {
    try { await action(); setMessage(success); await loadDashboard(); return true; }
    catch (error) { setMessage(errMsg(error, fallback)); return false; }
  }

  async function saveProduct(e) {
    e.preventDefault(); setSaving(true);
    const ok = await run(
      () => editingId ? api.put(`/products/${editingId}`, form) : api.post("/products", form),
      editingId ? "Product updated." : "Product added successfully.", "Could not save product.");
    if (ok) { setForm(emptyProduct); setEditingId(null); }
    setSaving(false);
  }

  function startEdit(p) {
    setEditingId(p._id);
    setForm({ name: p.name, category: p.category, description: p.description || "", imageUrl: p.imageUrl || "", price: p.price ?? "", unit: p.unit || "", featured: p.featured });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function cancelEdit() { setEditingId(null); setForm(emptyProduct); }

  const removeProduct = id => window.confirm("Delete this product permanently?") && run(() => api.delete(`/products/${id}`), "Product deleted.", "Could not delete product.");
  const toggleProduct = (p, field) => run(() => api.put(`/products/${p._id}`, { [field]: !p[field] }), "Product updated.", "Could not update product.");

  async function addOffer(e) {
    e.preventDefault(); setSaving(true);
    const ok = await run(() => api.post("/offers", offerForm), "Offer added.", "Could not add offer.");
    if (ok) setOfferForm(emptyOffer);
    setSaving(false);
  }
  const removeOffer = id => window.confirm("Delete this offer?") && run(() => api.delete(`/offers/${id}`), "Offer deleted.", "Could not delete offer.");
  const toggleOffer = o => run(() => api.put(`/offers/${o._id}`, { active: !o.active }), "Offer updated.", "Could not update offer.");

  const changeEnquiryStatus = (id, status) => run(() => api.patch(`/enquiries/${id}/status`, { status }), "Enquiry status updated.", "Could not update enquiry.");
  const removeEnquiry = id => window.confirm("Delete this enquiry?") && run(() => api.delete(`/enquiries/${id}`), "Enquiry deleted.", "Could not delete enquiry.");

  function logout() { localStorage.removeItem("aks_admin_token"); navigate("/admin/login"); }
  const setP = k => e => setForm({ ...form, [k]: e.target.value });
  const setO = k => e => setOfferForm({ ...offerForm, [k]: e.target.value });
  const isExpired = o => o.expiresAt && new Date(o.expiresAt) < new Date();

  return <main className="admin-page container">
    <div className="admin-heading">
      <div><span className="eyebrow">CONTROL CENTRE</span><h1>Store <em>dashboard.</em></h1><p>Manage your store products, offers and customer enquiries.</p></div>
      <div>
        <button className="button button-outline" onClick={loadDashboard} disabled={loading}>{loading ? "Refreshing..." : "Refresh"}</button>
        <button className="button button-outline" onClick={logout}>Sign out</button>
      </div>
    </div>

    {message && <p className="form-status" role="status">{message}</p>}

    <section className="admin-panel">
      <h2>Store overview</h2>
      {loading ? <p>Loading dashboard statistics...</p> : <div className="admin-stats">
        <div><small>TOTAL PRODUCTS</small><b>{stats.totalProducts}</b></div>
        <div><small>ACTIVE OFFERS</small><b>{stats.activeOffers}</b></div>
        <div><small>TOTAL ENQUIRIES</small><b>{stats.totalEnquiries}</b></div>
        <div><small>NEW ENQUIRIES</small><b>{stats.pendingEnquiries}</b></div>
      </div>}
    </section>

    <section className="admin-panel">
      <h2>{editingId ? "Edit product" : "Add a product"}</h2>
      <form className="admin-form" onSubmit={saveProduct}>
        <input placeholder="Product name" value={form.name} onChange={setP("name")} required maxLength="100"/>
        <input placeholder="Category" value={form.category} onChange={setP("category")} required/>
        <input placeholder="Image URL (optional)" value={form.imageUrl} onChange={setP("imageUrl")}/>
        <input placeholder="Price (₹)" type="number" min="0" step="any" value={form.price} onChange={setP("price")}/>
        <input placeholder="Unit (e.g. kg)" value={form.unit} onChange={setP("unit")}/>
        <input placeholder="Short description" value={form.description} onChange={setP("description")} maxLength="500"/>
        <label className="check-label"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })}/> Feature on homepage</label>
        <div className="form-actions">
          <button className="button button-primary" disabled={saving}>{saving ? "Saving..." : editingId ? "Save changes" : "Add product"}</button>
          {editingId && <button type="button" className="button button-outline" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>
    </section>

    <section className="admin-panel">
      <h2>Manage products ({products.length})</h2>
      {products.map(p => <div className="admin-row" key={p._id}>
        <span><b>{p.name} {p.featured && <em className="badge">Featured</em>} {!p.active && <em className="badge muted">Hidden</em>}</b><small>{p.category}{p.price != null ? ` · ₹${p.price}${p.unit ? ` / ${p.unit}` : ""}` : ""}</small></span>
        <div className="row-actions">
          <button className="mini-button" onClick={() => startEdit(p)}>Edit</button>
          <button className="mini-button" onClick={() => toggleProduct(p, "featured")}>{p.featured ? "Unfeature" : "Feature"}</button>
          <button className="mini-button" onClick={() => toggleProduct(p, "active")}>{p.active ? "Hide" : "Show"}</button>
          <button className="delete-button" onClick={() => removeProduct(p._id)}>Delete</button>
        </div>
      </div>)}
      {!products.length && <p>No products yet. Add your first one above.</p>}
    </section>

    <section className="admin-panel">
      <h2>Add an offer</h2>
      <form className="admin-form" onSubmit={addOffer}>
        <input placeholder="Offer title" value={offerForm.title} onChange={setO("title")} required maxLength="120"/>
        <input placeholder="Price label (e.g. Save ₹50)" value={offerForm.priceLabel} onChange={setO("priceLabel")}/>
        <input placeholder="Image URL (optional)" value={offerForm.imageUrl} onChange={setO("imageUrl")}/>
        <label className="date-label">Expires on (optional)<input type="date" value={offerForm.expiresAt} onChange={setO("expiresAt")}/></label>
        <input className="span-2" placeholder="Description" value={offerForm.description} onChange={setO("description")} maxLength="500"/>
        <button className="button button-primary" disabled={saving}>{saving ? "Saving..." : "Add offer"}</button>
      </form>
    </section>

    <section className="admin-panel">
      <h2>Manage offers ({offers.length})</h2>
      {offers.map(o => <div className="admin-row" key={o._id}>
        <span><b>{o.title} {!o.active && <em className="badge muted">Hidden</em>} {isExpired(o) && <em className="badge muted">Expired</em>}</b>
          <small>{o.priceLabel}{o.expiresAt ? ` · till ${new Date(o.expiresAt).toLocaleDateString("en-IN")}` : ""}</small></span>
        <div className="row-actions">
          <button className="mini-button" onClick={() => toggleOffer(o)}>{o.active ? "Hide" : "Show"}</button>
          <button className="delete-button" onClick={() => removeOffer(o._id)}>Delete</button>
        </div>
      </div>)}
      {!offers.length && <p>No offers yet.</p>}
    </section>

    <section className="admin-panel">
      <h2>Customer enquiries ({enquiries.length})</h2>
      {enquiries.map(en => <div className="admin-row enquiry-row" key={en._id}>
        <div>
          <b>{en.name}</b>
          <small>Phone: <a href={`tel:${en.phone}`}>{en.phone}</a></small>
          <p>{en.message}</p>
          <small>{new Date(en.createdAt).toLocaleString("en-IN")}</small>
        </div>
        <div className="row-actions">
          <select value={en.status} onChange={e => changeEnquiryStatus(en._id, e.target.value)} aria-label={`Status for enquiry from ${en.name}`}>
            <option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option>
          </select>
          <button className="delete-button" onClick={() => removeEnquiry(en._id)}>Delete</button>
        </div>
      </div>)}
      {!enquiries.length && <p>No customer enquiries yet.</p>}
    </section>
  </main>;
}
