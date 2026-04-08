import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   VERTEX FUNDED — Admin Back-Office
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
  {id:"TR-004",name:"Omar Hassan",email:"o.hassan@proton.me",country:"AE",accounts:2,totalEq:204800,pnl:4800,risk:6,riskLvl:"Low",kyc:"Verified",joined:"12/01/2025",lastTrade:"Today",status:"active"},
  {id:"TR-005",name:"Chen Wei Lin",email:"cwlin@temp.biz",country:"CN",accounts:1,totalEq:0,pnl:-10000,risk:92,riskLvl:"Critical",kyc:"Failed",joined:"03/01/2026",lastTrade:"03/15/2026",status:"suspended"},
  {id:"TR-006",name:"Maria Santos",email:"m.santos@gmail.com",country:"BR",accounts:1,totalEq:52100,pnl:2100,risk:15,riskLvl:"Low",kyc:"Verified",joined:"01/20/2026",lastTrade:"Today",status:"active"},
  {id:"TR-007",name:"Viktor Novak",email:"vnovak@temp.io",country:"CZ",accounts:2,totalEq:98400,pnl:-600,risk:78,riskLvl:"High",kyc:"Pending",joined:"02/28/2026",lastTrade:"2 days ago",status:"flagged"},
  {id:"TR-008",name:"Fatima Al-Rashid",email:"f.rashid@gmail.com",country:"SA",accounts:1,totalEq:25800,pnl:800,risk:10,riskLvl:"Low",kyc:"Verified",joined:"03/15/2026",lastTrade:"Today",status:"active"},
  {id:"TR-009",name:"James Okafor",email:"j.okafor@gmail.com",country:"NG",accounts:1,totalEq:51200,pnl:1200,risk:18,riskLvl:"Low",kyc:"Verified",joined:"02/01/2026",lastTrade:"Today",status:"active"},
  {id:"TR-010",name:"Lena Ivanova",email:"l.ivanova@mail.ru",country:"RU",accounts:1,totalEq:0,pnl:0,risk:65,riskLvl:"High",kyc:"Pending",joined:"03/28/2026",lastTrade:"Never",status:"signup"},
];

const ACCTS=[
  {id:"VTX-850042",trader:"Alex Morgan",size:50000,phase:"Funded",equity:54847,pnl:4847,dailyPnl:-127,platform:"MT5",status:"active",riskScore:12},
  {id:"VTX-850038",trader:"Alex Morgan",size:25000,phase:"Phase 2",equity:26420,pnl:1420,dailyPnl:312,platform:"cTrader",status:"active",riskScore:8},
  {id:"VTX-850041",trader:"Alex Morgan",size:100000,phase:"Phase 1",equity:101200,pnl:1200,dailyPnl:-48,platform:"MT5",status:"active",riskScore:14},
  {id:"VTX-850035",trader:"Kenji Tanaka",size:50000,phase:"Funded",equity:52400,pnl:2400,dailyPnl:180,platform:"MT5",status:"active",riskScore:6},
  {id:"VTX-850037",trader:"Kenji Tanaka",size:25000,phase:"Phase 1",equity:24020,pnl:-980,dailyPnl:-220,platform:"cTrader",status:"active",riskScore:22},
  {id:"VTX-850030",trader:"Sofia Petrov",size:50000,phase:"Phase 2",equity:48200,pnl:-1800,dailyPnl:-440,platform:"MT5",status:"active",riskScore:45},
  {id:"VTX-850028",trader:"Omar Hassan",size:100000,phase:"Funded",equity:104800,pnl:4800,dailyPnl:620,platform:"MT5",status:"active",riskScore:4},
  {id:"VTX-850029",trader:"Omar Hassan",size:100000,phase:"Funded",equity:100000,pnl:0,dailyPnl:0,platform:"cTrader",status:"active",riskScore:8},
  {id:"VTX-850020",trader:"Chen Wei Lin",size:100000,phase:"Failed",equity:0,pnl:-10000,dailyPnl:0,platform:"MT5",status:"breached",riskScore:92},
  {id:"VTX-850033",trader:"Maria Santos",size:50000,phase:"Funded",equity:52100,pnl:2100,dailyPnl:340,platform:"Match-Trader",status:"active",riskScore:10},
  {id:"VTX-850039",trader:"Viktor Novak",size:50000,phase:"Phase 2",equity:49200,pnl:-800,dailyPnl:-180,platform:"MT5",status:"flagged",riskScore:78},
  {id:"VTX-850040",trader:"Viktor Novak",size:50000,phase:"Phase 1",equity:49200,pnl:-800,dailyPnl:0,platform:"MT5",status:"flagged",riskScore:72},
];

const PAYOUT_Q=[
  {id:"PQ-401",trader:"Alex Morgan",account:"VTX-850042",profit:4847,split:80,amount:3877.60,status:"Pending",reason:""},
  {id:"PQ-402",trader:"Omar Hassan",account:"VTX-850028",profit:4800,split:80,amount:3840,status:"Approved",reason:""},
  {id:"PQ-403",trader:"Maria Santos",account:"VTX-850033",profit:2100,split:80,amount:1680,status:"Approved",reason:""},
  {id:"PQ-404",trader:"Kenji Tanaka",account:"VTX-850035",profit:2400,split:80,amount:1920,status:"Pending",reason:""},
  {id:"PQ-405",trader:"Viktor Novak",account:"VTX-850039",profit:0,status:"Flagged",amount:0,split:80,reason:"Account under risk review — CID cluster detected"},
  {id:"PQ-406",trader:"Chen Wei Lin",account:"VTX-850020",profit:0,status:"Blocked",amount:0,split:80,reason:"Account breached — daily loss limit exceeded"},
];

