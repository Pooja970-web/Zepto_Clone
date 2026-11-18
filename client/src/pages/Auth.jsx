import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { errMsg } from "../api.js";
import { useStore } from "../store.jsx";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [f, setF] = useState({ name: "", email: "", password: "", address: "" });
  const [err, setErr] = useState("");
  const { login } = useStore();
  const nav = useNavigate();
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await api.post(`/auth/${mode === "login" ? "login" : "register"}`, f);
      login(data);
      nav("/");
    } catch (e) {
      setErr(errMsg(e));
    }
  };

  return (
    <form className="panel narrow" onSubmit={submit}>
      <h2>{mode === "login" ? "Log in" : "Create your account"}</h2>
      {mode === "register" && (
        <>
          <label>Name<input required value={f.name} onChange={set("name")} /></label>
          <label>Delivery address<input value={f.address} onChange={set("address")} /></label>
        </>
      )}
      <label>Email<input type="email" required value={f.email} onChange={set("email")} /></label>
      <label>Password<input type="password" required minLength={6} value={f.password} onChange={set("password")} /></label>
      {err && <p className="note err">{err}</p>}
      <button className="cta">{mode === "login" ? "Log in" : "Sign up"}</button>
      <button type="button" className="link" onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "New here? Create an account" : "Have an account? Log in"}
      </button>
    </form>
  );
}