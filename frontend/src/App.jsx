import React, { useEffect, useState } from "react";
function parseErr(t){ try{ const j=JSON.parse(t); return j.error||t; }catch{ return t||"Request failed"; } }
async function api(path, opts={}) {
  const token = localStorage.getItem("token");
  const res = await fetch((import.meta.env.VITE_API_URL||"")+"/api"+path, {
    ...opts,
    headers: { "Content-Type":"application/json", ...(token?{Authorization:"Bearer "+token}:{}), ...(opts.headers||{}) }
  });
  const text = await res.text();
  if(!res.ok) throw new Error(parseErr(text));
  if(!text) return null;
  return JSON.parse(text);
}
function PartiesPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const [err,setErr]=useState("");
  const load=()=>api("/parties").then(setRows).catch(e=>setErr(e.message));
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); setErr(""); try{ await api("/parties",{method:"POST",body:JSON.stringify(form)}); setForm({}); load(); }catch(e){ setErr(e.message); }};
  const remove=id=>api("/parties/"+id,{method:"DELETE"}).then(load).catch(e=>setErr(e.message));
  return (<section className="card">
    <h2>Parties</h2>
    <p className="muted">Add retailers you give credit to.</p>
    <form className="grid-form" onSubmit={save}>
        <label>Party<input value={form.name ?? ""} onChange={ev => setForm({...form, name: ev.target.value})} /></label>
        <label>Phone<input value={form.phone ?? ""} onChange={ev => setForm({...form, phone: ev.target.value})} /></label>
        <label>City<input value={form.city ?? ""} onChange={ev => setForm({...form, city: ev.target.value})} /></label>
        <label>Credit days<input value={form.creditDays ?? ""} onChange={ev => setForm({...form, creditDays: ev.target.value})} /></label>
      <button type="submit">Save</button>
    </form>
    {err && <p className="err">{err}</p>}
    {rows.length===0 ? <div className="empty">Add retailers you give credit to.</div> : (
    <div className="table-wrap"><table><thead><tr><th>Party</th><th>Phone</th><th>City</th><th>Credit days</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.name ?? "")}</td><td>{String(row.phone ?? "")}</td><td>{String(row.city ?? "")}</td><td>{String(row.creditDays ?? "")}</td><td><button className="danger" onClick={()=>remove(row.id)}>Remove</button></td></tr>)}</tbody></table></div>)}
  </section>);
}

function OutstandingPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const [err,setErr]=useState("");
  const load=()=>api("/invoices").then(setRows).catch(e=>setErr(e.message));
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); setErr(""); try{ await api("/invoices",{method:"POST",body:JSON.stringify(form)}); setForm({}); load(); }catch(e){ setErr(e.message); }};
  const remove=id=>api("/invoices/"+id,{method:"DELETE"}).then(load).catch(e=>setErr(e.message));
  return (<section className="card">
    <h2>Outstanding</h2>
    <p className="muted">Paste bills from the CA Excel.</p>
    <form className="grid-form" onSubmit={save}>
        <label>Party id<input value={form.partyId ?? ""} onChange={ev => setForm({...form, partyId: ev.target.value})} /></label>
        <label>Invoice no<input value={form.invoiceNo ?? ""} onChange={ev => setForm({...form, invoiceNo: ev.target.value})} /></label>
        <label>Amount<input value={form.amount ?? ""} onChange={ev => setForm({...form, amount: ev.target.value})} /></label>
        <label>Outstanding<input value={form.outstanding ?? ""} onChange={ev => setForm({...form, outstanding: ev.target.value})} /></label>
        <label>Due<input value={form.dueOn ?? ""} onChange={ev => setForm({...form, dueOn: ev.target.value})} /></label>
      <button type="submit">Save</button>
    </form>
    {err && <p className="err">{err}</p>}
    {rows.length===0 ? <div className="empty">Paste bills from the CA Excel.</div> : (
    <div className="table-wrap"><table><thead><tr><th>Party id</th><th>Invoice no</th><th>Amount</th><th>Outstanding</th><th>Due</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.partyId ?? "")}</td><td>{String(row.invoiceNo ?? "")}</td><td>{String(row.amount ?? "")}</td><td>{String(row.outstanding ?? "")}</td><td>{String(row.dueOn ?? "")}</td><td><button className="danger" onClick={()=>remove(row.id)}>Remove</button></td></tr>)}</tbody></table></div>)}
  </section>);
}

function PromisesPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const [err,setErr]=useState("");
  const load=()=>api("/promises").then(setRows).catch(e=>setErr(e.message));
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); setErr(""); try{ await api("/promises",{method:"POST",body:JSON.stringify(form)}); setForm({}); load(); }catch(e){ setErr(e.message); }};
  const remove=id=>api("/promises/"+id,{method:"DELETE"}).then(load).catch(e=>setErr(e.message));
  return (<section className="card">
    <h2>Promises</h2>
    <p className="muted">No payment promises yet.</p>
    <form className="grid-form" onSubmit={save}>
        <label>Invoice id<input value={form.invoiceId ?? ""} onChange={ev => setForm({...form, invoiceId: ev.target.value})} /></label>
        <label>Promise date<input value={form.promiseOn ?? ""} onChange={ev => setForm({...form, promiseOn: ev.target.value})} /></label>
        <label>Note<input value={form.note ?? ""} onChange={ev => setForm({...form, note: ev.target.value})} /></label>
        <label>Status<input value={form.status ?? ""} onChange={ev => setForm({...form, status: ev.target.value})} /></label>
      <button type="submit">Save</button>
    </form>
    {err && <p className="err">{err}</p>}
    {rows.length===0 ? <div className="empty">No payment promises yet.</div> : (
    <div className="table-wrap"><table><thead><tr><th>Invoice id</th><th>Promise date</th><th>Note</th><th>Status</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.invoiceId ?? "")}</td><td>{String(row.promiseOn ?? "")}</td><td>{String(row.note ?? "")}</td><td>{String(row.status ?? "")}</td><td><button className="danger" onClick={()=>remove(row.id)}>Remove</button></td></tr>)}</tbody></table></div>)}
  </section>);
}

