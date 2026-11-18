import { Routes, Route, Link } from "react-router-dom";
import { useStore } from "./store.jsx";
import Home from "./pages/Home.jsx";

export default function App() {
  const { count } = useStore();
  return (
    <>
      <header className="bar">
        <Link to="/" className="logo">zepto<span>10 min</span></Link>
        <nav>
          <span className="cartlink">Cart{count > 0 && <b>{count}</b>}</span>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}