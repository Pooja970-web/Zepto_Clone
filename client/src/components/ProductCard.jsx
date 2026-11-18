import { useStore } from "../store.jsx";

export default function ProductCard({ p }) {
  const { qtyOf, setQty } = useStore();
  const q = qtyOf(p._id);
  const off = p.mrp > p.price ? Math.round((1 - p.price / p.mrp) * 100) : 0;

  return (
    <article className="card">
      <div className="pic" aria-hidden>
        {p.emoji}
        {off > 0 && <em>{off}% off</em>}
      </div>
      <h3>{p.name}</h3>
      <p className="unit">{p.unit}</p>
      <div className="row">
        <span className="price">₹{p.price}{off > 0 && <s>₹{p.mrp}</s>}</span>
        {p.stock === 0 ? (
          <span className="unit">Sold out</span>
        ) : q === 0 ? (
          <button className="add" onClick={() => setQty(p, 1)}>Add</button>
        ) : (
          <div className="step">
            <button aria-label={`Remove one ${p.name}`} onClick={() => setQty(p, q - 1)}>−</button>
            <span>{q}</span>
            <button aria-label={`Add one ${p.name}`} onClick={() => setQty(p, q + 1)}>+</button>
          </div>
        )}
      </div>
    </article>
  );
}