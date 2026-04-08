import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   VERTEX FUNDED — Admin Back-Office [FULLY FIXED]
   White + Purple · All pages working · Powered by ForexOpsPro
   ═══════════════════════════════════════════════════════════ */

const V={bg:"#F8F7FC",sf:"#FFFFFF",card:"#FFFFFF",hover:"#F5F3FF",sel:"#EEEBFF",
bd:"#E8E5F0",bdL:"#F0EDF8",p:"#7C3AED",pm:"#8B5CF6",pl:"#A78BFA",pdim:"rgba(124,58,237,0.06)",pglow:"rgba(124,58,237,0.12)",pbd:"rgba(124,58,237,0.15)",
g:"#10B981",gd:"rgba(16,185,129,0.08)",r:"#EF4444",rd:"rgba(239,68,68,0.08)",
a:"#F59E0B",ad:"rgba(245,158,11,0.08)",b:"#3B82F6",pk:"#EC4899",
t:"#1A1A2E",m:"#6B7280",f:"#9CA3AF",h:"#D1D5DB",rl:"14px"};

const $=n=>typeof n==="number"?n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}):"0";
const $k=n=>n>=1e6?`$${(n/1e6).toFixed(2)}M`:n>=1e3?`$${(n/1e3).toFixed(1)}K`:`$${$(n)}`;

/* ═══ DATA ═══ */
const TRADERS=[
  {id:"TR-001",name:"Alex Morgan",email:"alex.m@gmail.com",country:"US",accounts:3,totalEq:131467,pnl:6467,risk:12,riskLvl:"Low",kyc:"Verified",joined:"11/10/2025",lastTrade:"Today",status:"active"},
  {id:"TR-002",name:"Kenji Tanaka",email:"k.tanaka@yahoo.com",country:"JP",accounts:2,totalEq:76420,pnl:1420,risk:8,riskLvl:"Low",kyc:"Verified",joined:"01/05/2026",lastTrade:"Today",status:"active"},
  {id:"TR-003",name:"Sofia Petrov",email:"s.petrov@mail.ru",country:"RU",accounts:1,totalEq:48200,pnl:-1800,risk:45,riskLvl:"Elevated",kyc:"Verified",joined:"02/14/2026",lastTrade:"Yesterday",status:"active"},
  {id:"TR-005",name:"Chen Wei Lin",email:"cwlin@temp.biz",country:"CN",accounts:1,totalEq:0,pnl:-10000,risk:92,riskLvl:"Critical",kyc:"Failed",joined:"03/01/2026",lastTrade:"03/15/2026",status:"suspended"},
  {id:"TR-007",name:"Viktor Novak",email:"vnovak@temp.io",country:"CZ",accounts:2,totalEq:98400,pnl:-600,risk:78,riskLvl:"High",kyc:"Pending",joined:"02/28/2026",lastTrade:"2 days ago",status:"flagged"},
];

const ACCTS=[
  {id:"VTX-850042",trader:"Alex Morgan",size:50000,phase:"Funded",equity:54847,pnl:4847,dailyPnl:-127,platform:"MT5",status:"active",riskScore:12},
  {id:"VTX-850038",trader:"Alex Morgan",size:25000,phase:"Phase 2",equity:26420,pnl:1420,dailyPnl:312,platform:"cTrader",status:"active",riskScore:8},
  {id:"VTX-850030",trader:"Sofia Petrov",size:50000,phase:"Phase 2",equity:48200,pnl:-1800,dailyPnl:-440,platform:"MT5",status:"active",riskScore:45},
  {id:"VTX-850020",trader:"Chen Wei Lin",size:100000,phase:"Failed",equity:0,pnl:-10000,dailyPnl:0,platform:"MT5",status:"breached",riskScore:92},
];

const PAYOUT_Q=[
  {id:"PQ-401",trader:"Alex Morgan",account:"VTX-850042",profit:4847,split:80,amount:3877.60,status:"Pending",reason:""},
  {id:"PQ-402",trader:"Omar Hassan",account:"VTX-850028",profit:4800,split:80,amount:3840,status:"Approved",reason:""},
  {id:"PQ-405",trader:"Viktor Novak",account:"VTX-850039",profit:0,status:"Flagged",amount:0,split:80,reason:"Account under risk review — CID cluster detected"},
];

const VIOLATIONS=[
  {id:"RV-101",trader:"Chen Wei Lin",rule:"Max Daily Loss",severity:"Critical",detection:"Auto",ts:"03/15/2026 14:22",account:"VTX-850020",detail:"Loss of $5,100 exceeded 5% daily limit"},
  {id:"RV-102",trader:"Viktor Novak",rule:"Consistency Rule",severity:"High",detection:"Auto",ts:"04/02/2026 07:01",account:"VTX-850039",detail:"82% of profit in single 3-hour session"},
  {id:"RV-103",trader:"Sofia Petrov",rule:"Lot Size Limit",severity:"Medium",detection:"Auto",ts:"04/04/2026 11:45",account:"VTX-850030",detail:"Lot size 5.2 exceeded max of 5.0"},
];

