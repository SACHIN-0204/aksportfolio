import { useEffect, useState } from "react";
import api from "../services/api";
export default function Offers() {
  const [offers, setOffers] = useState([]);
  useEffect(() => { api.get("/offers").then(r => setOffers(r.data.offers)).catch(() => {}); }, []);
  return <main className="page-section container"><span className="eyebrow">GOOD VALUE, EVERY DAY</span><h1 className="page-title">Offers worth <em>sharing.</em></h1><p className="page-intro">Keep an eye on this page for our latest grocery deals and useful combinations.</p><div className="offer-grid">{offers.map(o => <article className="offer-card" key={o._id}>{o.imageUrl && <img src={o.imageUrl} alt={o.title}/>}<small>STORE OFFER</small><h2>{o.title}</h2><p>{o.description}</p><b>{o.priceLabel}</b></article>)}</div>{!offers.length && <div className="empty-products">New offers will be announced here. Follow our store updates for the latest deals.</div>}</main>;
}
