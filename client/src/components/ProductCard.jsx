export default function ProductCard({ product }) {
  return <article className="product-card">
    <div className="product-image">{product.imageUrl ? <img src={product.imageUrl} alt={product.name}/> : <span>GROCERY</span>}</div>
    <div className="product-info"><small>{product.category}</small><h3>{product.name}</h3>
      <p>{product.description || "A daily essential for your home."}</p>
      {product.price != null && <strong>₹{product.price}{product.unit ? ` / ${product.unit}` : ""}</strong>}
    </div>
  </article>;
}
