import React, { useEffect, useState } from "react";
async function api(path, opts={}) {
  const token = localStorage.getItem("token");
  const res = await fetch((import.meta.env.VITE_API_URL||"")+"/api"+path, { ...opts, headers: { "Content-Type":"application/json", ...(token?{Authorization:"Bearer "+token}:{}), ...(opts.headers||{}) } });
  if(!res.ok) throw new Error(await res.text());
  const text = await res.text();
  if(!text) return null;
  return JSON.parse(text);
}
function PartyPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const load=()=>api("/parties").then(setRows);
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); await api("/parties",{method:"POST",body:JSON.stringify(form)}); setForm({}); load();};
  const remove=id=>api("/parties/"+id,{method:"DELETE"}).then(load);
  return (<div className="card"><h2>Partys</h2>
    <form className="grid-form" onSubmit={save}>
        <label>name<input value={form.name ?? ""} onChange={ev => setForm({...form, name: ev.target.value})} /></label>
        <label>phone<input value={form.phone ?? ""} onChange={ev => setForm({...form, phone: ev.target.value})} /></label>
        <label>city<input value={form.city ?? ""} onChange={ev => setForm({...form, city: ev.target.value})} /></label>
        <label>creditDays<input value={form.creditDays ?? ""} onChange={ev => setForm({...form, creditDays: ev.target.value})} /></label>
      <button type="submit">Add</button>
    </form>
    <div className="table-wrap"><table><thead><tr><th>name</th><th>phone</th><th>city</th><th>creditDays</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.name ?? "")}</td><td>{String(row.phone ?? "")}</td><td>{String(row.city ?? "")}</td><td>{String(row.creditDays ?? "")}</td><td><button className="link" onClick={()=>remove(row.id)}>Delete</button></td></tr>)}</tbody></table></div>
  </div>);
}

function InvoicePage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const load=()=>api("/invoices").then(setRows);
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); await api("/invoices",{method:"POST",body:JSON.stringify(form)}); setForm({}); load();};
  const remove=id=>api("/invoices/"+id,{method:"DELETE"}).then(load);
  return (<div className="card"><h2>Invoices</h2>
    <form className="grid-form" onSubmit={save}>
        <label>partyId<input value={form.partyId ?? ""} onChange={ev => setForm({...form, partyId: ev.target.value})} /></label>
        <label>invoiceNo<input value={form.invoiceNo ?? ""} onChange={ev => setForm({...form, invoiceNo: ev.target.value})} /></label>
        <label>amount<input value={form.amount ?? ""} onChange={ev => setForm({...form, amount: ev.target.value})} /></label>
        <label>outstanding<input value={form.outstanding ?? ""} onChange={ev => setForm({...form, outstanding: ev.target.value})} /></label>
        <label>dueOn<input value={form.dueOn ?? ""} onChange={ev => setForm({...form, dueOn: ev.target.value})} /></label>
      <button type="submit">Add</button>
    </form>
    <div className="table-wrap"><table><thead><tr><th>partyId</th><th>invoiceNo</th><th>amount</th><th>outstanding</th><th>dueOn</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.partyId ?? "")}</td><td>{String(row.invoiceNo ?? "")}</td><td>{String(row.amount ?? "")}</td><td>{String(row.outstanding ?? "")}</td><td>{String(row.dueOn ?? "")}</td><td><button className="link" onClick={()=>remove(row.id)}>Delete</button></td></tr>)}</tbody></table></div>
  </div>);
}

function PromisePage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const load=()=>api("/promises").then(setRows);
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); await api("/promises",{method:"POST",body:JSON.stringify(form)}); setForm({}); load();};
  const remove=id=>api("/promises/"+id,{method:"DELETE"}).then(load);
  return (<div className="card"><h2>Promises</h2>
    <form className="grid-form" onSubmit={save}>
        <label>invoiceId<input value={form.invoiceId ?? ""} onChange={ev => setForm({...form, invoiceId: ev.target.value})} /></label>
        <label>promiseOn<input value={form.promiseOn ?? ""} onChange={ev => setForm({...form, promiseOn: ev.target.value})} /></label>
        <label>note<input value={form.note ?? ""} onChange={ev => setForm({...form, note: ev.target.value})} /></label>
        <label>status<input value={form.status ?? ""} onChange={ev => setForm({...form, status: ev.target.value})} /></label>
      <button type="submit">Add</button>
    </form>
    <div className="table-wrap"><table><thead><tr><th>invoiceId</th><th>promiseOn</th><th>note</th><th>status</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.invoiceId ?? "")}</td><td>{String(row.promiseOn ?? "")}</td><td>{String(row.note ?? "")}</td><td>{String(row.status ?? "")}</td><td><button className="link" onClick={()=>remove(row.id)}>Delete</button></td></tr>)}</tbody></table></div>
  </div>);
}

function CollectionPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const load=()=>api("/collections").then(setRows);
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); await api("/collections",{method:"POST",body:JSON.stringify(form)}); setForm({}); load();};
  const remove=id=>api("/collections/"+id,{method:"DELETE"}).then(load);
  return (<div className="card"><h2>Collections</h2>
    <form className="grid-form" onSubmit={save}>
        <label>invoiceId<input value={form.invoiceId ?? ""} onChange={ev => setForm({...form, invoiceId: ev.target.value})} /></label>
        <label>amount<input value={form.amount ?? ""} onChange={ev => setForm({...form, amount: ev.target.value})} /></label>
        <label>mode<input value={form.mode ?? ""} onChange={ev => setForm({...form, mode: ev.target.value})} /></label>
      <button type="submit">Add</button>
    </form>
    <div className="table-wrap"><table><thead><tr><th>invoiceId</th><th>amount</th><th>mode</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.invoiceId ?? "")}</td><td>{String(row.amount ?? "")}</td><td>{String(row.mode ?? "")}</td><td><button className="link" onClick={()=>remove(row.id)}>Delete</button></td></tr>)}</tbody></table></div>
  </div>);
}
function Dashboard(){
  const [data,setData]=useState(null);
  useEffect(()=>{ api("/dashboard").then(setData).catch(()=>{}); },[]);
  return (<div>
    <div className="hero">
      <div className="stat"><span className="muted">Product</span><b>PartyChase</b></div>
      <div className="stat"><span className="muted">Workspace</span><b>{data?.tenant || "—"}</b></div>
      <div className="stat"><span className="muted">Region</span><b>ap-south-1</b></div>
    </div>
    <div className="card"><p>{data?.tag || "Outstanding chase when Tally lives at the CA. Import, promise, collect."}</p></div>
  </div>);
}
export default function App(){
  const [token,setToken]=useState(localStorage.getItem("token"));
  const [menu,setMenu]=useState(false);
  const [page,setPage]=useState("dashboard");
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({tenantName:"",city:"Mumbai",fullName:"",email:"",password:""});
  const [err,setErr]=useState("");
  async function submit(ev){
    ev.preventDefault(); setErr("");
    try{
      const path = mode==="register"?"/auth/register":"/auth/login";
      const body = mode==="register"?form:{email:form.email,password:form.password};
      const out = await api(path,{method:"POST",body:JSON.stringify(body)});
      localStorage.setItem("token", out.token); setToken(out.token);
    }catch(e){ setErr(e.message); }
  }
  if(!token){
    return (<div className="auth card">
      <h1>PartyChase</h1><p className="muted">Outstanding chase when Tally lives at the CA. Import, promise, collect.</p>
      <form onSubmit={submit} className="grid-form">
        {mode==="register" && <>
          <label>Workspace<input value={form.tenantName} onChange={e=>setForm({...form,tenantName:e.target.value})} required /></label>
          <label>City<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /></label>
          <label>Your name<input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} required /></label>
        </>}
        <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></label>
        <label>Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /></label>
        <button type="submit">{mode==="register"?"Create workspace":"Log in"}</button>
      </form>
      {err && <p className="muted">{err}</p>}
      <button className="link" onClick={()=>setMode(mode==="login"?"register":"login")}>{mode==="login"?"Create a workspace":"Have an account? Log in"}</button>
    </div>);
  }
  let body = <Dashboard />;
  if(page==="parties") body = <PartyPage />;
  if(page==="invoices") body = <InvoicePage />;
  if(page==="promises") body = <PromisePage />;
  if(page==="collections") body = <CollectionPage />;
  return (<div>
    <div className="top"><button type="button" className="burger" onClick={()=>setMenu(v=>!v)}>Menu</button><div className="brand">PartyChase</div><button onClick={()=>{localStorage.removeItem("token"); setToken(null);}}>Log out</button></div>
    <div className="layout">
      {menu && <button className="scrim" onClick={()=>setMenu(false)} />}
      <nav className={"side"+(menu?" open":"")} onClick={()=>setMenu(false)}>
          <button className={page==="dashboard"?"active":""} onClick={()=>setPage("dashboard")}>Home</button>
          <button className={page==="parties"?"active":""} onClick={()=>setPage("parties")}>Partys</button>
          <button className={page==="invoices"?"active":""} onClick={()=>setPage("invoices")}>Invoices</button>
          <button className={page==="promises"?"active":""} onClick={()=>setPage("promises")}>Promises</button>
          <button className={page==="collections"?"active":""} onClick={()=>setPage("collections")}>Collections</button>
      </nav>
      <main>{body}</main>
      <nav className="tabs">
          <button className={page==="dashboard"?"active":""} onClick={()=>setPage("dashboard")}>Home</button>
          <button className={page==="parties"?"active":""} onClick={()=>setPage("parties")}>Partys</button>
          <button className={page==="invoices"?"active":""} onClick={()=>setPage("invoices")}>Invoices</button>
          <button className={page==="promises"?"active":""} onClick={()=>setPage("promises")}>Promises</button>
          <button className={page==="collections"?"active":""} onClick={()=>setPage("collections")}>Collections</button>
      </nav>
    </div>
  </div>);
}