const VIOLATIONS=[
  {id:"RV-101",trader:"Chen Wei Lin",rule:"Max Daily Loss",severity:"Critical",detection:"Auto",ts:"03/15/2026 14:22",account:"VTX-850020",detail:"Loss of $5,100 exceeded 5% daily limit on $100K account"},
  {id:"RV-102",trader:"Viktor Novak",rule:"Consistency Rule",severity:"High",detection:"Auto",ts:"04/02/2026 07:01",account:"VTX-850039",detail:"82% of total profit generated in a single 3-hour session"},
  {id:"RV-103",trader:"Viktor Novak",rule:"CID Match",severity:"High",detection:"Auto",ts:"04/02/2026 07:05",account:"VTX-850040",detail:"Same device fingerprint CID-7X2K on two accounts — possible multi-accounting"},
  {id:"RV-104",trader:"Sofia Petrov",rule:"Lot Size Limit",severity:"Medium",detection:"Auto",ts:"04/04/2026 11:45",account:"VTX-850030",detail:"Lot size of 5.2 exceeded max of 5.0 on XAUUSD"},
  {id:"RV-105",trader:"Kenji Tanaka",rule:"Weekend Holding",severity:"Low",detection:"Auto",ts:"04/05/2026 00:01",account:"VTX-850037",detail:"Open USDJPY position held over Saturday market close"},
  {id:"RV-106",trader:"Chen Wei Lin",rule:"Martingale Pattern",severity:"Critical",detection:"Auto",ts:"03/14/2026 09:30",account:"VTX-850020",detail:"Progressive lot doubling detected: 0.5→1.0→2.0→4.0 on consecutive GBPUSD losses"},
];

const RISK_DATA=[
  {id:"RK-01",trader:"Chen Wei Lin",type:"Martingale",severity:"Critical",cid:"CID-9A4B",ip:"154.208.40.59",country:"CN",detail:"Progressive lot doubling on GBPUSD. 4 trades within 12 minutes. Classic martingale abuse.",action:"Account disabled"},
  {id:"RK-02",trader:"Viktor Novak",type:"Multi-Account",severity:"High",cid:"CID-7X2K",ip:"185.220.101.44",country:"CZ",detail:"Same CID across VTX-850039 and VTX-850040. Identical trade timing and symbols.",action:"Under review"},
  {id:"RK-03",trader:"Viktor Novak",type:"Consistency",severity:"High",cid:"CID-7X2K",ip:"185.220.101.44",country:"CZ",detail:"82% of profit in single session. Inconsistent with normal trading pattern.",action:"Under review"},
  {id:"RK-04",trader:"Sofia Petrov",type:"Lot Size",severity:"Medium",cid:"CID-3F1M",ip:"91.215.42.18",country:"RU",detail:"Exceeded max lot size on XAUUSD by 0.2 lots. Single occurrence.",action:"Warning issued"},
];

const TICKETS=[
  {id:"TK-201",trader:"Kenji Tanaka",subject:"Phase 2 upgrade confirmation",status:"open",priority:"Medium",created:"04/04/2026",category:"Upgrade",messages:2,ago:"3h ago"},
  {id:"TK-202",trader:"Chen Wei Lin",subject:"Account breach dispute",status:"escalated",priority:"Critical",created:"03/16/2026",category:"Dispute",messages:8,ago:"20m ago"},
  {id:"TK-203",trader:"Alex Morgan",subject:"Payout processing delay",status:"open",priority:"High",created:"04/05/2026",category:"Payout",messages:1,ago:"1h ago"},
  {id:"TK-204",trader:"Sofia Petrov",subject:"Lot size violation clarification",status:"open",priority:"Medium",created:"04/04/2026",category:"Compliance",messages:3,ago:"5h ago"},
  {id:"TK-205",trader:"Maria Santos",subject:"Platform login issue",status:"resolved",priority:"Low",created:"04/01/2026",category:"Access",messages:4,ago:"2d ago"},
];

const KYC_DATA=[
  {trader:"Alex Morgan",status:"Verified",date:"11/12/2025",method:"Sumsub",docs:["Passport","Proof of Address"]},
  {trader:"Kenji Tanaka",status:"Verified",date:"01/07/2026",method:"Sumsub",docs:["National ID","Utility Bill"]},
  {trader:"Sofia Petrov",status:"Verified",date:"02/16/2026",method:"Manual",docs:["Passport","Bank Statement"]},
  {trader:"Omar Hassan",status:"Verified",date:"12/03/2025",method:"Sumsub",docs:["Passport","Bank Statement","Source of Funds"]},
  {trader:"Chen Wei Lin",status:"Failed",date:null,method:"Manual",docs:["Passport (rejected — mismatch)","Selfie (failed liveness)"]},
  {trader:"Maria Santos",status:"Verified",date:"01/22/2026",method:"Sumsub",docs:["National ID","Proof of Address"]},
  {trader:"Viktor Novak",status:"Pending",date:null,method:"Sumsub",docs:["Passport (uploaded — under review)"]},
  {trader:"Fatima Al-Rashid",status:"Verified",date:"03/17/2026",method:"Sumsub",docs:["Passport","Utility Bill"]},
  {trader:"James Okafor",status:"Verified",date:"02/03/2026",method:"Sumsub",docs:["National ID","Bank Statement"]},
  {trader:"Lena Ivanova",status:"Pending",date:null,method:"Sumsub",docs:["No documents uploaded"]},
];

