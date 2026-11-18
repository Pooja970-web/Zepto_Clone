import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext();
export const useStore = () => useContext(Ctx);

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export function StoreProvider({ children }) {
  const [user, setUser] = useState(() => load("zepto_user", null));
  const [cart, setCart] = useState(() => load("zepto_cart", [])); // [{ product, qty }]

  useEffect(() => {
    localStorage.setItem("zepto_cart", JSON.stringify(cart));
  }, [cart]);

  const login = ({ token, user }) => {
    localStorage.setItem("zepto_token", token);
    localStorage.setItem("zepto_user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("zepto_token");
    localStorage.removeItem("zepto_user");
    setUser(null);
  };

  // qty 0 ho to item cart se hat jata hai
  const setQty = (product, qty) => {
    setCart((c) => {
      const rest = c.filter((i) => i.product._id !== product._id);
      return qty > 0 ? [...rest, { product, qty: Math.min(qty, product.stock) }] : rest;
    });
  };

  const qtyOf = (id) => cart.find((i) => i.product._id === id)?.qty || 0;
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.qty * i.product.price, 0);
  const delivery = subtotal === 0 || subtotal >= 199 ? 0 : 15;
  const clear = () => setCart([]);

  return (
    <Ctx.Provider value={{ user, login, logout, cart, setQty, qtyOf, count, subtotal, delivery, clear }}>
      {children}
    </Ctx.Provider>
  );
}