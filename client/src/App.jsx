import { Routes, Route, Link, NavLink, Navigate } from "react-router-dom";
import { useStore } from "./store.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Auth from "./pages/Auth.jsx";
import Orders from "./pages/Orders.jsx";

export default function App() {
  const { user, logout, count } = useStore();
  return (
    <>
      <header className="bar">
        <Link to="/" className="logo">zepto<span>10 min</span></Link>
        <nav>
          {user && <NavLink to="/orders">Orders</NavLink>}
          {user ? (
            <button className="link" onClick={logout}>Log out ({user.name.split(" ")[0]})</button>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
          <NavLink to="/cart" className="cartlink">Cart{count > 0 && <b>{count}</b>}</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  );
}