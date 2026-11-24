import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { api.get("/products/categories").then(r => setCategories(r.data.categories)).catch(() => {}); }, []);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      api.get("/products", { params: { category: category || undefined, q: q.trim() || undefined } })
        .then(r => { setProducts(r.data.products); setError(""); })
        .catch(() => setError("Products could not be loaded right now."))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [category, q]);

  return <main className="page-section container">
    <span className="eyebrow">THE EVERYDAY COLLECTION</span>
    <h1 className="page-title">Products for <em>every home.</em></h1>
    <p className="page-intro">Explore a selection of grocery staples and household essentials.</p>
    <div className="filters">
      <input type="search" placeholder="Search products…" value={q} onChange={e => setQ(e.target.value)} aria-label="Search products"/>
      <div className="chips">
        <button className={!category ? "chip active" : "chip"} onClick={() => setCategory("")}>All</button>
        {categories.map(c => <button key={c} className={category === c ? "chip active" : "chip"} onClick={() => setCategory(c)}>{c}</button>)}
      </div>
    </div>
    {error && <p className="form-status error">{error}</p>}
    {loading ? <div className="empty-products">Loading products…</div>
      : products.length ? <div className="product-grid">{products.map(p => <ProductCard key={p._id} product={p}/>)}</div>
      : <div className="empty-products">{q || category ? "No products match your search." : "Product listings will appear here soon."}</div>}
  </main>;
}