function CollectionsPage(){
  const [rows,setRows]=useState([]);
  const [form,setForm]=useState({});
  const [err,setErr]=useState("");
  const load=()=>api("/collections").then(setRows).catch(e=>setErr(e.message));
  useEffect(()=>{load();},[]);
  const save=async ev=>{ev.preventDefault(); setErr(""); try{ await api("/collections",{method:"POST",body:JSON.stringify(form)}); setForm({}); load(); }catch(e){ setErr(e.message); }};
  const remove=id=>api("/collections/"+id,{method:"DELETE"}).then(load).catch(e=>setErr(e.message));
  return (<section className="card">
    <h2>Collections</h2>
    <p className="muted">Log cash and UPI as they come in.</p>
    <form className="grid-form" onSubmit={save}>
        <label>Invoice id<input value={form.invoiceId ?? ""} onChange={ev => setForm({...form, invoiceId: ev.target.value})} /></label>
        <label>Amount<input value={form.amount ?? ""} onChange={ev => setForm({...form, amount: ev.target.value})} /></label>
        <label>Mode<input value={form.mode ?? ""} onChange={ev => setForm({...form, mode: ev.target.value})} /></label>
      <button type="submit">Save</button>
    </form>
    {err && <p className="err">{err}</p>}
    {rows.length===0 ? <div className="empty">Log cash and UPI as they come in.</div> : (
    <div className="table-wrap"><table><thead><tr><th>Invoice id</th><th>Amount</th><th>Mode</th><th></th></tr></thead>
    <tbody>{rows.map(row=><tr key={row.id}><td>{String(row.invoiceId ?? "")}</td><td>{String(row.amount ?? "")}</td><td>{String(row.mode ?? "")}</td><td><button className="danger" onClick={()=>remove(row.id)}>Remove</button></td></tr>)}</tbody></table></div>)}
  </section>);
}
function Dashboard(){
  const [w,setW]=useState(null);
  useEffect(()=>{ api("/work").then(setW).catch(()=>{}); },[]);
  const a=w?.ageing||{};
  return (<div>
    <div className="hero-panel">
      <div className="kicker">Today</div>
      <h1>Who owes you money</h1>
      <p>Ageing from Tally-style bills. Copy the chase message. Collect on the Collections page.</p>
    </div>
    <div className="hero">
      <div className="stat"><span>Total due</span><b>Rs {w?.totalOutstanding ?? 0}</b></div>
      <div className="stat"><span>0-30 days</span><b>Rs {a.d0_30 ?? 0}</b></div>
      <div className="stat"><span>31-60</span><b>Rs {a.d31_60 ?? 0}</b></div>
      <div className="stat"><span>90+</span><b>Rs {a.d90plus ?? 0}</b></div>
    </div>
    <section className="card">
      <h2>Chase list</h2>
      {(w?.chase||[]).length===0 ? <div className="empty">Add invoices with outstanding amount and due date.</div> : (
        <div className="table-wrap"><table><thead><tr><th>Party</th><th>Bill</th><th>Due</th><th>Amount</th><th></th></tr></thead>
        <tbody>{(w?.chase||[]).map(r=><tr key={r.id}><td>{r.party}</td><td>{r.invoiceNo}</td><td>{r.dueOn}</td><td>Rs {r.outstanding}</td>
          <td><button className="ghost-ink" onClick={()=>navigator.clipboard.writeText(r.reminder)}>Copy chase</button></td></tr>)}</tbody></table></div>
      )}
    </section>
  </div>);
}
export default function App(){
  const [token,setToken]=useState(localStorage.getItem("token"));
  const [menu,setMenu]=useState(false);
  const [page,setPage]=useState("dashboard");
  const [mode,setMode]=useState("login");
  const [form,setForm]=useState({tenantName:"",city:"Pune",fullName:"",email:"",password:""});
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
    return (<div className="auth-wrap">
      <div className="auth">
        <div className="kicker">For distributors</div>
        <h1>PartyChase</h1>
        <p className="muted">Chase outstanding when Tally sits at the CA. Promise Friday. Collect.</p>
        <form onSubmit={submit} className="grid-form">
          {mode==="register" && <>
            <label>Workspace<input value={form.tenantName} onChange={e=>setForm({...form,tenantName:e.target.value})} required /></label>
            <label>City<input value={form.city} onChange={e=>setForm({...form,city:e.target.value})} /></label>
            <label>Your name<input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} required /></label>
          </>}
          <label>Email<input type="email" autoComplete="username" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></label>
          <label>Password<input type="password" autoComplete={mode==="login"?"current-password":"new-password"} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required minLength={8} /></label>
          <button type="submit">{mode==="register"?"Open workspace":"Log in"}</button>
        </form>
        {err && <p className="err">{err}</p>}
        <button className="ghost-ink" onClick={()=>setMode(mode==="login"?"register":"login")}>{mode==="login"?"Create a workspace":"Have an account? Log in"}</button>
      </div>
    </div>);
  }
  let body = <Dashboard />;
  if(page==="parties") body = <PartiesPage />;
  if(page==="invoices") body = <OutstandingPage />;
  if(page==="promises") body = <PromisesPage />;
  if(page==="collections") body = <CollectionsPage />;
  return (<div className="shell">
    <div className="top">
      <button type="button" className="burger" onClick={()=>setMenu(v=>!v)}>Menu</button>
      <div className="brand">PartyChase</div>
      <button className="ghost" onClick={()=>{localStorage.removeItem("token"); setToken(null);}}>Log out</button>
    </div>
    <div className="layout">
      {menu && <button className="scrim" onClick={()=>setMenu(false)} />}
      <nav className={"side"+(menu?" open":"")} onClick={()=>setMenu(false)}>
          <button className={page==="dashboard"?"active":""} onClick={()=>setPage("dashboard")}>Home</button>
          <button className={page==="parties"?"active":""} onClick={()=>setPage("parties")}>Parties</button>
          <button className={page==="invoices"?"active":""} onClick={()=>setPage("invoices")}>Outstanding</button>
          <button className={page==="promises"?"active":""} onClick={()=>setPage("promises")}>Promises</button>
          <button className={page==="collections"?"active":""} onClick={()=>setPage("collections")}>Collections</button>
      </nav>
      <main>{body}</main>
      <nav className="tabs">
          <button className={page==="dashboard"?"active":""} onClick={()=>setPage("dashboard")}>Home</button>
          <button className={page==="parties"?"active":""} onClick={()=>setPage("parties")}>Parties</button>
          <button className={page==="invoices"?"active":""} onClick={()=>setPage("invoices")}>Outstanding</button>
          <button className={page==="promises"?"active":""} onClick={()=>setPage("promises")}>Promises</button>
          <button className={page==="collections"?"active":""} onClick={()=>setPage("collections")}>Collections</button>
      </nav>
    </div>
  </div>);
}
