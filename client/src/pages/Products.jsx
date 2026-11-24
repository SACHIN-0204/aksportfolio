import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
export default function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => { api.get("/products").then(r => setProducts(r.data.products)).catch(() => setError("Products could not be loaded right now.")); }, []);
  return <main className="page-section container"><span className="eyebrow">THE EVERYDAY COLLECTION</span><h1 className="page-title">Products for <em>every home.</em></h1><p className="page-intro">Explore a selection of grocery staples and household essentials.</p>{error && <p>{error}</p>}{products.length ? <div className="product-grid">{products.map(p => <ProductCard key={p._id} product={p}/>)}</div> : <div className="empty-products">Product listings will appear here soon.</div>}</main>;
}
