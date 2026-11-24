import { Link, NavLink } from "react-router-dom";
import { ShoppingBasket, Menu } from "lucide-react";
export default function Navbar() {
  return <header className="site-header"><div className="container nav-wrap">
    <Link to="/" className="brand"><span className="brand-mark"><ShoppingBasket size={22}/></span><span>ABHISHEK <b>KIRANA</b><small>STORE · EVERYDAY ESSENTIALS</small></span></Link>
    <nav><NavLink to="/">Home</NavLink><NavLink to="/about">About</NavLink><NavLink to="/products">Products</NavLink><NavLink to="/offers">Offers</NavLink><NavLink to="/contact">Contact</NavLink></nav>
    <Link className="nav-cta" to="/contact">Get in touch <span>↗</span></Link>
  </div></header>;
}
