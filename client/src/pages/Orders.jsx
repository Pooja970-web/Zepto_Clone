import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api, { errMsg } from "../api.js";

const label = { placed: "Order placed", packed: "Packed", on_the_way: "On the way", delivered: "Delivered" };

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get("/orders/mine").then((r) => setOrders(r.data)).catch((e) => setErr(errMsg(e)));
  }, []);

  if (err) return <p className="note err">{err}</p>;
  if (!orders) return <p className="note">Loading orders…</p>;
  if (!orders.length) return <p className="note">No orders yet. <Link to="/">Browse products</Link></p>;

  return (
    <section className="panel">
      <h2>Your orders</h2>
      {orders.map((o) => (
        <article key={o._id} className="order">
          <div className="row">
            <b>₹{o.total}</b>
            <span className={`tag ${o.status}`}>{label[o.status]}</span>
          </div>
          <p className="unit">{new Date(o.createdAt).toLocaleString()} · {o.address}</p>
          <p>{o.items.map((i) => `${i.name} × ${i.qty}`).join(", ")}</p>
        </article>
      ))}
    </section>
  );
}