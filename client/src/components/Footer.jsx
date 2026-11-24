import { Link } from "react-router-dom";
import { store } from "../config";
export default function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div><div className="footer-brand">ABHISHEK KIRANA STORE</div><p>Your neighbourhood destination for groceries and everyday essentials.</p></div>
    <div><b>Explore</b><Link to="/about">About us</Link><Link to="/products">Products</Link><Link to="/offers">Offers</Link></div>
    <div><b>Connect</b><Link to="/contact">Contact</Link>{store.phone && <a href={`tel:${store.phone}`}>{store.phone}</a>}<span>{store.address}</span><Link to="/admin/login">Admin login</Link></div>
  </div><div className="container copyright">© {new Date().getFullYear()} Abhishek Kirana Store. All rights reserved.</div></footer>;
}
