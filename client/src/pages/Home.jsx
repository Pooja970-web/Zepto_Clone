import { useEffect, useState } from "react";
import api, { errMsg } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [state, setState] = useState("loading");

  useEffect(() => {
    api.get("/products/categories").then((r) => setCats(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setState("loading");
    const t = setTimeout(() => {
      api.get("/products", { params: { category: cat, q } })
        .then((r) => { setProducts(r.data); setState("ready"); })
        .catch((e) => setState(errMsg(e)));
    }, 250); // typing rukne ke 250ms baad search
    return () => clearTimeout(t);
  }, [cat, q]);

  return (
    <>
      <section className="hero">
        <h1>Groceries at your door in <strong>10 minutes</strong></h1>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for milk, chips, bread…"
          aria-label="Search products"
        />
      </section>

      <div className="chips">
        {["All", ...cats].map((c) => (
          <button key={c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      {state === "loading" && <p className="note">Loading products…</p>}
      {state !== "loading" && state !== "ready" && <p className="note err">{state}. Check that the server is running</p>}
      {state === "ready" && products.length === 0 && <p className="note">Nothing matches “{q}”. Try a different word</p>}

      <div className="grid">
        {products.map((p) => <ProductCard key={p._id} p={p} />)}
      </div>
    </>
  );
}