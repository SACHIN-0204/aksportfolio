import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingBasket, Menu, X } from "lucide-react";

const links = [["/", "Home"], ["/about", "About"], ["/products", "Products"], ["/offers", "Offers"], ["/contact", "Contact"]];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  return <header className="site-header"><div className="container nav-wrap">
    <Link to="/" className="brand"><span className="brand-mark"><ShoppingBasket size={22}/></span><span>ABHISHEK <b>KIRANA</b><small>STORE · EVERYDAY ESSENTIALS</small></span></Link>
    <nav className="desktop-nav">{links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>)}</nav>
    <Link className="nav-cta" to="/contact">Get in touch <span>↗</span></Link>
    <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? <X size={24}/> : <Menu size={24}/>}</button>
  </div>
  {open && <nav className="mobile-nav">{links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>)}</nav>}
  </header>;
}
