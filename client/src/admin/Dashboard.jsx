
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const initialForm = {
  name: "",
  category: "",
  description: "",
  imageUrl: "",
  price: "",
  unit: "",
  featured: false
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeOffers: 0,
    totalEnquiries: 0,
    pendingEnquiries: 0
  });

  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadDashboard() {
    setLoading(true);

    try {
      const [statsResponse, productsResponse, offersResponse, enquiriesResponse] =
        await Promise.all([
          api.get("/enquiries/stats"),
          api.get("/products"),
          api.get("/offers"),
          api.get("/enquiries")
        ]);

      setStats(statsResponse.data.stats);
      setEnquiries(enquiriesResponse.data.enquiries || []);
      setProducts(productsResponse.data.products || []);
      setOffers(offersResponse.data.offers || []);
      setMessage("");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Could not load dashboard data. Please sign in again if your session expired."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function addProduct(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await api.post("/products", form);
      setForm(initialForm);
      setMessage("Product added successfully.");
      await loadDashboard();
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not add product.");
    } finally {
      setSaving(false);
    }
  }

  async function removeProduct(id) {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setMessage("Product deleted.");
      await loadDashboard();
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not delete product.");
    }
  }

  async function removeOffer(id) {
    if (!window.confirm("Delete this offer?")) return;

    try {
      await api.delete(`/offers/${id}`);
      setMessage("Offer deleted.");
      await loadDashboard();
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not delete offer.");
    }
  }

  async function changeEnquiryStatus(id, status) {
    try {
      await api.patch(`/enquiries/${id}/status`, { status });
      setMessage("Enquiry status updated.");
      await loadDashboard();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not update enquiry."
      );
    }
  }

  function logout() {
    localStorage.removeItem("aks_admin_token");
    navigate("/admin/login");
  }

  return (
    <main className="admin-page container">
      <div className="admin-heading">
        <div>
          <span className="eyebrow">CONTROL CENTRE</span>
          <h1>Store <em>dashboard.</em></h1>
          <p>Manage your store products, offers and customer enquiries.</p>
        </div>

        <div>
          <button
            className="button button-outline"
            onClick={loadDashboard}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>

          <button className="button button-outline" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>

      {message && <p className="form-status">{message}</p>}

      <section className="admin-panel">
        <h2>Store overview</h2>

        {loading ? (
          <p>Loading dashboard statistics...</p>
        ) : (
          <div className="admin-stats">
            <div>
              <small>TOTAL PRODUCTS</small>
              <b>{stats.totalProducts}</b>
            </div>

            <div>
              <small>ACTIVE OFFERS</small>
              <b>{stats.activeOffers}</b>
            </div>

            <div>
              <small>TOTAL ENQUIRIES</small>
              <b>{stats.totalEnquiries}</b>
            </div>

            <div>
              <small>NEW ENQUIRIES</small>
              <b>{stats.pendingEnquiries}</b>
            </div>
          </div>
        )}
      </section>

      <section className="admin-panel">
        <h2>Add a product</h2>

        <form className="admin-form" onSubmit={addProduct}>
          <input
            placeholder="Product name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            required
          />

          <input
            placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={(e) =>
              setForm({ ...form, imageUrl: e.target.value })
            }
          />

          <input
            placeholder="Price"
            type="number"
            min="0"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            placeholder="Unit (e.g. 1 kg)"
            value={form.unit}
            onChange={(e) =>
              setForm({ ...form, unit: e.target.value })
            }
          />

          <input
            placeholder="Short description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <label className="check-label">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm({ ...form, featured: e.target.checked })
              }
            />
            Feature on homepage
          </label>

          <button className="button button-primary" disabled={saving}>
            {saving ? "Saving..." : "Add product"}
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <h2>Manage products ({products.length} active shown)</h2>

        {products.map((product) => (
          <div className="admin-row" key={product._id}>
            <span>
              <b>{product.name}</b>
              <small>{product.category}</small>
            </span>

            <button
              className="delete-button"
              onClick={() => removeProduct(product._id)}
            >
              Delete
            </button>
          </div>
        ))}

        {!products.length && <p>No active products found.</p>}
      </section>

      <section className="admin-panel">
        <h2>Manage offers</h2>

        {offers.map((offer) => (
          <div className="admin-row" key={offer._id}>
            <b>{offer.title}</b>

            <button
              className="delete-button"
              onClick={() => removeOffer(offer._id)}
            >
              Delete
            </button>
          </div>
        ))}

        {!offers.length && <p>No active offers found.</p>}
      </section>

      <section className="admin-panel">
        <h2>Customer enquiries ({enquiries.length})</h2>

        {enquiries.map((enquiry) => (
          <div className="admin-row enquiry-row" key={enquiry._id}>
            <div>
              <b>{enquiry.name}</b>
              <small>Phone: {enquiry.phone}</small>
              <p>{enquiry.message}</p>
              <small>
                {new Date(enquiry.createdAt).toLocaleString("en-IN")}
              </small>
            </div>

            <select
              value={enquiry.status}
              onChange={(e) =>
                changeEnquiryStatus(enquiry._id, e.target.value)
              }
              aria-label={`Status for enquiry from ${enquiry.name}`}
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        ))}

        {!enquiries.length && <p>No customer enquiries yet.</p>}
      </section>
    </main>
  );
}