const AUDIT=[
  {ts:"04/06/2026 09:14",action:"Payout approved — Omar Hassan, $3,840",result:"Sent to bank ending 4821"},
  {ts:"04/05/2026 14:30",action:"Risk flag — Viktor Novak, CID cluster detected",result:"Account flagged, compliance alerted"},
  {ts:"04/04/2026 11:45",action:"Violation — Sofia Petrov, lot size exceeded",result:"Warning issued, trade logged"},
  {ts:"04/02/2026 07:05",action:"Multi-account — Viktor Novak, CID match",result:"Both accounts flagged for review"},
  {ts:"04/01/2026 16:00",action:"Challenge passed — Maria Santos, Phase 2 → Funded",result:"Funded account provisioned"},
  {ts:"03/28/2026 14:22",action:"HWM reached — Alex Morgan, $56,102.88",result:"New all-time high watermark recorded"},
  {ts:"03/16/2026 09:00",action:"Account breached — Chen Wei Lin, daily loss",result:"Account disabled, TK-202 created"},
  {ts:"03/15/2026 14:22",action:"Martingale detected — Chen Wei Lin",result:"Risk team alerted, account suspended"},
];

const AFFILIATES=[
  {id:"AFF-01",name:"TradeMaster Blog",manager:"David K.",traders:42,revenue:12400,commission:1860,convRate:"8.2%",tier:"Gold",status:"Active"},
  {id:"AFF-02",name:"FX Academy Pro",manager:"Sarah L.",traders:28,revenue:7800,commission:1170,convRate:"6.5%",tier:"Silver",status:"Active"},
  {id:"AFF-03",name:"Alpha Signals",manager:"Mike T.",traders:15,revenue:3200,commission:480,convRate:"4.1%",tier:"Bronze",status:"Active"},
];

const COUPONS=[
  {code:"LAUNCH50",discount:"50%",sizes:"All",uses:"142 / 500",expires:"05/01/2026",active:true},
  {code:"VIP25",discount:"25%",sizes:"$50K+",uses:"38 / 100",expires:"Never",active:true},
  {code:"WELCOME10",discount:"10%",sizes:"All",uses:"891 / ∞",expires:"Never",active:true},
  {code:"BETA100",discount:"100%",sizes:"$5K only",uses:"12 / 12",expires:"Expired",active:false},
];

const REV_MONTHS=[{m:"Nov",v:18400},{m:"Dec",v:28100},{m:"Jan",v:34800},{m:"Feb",v:42200},{m:"Mar",v:51400},{m:"Apr",v:38900}];

/* ═══ ATOMS ═══ */
const Pip=({c=V.p,s=7})=><span style={{width:s,height:s,borderRadius:"50%",background:c,display:"inline-block",flexShrink:0}}/>;
const Tag=({children,c=V.p})=><span style={{display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:6,fontSize:11,fontWeight:600,background:`${c}12`,color:c,border:`1px solid ${c}20`,whiteSpace:"nowrap"}}>{children}</span>;
const Btn=({children,primary,onClick,s={}})=><button onClick={onClick} style={{padding:primary?"10px 20px":"8px 14px",background:primary?`linear-gradient(135deg,${V.p},${V.pm})`:V.sf,color:primary?"#fff":V.m,border:`1px solid ${primary?V.p:V.bd}`,borderRadius:8,fontSize:12,fontWeight:primary?700:500,cursor:"pointer",fontFamily:"inherit",boxShadow:primary?`0 2px 10px ${V.pglow}`:"none",...s}}>{children}</button>;
const Card=({children,s={}})=><div style={{background:V.card,border:`1px solid ${V.bd}`,borderRadius:V.rl,overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.03)",...s}}>{children}</div>;
const CH=({title,right,sub,accent})=><div style={{padding:"13px 18px",borderBottom:`1px solid ${V.bdL}`,display:"flex",justifyContent:"space-between",alignItems:sub?"flex-start":"center",position:"relative",overflow:"hidden"}}>{accent&&<div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${accent},transparent)`}}/>}<div><div style={{fontSize:14,fontWeight:700,color:V.t}}>{title}</div>{sub&&<div style={{fontSize:11,color:V.f,marginTop:2}}>{sub}</div>}</div>{right}</div>;
const Stat=({label,value,sub,color=V.t,icon})=><div style={{background:V.card,border:`1px solid ${V.bd}`,borderRadius:V.rl,padding:"16px 18px",position:"relative",overflow:"hidden",boxShadow:"0 1px 4px rgba(0,0,0,0.03)"}}><div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${color}40,transparent)`}}/><div style={{display:"flex",alignItems:"center",gap:7,marginBottom:10}}>{icon&&<span style={{fontSize:12,opacity:0.5}}>{icon}</span>}<span style={{fontSize:10,color:V.m,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em"}}>{label}</span></div><div style={{fontSize:22,fontWeight:800,color,letterSpacing:"-0.02em",lineHeight:1}}>{value}</div>{sub&&<div style={{fontSize:11,color:V.f,marginTop:6}}>{sub}</div>}</div>;
const Th=({children})=><th style={{padding:"10px 14px",fontSize:10,fontWeight:700,color:V.f,textTransform:"uppercase",letterSpacing:"0.06em",textAlign:"left",borderBottom:`1px solid ${V.bdL}`,background:V.bg}}>{children}</th>;
const Td=({children,s={}})=><td style={{padding:"11px 14px",fontSize:13,color:V.m,borderBottom:`1px solid ${V.bdL}`,verticalAlign:"middle",...s}}>{children}</td>;
const TRow=({children,onClick,hl})=>{const[h,setH]=useState(false);return<tr style={{background:hl?V.rd:h?V.hover:"transparent",cursor:onClick?"pointer":"default",transition:"background 0.1s"}} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} onClick={onClick}>{children}</tr>;};

const riskColor=l=>({Low:V.g,Elevated:V.a,High:V.r,Critical:V.r}[l]||V.m);
const kycColor=s=>({Verified:V.g,Pending:V.a,Failed:V.r}[s]||V.m);
const sevColor=s=>({Critical:V.r,High:V.r,Medium:V.a,Low:V.b}[s]||V.m);
const prioColor=p=>({Critical:V.r,High:V.r,Medium:V.a,Low:V.f}[p]||V.f);
const payColor=s=>({Pending:V.a,Approved:V.g,Flagged:V.r,Blocked:V.r}[s]||V.f);

const BarChart=({data})=>{const max=Math.max(...data.map(d=>d.v));return<div style={{display:"flex",alignItems:"flex-end",gap:8,height:80}}>{data.map((d,i)=><div key={d.m} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{width:"100%",background:i>=data.length-2?V.p:V.bdL,borderRadius:"4px 4px 0 0",height:`${(d.v/max)*72}px`,minHeight:4}}/><span style={{fontSize:9,color:V.f}}>{d.m}</span></div>)}</div>;};

