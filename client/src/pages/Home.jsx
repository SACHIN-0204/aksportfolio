import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, Leaf, HeartHandshake } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => { api.get("/products?featured=true").then(r => setProducts(r.data.products.slice(0,3))).catch(() => {}); }, []);
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy">
      <span className="eyebrow"><i/> YOUR NEIGHBOURHOOD GROCERY STORE</span>
      <h1>Good food.<br/><em>Good days.</em><br/>Everyday.</h1>
      <p>Everyday groceries and household essentials, thoughtfully brought together for your family.</p>
      <div className="hero-actions"><Link className="button button-primary" to="/products">Explore products <ArrowUpRight size={17}/></Link><Link className="text-link" to="/about">Discover our story ↗</Link></div>
      <div className="hero-trust"><span><ShieldCheck size={17}/> Everyday essentials</span><span><HeartHandshake size={17}/> Neighbourhood care</span></div>
    </div><div className="hero-art"><div className="hero-orbit"></div><div className="hero-note"><Leaf size={17}/><span>Fresh choices<br/><b>for every home</b></span></div><div className="hero-stamp">GOOD<br/>THINGS<br/>LIVE HERE</div><div className="hero-basket">🥬<span>🍅</span><i>🥕</i><b>🥑</b></div></div></div></section>
    <section className="section"><div className="container"><div className="section-heading"><div><span className="eyebrow">A LITTLE ABOUT US</span><h2>Everyday shopping,<br/><em>made thoughtful.</em></h2></div><p>We believe the little things that keep a home running should be easy to find and a pleasure to shop for.</p></div><div className="value-grid"><div><span>01</span><h3>Daily essentials</h3><p>Staples and household needs for your everyday routine.</p></div><div><span>02</span><h3>Value you appreciate</h3><p>Useful offers and practical choices for the family.</p></div><div><span>03</span><h3>Local care</h3><p>A friendly neighbourhood store that puts customers first.</p></div></div></div></section>
    <section className="section section-soft"><div className="container"><div className="section-heading"><div><span className="eyebrow">OUR SELECTION</span><h2>Everyday favourites.</h2></div><Link className="text-link" to="/products">View all products ↗</Link></div>{products.length ? <div className="product-grid">{products.map(p => <ProductCard key={p._id} product={p}/>)}</div> : <div className="empty-products">Our product collection is being updated. Visit us for your daily essentials.</div>}</div></section>
    <section className="cta-band"><div className="container cta-inner"><div><span className="eyebrow">WE'RE HERE TO HELP</span><h2>Your everyday list<br/>starts here.</h2></div><Link className="button button-light" to="/contact">Contact our store <ArrowUpRight size={17}/></Link></div></section>
  </>;
}
