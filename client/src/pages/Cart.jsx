import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { errMsg } from "../api.js";
import { useStore } from "../store.jsx";

export default function Cart() {
  const { cart, setQty, subtotal, delivery, user, clear } = useStore();
  const [address, setAddress] = useState(user?.address || "");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();

  if (cart.length === 0)
    return <p className="note">Your cart is empty. <Link to="/">Start shopping</Link></p>;

  const place = async () => {
    if (!user) return nav("/login");
    setBusy(true);
    setErr("");
    try {
      await api.post("/orders", {
        address,
        items: cart.map((i) => ({ product: i.product._id, qty: i.qty })),
      });
      clear();
      nav("/orders");
    } catch (e) {
      setErr(errMsg(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="panel">
      <h2>Your cart</h2>
      <ul className="lines">
        {cart.map(({ product: p, qty }) => (
          <li key={p._id}>
            <span>{p.emoji} {p.name} <small>{p.unit}</small></span>
            <div className="step">
              <button onClick={() => setQty(p, qty - 1)} aria-label="Remove one">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(p, qty + 1)} aria-label="Add one">+</button>
            </div>
            <b>₹{p.price * qty}</b>
          </li>
        ))}
      </ul>

      <dl className="sum">
        <div><dt>Items</dt><dd>₹{subtotal}</dd></div>
        <div><dt>Delivery</dt><dd>{delivery === 0 ? "Free" : `₹${delivery}`}</dd></div>
        <div className="tot"><dt>To pay</dt><dd>₹{subtotal + delivery}</dd></div>
      </dl>
      {subtotal < 199 && <p className="note">Add ₹{199 - subtotal} more for free delivery</p>}

      <label>
        Delivery address
        <textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Flat, building, street, area" />
      </label>
      {err && <p className="note err">{err}</p>}
      <button className="cta" disabled={busy} onClick={place}>
        {user ? (busy ? "Placing order…" : "Place order") : "Log in to place order"}
      </button>
    </section>
  );
}