/* ═══ PAGES ═══ */
function PgDashboard(){
  const activeTraders=TRADERS.filter(t=>t.status==="active").length;
  const totalEq=TRADERS.reduce((s,t)=>s+t.totalEq,0);
  const totalRev=REV_MONTHS.reduce((s,m)=>s+m.v,0);
  const pendingPayouts=PAYOUT_Q.filter(p=>p.status==="Pending").length;
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14}}>
      <Stat label="Total Traders" value={TRADERS.length} color={V.p} icon="◎"/>
      <Stat label="Active Accounts" value={ACCTS.filter(a=>a.status==="active").length} color={V.g} icon="⊞"/>
      <Stat label="Total Equity" value={$k(totalEq)} color={V.p} icon="$"/>
      <Stat label="Pending Payouts" value={pendingPayouts} color={V.a} icon="⏳"/>
      <Stat label="Revenue (MTD)" value={$k(REV_MONTHS[REV_MONTHS.length-1].v)} color={V.g} icon="↗"/>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr",gap:14}}>
      <Card><CH title="Revenue" sub="Last 6 months"/><div style={{padding:"16px 20px"}}><BarChart data={REV_MONTHS}/></div></Card>
      <Card><CH title="Risk Summary"/><div style={{padding:"16px 20px",display:"flex",flexDirection:"column",gap:10}}>
        {[["Critical",TRADERS.filter(t=>t.riskLvl==="Critical").length,V.r],["High",TRADERS.filter(t=>t.riskLvl==="High").length,V.r],["Elevated",TRADERS.filter(t=>t.riskLvl==="Elevated").length,V.a],["Low",TRADERS.filter(t=>t.riskLvl==="Low").length,V.g]].map(([l,n,c])=><div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:8}}><Pip c={c} s={6}/><span style={{fontSize:13,color:V.t}}>{l}</span></div><span style={{fontSize:14,fontWeight:700,color:c}}>{n}</span></div>)}
      </div></Card>
    </div>
    <Card><CH title="Recent Activity"/><table><thead><tr>{["Time","Action","Result"].map(h=><Th key={h}>{h}</Th>)}</tr></thead><tbody>{AUDIT.slice(0,5).map((e,i)=><TRow key={i}><Td s={{fontFamily:"monospace",fontSize:11,color:V.f,whiteSpace:"nowrap"}}>{e.ts}</Td><Td s={{color:V.t,fontSize:13}}>{e.action}</Td><Td s={{fontSize:12}}>{e.result}</Td></TRow>)}</tbody></table></Card>
  </div>;
}