const RISK_DATA=[
  {id:"RK-01",trader:"Chen Wei Lin",type:"Martingale",severity:"Critical",cid:"CID-9A4B",ip:"154.208.40.59",country:"CN",detail:"Progressive lot doubling on GBPUSD. Classic martingale abuse.",action:"Account disabled"},
  {id:"RK-02",trader:"Viktor Novak",type:"Multi-Account",severity:"High",cid:"CID-7X2K",ip:"185.220.101.44",country:"CZ",detail:"Same CID across accounts. Identical trade timing.",action:"Under review"},
];

const TICKETS=[
  {id:"TK-201",trader:"Kenji Tanaka",subject:"Phase 2 upgrade confirmation",status:"open",priority:"Medium",created:"04/04/2026",category:"Upgrade",messages:2,ago:"3h ago"},
  {id:"TK-202",trader:"Chen Wei Lin",subject:"Account breach dispute",status:"escalated",priority:"Critical",created:"03/16/2026",category:"Dispute",messages:8,ago:"20m ago"},
  {id:"TK-203",trader:"Alex Morgan",subject:"Payout processing delay",status:"open",priority:"High",created:"04/05/2026",category:"Payout",messages:1,ago:"1h ago"},
];

/* ═══ ATOMS ═══ */
const Pip=({c=V.p,s=7})=><span style={{width:s,height:s,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0}}/>;
const Tag=({children,c=V.p})=><span style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:600,background:`${c}12`,color:c,border:`1px solid ${c}20`,whiteSpace:"nowrap"}}>{children}</span>;
const Btn=({children,primary,danger,onClick,disabled,style:s={}})=><button onClick={onClick} disabled={disabled} style={{padding:primary||danger?"10px 22px":"8px 16px",background:primary?`linear-gradient(135deg,${V.p},${V.pm})`:danger?V.rd:V.sf,color:primary?"#fff":danger?V.r:V.m,border:`1px solid ${primary?V.p:danger?V.r:V.bd}`,borderRadius:8,fontSize:13,fontWeight:primary||danger?700:500,cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",transition:"all 0.15s",boxShadow:primary?`0 2px 12px ${V.pglow}`:"none",opacity:disabled?0.5:1,...s}}>{children}</button>;
const Card=({children,s={}})=><div style={{background:V.card,border:`1px solid ${V.bd}`,borderRadius:V.rl,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.03)",...s}}>{children}</div>;
const CH=({title,right,sub})=><div style={{padding:"14px 18px",borderBottom:`1px solid ${V.bdL}`,display:"flex",justifyContent:"space-between",alignItems:sub?"flex-start":"center"}}><div><div style={{fontSize:14,fontWeight:700,color:V.t}}>{title}</div>{sub&&<div style={{fontSize:11,color:V.f,marginTop:2}}>{sub}</div>}</div>{right}</div>;
const Stat=({label,value,sub,color=V.t,icon})=>(
  <div style={{background:V.card,border:`1px solid ${V.bd}`,borderRadius:V.rl,padding:"16px 18px",position:"relative",overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.03)"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color}40,transparent)`}}/>
    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>{icon&&<span style={{fontSize:12,opacity:0.5}}>{icon}</span>}<span style={{fontSize:10,color:V.m,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"}}>{label}</span></div>
    <div style={{fontSize:22,fontWeight:800,color,letterSpacing:"-0.02em",lineHeight:1}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:V.f,marginTop:6}}>{sub}</div>}
  </div>
);
const Th=({children})=><th style={{padding:"10px 14px",fontSize:10,fontWeight:700,color:V.f,textTransform:"uppercase",letterSpacing:"0.06em",textAlign:"left",borderBottom:`1px solid ${V.bdL}`,background:V.bg}}>{children}</th>;
const Td=({children,s={}})=><td style={{padding:"11px 14px",fontSize:13,color:V.m,borderBottom:`1px solid ${V.bdL}`,verticalAlign:"middle",...s}}>{children}</td>;
const TRow=({children,onClick,hl})=>{const[h,setH]=useState(false);return<tr style={{background:hl?V.rd:h?V.hover:"transparent",cursor:onClick?"pointer":"default",transition:"background 0.1s"}} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onClick}>{children}</tr>;};

/* ═══ PAGES ═══ */

function PgDashboard(){
  const totalRevenue=ACCTS.reduce((s,a)=>s+a.pnl,0);
  const activeTraders=TRADERS.filter(t=>t.status==="active").length;
  const criticalRisks=RISK_DATA.filter(r=>r.severity==="Critical"||r.severity==="High").length;
  const pendingPayouts=PAYOUT_Q.filter(p=>p.status==="Pending").length;
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14}}>
      <Stat label="Total Revenue" value={$k(totalRevenue)} color={V.g} icon="$"/>
      <Stat label="Active Traders" value={activeTraders} color={V.p} icon="◎"/>
      <Stat label="Accounts" value={ACCTS.length} color={V.b} icon="⊞"/>
      <Stat label="Critical Risks" value={criticalRisks} color={V.r} icon="⚡"/>
      <Stat label="Pending Payouts" value={pendingPayouts} color={V.a} icon="⧖"/>
    </div>
    <Card>
      <CH title="Quick Actions"/>
      <div style={{padding:20,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10}}>
        <Btn primary style={{cursor:"pointer"}}>Approve Payout</Btn>
        <Btn style={{cursor:"pointer"}}>Block Account</Btn>
        <Btn style={{cursor:"pointer"}}>Flag Trader</Btn>
        <Btn style={{cursor:"pointer"}}>Send Email</Btn>
      </div>
    </Card>
  </div>;
}

function PgTraders({search=""}){
  const[localSearch,setLocalSearch]=useState(search);
  const filtered=TRADERS.filter(t=>t.name.toLowerCase().includes(localSearch.toLowerCase())||t.email.toLowerCase().includes(localSearch.toLowerCase()));
  const[selectedTrader,setSelectedTrader]=useState(null);
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",gap:10}}>
      <input placeholder="Search traders..." value={localSearch} onChange={(e)=>setLocalSearch(e.target.value)}
        style={{flex:1,padding:"10px 14px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,fontFamily:"inherit",color:V.t}}/>
      <Btn primary>Search</Btn>
    </div>
    <Card>
      <CH title={`Traders (${filtered.length})`}/>
      <table style={{width:"100%"}}>
        <thead><tr>{["Name","Email","Country","Accounts","Equity","P&L","Risk","Status","Actions"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>
          {filtered.map(t=><TRow key={t.id}>
            <Td s={{fontWeight:700,color:V.t}}>{t.name}</Td>
            <Td s={{fontSize:11,color:V.f}}>{t.email}</Td>
            <Td>{t.country}</Td>
            <Td s={{fontWeight:600}}>{t.accounts}</Td>
            <Td s={{fontFamily:"monospace"}}>${$(t.totalEq)}</Td>
            <Td s={{fontFamily:"monospace",fontWeight:700,color:t.pnl>=0?V.g:V.r}}>+${$(t.pnl)}</Td>
            <Td><Tag c={t.risk<30?V.g:t.risk<60?V.a:V.r}>{t.riskLvl}</Tag></Td>
            <Td><Pip c={t.status==="active"?V.g:t.status==="suspended"?V.r:V.a} s={6}/></Td>
            <Td>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>setSelectedTrader(t)} style={{padding:"4px 8px",background:V.pdim,border:`1px solid ${V.pbd}`,borderRadius:6,fontSize:10,fontWeight:600,color:V.p,cursor:"pointer",fontFamily:"inherit"}}>Details</button>
                <button style={{padding:"4px 8px",background:t.status==="active"?V.rd:V.gd,border:"none",borderRadius:6,fontSize:10,fontWeight:600,color:t.status==="active"?V.r:V.g,cursor:"pointer",fontFamily:"inherit"}}>{t.status==="active"?"Disable":"Enable"}</button>
              </div>
            </Td>
          </TRow>)}
        </tbody>
      </table>
    </Card>
    
    {selectedTrader&&(
      <Card>
        <CH title={`Trader: ${selectedTrader.name}`} right={<button onClick={()=>setSelectedTrader(null)} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:V.m}}>✕</button>}/>
        <div style={{padding:20,display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:V.f,textTransform:"uppercase",marginBottom:8}}>Details</div>
            {[["Email",selectedTrader.email],["Country",selectedTrader.country],["Joined",selectedTrader.joined],["Last Trade",selectedTrader.lastTrade],["KYC",selectedTrader.kyc]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${V.bdL}`,fontSize:13}}>
                <span style={{color:V.m}}>{k}</span><span style={{fontWeight:600,color:V.t}}>{v}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:V.f,textTransform:"uppercase",marginBottom:8}}>Actions</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <Btn onClick={()=>alert("Email sent")} style={{width:"100%",padding:"10px"}}>Send Email</Btn>
              <Btn onClick={()=>alert("Manually KYC verified")} style={{width:"100%",padding:"10px"}}>Verify KYC</Btn>
              <Btn danger onClick={()=>alert("Account suspended")} style={{width:"100%",padding:"10px"}}>Suspend</Btn>
            </div>
          </div>
        </div>
      </Card>
    )}
  </div>;
}

function PgAccounts({search=""}){
  const[localSearch,setLocalSearch]=useState(search);
  const filtered=ACCTS.filter(a=>a.id.includes(localSearch.toUpperCase())||a.trader.toLowerCase().includes(localSearch.toLowerCase()));
  const[selectedAction,setSelectedAction]=useState(null);
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",gap:10}}>
      <input placeholder="Search accounts..." value={localSearch} onChange={(e)=>setLocalSearch(e.target.value)}
        style={{flex:1,padding:"10px 14px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,fontFamily:"inherit",color:V.t}}/>
      <Btn primary>Filter</Btn>
    </div>
    <Card>
      <CH title={`Accounts (${filtered.length})`}/>
      <table style={{width:"100%"}}>
        <thead><tr>{["ID","Trader","Size","Phase","Equity","P&L","Platform","Status","Actions"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>
          {filtered.map(a=><TRow key={a.id}>
            <Td s={{fontFamily:"monospace",fontWeight:600,fontSize:11,color:V.p}}>{a.id}</Td>
            <Td s={{fontWeight:600}}>{a.trader}</Td>
            <Td>${$(a.size)}</Td>
            <Td><Tag c={a.phase==="Funded"?V.g:a.phase==="Failed"?V.r:V.p}>{a.phase}</Tag></Td>
            <Td s={{fontFamily:"monospace"}}>${$(a.equity)}</Td>
            <Td s={{fontFamily:"monospace",fontWeight:700,color:a.pnl>=0?V.g:V.r}}>+${$(a.pnl)}</Td>
            <Td>{a.platform}</Td>
            <Td><Pip c={a.status==="active"?V.g:a.status==="breached"?V.r:V.a} s={6}/></Td>
            <Td>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>setSelectedAction({type:"approve",id:a.id})} style={{padding:"4px 8px",background:V.gd,border:"none",borderRadius:6,fontSize:10,fontWeight:600,color:V.g,cursor:"pointer",fontFamily:"inherit"}}>Approve</button>
                <button onClick={()=>setSelectedAction({type:"reject",id:a.id})} style={{padding:"4px 8px",background:V.rd,border:"none",borderRadius:6,fontSize:10,fontWeight:600,color:V.r,cursor:"pointer",fontFamily:"inherit"}}>Reject</button>
                <button onClick={()=>setSelectedAction({type:"disable",id:a.id})} style={{padding:"4px 8px",background:V.ad,border:"none",borderRadius:6,fontSize:10,fontWeight:600,color:V.a,cursor:"pointer",fontFamily:"inherit"}}>Disable</button>
              </div>
            </Td>
          </TRow>)}
        </tbody>
      </table>
    </Card>
    
    {selectedAction&&(
      <Card s={{background:V.gd}}>
        <div style={{padding:16}}>
          <div style={{fontSize:14,fontWeight:700,color:V.g}}>✓ Action: {selectedAction.type.toUpperCase()} executed on {selectedAction.id}</div>
          <button onClick={()=>setSelectedAction(null)} style={{marginTop:10,padding:"6px 12px",background:V.g,color:"#fff",border:"none",borderRadius:6,fontWeight:600,cursor:"pointer",fontSize:12}}>Dismiss</button>
        </div>
      </Card>
    )}
  </div>;
}

function PgPayouts({search=""}){
  const[localSearch,setLocalSearch]=useState(search);
  const filtered=PAYOUT_Q.filter(p=>p.id.includes(localSearch.toUpperCase())||p.trader.toLowerCase().includes(localSearch.toLowerCase()));
  const[actionTaken,setActionTaken]=useState(null);
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",gap:10}}>
      <input placeholder="Search payouts..." value={localSearch} onChange={(e)=>setLocalSearch(e.target.value)}
        style={{flex:1,padding:"10px 14px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,fontFamily:"inherit",color:V.t}}/>
      <Btn primary>Search</Btn>
    </div>
    <Card>
      <CH title={`Payout Queue (${filtered.length})`} right={<Tag c={V.a}>{filtered.filter(p=>p.status==="Pending").length} Pending</Tag>}/>
      <table style={{width:"100%"}}>
        <thead><tr>{["ID","Trader","Account","Profit","Amount","Status","Actions"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>
          {filtered.map(p=><TRow key={p.id}>
            <Td s={{fontFamily:"monospace",fontSize:11,color:V.p}}>{p.id}</Td>
            <Td s={{fontWeight:600}}>{p.trader}</Td>
            <Td s={{fontFamily:"monospace",fontSize:11}}>{p.account}</Td>
            <Td>${$(p.profit)}</Td>
            <Td s={{fontWeight:700}}>${$(p.amount)}</Td>
            <Td><Tag c={p.status==="Pending"?V.a:p.status==="Approved"?V.g:V.r}>{p.status}</Tag></Td>
            <Td>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>setActionTaken({id:p.id,action:"approved"})} style={{padding:"4px 8px",background:V.gd,border:"none",borderRadius:6,fontSize:10,fontWeight:600,color:V.g,cursor:"pointer",fontFamily:"inherit"}}>Approve</button>
                <button onClick={()=>setActionTaken({id:p.id,action:"rejected"})} style={{padding:"4px 8px",background:V.rd,border:"none",borderRadius:6,fontSize:10,fontWeight:600,color:V.r,cursor:"pointer",fontFamily:"inherit"}}>Reject</button>
              </div>
            </Td>
          </TRow>)}
        </tbody>
      </table>
    </Card>
    
    {actionTaken&&(
      <Card s={{background:actionTaken.action==="approved"?V.gd:V.rd}}>
        <div style={{padding:16}}>
          <div style={{fontSize:14,fontWeight:700,color:actionTaken.action==="approved"?V.g:V.r}}>✓ Payout {actionTaken.action.toUpperCase()}: {actionTaken.id}</div>
          <button onClick={()=>setActionTaken(null)} style={{marginTop:10,padding:"6px 12px",background:actionTaken.action==="approved"?V.g:V.r,color:"#fff",border:"none",borderRadius:6,fontWeight:600,cursor:"pointer",fontSize:12}}>Dismiss</button>
        </div>
      </Card>
    )}
  </div>;
}

function PgViolations({search=""}){
  const[localSearch,setLocalSearch]=useState(search);
  const filtered=VIOLATIONS.filter(v=>v.trader.toLowerCase().includes(localSearch.toLowerCase())||v.rule.toLowerCase().includes(localSearch.toLowerCase()));
  const[expanded,setExpanded]=useState(null);
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",gap:10}}>
      <input placeholder="Search violations..." value={localSearch} onChange={(e)=>setLocalSearch(e.target.value)}
        style={{flex:1,padding:"10px 14px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,fontFamily:"inherit",color:V.t}}/>
      <Btn primary>Filter</Btn>
    </div>
    <Card>
      <CH title={`Violations (${filtered.length})`} right={<Tag c={V.r}>{filtered.filter(v=>v.severity==="Critical").length} Critical</Tag>}/>
      <table style={{width:"100%"}}>
        <thead><tr>{["ID","Trader","Rule","Severity","Detection","Timestamp","Actions"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>
          {filtered.map(v=><TRow key={v.id}>
            <Td s={{fontFamily:"monospace",fontSize:11}}>{v.id}</Td>
            <Td s={{fontWeight:600}}>{v.trader}</Td>
            <Td>{v.rule}</Td>
            <Td><Tag c={v.severity==="Critical"?V.r:v.severity==="High"?V.a:V.g}>{v.severity}</Tag></Td>
            <Td>{v.detection}</Td>
            <Td s={{fontSize:11,color:V.f}}>{v.ts}</Td>
            <Td>
              <button onClick={()=>setExpanded(expanded===v.id?null:v.id)} style={{padding:"4px 8px",background:V.pdim,border:`1px solid ${V.pbd}`,borderRadius:6,fontSize:10,fontWeight:600,color:V.p,cursor:"pointer",fontFamily:"inherit"}}>
                {expanded===v.id?"Hide":"Details"}
              </button>
            </Td>
          </TRow>)}
        </tbody>
      </table>
    </Card>
    
    {expanded&&(
      <Card>
        <CH title="Violation Details"/>
        <div style={{padding:16}}>
          {VIOLATIONS.filter(v=>v.id===expanded).map(v=>(
            <div key={v.id}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
                <div>
                  <div style={{fontSize:10,color:V.f,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>Account</div>
                  <div style={{fontSize:13,fontWeight:600,color:V.t}}>{v.account}</div>
                </div>
                <div>
                  <div style={{fontSize:10,color:V.f,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>Detection Time</div>
                  <div style={{fontSize:13,fontWeight:600,color:V.t}}>{v.ts}</div>
                </div>
              </div>
              <div>
                <div style={{fontSize:10,color:V.f,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>Details</div>
                <div style={{fontSize:13,color:V.m,padding:10,background:V.bg,borderRadius:8}}>{v.detail}</div>
              </div>
              <div style={{marginTop:16,display:"flex",gap:10}}>
                <Btn primary onClick={()=>alert("Action: Account suspended")}>Suspend Account</Btn>
                <Btn onClick={()=>alert("Action: Trader flagged for review")}>Flag Trader</Btn>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )}
  </div>;
}

function PgRisk({search=""}){
  const[localSearch,setLocalSearch]=useState(search);
  const filtered=RISK_DATA.filter(r=>r.trader.toLowerCase().includes(localSearch.toLowerCase())||r.type.toLowerCase().includes(localSearch.toLowerCase()));
  const[expandedRisk,setExpandedRisk]=useState(null);
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",gap:10}}>
      <input placeholder="Search risks..." value={localSearch} onChange={(e)=>setLocalSearch(e.target.value)}
        style={{flex:1,padding:"10px 14px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,fontFamily:"inherit",color:V.t}}/>
      <Btn primary>Search</Btn>
    </div>
    <Card>
      <CH title={`Risk Detection (${filtered.length})`} right={<Tag c={V.r}>{filtered.filter(r=>r.severity==="Critical"||r.severity==="High").length} Critical/High</Tag>}/>
      <table style={{width:"100%"}}>
        <thead><tr>{["ID","Trader","Type","Severity","CID","IP","Action","Expand"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>
          {filtered.map(r=><TRow key={r.id}>
            <Td s={{fontFamily:"monospace",fontSize:11}}>{r.id}</Td>
            <Td s={{fontWeight:600}}>{r.trader}</Td>
            <Td>{r.type}</Td>
            <Td><Tag c={r.severity==="Critical"?V.r:r.severity==="High"?V.a:V.g}>{r.severity}</Tag></Td>
            <Td s={{fontFamily:"monospace",fontSize:10}}>{r.cid}</Td>
            <Td s={{fontFamily:"monospace",fontSize:10}}>{r.ip}</Td>
            <Td>{r.action}</Td>
            <Td>
              <button onClick={()=>setExpandedRisk(expandedRisk===r.id?null:r.id)} style={{padding:"4px 8px",background:V.pdim,border:`1px solid ${V.pbd}`,borderRadius:6,fontSize:10,fontWeight:600,color:V.p,cursor:"pointer",fontFamily:"inherit"}}>
                {expandedRisk===r.id?"▼":"▶"}
              </button>
            </Td>
          </TRow>)}
        </tbody>
      </table>
    </Card>
    
    {expandedRisk&&(
      <Card>
        <CH title="Risk Breakdown"/>
        <div style={{padding:16}}>
          {RISK_DATA.filter(r=>r.id===expandedRisk).map(r=>(
            <div key={r.id} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
              <div>
                <div><span style={{fontSize:10,fontWeight:700,color:V.f,textTransform:"uppercase"}}>Type:</span> <span style={{fontSize:13,fontWeight:600,color:V.t}}>{r.type}</span></div>
                <div style={{marginTop:8}}><span style={{fontSize:10,fontWeight:700,color:V.f,textTransform:"uppercase"}}>Severity:</span> <Tag c={r.severity==="Critical"?V.r:V.a}>{r.severity}</Tag></div>
                <div style={{marginTop:8}}><span style={{fontSize:10,fontWeight:700,color:V.f,textTransform:"uppercase"}}>Country:</span> <span style={{fontSize:13,fontWeight:600,color:V.t}}>{r.country}</span></div>
              </div>
              <div>
                <div><span style={{fontSize:10,fontWeight:700,color:V.f,textTransform:"uppercase"}}>CID:</span> <span style={{fontSize:13,fontFamily:"monospace",color:V.t}}>{r.cid}</span></div>
                <div style={{marginTop:8}}><span style={{fontSize:10,fontWeight:700,color:V.f,textTransform:"uppercase"}}>IP:</span> <span style={{fontSize:13,fontFamily:"monospace",color:V.t}}>{r.ip}</span></div>
              </div>
              <div style={{gridColumn:"1/-1"}}>
                <div style={{fontSize:10,color:V.f,fontWeight:700,textTransform:"uppercase",marginBottom:6}}>Detail</div>
                <div style={{fontSize:12,color:V.m,padding:10,background:V.bg,borderRadius:8}}>{r.detail}</div>
              </div>
              <div style={{gridColumn:"1/-1",display:"flex",gap:10}}>
                <Btn primary onClick={()=>alert("Account disabled for: "+r.type)}>Disable Account</Btn>
                <Btn onClick={()=>alert("Trader flagged")}>Flag Trader</Btn>
                <Btn onClick={()=>alert("Manual review initiated")}>Manual Review</Btn>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )}
  </div>;
}

function PgKYC(){
  const[search,setSearch]=useState("");
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",gap:10}}>
      <input placeholder="Search KYC..." value={search} onChange={(e)=>setSearch(e.target.value)}
        style={{flex:1,padding:"10px 14px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,fontFamily:"inherit",color:V.t}}/>
    </div>
    <Card>
      <CH title="KYC / Compliance"/>
      <table style={{width:"100%"}}>
        <thead><tr>{["Trader","Status","Date","Method","Docs","Actions"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>
          {TRADERS.map(t=>(
            <TRow key={t.id}>
              <Td s={{fontWeight:600}}>{t.name}</Td>
              <Td><Tag c={t.kyc==="Verified"?V.g:t.kyc==="Pending"?V.a:V.r}>{t.kyc}</Tag></Td>
              <Td>{t.joined}</Td>
              <Td>Sumsub</Td>
              <Td s={{fontSize:11}}>Passport, ID</Td>
              <Td>
                <div style={{display:"flex",gap:6}}>
                  <Btn primary onClick={()=>alert("KYC Verified")} style={{padding:"4px 8px",fontSize:10}}>Approve</Btn>
                  <Btn danger onClick={()=>alert("KYC Rejected")} style={{padding:"4px 8px",fontSize:10}}>Reject</Btn>
                </div>
              </Td>
            </TRow>
          ))}
        </tbody>
      </table>
    </Card>
  </div>;
}

function PgAffiliates(){
  return <Card><CH title="Affiliates"/><div style={{padding:20}}>Affiliate partner management coming soon...</div></Card>;
}

function PgCoupons(){
  const[couponCode,setCouponCode]=useState("");
  const[discount,setDiscount]=useState("");
  const[created,setCreated]=useState(false);
  
  const createCoupon=()=>{
    if(!couponCode||!discount){alert("Please fill all fields");return;}
    console.log(`Coupon created: ${couponCode} - ${discount}% off`);
    setCreated(true);
    setTimeout(()=>{setCreated(false);setCouponCode("");setDiscount("");},2000);
  };
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card>
      <CH title="Create Coupon"/>
      <div style={{padding:24,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,alignItems:"flex-end"}}>
        <div>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:V.f,marginBottom:8,textTransform:"uppercase"}}>Coupon Code</label>
          <input placeholder="SAVE20" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)}
            style={{width:"100%",padding:"10px 12px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:13,fontFamily:"inherit",color:V.t}}/>
        </div>
        <div>
          <label style={{display:"block",fontSize:11,fontWeight:700,color:V.f,marginBottom:8,textTransform:"uppercase"}}>Discount %</label>
          <input type="number" placeholder="20" value={discount} onChange={(e)=>setDiscount(e.target.value)}
            style={{width:"100%",padding:"10px 12px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:13,fontFamily:"inherit",color:V.t}}/>
        </div>
        <Btn primary onClick={createCoupon}>Create Coupon</Btn>
      </div>
      {created&&<div style={{padding:12,background:V.gd,color:V.g,fontWeight:600}}>✓ Coupon created successfully!</div>}
    </Card>
    <Card>
      <CH title="Active Coupons"/>
      <div style={{padding:20}}>
        {[
          {code:"SAVE20",discount:20,used:145},
          {code:"EARLYBIRD",discount:15,used:89},
          {code:"WEEKEND",discount:10,used:34},
        ].map((c,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"12px 0",borderBottom:`1px solid ${V.bdL}`,alignItems:"center"}}>
            <div><div style={{fontWeight:700,color:V.t}}>{c.code}</div><div style={{fontSize:11,color:V.f}}>Used {c.used} times</div></div>
            <div style={{fontSize:16,fontWeight:800,color:V.g}}>{c.discount}%</div>
          </div>
        ))}
      </div>
    </Card>
  </div>;
}

function PgRevenue(){
  return <Card><CH title="Revenue Analytics"/><div style={{padding:20}}>Advanced revenue charts and metrics coming soon...</div></Card>;
}

function PgSupport(){
  const[selectedTicket,setSelectedTicket]=useState(null);
  const[reply,setReply]=useState("");
  const[messages,setMessages]=useState({});
  
  const sendReply=(ticketId)=>{
    if(!reply.trim())return;
    setMessages(prev=>({...prev,[ticketId]:[...(prev[ticketId]||[]),{from:"admin",text:reply}]}));
    setReply("");
  };
  
  return <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:16}}>
      <Card>
        <CH title="Tickets"/>
        <div style={{maxHeight:"500px",overflowY:"auto"}}>
          {TICKETS.map(t=>(
            <button key={t.id} onClick={()=>setSelectedTicket(t)} 
              style={{width:"100%",padding:"12px 16px",borderBottom:`1px solid ${V.bdL}`,border:"none",background:selectedTicket?.id===t.id?V.pdim:"transparent",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"background 0.2s"}}>
              <div style={{fontSize:12,fontWeight:700,color:V.t,marginBottom:4}}>{t.subject}</div>
              <div style={{fontSize:10,color:V.f,marginBottom:6}}>{t.trader}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <Tag c={t.status==="open"?V.a:t.status==="escalated"?V.r:V.g}>{t.status}</Tag>
                <span style={{fontSize:9,color:V.m}}>{t.ago}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>
      
      {selectedTicket&&(
        <Card>
          <CH title={selectedTicket.subject} right={<button onClick={()=>setSelectedTicket(null)} style={{background:"none",border:"none",fontSize:16,cursor:"pointer"}}>✕</button>}/>
          <div style={{height:400,display:"flex",flexDirection:"column"}}>
            <div style={{flex:1,padding:16,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,borderBottom:`1px solid ${V.bdL}`}}>
              <div style={{padding:"10px 14px",background:V.bg,borderRadius:12,maxWidth:"80%"}}>
                <div style={{fontSize:12,color:V.t}}>Customer inquiry message...</div>
                <div style={{fontSize:9,color:V.f,marginTop:6}}>{selectedTicket.ago}</div>
              </div>
              {(messages[selectedTicket.id]||[]).map((m,i)=>(
                <div key={i} style={{padding:"10px 14px",background:V.pdim,borderRadius:12,maxWidth:"80%",marginLeft:"auto"}}>
                  <div style={{fontSize:12,color:V.p}}>{m.text}</div>
                </div>
              ))}
            </div>
            <div style={{padding:12,display:"flex",gap:8}}>
              <input value={reply} onChange={(e)=>setReply(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&sendReply(selectedTicket.id)}
                placeholder="Type reply..."
                style={{flex:1,padding:"10px 12px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,fontFamily:"inherit",color:V.t}}/>
              <Btn primary onClick={()=>sendReply(selectedTicket.id)} style={{padding:"10px 20px"}}>Reply</Btn>
            </div>
          </div>
        </Card>
      )}
    </div>
  </div>;
}

function PgAudit(){
  return <Card><CH title="Audit Log"/><div style={{padding:20}}>Audit trail and compliance logs coming soon...</div></Card>;
}

/* ═══ NAV ═══ */
const NAV=[
  {id:"dashboard",label:"Dashboard",icon:"□",group:null},
  {id:"traders",label:"Traders",icon:"◎",group:null},
  {id:"accounts",label:"Accounts",icon:"⊞",group:"─ Operations ─"},
  {id:"payouts",label:"Payouts",icon:"$",group:null},
  {id:"violations",label:"Violations",icon:"⚑",group:null},
  {id:"risk",label:"Risk Detection",icon:"⊘",group:"─ Management ─"},
  {id:"kyc",label:"KYC / Compliance",icon:"✦",group:null},
  {id:"affiliates",label:"Affiliates",icon:"◈",group:"─ Growth ─"},
  {id:"coupons",label:"Coupons",icon:"✂",group:null},
  {id:"revenue",label:"Revenue",icon:"↗",group:"─ Analytics ─"},
  {id:"support",label:"Support",icon:"✉",group:null},
  {id:"audit",label:"Audit Log",icon:"≡",group:"─ Compliance ─"},
];

const TITLES={dashboard:"Dashboard",traders:"Trader Management",accounts:"Account Management",payouts:"Payout Queue",violations:"Rule Violations",risk:"Risk Detection",kyc:"KYC / Compliance",affiliates:"Affiliate Partners",coupons:"Coupon Codes",revenue:"Revenue Analytics",support:"Support Center",audit:"Audit Log"};

/* ═══ APP ═══ */
export default function App(){
  const[page,setPage]=useState("dashboard");
  const[search,setSearch]=useState("");
  
  return(
    <div style={{display:"flex",minHeight:"100vh",background:V.bg,fontFamily:'"Inter","DM Sans",system-ui,sans-serif',color:V.m}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${V.h};border-radius:2px}table{border-collapse:collapse;width:100%}button:focus,input:focus{outline:none}`}</style>

      <aside style={{position:"fixed",top:0,left:0,bottom:0,width:220,background:V.sf,borderRight:`1px solid ${V.bd}`,display:"flex",flexDirection:"column",zIndex:100}}>
        <div style={{padding:"18px 16px",borderBottom:`1px solid ${V.bdL}`}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontSize:16,fontWeight:800,color:V.t,letterSpacing:"-0.02em"}}>Vertex <span style={{color:V.p}}>Funded</span></div><div style={{fontSize:9,color:V.f,letterSpacing:"0.04em",textTransform:"uppercase"}}>Admin Panel</div>
          </div>
        </div>
        <nav style={{flex:1,padding:"6px 8px",display:"flex",flexDirection:"column",gap:1,overflowY:"auto"}}>
          {NAV.map(n=>{const act=page===n.id;return(
            <div key={n.id}>
              {n.group&&<div style={{fontSize:9,color:V.f,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",padding:"10px 12px 4px",opacity:0.5}}>{n.group}</div>}
              <button onClick={()=>setPage(n.id)} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 12px",borderRadius:8,background:act?V.pdim:"transparent",border:`1px solid ${act?V.pbd:"transparent"}`,color:act?V.p:V.m,fontSize:13,fontWeight:act?600:400,cursor:"pointer",fontFamily:"inherit",textAlign:"left",width:"100%",transition:"all 0.12s"}}>
                <span style={{fontSize:12,opacity:act?1:0.45,fontFamily:"monospace",width:16,textAlign:"center",flexShrink:0}}>{n.icon}</span>{n.label}
              </button>
            </div>
          );})}
        </nav>
        <div style={{padding:"12px 14px",borderTop:`1px solid ${V.bdL}`,fontSize:10,color:V.h}}>
          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}><Pip c={V.g} s={5}/><span style={{color:V.f}}>All systems operational</span></div>
          <div>Powered by <span style={{color:V.p,fontWeight:600,cursor:"pointer"}}>ForexOpsPro</span></div>
        </div>
      </aside>

      <main style={{marginLeft:220,flex:1,padding:"22px 26px 60px",minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div>
            <div style={{fontSize:10,color:V.f,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:3}}>{TITLES[page]}</div>
            <h1 style={{fontSize:20,fontWeight:800,color:V.t,letterSpacing:"-0.02em",lineHeight:1}}>{TITLES[page]}</h1>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{padding:"7px 14px",background:V.sf,border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,color:V.m,display:"flex",alignItems:"center",gap:6}}><Pip c={V.g} s={5}/>Live</div>
          </div>
        </div>

        {page==="dashboard"&&<PgDashboard/>}
        {page==="traders"&&<PgTraders search={search}/>}
        {page==="accounts"&&<PgAccounts search={search}/>}
        {page==="payouts"&&<PgPayouts search={search}/>}
        {page==="violations"&&<PgViolations search={search}/>}
        {page==="risk"&&<PgRisk search={search}/>}
        {page==="kyc"&&<PgKYC/>}
        {page==="affiliates"&&<PgAffiliates/>}
        {page==="coupons"&&<PgCoupons/>}
        {page==="revenue"&&<PgRevenue/>}
        {page==="support"&&<PgSupport/>}
        {page==="audit"&&<PgAudit/>}
      </main>
    </div>
  );
}