function PgTraders(){
  const[search,setSearch]=useState("");
  const filtered=TRADERS.filter(t=>{const q=search.toLowerCase();return!q||t.name.toLowerCase().includes(q)||t.email.toLowerCase().includes(q)||t.id.toLowerCase().includes(q);});
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Total Traders" value={TRADERS.length} color={V.p} icon="◎"/>
      <Stat label="Active" value={TRADERS.filter(t=>t.status==="active").length} color={V.g} icon="✓"/>
      <Stat label="Flagged" value={TRADERS.filter(t=>t.status==="flagged").length} color={V.r} icon="⚑"/>
      <Stat label="KYC Pending" value={KYC_DATA.filter(k=>k.status==="Pending").length} color={V.a} icon="◉"/>
    </div>
    <Card><CH title="All Traders" right={<div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:V.f,fontSize:13}}>⌕</span><input placeholder="Search traders..." value={search} onChange={e=>setSearch(e.target.value)} style={{padding:"7px 12px 7px 30px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,fontFamily:"inherit",color:V.t,width:200,background:V.bg}}/></div>}/>
      <table><thead><tr>{["ID","Name","Email","Country","Accounts","Equity","P&L","Risk","KYC","Status"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{filtered.map(t=><TRow key={t.id} hl={t.status==="flagged"||t.status==="suspended"}>
          <Td s={{fontFamily:"monospace",color:V.p,fontSize:11}}>{t.id}</Td>
          <Td s={{fontWeight:600,color:V.t}}>{t.name}</Td>
          <Td s={{fontSize:12}}>{t.email}</Td>
          <Td>{t.country}</Td>
          <Td>{t.accounts}</Td>
          <Td s={{fontFamily:"monospace",fontWeight:600,color:V.t}}>{t.totalEq>0?$k(t.totalEq):"—"}</Td>
          <Td s={{fontFamily:"monospace",fontWeight:700,color:t.pnl>=0?V.g:V.r}}>{t.pnl>=0?"+":""}${$(t.pnl)}</Td>
          <Td><div style={{display:"flex",alignItems:"center",gap:6}}><Pip c={riskColor(t.riskLvl)} s={6}/><span style={{fontSize:12,fontWeight:600,color:riskColor(t.riskLvl)}}>{t.risk}</span></div></Td>
          <Td><Tag c={kycColor(t.kyc)}>{t.kyc}</Tag></Td>
          <Td><Tag c={t.status==="active"?V.g:t.status==="flagged"?V.r:t.status==="suspended"?V.r:V.a}>{t.status}</Tag></Td>
        </TRow>)}</tbody>
      </table>
    </Card>
  </div>;
}

function PgAccounts(){
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Total Accounts" value={ACCTS.length} color={V.p} icon="⊞"/>
      <Stat label="Funded" value={ACCTS.filter(a=>a.phase==="Funded").length} color={V.g} icon="✓"/>
      <Stat label="In Challenge" value={ACCTS.filter(a=>a.phase.includes("Phase")).length} color={V.b} icon="◎"/>
      <Stat label="Breached" value={ACCTS.filter(a=>a.status==="breached").length} color={V.r} icon="✕"/>
    </div>
    <Card><CH title="All Accounts"/>
      <table><thead><tr>{["Account","Trader","Size","Phase","Equity","P&L","Daily P&L","Platform","Risk","Status"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{ACCTS.map(a=><TRow key={a.id} hl={a.status==="flagged"||a.status==="breached"}>
          <Td s={{fontFamily:"monospace",color:V.p,fontSize:11}}>{a.id}</Td>
          <Td s={{fontWeight:600,color:V.t}}>{a.trader}</Td>
          <Td s={{fontFamily:"monospace"}}>${a.size.toLocaleString()}</Td>
          <Td><Tag c={a.phase==="Funded"?V.g:a.phase==="Failed"?V.r:V.b}>{a.phase}</Tag></Td>
          <Td s={{fontFamily:"monospace",fontWeight:600,color:V.t}}>{a.equity>0?`$${a.equity.toLocaleString()}`:"—"}</Td>
          <Td s={{fontFamily:"monospace",fontWeight:700,color:a.pnl>=0?V.g:V.r}}>{a.pnl>=0?"+":""}${Math.abs(a.pnl).toLocaleString()}</Td>
          <Td s={{fontFamily:"monospace",color:a.dailyPnl>=0?V.g:V.r}}>{a.dailyPnl>=0?"+":""}${Math.abs(a.dailyPnl).toLocaleString()}</Td>
          <Td s={{fontSize:12}}>{a.platform}</Td>
          <Td><span style={{fontSize:12,fontWeight:600,color:riskColor(a.riskScore>70?"Critical":a.riskScore>40?"Elevated":"Low")}}>{a.riskScore}</span></Td>
          <Td><Pip c={a.status==="active"?V.g:V.r} s={6}/></Td>
        </TRow>)}</tbody>
      </table>
    </Card>
  </div>;
}

function PgPayouts(){
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Pending" value={PAYOUT_Q.filter(p=>p.status==="Pending").length} color={V.a} icon="⏳"/>
      <Stat label="Approved" value={PAYOUT_Q.filter(p=>p.status==="Approved").length} color={V.g} icon="✓"/>
      <Stat label="Flagged" value={PAYOUT_Q.filter(p=>p.status==="Flagged").length} color={V.r} icon="⚑"/>
      <Stat label="Total Liability" value={$k(PAYOUT_Q.filter(p=>p.status!=="Blocked").reduce((s,p)=>s+p.amount,0))} color={V.p} icon="$"/>
    </div>
    <Card><CH title="Payout Queue" accent={V.p}/>
      <table><thead><tr>{["ID","Trader","Account","Profit","Split","Amount","Status","Reason"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{PAYOUT_Q.map(p=><TRow key={p.id} hl={p.status==="Flagged"||p.status==="Blocked"}>
          <Td s={{fontFamily:"monospace",color:V.p,fontSize:11}}>{p.id}</Td>
          <Td s={{fontWeight:600,color:V.t}}>{p.trader}</Td>
          <Td s={{fontFamily:"monospace",fontSize:11}}>{p.account}</Td>
          <Td s={{fontFamily:"monospace",fontWeight:700,color:p.profit>0?V.g:V.f}}>{p.profit>0?`$${p.profit.toLocaleString()}`:"—"}</Td>
          <Td>{p.split}%</Td>
          <Td s={{fontFamily:"monospace",fontWeight:700,color:p.amount>0?V.g:V.f}}>{p.amount>0?`$${$(p.amount)}`:"—"}</Td>
          <Td><Tag c={payColor(p.status)}>{p.status}</Tag></Td>
          <Td s={{fontSize:11,color:p.status==="Flagged"||p.status==="Blocked"?V.r:V.f,maxWidth:220}}>{p.reason||"All checks passed"}</Td>
        </TRow>)}</tbody>
      </table>
    </Card>
  </div>;
}

function PgViolations(){
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Total Violations" value={VIOLATIONS.length} color={V.r} icon="⚑"/>
      <Stat label="Critical" value={VIOLATIONS.filter(v=>v.severity==="Critical").length} color={V.r} icon="⊘"/>
      <Stat label="Auto-Detected" value={VIOLATIONS.filter(v=>v.detection==="Auto").length} color={V.p} icon="⚡"/>
      <Stat label="Traders Affected" value={new Set(VIOLATIONS.map(v=>v.trader)).size} color={V.a} icon="◎"/>
    </div>
    <Card><CH title="Rule Violations" accent={V.r}/>
      <table><thead><tr>{["ID","Trader","Rule","Severity","Detection","Account","Timestamp","Detail"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{VIOLATIONS.map(v=><TRow key={v.id} hl={v.severity==="Critical"}>
          <Td s={{fontFamily:"monospace",color:V.p,fontSize:11}}>{v.id}</Td>
          <Td s={{fontWeight:600,color:V.t}}>{v.trader}</Td>
          <Td><div style={{display:"flex",alignItems:"center",gap:6}}><Pip c={sevColor(v.severity)} s={5}/><span style={{fontWeight:600,fontSize:12,color:V.t}}>{v.rule}</span></div></Td>
          <Td><Tag c={sevColor(v.severity)}>{v.severity}</Tag></Td>
          <Td><Tag c={v.detection==="Auto"?V.p:V.b}>{v.detection}</Tag></Td>
          <Td s={{fontFamily:"monospace",fontSize:11}}>{v.account}</Td>
          <Td s={{fontFamily:"monospace",fontSize:10,color:V.f,whiteSpace:"nowrap"}}>{v.ts}</Td>
          <Td s={{fontSize:11,maxWidth:240,lineHeight:1.5}}>{v.detail}</Td>
        </TRow>)}</tbody>
      </table>
    </Card>
  </div>;
}

function PgRisk(){
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{background:V.card,border:`1px solid ${V.b}20`,borderRadius:V.rl,padding:"14px 18px",display:"flex",alignItems:"flex-start",gap:10}}>
      <span style={{fontSize:14,flexShrink:0}}>ℹ</span>
      <div style={{fontSize:12,color:V.m,lineHeight:1.7}}><strong style={{color:V.t}}>CID Device Fingerprint Detection</strong><br/>CID is a hardware identifier from CPU, MAC address, and screen resolution. More reliable than IP since mobile connections rotate IPs every 1-2 hours.</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Critical" value={RISK_DATA.filter(r=>r.severity==="Critical").length} color={V.r} icon="⊘"/>
      <Stat label="High" value={RISK_DATA.filter(r=>r.severity==="High").length} color={V.r} icon="⚑"/>
      <Stat label="CID Clusters" value={new Set(RISK_DATA.filter(r=>r.type==="Multi-Account").map(r=>r.cid)).size} color={V.a} icon="⊗"/>
      <Stat label="Under Review" value={RISK_DATA.filter(r=>r.action==="Under review").length} color={V.b} icon="◎"/>
    </div>
    <Card><CH title="Risk Detection Board" sub="CID fingerprinting + behavioral analysis" accent={V.r}/>
      {RISK_DATA.map(r=><div key={r.id} style={{padding:"14px 18px",borderBottom:`1px solid ${V.bdL}`,display:"flex",gap:14,alignItems:"flex-start"}}>
        <div style={{flexShrink:0,width:36,height:36,borderRadius:8,background:`${sevColor(r.severity)}10`,border:`1px solid ${sevColor(r.severity)}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:sevColor(r.severity),fontWeight:700}}>{r.severity==="Critical"?"!":"⚠"}</div>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4,flexWrap:"wrap"}}><span style={{fontSize:13,fontWeight:700,color:V.t}}>{r.trader}</span><Tag c={sevColor(r.severity)}>{r.type}</Tag><Tag c={sevColor(r.severity)}>{r.severity}</Tag><span style={{fontSize:10,fontFamily:"monospace",color:V.f}}>{r.cid} · {r.ip} · {r.country}</span></div>
          <div style={{fontSize:12,color:V.m,lineHeight:1.6}}>{r.detail}</div>
          <div style={{fontSize:11,color:r.action==="Account disabled"?V.r:V.a,fontWeight:600,marginTop:4}}>{r.action}</div>
        </div>
      </div>)}
    </Card>
  </div>;
}

function PgKYC(){
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Pending" value={KYC_DATA.filter(k=>k.status==="Pending").length} color={V.a} icon="⏳"/>
      <Stat label="Verified" value={KYC_DATA.filter(k=>k.status==="Verified").length} color={V.g} icon="✓"/>
      <Stat label="Failed" value={KYC_DATA.filter(k=>k.status==="Failed").length} color={V.r} icon="✕"/>
      <Stat label="Total" value={KYC_DATA.length} color={V.p} icon="◎"/>
    </div>
    <Card><CH title="KYC / Compliance" accent={V.p}/>
      <table><thead><tr>{["Trader","Status","Method","Verified Date","Documents"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{KYC_DATA.map((k,i)=><TRow key={i}>
          <Td s={{fontWeight:600,color:V.t}}>{k.trader}</Td>
          <Td><Tag c={kycColor(k.status)}>{k.status}</Tag></Td>
          <Td s={{fontSize:12}}>{k.method}</Td>
          <Td s={{fontSize:12,color:V.f}}>{k.date||"—"}</Td>
          <Td s={{fontSize:11,maxWidth:260}}>{k.docs.join(", ")}</Td>
        </TRow>)}</tbody>
      </table>
    </Card>
  </div>;
}

function PgSupport(){
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Open" value={TICKETS.filter(t=>t.status==="open").length} color={V.a} icon="✉"/>
      <Stat label="Escalated" value={TICKETS.filter(t=>t.status==="escalated").length} color={V.r} icon="⚑"/>
      <Stat label="Resolved" value={TICKETS.filter(t=>t.status==="resolved").length} color={V.g} icon="✓"/>
      <Stat label="Total" value={TICKETS.length} color={V.m} icon="≡"/>
    </div>
    <Card><CH title="Support Tickets"/>
      <table><thead><tr>{["ID","Trader","Subject","Category","Priority","Status","Opened"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{TICKETS.map(t=><TRow key={t.id} hl={t.status==="escalated"}>
          <Td s={{fontFamily:"monospace",color:V.p,fontSize:11}}>{t.id}</Td>
          <Td s={{fontWeight:600,color:V.t}}>{t.trader}</Td>
          <Td s={{color:V.t,maxWidth:220}}>{t.subject}</Td>
          <Td><Tag c={V.f}>{t.category}</Tag></Td>
          <Td><div style={{display:"flex",alignItems:"center",gap:5}}><Pip c={prioColor(t.priority)} s={5}/><span style={{fontSize:12,fontWeight:600,color:prioColor(t.priority)}}>{t.priority}</span></div></Td>
          <Td><Tag c={t.status==="escalated"?V.r:t.status==="resolved"?V.g:V.a}>{t.status}</Tag></Td>
          <Td s={{fontSize:11,color:V.f}}>{t.ago}</Td>
        </TRow>)}</tbody>
      </table>
    </Card>
  </div>;
}

function PgAudit(){
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card><CH title="Audit Log" sub="Immutable record of all compliance and operational events" accent={V.g}/>
      <table><thead><tr>{["Timestamp","Action","Result"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{AUDIT.map((e,i)=>{const isRisk=e.action.toLowerCase().includes("flag")||e.action.toLowerCase().includes("breach")||e.action.toLowerCase().includes("martingale")||e.action.toLowerCase().includes("multi");const isGood=e.result.toLowerCase().includes("approved")||e.result.toLowerCase().includes("provisioned")||e.result.toLowerCase().includes("recorded");const dotC=isRisk?V.r:isGood?V.g:V.a;
          return<TRow key={i}><Td s={{fontFamily:"monospace",fontSize:11,color:V.f,whiteSpace:"nowrap"}}>{e.ts}</Td><Td><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{width:6,height:6,borderRadius:"50%",background:dotC,display:"inline-block",flexShrink:0}}/><span style={{color:V.t,fontSize:13}}>{e.action}</span></div></Td><Td s={{fontSize:12,color:isGood?V.g:isRisk?V.r:V.m}}>{e.result}</Td></TRow>;
        })}</tbody>
      </table>
    </Card>
  </div>;
}

function PgAffiliates(){
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Total Affiliates" value={AFFILIATES.length} color={V.p} icon="◈"/>
      <Stat label="Referred Traders" value={AFFILIATES.reduce((s,a)=>s+a.traders,0)} color={V.g} icon="◎"/>
      <Stat label="Total Revenue" value={$k(AFFILIATES.reduce((s,a)=>s+a.revenue,0))} color={V.g} icon="$"/>
      <Stat label="Commission Paid" value={$k(AFFILIATES.reduce((s,a)=>s+a.commission,0))} color={V.a} icon="$"/>
    </div>
    <Card><CH title="Affiliate Partners"/>
      <table><thead><tr>{["ID","Name","Manager","Traders","Revenue","Commission","Conv Rate","Tier","Status"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{AFFILIATES.map(a=><TRow key={a.id}>
          <Td s={{fontFamily:"monospace",color:V.p,fontSize:11}}>{a.id}</Td>
          <Td s={{fontWeight:600,color:V.t}}>{a.name}</Td>
          <Td>{a.manager}</Td>
          <Td s={{fontWeight:600}}>{a.traders}</Td>
          <Td s={{fontFamily:"monospace",fontWeight:700,color:V.g}}>${a.revenue.toLocaleString()}</Td>
          <Td s={{fontFamily:"monospace",color:V.a}}>${a.commission.toLocaleString()}</Td>
          <Td>{a.convRate}</Td>
          <Td><Tag c={a.tier==="Gold"?V.a:a.tier==="Silver"?V.f:V.m}>{a.tier}</Tag></Td>
          <Td><Tag c={V.g}>{a.status}</Tag></Td>
        </TRow>)}</tbody>
      </table>
    </Card>
  </div>;
}

function PgCoupons(){
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <Card><CH title="Coupon Codes" sub="Manage discount codes for challenge purchases" right={<Btn primary>+ Create Coupon</Btn>}/>
      <table><thead><tr>{["Code","Discount","Account Sizes","Uses","Expires","Status"].map(h=><Th key={h}>{h}</Th>)}</tr></thead>
        <tbody>{COUPONS.map(c=><TRow key={c.code}>
          <Td><span style={{fontFamily:"monospace",fontSize:12,background:V.bg,padding:"3px 10px",borderRadius:5,border:`1px solid ${V.bd}`,color:V.t,fontWeight:600}}>{c.code}</span></Td>
          <Td><Tag c={V.p}>{c.discount}</Tag></Td>
          <Td>{c.sizes}</Td>
          <Td>{c.uses}</Td>
          <Td s={{color:c.expires==="Expired"?V.r:V.f,fontSize:12}}>{c.expires}</Td>
          <Td>{c.active?<span style={{color:V.g,fontWeight:600,fontSize:12}}>● Active</span>:<span style={{color:V.f,fontSize:12}}>● Inactive</span>}</Td>
        </TRow>)}</tbody>
      </table>
    </Card>
  </div>;
}

function PgRevenue(){
  const totalRev=REV_MONTHS.reduce((s,m)=>s+m.v,0);
  return<div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}}>
      <Stat label="Total Revenue" value={$k(totalRev)} color={V.g} icon="$"/>
      <Stat label="This Month" value={$k(REV_MONTHS[REV_MONTHS.length-1].v)} color={V.p} icon="↗"/>
      <Stat label="Avg Monthly" value={$k(Math.round(totalRev/REV_MONTHS.length))} color={V.b} icon="≡"/>
      <Stat label="Growth" value="+24%" sub="vs last month" color={V.g} icon="↗"/>
    </div>
    <Card><CH title="Monthly Revenue" sub="Challenge fees collected"/><div style={{padding:"20px 24px"}}><BarChart data={REV_MONTHS}/></div></Card>
  </div>;
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
                {n.id==="violations"&&VIOLATIONS.length>0&&<span style={{marginLeft:"auto",background:V.rd,color:V.r,border:`1px solid ${V.r}30`,borderRadius:9,padding:"1px 7px",fontSize:10,fontWeight:700}}>{VIOLATIONS.length}</span>}
                {n.id==="payouts"&&PAYOUT_Q.filter(p=>p.status==="Pending").length>0&&<span style={{marginLeft:"auto",background:V.ad,color:V.a,border:`1px solid ${V.a}30`,borderRadius:9,padding:"1px 7px",fontSize:10,fontWeight:700}}>{PAYOUT_Q.filter(p=>p.status==="Pending").length}</span>}
                {n.id==="support"&&TICKETS.filter(t=>t.status==="open"||t.status==="escalated").length>0&&<span style={{marginLeft:"auto",background:V.ad,color:V.a,border:`1px solid ${V.a}30`,borderRadius:9,padding:"1px 7px",fontSize:10,fontWeight:700}}>{TICKETS.filter(t=>t.status==="open"||t.status==="escalated").length}</span>}
                {n.id==="risk"&&RISK_DATA.filter(r=>r.severity==="Critical"||r.severity==="High").length>0&&<span style={{marginLeft:"auto",background:V.rd,color:V.r,border:`1px solid ${V.r}30`,borderRadius:9,padding:"1px 7px",fontSize:10,fontWeight:700}}>{RISK_DATA.filter(r=>r.severity==="Critical"||r.severity==="High").length}</span>}
              </button>
            </div>
          );})}
        </nav>
        <div style={{padding:"12px 14px",borderTop:`1px solid ${V.bdL}`,fontSize:10,color:V.h}}>
          <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}><Pip c={V.g} s={5}/><span style={{color:V.f}}>All systems operational</span></div>
          <div>Powered by <span style={{color:V.p,fontWeight:600}}>ForexOpsPro</span></div>
        </div>
      </aside>

      <main style={{marginLeft:220,flex:1,padding:"22px 26px 60px",minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
          <div>
            <div style={{fontSize:10,color:V.f,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:3}}>{TITLES[page]}</div>
            <h1 style={{fontSize:20,fontWeight:800,color:V.t,letterSpacing:"-0.02em",lineHeight:1}}>{TITLES[page]}</h1>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{position:"relative"}}><span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",color:V.f,fontSize:13}}>⌕</span><input placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} style={{padding:"7px 12px 7px 30px",border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,fontFamily:"inherit",color:V.t,width:180,background:V.sf}}/></div>
            <div style={{padding:"7px 14px",background:V.sf,border:`1px solid ${V.bd}`,borderRadius:8,fontSize:12,color:V.m,display:"flex",alignItems:"center",gap:6}}><Pip c={V.g} s={5}/>Live</div>
          </div>
        </div>

        {page==="dashboard"&&<PgDashboard/>}
        {page==="traders"&&<PgTraders/>}
        {page==="accounts"&&<PgAccounts/>}
        {page==="payouts"&&<PgPayouts/>}
        {page==="violations"&&<PgViolations/>}
        {page==="risk"&&<PgRisk/>}
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
