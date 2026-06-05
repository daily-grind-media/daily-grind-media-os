import { useState } from "react";

const SECTIONS = [
  { id: "scorecard",  label: "CEO Scorecard",           icon: "⚡", group: "COMMAND" },
  { id: "financial",  label: "Financial Command Center", icon: "💵", group: "COMMAND" },
  { id: "sales",      label: "Sales Command Center",     icon: "🎯", group: "COMMAND" },
  { id: "trainer",    label: "Trainer Ecosystem",        icon: "💪", group: "DIVISIONS" },
  { id: "studio",     label: "Studio Monetization",      icon: "🏢", group: "DIVISIONS" },
  { id: "referral",   label: "Referral Partner Division",icon: "🔗", group: "DIVISIONS" },
  { id: "sdmarket",   label: "SD Market Intelligence",   icon: "📍", group: "DIVISIONS" },
  { id: "clients",    label: "Client Management",        icon: "🤝", group: "OPERATIONS" },
  { id: "production", label: "Production Center",        icon: "🎬", group: "OPERATIONS" },
  { id: "content",    label: "Content OS",               icon: "📱", group: "OPERATIONS" },
  { id: "team",       label: "Team Dashboards",          icon: "👤", group: "OPERATIONS" },
  { id: "sop",        label: "SOP Library",              icon: "📋", group: "SYSTEMS" },
  { id: "knowledge",  label: "Knowledge Base",           icon: "🧠", group: "SYSTEMS" },
  { id: "kpi",        label: "KPI Dashboard",            icon: "📊", group: "SYSTEMS" },
  { id: "revenue",    label: "Revenue Opportunities",    icon: "💰", group: "SYSTEMS" },
  { id: "plan90",     label: "90-Day Plan",              icon: "🗓", group: "ROADMAP" },
  { id: "implpriority", label: "Implementation Priority",icon: "🏁", group: "ROADMAP" },
  { id: "rhythm",     label: "CEO Operating Rhythm",     icon: "🔄", group: "ROADMAP" },
];

const GROUPS = ["COMMAND", "DIVISIONS", "OPERATIONS", "SYSTEMS", "ROADMAP"];

// ── Reusable Components ────────────────────────────────────────────────────────

const DB = ({ title, emoji, color, properties, relations, formulas, views, notes }) => (
  <div style={{ background:"#0f0f0f", border:`1px solid ${color}33`, borderRadius:12, marginBottom:22, overflow:"hidden" }}>
    <div style={{ background:`linear-gradient(135deg,${color}22,${color}08)`, borderBottom:`1px solid ${color}33`, padding:"13px 20px", display:"flex", alignItems:"center", gap:10 }}>
      <span style={{ fontSize:19 }}>{emoji}</span>
      <span style={{ color, fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:2 }}>{title}</span>
      <span style={{ marginLeft:"auto", color:"#333", fontSize:10, fontFamily:"monospace" }}>DATABASE</span>
    </div>
    <div style={{ padding:"14px 20px" }}>
      {properties && (
        <div style={{ marginBottom:14 }}>
          <div style={{ color:"#444", fontSize:10, letterSpacing:2, marginBottom:7, fontFamily:"monospace" }}>PROPERTIES</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(270px,1fr))", gap:5 }}>
            {properties.map((p,i)=>(
              <div key={i} style={{ background:"#161616", border:"1px solid #1e1e1e", borderRadius:6, padding:"6px 11px", display:"flex", gap:8, alignItems:"flex-start" }}>
                <span style={{ color:"#3a3a3a", fontSize:9, fontFamily:"monospace", marginTop:2, whiteSpace:"nowrap" }}>{p.type}</span>
                <div><span style={{ color:"#d0d0d0", fontSize:12, fontWeight:500 }}>{p.name}</span>
                {p.detail && <div style={{ color:"#484848", fontSize:11, marginTop:1 }}>{p.detail}</div>}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {relations && relations.length>0 && (
        <div style={{ marginBottom:14 }}>
          <div style={{ color:"#444", fontSize:10, letterSpacing:2, marginBottom:7, fontFamily:"monospace" }}>RELATIONS & ROLLUPS</div>
          {relations.map((r,i)=>(
            <div key={i} style={{ background:"#161616", border:"1px solid #1a2a1a", borderRadius:6, padding:"6px 11px", marginBottom:4 }}>
              <span style={{ color:"#4ade80", fontSize:10, fontFamily:"monospace" }}>→ </span>
              <span style={{ color:"#888", fontSize:11 }}>{r}</span>
            </div>
          ))}
        </div>
      )}
      {formulas && formulas.length>0 && (
        <div style={{ marginBottom:14 }}>
          <div style={{ color:"#444", fontSize:10, letterSpacing:2, marginBottom:7, fontFamily:"monospace" }}>FORMULAS</div>
          {formulas.map((f,i)=>(
            <div key={i} style={{ background:"#0a0f0a", border:"1px solid #1a2a1a", borderRadius:6, padding:"8px 11px", marginBottom:4 }}>
              <div style={{ color:"#f97316", fontSize:10, marginBottom:3 }}>{f.name}</div>
              <code style={{ color:"#4ade80", fontSize:10, fontFamily:"monospace", whiteSpace:"pre-wrap", lineHeight:1.6 }}>{f.formula}</code>
            </div>
          ))}
        </div>
      )}
      {views && views.length>0 && (
        <div style={{ marginBottom: notes?14:0 }}>
          <div style={{ color:"#444", fontSize:10, letterSpacing:2, marginBottom:7, fontFamily:"monospace" }}>VIEWS</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
            {views.map((v,i)=>(
              <span key={i} style={{ background:"#1a1a2e", border:"1px solid #2a2a4e", borderRadius:4, padding:"3px 9px", color:"#818cf8", fontSize:11 }}>{v}</span>
            ))}
          </div>
        </div>
      )}
      {notes && (
        <div style={{ background:"#1a1500", border:"1px solid #3a3000", borderRadius:6, padding:"9px 13px" }}>
          <span style={{ color:"#facc15", fontSize:10 }}>⚠ </span>
          <span style={{ color:"#8a7a0a", fontSize:11 }}>{notes}</span>
        </div>
      )}
    </div>
  </div>
);

const Sec = ({ title, icon, color="#f0f0f0", children }) => (
  <div style={{ marginBottom:40 }}>
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22, paddingBottom:12, borderBottom:"1px solid #181818" }}>
      <span style={{ fontSize:22 }}>{icon}</span>
      <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:26, letterSpacing:4, color, margin:0 }}>{title}</h2>
    </div>
    {children}
  </div>
);

const MetricCard = ({ label, value, sub, color, wide }) => (
  <div style={{ background:"#0f0f0f", border:`1px solid ${color}33`, borderRadius:10, padding:"14px 16px", gridColumn: wide?"span 2":"span 1" }}>
    <div style={{ color:"#3a3a3a", fontSize:10, letterSpacing:2, marginBottom:5, fontFamily:"monospace" }}>{label}</div>
    <div style={{ color, fontFamily:"'Bebas Neue',sans-serif", fontSize:22, letterSpacing:1 }}>{value}</div>
    {sub && <div style={{ color:"#505050", fontSize:11, marginTop:3 }}>{sub}</div>}
  </div>
);

const ScorecardRow = ({ section, items, color }) => (
  <div style={{ marginBottom:16 }}>
    <div style={{ color:"#2a2a2a", fontSize:10, letterSpacing:3, marginBottom:8, fontFamily:"monospace" }}>{section}</div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:8 }}>
      {items.map((item,i)=>(
        <div key={i} style={{ background:"#0d0d0d", border:`1px solid ${color}22`, borderRadius:8, padding:"11px 14px" }}>
          <div style={{ color:"#3a3a3a", fontSize:10, marginBottom:4 }}>{item.label}</div>
          <div style={{ color, fontFamily:"'Bebas Neue',sans-serif", fontSize:18, letterSpacing:1 }}>{item.value}</div>
          {item.formula && <div style={{ color:"#2a2a2a", fontSize:9, fontFamily:"monospace", marginTop:3 }}>{item.formula}</div>}
        </div>
      ))}
    </div>
  </div>
);

const FlowDiagram = ({ steps, color }) => (
  <div style={{ display:"flex", flexWrap:"wrap", gap:0, alignItems:"center", margin:"14px 0" }}>
    {steps.map((s,i)=>(
      <div key={i} style={{ display:"flex", alignItems:"center" }}>
        <div style={{ background:`${color}18`, border:`1px solid ${color}44`, borderRadius:6, padding:"5px 12px", color, fontSize:11, fontFamily:"monospace", whiteSpace:"nowrap" }}>{s}</div>
        {i<steps.length-1 && <span style={{ color:"#252525", margin:"0 3px", fontSize:13 }}>→</span>}
      </div>
    ))}
  </div>
);

const PlanBlock = ({ phase, days, weeks, color }) => (
  <div style={{ background:"#0f0f0f", border:`1px solid ${color}33`, borderRadius:12, marginBottom:18, overflow:"hidden" }}>
    <div style={{ background:`${color}18`, borderBottom:`1px solid ${color}33`, padding:"11px 20px", display:"flex", alignItems:"center", gap:12 }}>
      <span style={{ fontFamily:"'Bebas Neue',sans-serif", color, fontSize:20, letterSpacing:3 }}>{phase}</span>
      <span style={{ color:"#3a3a3a", fontSize:11 }}>{days}</span>
    </div>
    {weeks.map((w,wi)=>(
      <div key={wi} style={{ borderBottom:wi<weeks.length-1?"1px solid #141414":"none", padding:"13px 20px" }}>
        <div style={{ color, fontSize:11, fontFamily:"monospace", marginBottom:7 }}>{w.week}</div>
        <div style={{ display:"grid", gap:4 }}>
          {w.actions.map((a,ai)=>(
            <div key={ai} style={{ color:"#909090", fontSize:12, display:"flex", gap:8, alignItems:"flex-start" }}>
              <span style={{ color:"#2a2a2a", marginTop:2 }}>▸</span><span>{a}</span>
            </div>
          ))}
        </div>
        {w.milestone && <div style={{ marginTop:9, background:"#1a1500", border:"1px solid #3a3000", borderRadius:6, padding:"5px 11px", color:"#facc15", fontSize:11 }}>🏁 {w.milestone}</div>}
      </div>
    ))}
  </div>
);

const RhythmBlock = ({ title, items, color }) => (
  <div style={{ background:"#0f0f0f", border:`1px solid ${color}22`, borderRadius:10, overflow:"hidden", marginBottom:14 }}>
    <div style={{ background:`${color}15`, borderBottom:`1px solid ${color}22`, padding:"9px 15px" }}>
      <span style={{ color, fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:2 }}>{title}</span>
    </div>
    <div style={{ padding:"11px 15px" }}>
      {items.map((item,i)=>(
        <div key={i} style={{ display:"flex", gap:12, marginBottom:7, paddingBottom:7, borderBottom:i<items.length-1?"1px solid #141414":"none" }}>
          <span style={{ color, fontSize:10, fontFamily:"monospace", whiteSpace:"nowrap", marginTop:2, minWidth:68 }}>{item.time}</span>
          <span style={{ color:"#b0b0b0", fontSize:12 }}>{item.action}</span>
        </div>
      ))}
    </div>
  </div>
);

const RevenueOpp = ({ rank, title, type, ease, profit, scale, time, details, color }) => (
  <div style={{ background:"#0f0f0f", border:`1px solid ${color}33`, borderRadius:10, padding:"15px 17px", marginBottom:11 }}>
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:9 }}>
      <span style={{ background:color, color:"#000", fontFamily:"'Bebas Neue',sans-serif", fontSize:15, width:26, height:26, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{rank}</span>
      <span style={{ color:"#f0f0f0", fontSize:14, fontWeight:600 }}>{title}</span>
      <span style={{ marginLeft:"auto", color:"#444", fontSize:10, fontFamily:"monospace" }}>{type}</span>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:7, marginBottom:9 }}>
      {[["Ease",ease],["Profit",profit],["Scale",scale],["Time",time]].map(([k,v])=>(
        <div key={k} style={{ textAlign:"center" }}>
          <div style={{ color:"#3a3a3a", fontSize:9, marginBottom:3 }}>{k}</div>
          <div style={{ display:"flex", justifyContent:"center", gap:2 }}>
            {[1,2,3,4,5].map(n=><div key={n} style={{ width:7, height:7, borderRadius:"50%", background:n<=v?color:"#1e1e1e" }} />)}
          </div>
        </div>
      ))}
    </div>
    <div style={{ color:"#707070", fontSize:12, lineHeight:1.6 }}>{details}</div>
  </div>
);

const ImplCard = ({ rank, name, reason, roi, rev, ops, ease, color }) => (
  <div style={{ background:"#0f0f0f", border:`1px solid ${color}44`, borderRadius:10, padding:"14px 16px", marginBottom:10 }}>
    <div style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10 }}>
      <span style={{ background:color, color:"#000", fontFamily:"'Bebas Neue',sans-serif", width:30, height:30, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{rank}</span>
      <div>
        <div style={{ color:"#f0f0f0", fontSize:14, fontWeight:600 }}>{name}</div>
        <div style={{ color:"#555", fontSize:11, marginTop:2 }}>{reason}</div>
      </div>
    </div>
    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
      {[["Immediate ROI",roi],["Revenue Impact",rev],["Ops Impact",ops],["Ease",ease]].map(([k,v])=>(
        <div key={k} style={{ textAlign:"center" }}>
          <div style={{ color:"#333", fontSize:9, marginBottom:3 }}>{k}</div>
          <div style={{ display:"flex", justifyContent:"center", gap:2 }}>
            {[1,2,3,4,5].map(n=><div key={n} style={{ width:8, height:8, borderRadius:2, background:n<=v?color:"#1e1e1e" }} />)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ── Section Renderers ──────────────────────────────────────────────────────────

const sections = {

  scorecard: () => (
    <Sec title="CEO SCORECARD" icon="⚡" color="#f97316">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        This is the first page opened every morning. All values are rollups and formula-driven from live databases — zero manual calculation. Built in Notion as a linked database dashboard. Team names: Walter (Partner/Editor), Jaylen (Junior Shooter/Editor).
      </p>

      <ScorecardRow section="── REVENUE ──" color="#4ade80" items={[
        { label:"MRR", value:"$0,000", formula:"Sum: MRR Tracker → Active records" },
        { label:"Revenue Collected (MTD)", value:"$0,000", formula:"Sum: Monthly Revenue DB → Paid this month" },
        { label:"Outstanding Revenue", value:"$0,000", formula:"Sum: Invoices DB → Status=Unpaid/Overdue" },
        { label:"Forecasted Revenue", value:"$0,000", formula:"MRR + Confirmed Pipeline deals closing this month" },
      ]} />
      <ScorecardRow section="── SALES ──" color="#818cf8" items={[
        { label:"New Leads (MTD)", value:"00", formula:"Count: Lead DB → Date Added = this month" },
        { label:"Follow-Ups Due Today", value:"00", formula:"Count: Lead DB → Next Follow-Up = today" },
        { label:"Proposals Out", value:"00", formula:"Count: Proposal DB → Status = Sent/Viewed" },
        { label:"Calls Booked This Week", value:"00", formula:"Count: Discovery Call DB → this week" },
      ]} />
      <ScorecardRow section="── PRODUCTION ──" color="#e879f9" items={[
        { label:"Shoots Scheduled (Next 7 Days)", value:"00", formula:"Count: Shoots DB → Date within +7 days" },
        { label:"Edits In Progress", value:"00", formula:"Count: Editing DB → Status = In Progress" },
        { label:"Overdue Deliverables", value:"00", formula:"Count: Deliverables DB → Overdue formula ≠ empty" },
        { label:"Pieces Delivered (MTD)", value:"000", formula:"Count: Deliverables DB → Delivered this month" },
      ]} />
      <ScorecardRow section="── TEAM WORKLOAD ──" color="#38bdf8" items={[
        { label:"Walter — Active Edits", value:"00", formula:"Count: Editing DB → Assigned=Walter, Status=In Progress" },
        { label:"Walter — Queue", value:"00", formula:"Count: Editing DB → Assigned=Walter, Status=Queued" },
        { label:"Jaylen — Shoots This Week", value:"00", formula:"Count: Shoots DB → Assigned=Jaylen, this week" },
        { label:"Contractor Tasks Active", value:"00", formula:"Count: Task DB → Assigned=Contractor, Status=In Progress" },
      ]} />
      <ScorecardRow section="── OPPORTUNITIES ──" color="#facc15" items={[
        { label:"Trainer Upsell Windows Open", value:"00", formula:"Count: Trainer DB → Upsell Urgency formula active" },
        { label:"Referral Follow-Ups Due", value:"00", formula:"Count: Referral DB → Status=Introduced, >7 days" },
        { label:"Client Upsell Opps", value:"00", formula:"Count: Client DB → Upsell Stage=Not Started, Active" },
        { label:"SD Market — Hot Prospects", value:"00", formula:"Count: SD Market DB → Opportunity Score ≥ 4, not contacted recently" },
      ]} />
      <ScorecardRow section="── STUDIO ──" color="#f97316" items={[
        { label:"Studio Bookings This Week", value:"00", formula:"Count: Studio Rentals DB → this week" },
        { label:"Studio Revenue (MTD)", value:"$000", formula:"Sum: Studio Division DB → Revenue, this month" },
        { label:"Studio Utilization %", value:"00%", formula:"(Booked Hours / Available Hours) * 100" },
        { label:"Membership Clients Active", value:"00", formula:"Count: Membership DB → Status=Active" },
      ]} />

      <div style={{ background:"#0a0a0a", border:"1px solid #1a1a1a", borderRadius:10, padding:18, marginTop:8 }}>
        <div style={{ color:"#f97316", fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:2, marginBottom:12 }}>SCORECARD IMPLEMENTATION — NOTION SETUP</div>
        <div style={{ display:"grid", gap:6 }}>
          {[
            "Create a 'CEO Scorecard' page in Notion as the Home page — set as default workspace page",
            "Each metric block = a Linked Database view with a single filter + Count or Sum aggregation shown",
            "Revenue metrics: link to Financial Command Center databases",
            "Sales metrics: link to Lead DB, Proposal DB, Discovery Call DB",
            "Production metrics: link to Shoots DB, Editing DB, Deliverables DB",
            "Team metrics: link to Editing DB filtered by Assigned Person (Walter / Jaylen)",
            "Opportunity metrics: use formula-driven filtered views (Upsell Urgency, Follow-Up Due formulas)",
            "Studio metrics: link to Studio Division databases",
            "All values update live — no manual input required after initial database setup",
          ].map((s,i)=>(
            <div key={i} style={{ display:"flex", gap:8, color:"#808080", fontSize:12 }}>
              <span style={{ color:"#f97316", marginTop:2 }}>▸</span><span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </Sec>
  ),

  financial: () => (
    <Sec title="FINANCIAL COMMAND CENTER" icon="💵" color="#4ade80">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        Full financial visibility across revenue streams, outstanding receivables, project profitability, and client lifetime value. Every number is a formula or rollup — no spreadsheets, no guessing. This replaces the need for a separate finance tool at the current stage.
      </p>

      <DB title="MONTHLY REVENUE DATABASE" emoji="📅" color="#4ade80"
        properties={[
          { type:"DATE",    name:"Month",              detail:"e.g. June 2025 — one record per month" },
          { type:"NUMBER",  name:"MRR Collected ($)",  detail:"Rollup from MRR Tracker: sum of payments received this month" },
          { type:"NUMBER",  name:"Project Revenue ($)",detail:"Sum of all one-time project invoices paid this month" },
          { type:"NUMBER",  name:"Studio Revenue ($)", detail:"Rollup from Studio Division DB: sum of studio revenue this month" },
          { type:"NUMBER",  name:"Event Revenue ($)",  detail:"Rollup from Events/Workshop DB" },
          { type:"NUMBER",  name:"Digital Revenue ($)",detail:"Online courses, templates, digital products" },
          { type:"FORMULA", name:"Total Revenue ($)",  detail:"Sum of all revenue columns" },
          { type:"NUMBER",  name:"COGS ($)",           detail:"Direct costs: contractor pay, equipment rental, software used" },
          { type:"FORMULA", name:"Gross Profit ($)",   detail:"Total Revenue − COGS" },
          { type:"FORMULA", name:"Gross Margin %",     detail:"(Gross Profit / Total Revenue) * 100" },
          { type:"NUMBER",  name:"Operating Expenses ($)", detail:"Overhead: rent, software subscriptions, marketing, misc" },
          { type:"FORMULA", name:"Net Profit ($)",     detail:"Gross Profit − Operating Expenses" },
          { type:"FORMULA", name:"Net Margin %",       detail:"(Net Profit / Total Revenue) * 100" },
          { type:"NUMBER",  name:"Revenue Target ($)", detail:"Monthly target set in planning session" },
          { type:"FORMULA", name:"% to Target",        detail:"(Total Revenue / Revenue Target) * 100" },
          { type:"NUMBER",  name:"New MRR Added ($)",  detail:"MRR from new clients signed this month" },
          { type:"NUMBER",  name:"MRR Churned ($)",    detail:"MRR lost from cancelled retainers this month" },
          { type:"FORMULA", name:"Net MRR Movement",   detail:"New MRR Added − MRR Churned" },
          { type:"SELECT",  name:"Month Status",       detail:"Open | Closed | Projected" },
        ]}
        formulas={[
          { name:"Total Revenue", formula:'prop("MRR Collected ($)") + prop("Project Revenue ($)") + prop("Studio Revenue ($)") + prop("Event Revenue ($)") + prop("Digital Revenue ($)")' },
          { name:"Gross Profit", formula:'prop("Total Revenue ($)") - prop("COGS ($)")' },
          { name:"Net Profit",   formula:'prop("Gross Profit ($)") - prop("Operating Expenses ($)")' },
          { name:"% to Target",  formula:'round(prop("Total Revenue ($)") / prop("Revenue Target ($)") * 100)' },
        ]}
        views={["📅 All Months (table — revenue trend)", "📈 P&L Summary (current month)", "📊 Revenue by Stream", "🏆 Best Revenue Months (sorted)", "🗓 Current Month Open"]}
      />

      <DB title="MRR TRACKER DATABASE" emoji="📈" color="#4ade80"
        properties={[
          { type:"RELATION", name:"→ Client",              detail:"Links to Client Database" },
          { type:"SELECT",   name:"Service",               detail:"Short Form Monthly | YouTube | Podcast | Full Retainer | CRM Mgmt | Lead Gen | GHL White-Label | Studio Membership | Authority Package" },
          { type:"NUMBER",   name:"Monthly Value ($)" },
          { type:"DATE",     name:"Start Date" },
          { type:"DATE",     name:"Next Renewal Date" },
          { type:"SELECT",   name:"Payment Status",        detail:"Active | Paused | Past Due | Cancelled | At Risk" },
          { type:"SELECT",   name:"Billing Frequency",     detail:"Monthly | Quarterly | Annual" },
          { type:"SELECT",   name:"Niche",                 detail:"Trainer | Gym | Med Spa | Real Estate | Automotive | Other" },
          { type:"NUMBER",   name:"Months Active" },
          { type:"CHECKBOX", name:"Contract in Place" },
          { type:"CHECKBOX", name:"Auto-Pay Active" },
          { type:"FORMULA",  name:"LTV to Date ($)" },
          { type:"FORMULA",  name:"Annualized Value ($)" },
          { type:"FORMULA",  name:"Renewal Alert" },
        ]}
        formulas={[
          { name:"LTV to Date",      formula:'prop("Monthly Value ($)") * prop("Months Active")' },
          { name:"Annualized Value", formula:'prop("Monthly Value ($)") * 12' },
          { name:"Renewal Alert",    formula:'if(dateBetween(prop("Next Renewal Date"), now(), "days") <= 14, "🔴 Renews in " & dateBetween(prop("Next Renewal Date"), now(), "days") & " days", "")' },
        ]}
        relations={[
          "ROLLUP on CEO Dashboard: SUM of all Active Monthly Values = Current MRR",
          "ROLLUP on CEO Scorecard: COUNT of Active Retainers by Service Type",
          "ROLLUP on Monthly Revenue DB: MRR Collected this month",
        ]}
        views={["💰 All Active MRR (sorted by value)", "🔴 Renewals Due (next 30 days)", "⚠ At-Risk Accounts", "📊 MRR by Service Type", "📊 MRR by Niche", "📈 MRR Growth by Month"]}
      />

      <DB title="ONE-TIME PROJECTS DATABASE" emoji="🗂" color="#4ade80"
        properties={[
          { type:"TEXT",     name:"Project Name" },
          { type:"RELATION", name:"→ Client" },
          { type:"SELECT",   name:"Service Type",     detail:"Brand Shoot | GHL Setup | Website/Funnel | Brand Identity | YouTube Launch | Event Coverage | Other" },
          { type:"NUMBER",   name:"Project Value ($)" },
          { type:"NUMBER",   name:"Deposit ($)",      detail:"Amount collected upfront" },
          { type:"NUMBER",   name:"Balance Due ($)",  detail:"Remaining after deposit" },
          { type:"DATE",     name:"Invoice Date" },
          { type:"DATE",     name:"Balance Due Date" },
          { type:"SELECT",   name:"Payment Status",   detail:"Unpaid | Deposit Only | Paid in Full | Overdue | Refunded" },
          { type:"NUMBER",   name:"Direct Costs ($)", detail:"Editor hours, equipment, contractors attributed to this project" },
          { type:"FORMULA",  name:"Project Profit ($)" },
          { type:"FORMULA",  name:"Project Margin %" },
          { type:"FORMULA",  name:"Overdue Flag" },
          { type:"RELATION", name:"→ Deliverables" },
        ]}
        formulas={[
          { name:"Project Profit",  formula:'prop("Project Value ($)") - prop("Direct Costs ($)")' },
          { name:"Project Margin",  formula:'round(prop("Project Profit ($)") / prop("Project Value ($)") * 100) & "%"' },
          { name:"Overdue Flag",    formula:'if(and(prop("Payment Status") != "Paid in Full", dateBetween(now(), prop("Balance Due Date"), "days") > 0), "🔴 OVERDUE by " & dateBetween(now(), prop("Balance Due Date"), "days") & " days", "")' },
        ]}
        views={["🔴 Overdue Projects", "✅ Paid This Month", "📊 By Service Type", "💰 Profitability Ranked"]}
      />

      <DB title="OUTSTANDING INVOICES / ACCOUNTS RECEIVABLE" emoji="📬" color="#ef4444"
        properties={[
          { type:"TEXT",     name:"Invoice #",         detail:"Auto-generated: INV-YYYY-001" },
          { type:"RELATION", name:"→ Client" },
          { type:"SELECT",   name:"Invoice Type",      detail:"Retainer | Project | Deposit | Studio | Event | Consulting" },
          { type:"NUMBER",   name:"Amount ($)" },
          { type:"DATE",     name:"Invoice Date" },
          { type:"DATE",     name:"Due Date",          detail:"Default: Net 7 for retainers, Net 14 for projects" },
          { type:"SELECT",   name:"Status",            detail:"Draft | Sent | Viewed | Paid | Partially Paid | Overdue | Disputed | Written Off" },
          { type:"DATE",     name:"Paid Date" },
          { type:"NUMBER",   name:"Amount Paid ($)" },
          { type:"FORMULA",  name:"Balance Remaining ($)" },
          { type:"FORMULA",  name:"Days Outstanding" },
          { type:"FORMULA",  name:"Overdue Days" },
          { type:"TEXT",     name:"GHL/PandaDoc Invoice Link" },
          { type:"CHECKBOX", name:"Late Fee Applied?" },
          { type:"NUMBER",   name:"Late Fee Amount ($)" },
          { type:"TEXT",     name:"Collection Notes" },
        ]}
        formulas={[
          { name:"Balance Remaining", formula:'prop("Amount ($)") - prop("Amount Paid ($)")' },
          { name:"Days Outstanding",  formula:'dateBetween(now(), prop("Invoice Date"), "days")' },
          { name:"Overdue Days",      formula:'if(and(prop("Status") != "Paid", dateBetween(now(), prop("Due Date"), "days") > 0), dateBetween(now(), prop("Due Date"), "days"), 0)' },
          { name:"Urgency Flag",      formula:'if(prop("Overdue Days") > 30, "🔴 30+ Days Overdue", if(prop("Overdue Days") > 14, "🟠 14+ Days", if(prop("Overdue Days") > 0, "🟡 Overdue", "")))' },
        ]}
        relations={[
          "ROLLUP on CEO Scorecard: SUM of Balance Remaining where Status ≠ Paid = Total AR",
          "ROLLUP on Monthly Revenue DB: SUM of Amount Paid where Paid Date = this month",
        ]}
        views={["🔴 Overdue Invoices (sorted by Overdue Days)", "📅 Due This Week", "✅ Paid This Month", "📊 AR by Client", "📋 All Invoices"]}
      />

      <DB title="PROPOSAL PIPELINE VALUE" emoji="📄" color="#818cf8"
        properties={[
          { type:"RELATION", name:"→ Lead / Client" },
          { type:"TEXT",     name:"Proposal Name" },
          { type:"NUMBER",   name:"One-Time Value ($)" },
          { type:"NUMBER",   name:"Monthly Recurring ($)" },
          { type:"SELECT",   name:"Status",             detail:"Draft | Sent | Viewed | Accepted | Declined | Expired | Negotiating" },
          { type:"NUMBER",   name:"Close Probability %",detail:"0–100: Owner estimated likelihood" },
          { type:"FORMULA",  name:"Weighted Value ($)",  detail:"One-Time + (MRR × 3) × (Close Probability / 100)" },
          { type:"DATE",     name:"Expected Close Date" },
          { type:"FORMULA",  name:"Pipeline Contribution ($)" },
        ]}
        formulas={[
          { name:"Weighted Value",          formula:'(prop("One-Time Value ($)") + prop("Monthly Recurring ($)") * 3) * (prop("Close Probability %") / 100)' },
          { name:"Pipeline Contribution",   formula:'prop("One-Time Value ($)") + (prop("Monthly Recurring ($)") * 12)' },
        ]}
        relations={[
          "ROLLUP on CEO Scorecard: SUM of Weighted Value where Status=Sent/Viewed/Negotiating = Total Pipeline Value",
          "ROLLUP on Revenue Forecast DB: sum weighted value by expected close month",
        ]}
        views={["💰 Total Pipeline (all active proposals)", "🏆 Highest Value", "📅 Closing This Month", "📊 By Probability"]}
      />

      <DB title="REVENUE FORECAST DATABASE" emoji="🔮" color="#4ade80"
        properties={[
          { type:"DATE",    name:"Forecast Month" },
          { type:"NUMBER",  name:"Current MRR ($)",       detail:"Locked-in recurring at start of month" },
          { type:"NUMBER",  name:"Expected New MRR ($)",  detail:"From proposals likely to close" },
          { type:"NUMBER",  name:"Expected Churn ($)",    detail:"Known/expected cancellations" },
          { type:"NUMBER",  name:"Expected Project Rev ($)", detail:"One-time projects in pipeline × probability" },
          { type:"NUMBER",  name:"Expected Studio Rev ($)",  detail:"Bookings confirmed + average fill" },
          { type:"FORMULA", name:"Forecasted Total ($)" },
          { type:"NUMBER",  name:"Actual Total ($)",      detail:"Filled in after month closes" },
          { type:"FORMULA", name:"Forecast Accuracy %" },
          { type:"TEXT",    name:"Forecast Notes" },
        ]}
        formulas={[
          { name:"Forecasted Total",    formula:'prop("Current MRR ($)") + prop("Expected New MRR ($)") - prop("Expected Churn ($)") + prop("Expected Project Rev ($)") + prop("Expected Studio Rev ($)")' },
          { name:"Forecast Accuracy",   formula:'if(prop("Actual Total ($)") > 0, round(prop("Actual Total ($)") / prop("Forecasted Total ($)") * 100) & "%", "Pending")' },
        ]}
        views={["📅 Next 3 Months Forecast", "📊 Forecast vs Actual (all months)", "📈 Accuracy Trend"]}
      />

      <DB title="PROJECT PROFITABILITY DATABASE" emoji="⚖️" color="#4ade80"
        properties={[
          { type:"RELATION", name:"→ Project / Client" },
          { type:"NUMBER",   name:"Revenue ($)" },
          { type:"NUMBER",   name:"Shooter Hours",       detail:"Jaylen or owner hours on shoot" },
          { type:"NUMBER",   name:"Editor Hours (Walter)",detail:"Walter's hours" },
          { type:"NUMBER",   name:"Editor Hours (Other)" },
          { type:"NUMBER",   name:"Hourly Rate Used ($)" },
          { type:"NUMBER",   name:"Contractor Costs ($)" },
          { type:"NUMBER",   name:"Equipment / Misc ($)" },
          { type:"FORMULA",  name:"Total Labor Cost ($)" },
          { type:"FORMULA",  name:"Total Direct Cost ($)" },
          { type:"FORMULA",  name:"Gross Profit ($)" },
          { type:"FORMULA",  name:"Profit Margin %" },
          { type:"SELECT",   name:"Profitability Rating", detail:"🟢 >50% | 🟡 30-50% | 🔴 <30%" },
        ]}
        formulas={[
          { name:"Total Labor Cost",   formula:'(prop("Shooter Hours") + prop("Editor Hours (Walter)") + prop("Editor Hours (Other)")) * prop("Hourly Rate Used ($)")' },
          { name:"Total Direct Cost",  formula:'prop("Total Labor Cost ($)") + prop("Contractor Costs ($)") + prop("Equipment / Misc ($)")' },
          { name:"Gross Profit",       formula:'prop("Revenue ($)") - prop("Total Direct Cost ($)")' },
          { name:"Profit Margin %",    formula:'round(prop("Gross Profit ($)") / prop("Revenue ($)") * 100)' },
          { name:"Profitability Rating",formula:'if(prop("Profit Margin %") >= 50, "🟢 Healthy", if(prop("Profit Margin %") >= 30, "🟡 Marginal", "🔴 Unprofitable"))' },
        ]}
        views={["🔴 Unprofitable Projects (fix or re-price)", "🏆 Most Profitable Projects", "📊 Average Margin by Service Type"]}
      />

      <DB title="CLIENT LIFETIME VALUE DATABASE" emoji="♾️" color="#4ade80"
        properties={[
          { type:"RELATION", name:"→ Client" },
          { type:"ROLLUP",   name:"Total Revenue Paid ($)",     detail:"Sum of all paid invoices linked to this client" },
          { type:"ROLLUP",   name:"Active MRR ($)",             detail:"Sum of active MRR Tracker entries for this client" },
          { type:"DATE",     name:"First Payment Date" },
          { type:"FORMULA",  name:"Months as Client" },
          { type:"FORMULA",  name:"Average Monthly Revenue ($)" },
          { type:"FORMULA",  name:"Projected 12-Month LTV ($)" },
          { type:"FORMULA",  name:"Projected 36-Month LTV ($)" },
          { type:"NUMBER",   name:"Acquisition Cost ($)",       detail:"Marketing/sales cost to land this client" },
          { type:"FORMULA",  name:"LTV : CAC Ratio" },
          { type:"SELECT",   name:"Tier",                       detail:"🏆 Platinum (>$3K/mo) | 🥇 Gold ($1.5-3K) | 🥈 Silver ($500-1.5K) | Standard" },
        ]}
        formulas={[
          { name:"Months as Client",         formula:'dateBetween(now(), prop("First Payment Date"), "months")' },
          { name:"Avg Monthly Revenue",      formula:'prop("Total Revenue Paid ($)") / max(prop("Months as Client"), 1)' },
          { name:"Projected 12-Month LTV",   formula:'prop("Active MRR ($)") * 12' },
          { name:"Projected 36-Month LTV",   formula:'prop("Active MRR ($)") * 36' },
          { name:"LTV:CAC Ratio",            formula:'round(prop("Projected 12-Month LTV ($)") / max(prop("Acquisition Cost ($)"), 1))' },
          { name:"Tier",                     formula:'if(prop("Active MRR ($)") >= 3000, "🏆 Platinum", if(prop("Active MRR ($)") >= 1500, "🥇 Gold", if(prop("Active MRR ($)") >= 500, "🥈 Silver", "Standard")))' },
        ]}
        views={["🏆 Top Clients by LTV (sorted)", "📊 By Tier", "💰 Highest Active MRR", "📈 Longest Clients by Tenure"]}
        notes="This is the most important retention tool. Sort by Projected 36-Month LTV monthly. Platinum clients get white-glove service, monthly check-ins from owner, and referral requests."
      />

      <div style={{ background:"#0f0f0f", border:"1px solid #4ade8033", borderRadius:10, padding:18, marginBottom:20 }}>
        <div style={{ color:"#4ade80", fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:2, marginBottom:14 }}>FINANCIAL DASHBOARD — CEO VIEW LAYOUT</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:10 }}>
          {[
            { label:"Current MRR", sub:"Live rollup — MRR Tracker", color:"#4ade80" },
            { label:"Revenue Collected MTD", sub:"Monthly Revenue DB", color:"#4ade80" },
            { label:"Outstanding AR", sub:"Invoice DB — unpaid sum", color:"#ef4444" },
            { label:"Revenue Forecast (Month)", sub:"Forecast DB", color:"#818cf8" },
            { label:"Pipeline Value (Weighted)", sub:"Proposal Pipeline DB", color:"#818cf8" },
            { label:"Avg Profit Margin", sub:"Project Profitability DB", color:"#facc15" },
            { label:"Top Client by MRR", sub:"LTV DB — sorted", color:"#f97316" },
            { label:"Churn This Month", sub:"MRR Tracker — cancelled", color:"#ef4444" },
            { label:"Net MRR Growth", sub:"New MRR − Churn", color:"#4ade80" },
          ].map((c,i)=>(
            <div key={i} style={{ background:"#141414", border:`1px solid ${c.color}22`, borderRadius:8, padding:"12px 14px" }}>
              <div style={{ color:c.color, fontSize:11, fontWeight:600 }}>{c.label}</div>
              <div style={{ color:"#333", fontSize:10, marginTop:4 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Sec>
  ),

  studio: () => (
    <Sec title="STUDIO MONETIZATION DIVISION" icon="🏢" color="#f97316">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        The 7,000 sqft Self Made Del Mar facility is an underutilized revenue-generating asset. This division tracks every monetization channel for the studio: rentals, memberships, events, workshops, podcast studio, corporate shoots, and educational seminars. Target: $5,000–$15,000/month from the studio asset alone, running with minimal owner involvement.
      </p>

      <DB title="STUDIO BOOKINGS DATABASE" emoji="🗓" color="#f97316"
        properties={[
          { type:"TEXT",     name:"Booking Name" },
          { type:"TEXT",     name:"Client / Renter Name" },
          { type:"TEXT",     name:"Company / Business" },
          { type:"SELECT",   name:"Booking Type",      detail:"Studio Rental | Podcast Studio | Content Day | Corporate Shoot | Membership Session | Workshop | Event | Networking Event | Educational Seminar | Photo Session | Film Session" },
          { type:"DATE",     name:"Booking Date" },
          { type:"TIME",     name:"Start Time" },
          { type:"TIME",     name:"End Time" },
          { type:"FORMULA",  name:"Duration (hrs)" },
          { type:"NUMBER",   name:"Rate ($/hr or flat)" },
          { type:"FORMULA",  name:"Total Revenue ($)" },
          { type:"SELECT",   name:"Payment Status",    detail:"Unpaid | Deposit Paid | Paid in Full | Comp / Trade" },
          { type:"SELECT",   name:"Status",            detail:"Inquiry | Confirmed | Completed | Cancelled | No-Show" },
          { type:"SELECT",   name:"Referral Source",   detail:"Instagram | Peerspace | Gym Network | Trainer Referral | Event | Direct | Google | Partner" },
          { type:"CHECKBOX", name:"DGM Team On-Site?" },
          { type:"CHECKBOX", name:"Contract Signed?" },
          { type:"CHECKBOX", name:"Deposit Received?" },
          { type:"TEXT",     name:"Equipment Requested" },
          { type:"TEXT",     name:"Special Notes" },
          { type:"CHECKBOX", name:"Follow-Up / Rebook Sent?" },
          { type:"SELECT",   name:"Repeat Client?",    detail:"First Time | Returning | Membership" },
        ]}
        formulas={[
          { name:"Duration (hrs)", formula:'dateBetween(prop("End Time"), prop("Start Time"), "hours")' },
          { name:"Total Revenue",  formula:'prop("Duration (hrs)") * prop("Rate ($/hr or flat)")' },
        ]}
        views={["📅 Calendar View (this week)", "💰 Revenue by Month", "🔴 Unconfirmed / Pending", "📊 By Booking Type", "🔄 Repeat Clients", "📋 All Bookings"]}
      />

      <DB title="STUDIO MEMBERSHIP PROGRAM" emoji="🎫" color="#f97316"
        properties={[
          { type:"TEXT",     name:"Member Name" },
          { type:"TEXT",     name:"Business Name" },
          { type:"SELECT",   name:"Tier",              detail:"Creator ($297/mo) | Professional ($497/mo) | Authority ($797/mo)" },
          { type:"NUMBER",   name:"Monthly Value ($)" },
          { type:"DATE",     name:"Start Date" },
          { type:"DATE",     name:"Next Billing Date" },
          { type:"SELECT",   name:"Status",            detail:"Active | Paused | Cancelled | Pending" },
          { type:"NUMBER",   name:"Sessions Remaining (MTD)" },
          { type:"NUMBER",   name:"Sessions Used (MTD)" },
          { type:"FORMULA",  name:"Sessions Available Total" },
          { type:"ROLLUP",   name:"Total Bookings to Date" },
          { type:"FORMULA",  name:"LTV to Date ($)" },
          { type:"CHECKBOX", name:"Upsell to DGM Service Sent?" },
          { type:"TEXT",     name:"Niche / Industry" },
        ]}
        formulas={[
          { name:"Sessions Available", formula:'if(prop("Tier") == "Creator ($297/mo)", 2, if(prop("Tier") == "Professional ($497/mo)", 4, 6))' },
          { name:"LTV to Date",        formula:'prop("Monthly Value ($)") * dateBetween(now(), prop("Start Date"), "months")' },
        ]}
        notes="TIER DETAILS — Creator: 2 sessions/mo, raw files, $297. Professional: 4 sessions/mo, raw files, 1 edited video, $497. Authority: 6 sessions/mo, raw files, 2 edited videos, monthly strategy call, $797. Membership is the gateway drug to full DGM retainer services."
        views={["📊 All Active Members", "💰 MRR from Memberships", "🔴 Expiring Soon", "🎯 Upsell Opportunities"]}
      />

      <DB title="EVENTS & WORKSHOPS DATABASE" emoji="🎪" color="#f97316"
        properties={[
          { type:"TEXT",     name:"Event Name" },
          { type:"SELECT",   name:"Event Type",        detail:"Networking | Workshop | Educational Seminar | Brand Launch | Corporate Event | Creator Meetup | Industry Panel | Fitness Event" },
          { type:"DATE",     name:"Event Date" },
          { type:"TIME",     name:"Start Time" },
          { type:"TIME",     name:"End Time" },
          { type:"NUMBER",   name:"Capacity (max attendees)" },
          { type:"NUMBER",   name:"Tickets Sold" },
          { type:"NUMBER",   name:"Ticket Price ($)" },
          { type:"NUMBER",   name:"Sponsor Revenue ($)" },
          { type:"NUMBER",   name:"Vendor Revenue ($)" },
          { type:"FORMULA",  name:"Total Event Revenue ($)" },
          { type:"NUMBER",   name:"Direct Costs ($)",  detail:"Catering, decor, marketing, speaker fees" },
          { type:"FORMULA",  name:"Event Profit ($)" },
          { type:"FORMULA",  name:"Capacity Fill %" },
          { type:"SELECT",   name:"Status",            detail:"Planning | Promoted | Sold Out | Completed | Cancelled" },
          { type:"NUMBER",   name:"Leads Generated",   detail:"New contacts captured at event" },
          { type:"NUMBER",   name:"Clients Acquired",  detail:"From event → signed within 30 days" },
          { type:"TEXT",     name:"Post-Event Follow-Up Done?" },
        ]}
        formulas={[
          { name:"Total Event Revenue", formula:'(prop("Tickets Sold") * prop("Ticket Price ($)")) + prop("Sponsor Revenue ($)") + prop("Vendor Revenue ($)")' },
          { name:"Event Profit",        formula:'prop("Total Event Revenue ($)") - prop("Direct Costs ($)")' },
          { name:"Capacity Fill %",     formula:'round(prop("Tickets Sold") / prop("Capacity (max attendees)") * 100) & "%"' },
        ]}
        views={["📅 Upcoming Events", "💰 Event Revenue Summary", "📊 Leads Generated per Event", "🏆 Best-Performing Events"]}
      />

      <DB title="CORPORATE SHOOTS DATABASE" emoji="🎥" color="#f97316"
        properties={[
          { type:"TEXT",     name:"Company Name" },
          { type:"SELECT",   name:"Industry",          detail:"Tech | Medical | Legal | Finance | Real Estate | Fitness | Hospitality | Automotive | Other" },
          { type:"SELECT",   name:"Service Requested", detail:"Headshots | Team Photos | Product Shoot | Brand Video | Event Coverage | Training Video | Demo Video" },
          { type:"DATE",     name:"Shoot Date" },
          { type:"NUMBER",   name:"Day Rate ($)" },
          { type:"NUMBER",   name:"Add-Ons ($)" },
          { type:"FORMULA",  name:"Total Invoice ($)" },
          { type:"NUMBER",   name:"Participants / Employees" },
          { type:"SELECT",   name:"Status",            detail:"Inquiry | Quoted | Confirmed | Completed | Invoiced | Paid" },
          { type:"CHECKBOX", name:"Referral Opportunity Identified?" },
          { type:"TEXT",     name:"Company LinkedIn / Contact" },
          { type:"TEXT",     name:"Follow-Up Notes" },
        ]}
        formulas={[
          { name:"Total Invoice", formula:'prop("Day Rate ($)") + prop("Add-Ons ($)")' },
        ]}
        views={["📅 Upcoming Corporate Shoots", "💰 Revenue by Company", "🔄 Repeat Corporate Clients", "🎯 Referral Pipeline"]}
      />

      <div style={{ background:"#0a0f00", border:"1px solid #2a2f00", borderRadius:10, padding:18, marginBottom:20 }}>
        <div style={{ color:"#f97316", fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:2, marginBottom:14 }}>STUDIO KPI DASHBOARD</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
          {[
            { k:"Studio Revenue (MTD)",      f:"Sum: all booking types this month",    c:"#f97316" },
            { k:"Utilization Rate %",         f:"Booked Hours / Available Hours × 100", c:"#f97316" },
            { k:"Active Members",             f:"Count: Membership DB → Status=Active", c:"#facc15" },
            { k:"Membership MRR ($)",         f:"Sum: Membership DB → Monthly Value",   c:"#facc15" },
            { k:"Events This Quarter",        f:"Count: Events DB → this quarter",      c:"#f97316" },
            { k:"Avg Revenue per Booking ($)", f:"Total Revenue / Booking Count",       c:"#4ade80" },
            { k:"Leads from Studio (MTD)",    f:"Sum: Events DB → Leads Generated",    c:"#818cf8" },
            { k:"Corporate Shoots (MTD)",     f:"Count: Corporate DB → completed",     c:"#38bdf8" },
          ].map((item,i)=>(
            <div key={i} style={{ background:"#0f0f0f", border:`1px solid ${item.c}22`, borderRadius:8, padding:"12px 14px" }}>
              <div style={{ color:item.c, fontSize:12, fontWeight:600, marginBottom:4 }}>{item.k}</div>
              <div style={{ color:"#333", fontSize:10, fontFamily:"monospace" }}>{item.f}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:16 }}>
          <div style={{ color:"#f97316", fontFamily:"'Bebas Neue',sans-serif", fontSize:13, letterSpacing:2, marginBottom:10 }}>STUDIO PRICING REFERENCE</div>
          {[
            { item:"Half-Day Rental (4 hrs)", price:"$397", note:"No DGM team; key access with deposit" },
            { item:"Full-Day Rental (8 hrs)", price:"$697", note:"No DGM team; includes basic lighting" },
            { item:"Podcast Studio (2 hrs)",  price:"$197", note:"Full podcast setup, self-run" },
            { item:"Podcast Studio + Operator", price:"$397", note:"DGM runs the session" },
            { item:"Content Day (4 hrs + editor)", price:"$597", note:"Shoot + same-day rough edits" },
            { item:"Corporate Shoot Day",     price:"$997–$1,997", note:"Full team, multiple setups, brand video" },
            { item:"Workshop / Seminar",      price:"$47–$197/ticket", note:"Plus optional sponsorships" },
            { item:"Networking Event",        price:"$47–$97/ticket", note:"30–60 people target, DGM brand-builds" },
            { item:"Creator Membership — Creator", price:"$297/mo", note:"2 sessions, raw files" },
            { item:"Creator Membership — Pro",     price:"$497/mo", note:"4 sessions, raw + 1 edit" },
            { item:"Creator Membership — Authority","$797/mo", note:"6 sessions + editing + strategy call" },
          ].map((p,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"220px 140px 1fr", gap:12, padding:"7px 0", borderBottom:i<10?"1px solid #141414":"none" }}>
              <span style={{ color:"#d0d0d0", fontSize:12 }}>{p.item}</span>
              <span style={{ color:"#f97316", fontSize:12, fontWeight:600 }}>{p.price}</span>
              <span style={{ color:"#505050", fontSize:11 }}>{p.note}</span>
            </div>
          ))}
        </div>
      </div>
    </Sec>
  ),

  referral: () => (
    <Sec title="REFERRAL PARTNER DIVISION" icon="🔗" color="#4ade80">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        Referral partners are the highest-ROI growth channel for a local agency — zero ad spend, warm introductions, compounding relationships. This division tracks every partner, every referral sent, every deal closed, and every commission owed. Goal: build a network of 20+ active referral partners generating $5,000–$15,000/month in new business.
      </p>

      <DB title="REFERRAL PARTNER DATABASE" emoji="🤝" color="#4ade80"
        properties={[
          { type:"TEXT",     name:"Partner Name" },
          { type:"TEXT",     name:"Business Name" },
          { type:"SELECT",   name:"Industry",          detail:"Fitness / Gym | Real Estate | Finance / Wealth Mgmt | Legal | Medical | Automotive | Marketing | Tech | Other" },
          { type:"TEXT",     name:"Email" },
          { type:"TEXT",     name:"Phone / IG" },
          { type:"SELECT",   name:"Relationship Tier", detail:"🥇 Active Partner | 🥈 Warm Contact | 🥉 Identified | 💤 Inactive" },
          { type:"SELECT",   name:"Partnership Type",  detail:"Reciprocal Referral | Commission-Based | Strategic Alliance | Sponsor | Co-Marketing" },
          { type:"NUMBER",   name:"Commission Rate (%)",detail:"Standard: 10% of first-month value, or flat fee" },
          { type:"DATE",     name:"Partnership Start Date" },
          { type:"DATE",     name:"Last Contact Date" },
          { type:"DATE",     name:"Next Touch Date" },
          { type:"ROLLUP",   name:"Total Referrals Sent",   detail:"Count of linked Referral Records" },
          { type:"ROLLUP",   name:"Referrals Closed",       detail:"Count of Referral Records → Status=Closed Won" },
          { type:"ROLLUP",   name:"Total Revenue Generated ($)", detail:"Sum of Deal Value on closed referrals" },
          { type:"ROLLUP",   name:"Total Commission Owed ($)",   detail:"Sum of Commission Owed from Referral Log" },
          { type:"FORMULA",  name:"Close Rate %",           detail:"Referrals Closed / Total Referrals Sent × 100" },
          { type:"FORMULA",  name:"Lifetime Referral Value ($)" },
          { type:"FORMULA",  name:"Partner Score",          detail:"Composite: volume × close rate × value" },
          { type:"CHECKBOX", name:"Commission Agreement Signed?" },
          { type:"TEXT",     name:"How We Met" },
          { type:"TEXT",     name:"Best Intro / Referral Type", detail:"What client types does this partner know well?" },
        ]}
        formulas={[
          { name:"Close Rate %",             formula:'round(prop("Referrals Closed") / max(prop("Total Referrals Sent"), 1) * 100)' },
          { name:"Lifetime Referral Value",  formula:'prop("Total Revenue Generated ($)")' },
          { name:"Partner Score (1-10)",     formula:'min(round((prop("Referrals Closed") * prop("Total Revenue Generated ($)") / max(prop("Total Referrals Sent"), 1)) / 500), 10)' },
        ]}
        views={["🏆 Top Partners by Revenue Generated", "🥇 Active Partners (touch calendar)", "💸 Commission Owed (pay now)", "📅 Re-engage (no contact 30+ days)", "📊 By Industry"]}
      />

      <DB title="REFERRAL LOG DATABASE" emoji="📋" color="#4ade80"
        properties={[
          { type:"RELATION", name:"→ Referral Partner" },
          { type:"RELATION", name:"→ Referred Lead (Lead DB)" },
          { type:"DATE",     name:"Referral Date" },
          { type:"TEXT",     name:"Referred Business Name" },
          { type:"SELECT",   name:"Niche / Industry" },
          { type:"SELECT",   name:"Status",            detail:"Introduced | In Pipeline | Proposal Sent | Closed Won | Closed Lost | Inactive" },
          { type:"NUMBER",   name:"Deal Value ($)",    detail:"Contract value of closed deal" },
          { type:"NUMBER",   name:"Monthly Value ($)", detail:"MRR if retainer" },
          { type:"FORMULA",  name:"Commission Owed ($)" },
          { type:"CHECKBOX", name:"Commission Paid?" },
          { type:"DATE",     name:"Commission Pay Date" },
          { type:"TEXT",     name:"Notes" },
        ]}
        formulas={[
          { name:"Commission Owed", formula:'if(prop("Status") == "Closed Won", round((prop("Deal Value ($)") + prop("Monthly Value ($)")) * 0.10), 0)' },
        ]}
        relations={[
          "ROLLUP back to Partner DB: Total Referrals, Closed Count, Revenue Generated, Commission Owed",
        ]}
        views={["💸 Unpaid Commissions", "✅ Closed Referrals This Month", "📊 By Partner", "🗂 All Referrals"]}
      />

      <div style={{ background:"#0f0f0f", border:"1px solid #4ade8033", borderRadius:10, padding:18, marginBottom:20 }}>
        <div style={{ color:"#4ade80", fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:2, marginBottom:14 }}>REFERRAL PARTNER DASHBOARD — KPIs</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:10 }}>
          {[
            { k:"Total Active Partners",    f:"Count: Partner DB → Tier=Active",       c:"#4ade80" },
            { k:"Referrals Received (MTD)", f:"Count: Referral Log → Date this month", c:"#4ade80" },
            { k:"Referral Revenue (MTD)",   f:"Sum: Referral Log → Closed Won this mo",c:"#facc15" },
            { k:"Commission Owed (Total)",  f:"Sum: Referral Log → Unpaid commissions", c:"#ef4444" },
            { k:"Top Partner by Revenue",   f:"Partner DB → Sorted by Revenue Generated",c:"#f97316"},
            { k:"Avg Referral Close Rate",  f:"Avg of all Partner Close Rates",        c:"#818cf8" },
            { k:"Pipeline from Referrals",  f:"Sum: Referral Log → Status=In Pipeline",c:"#818cf8" },
            { k:"Partners Needing Touch",   f:"Count: Partners → No contact 30+ days", c:"#e879f9" },
          ].map((item,i)=>(
            <div key={i} style={{ background:"#141414", border:`1px solid ${item.c}22`, borderRadius:8, padding:"12px 14px" }}>
              <div style={{ color:item.c, fontSize:12, fontWeight:600 }}>{item.k}</div>
              <div style={{ color:"#303030", fontSize:10, marginTop:4 }}>{item.f}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop:16 }}>
          <div style={{ color:"#4ade80", fontSize:13, fontFamily:"'Bebas Neue',sans-serif", letterSpacing:2, marginBottom:10 }}>TOP REFERRAL PARTNER TARGET CATEGORIES — SAN DIEGO NORTH COUNTY</div>
          {[
            { type:"Real Estate Agents", why:"Know wealthy clients who need personal brands. High earners. Natural fit for photo/video.", targets:"KW Del Mar, Pacific Sotheby's, Compass La Jolla" },
            { type:"Business Coaches / Consultants", why:"Their clients need content. Perfect reciprocal referral. High trust referrals.", targets:"LinkedIn-active coaches, mastermind organizers" },
            { type:"Financial Advisors / Wealth Mgrs", why:"HNWI clients in Rancho Santa Fe / Del Mar. Authority content is critical for trust.", targets:"Merrill Lynch Del Mar, independent RIAs" },
            { type:"Personal Training Studio Owners", why:"Already in our network. Know every trainer in North County.", targets:"Self Made leadership, Sweat studio, CrossFit owners" },
            { type:"Marketing / PR Agencies", why:"White-label production. Referral for full-service clients they can't produce for.", targets:"Boutique SD agencies without in-house video" },
            { type:"Corporate Event Planners", why:"Direct pipeline for corporate shoots, event coverage, venue rental.", targets:"San Diego event companies, hotel event coordinators" },
          ].map((p,i)=>(
            <div key={i} style={{ background:"#141414", borderRadius:8, padding:"10px 12px", marginBottom:6 }}>
              <div style={{ color:"#4ade80", fontSize:12, fontWeight:600, marginBottom:3 }}>{p.type}</div>
              <div style={{ color:"#606060", fontSize:11, marginBottom:3 }}>{p.why}</div>
              <div style={{ color:"#3a3a3a", fontSize:10 }}>Targets: {p.targets}</div>
            </div>
          ))}
        </div>
      </div>
    </Sec>
  ),

  sdmarket: () => (
    <Sec title="SAN DIEGO MARKET INTELLIGENCE" icon="📍" color="#38bdf8">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        A proprietary prospecting database covering the highest-value business markets in San Diego County. This is not a generic CRM — it's a targeted market intelligence system built around DGM's geographic advantage and service mix. Updated continuously as the market evolves.
      </p>

      <DB title="SD MARKET OPPORTUNITY DATABASE" emoji="🗺" color="#38bdf8"
        properties={[
          { type:"TEXT",     name:"Business Name" },
          { type:"TEXT",     name:"Owner / Decision Maker" },
          { type:"SELECT",   name:"Market / Area",     detail:"Del Mar | Rancho Santa Fe | Solana Beach | Encinitas | Carmel Valley | La Jolla | Carlsbad | Sorrento Valley | Point Loma | Downtown SD | Other" },
          { type:"SELECT",   name:"Industry / Niche",  detail:"Personal Trainer | Gym Owner | Chiropractor | PT | Med Spa | Functional Medicine | Real Estate | Automotive | Financial Advisor | Attorney | Dental | Luxury Retail | Restaurant | Tech / SaaS | Non-Profit | Other" },
          { type:"TEXT",     name:"Instagram / LinkedIn" },
          { type:"TEXT",     name:"Website" },
          { type:"TEXT",     name:"Email" },
          { type:"TEXT",     name:"Phone" },
          { type:"SELECT",   name:"Revenue Potential",  detail:"💎 Elite ($3K+/mo) | 🥇 High ($1.5-3K/mo) | 🥈 Mid ($750-1.5K/mo) | 🥉 Entry (<$750/mo)" },
          { type:"SELECT",   name:"Relationship Status", detail:"No Contact | Cold | Warm | Met | Active Convo | Proposal Sent | Client | Lost" },
          { type:"SELECT",   name:"Referral Source",    detail:"Gym Network | Event | Social Media | Existing Client Referral | Partner Referral | Cold Research | Walk-In" },
          { type:"NUMBER",   name:"Opportunity Score (1–10)", detail:"1=low, 10=perfect fit + high value + warm" },
          { type:"SELECT",   name:"Services Needed",    detail:"Multi-select: Photo | Video | Short Form | YouTube | Podcast | GHL/CRM | Lead Gen | Funnel | Brand | Consulting | Studio Rental | Event" },
          { type:"DATE",     name:"Last Contact Date" },
          { type:"DATE",     name:"Next Follow-Up Date" },
          { type:"TEXT",     name:"How We Can Help (1-line)" },
          { type:"TEXT",     name:"Warm Introduction Path", detail:"Who can intro us? What's the path?" },
          { type:"CHECKBOX", name:"In GHL Sequence?" },
          { type:"TEXT",     name:"Research Notes",     detail:"Content quality, current marketing gaps, online presence notes" },
        ]}
        formulas={[
          { name:"Opportunity Score Auto",   formula:'if(prop("Revenue Potential") == "💎 Elite ($3K+/mo)", 4, if(prop("Revenue Potential") == "🥇 High ($1.5-3K/mo)", 3, 2))' },
          { name:"Follow-Up Urgency",        formula:'if(and(prop("Relationship Status") != "Client", prop("Relationship Status") != "Lost", dateBetween(now(), prop("Next Follow-Up Date"), "days") <= 0), "🔴 Follow Up Now", "")' },
          { name:"Stale Relationship Flag",  formula:'if(and(prop("Relationship Status") == "Warm" or prop("Relationship Status") == "Active Convo", dateBetween(now(), prop("Last Contact Date"), "days") > 14), "🟡 Re-engage", "")' },
        ]}
        views={[
          "🏆 Highest Value Opportunities (Opp Score desc)",
          "🔥 Warm Relationships (Status=Warm/Met/Active Convo)",
          "🔗 Referral Path Opportunities (Referral Source = Partner or Existing Client)",
          "📍 By Area",
          "🏢 By Industry / Niche",
          "📅 Follow-Ups Due Today",
          "💎 Elite Prospects Only",
          "🗂 All SD Market (master table)",
        ]}
      />

      <div style={{ background:"#0f0f0f", border:"1px solid #38bdf833", borderRadius:10, padding:18, marginBottom:20 }}>
        <div style={{ color:"#38bdf8", fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:2, marginBottom:14 }}>TOP NICHES BY MARKET — NORTH COUNTY SAN DIEGO</div>
        {[
          { area:"Del Mar / Carmel Valley", niches:"Personal Trainers, Functional Medicine, Wealth Managers, Real Estate (luxury)", why:"High income density, fitness culture, image-conscious professionals" },
          { area:"Rancho Santa Fe",         niches:"Luxury Real Estate, Equestrian/Lifestyle, Wealth Management, Private Medical", why:"Highest income ZIP in San Diego County — ultra HNWI clients" },
          { area:"La Jolla",                niches:"Med Spas, Cosmetic Surgeons, Real Estate, Biotech, Attorneys", why:"Prestige market — authority content is a purchasing signal for this demo" },
          { area:"Solana Beach / Encinitas",niches:"Yoga Studios, Health Coaches, Surf/Lifestyle Brands, Independent PT Clinics", why:"Wellness-forward community — content is central to business model" },
          { area:"Sorrento Valley / Carlsbad", niches:"B2B Tech / SaaS, Biotech, Corporate Training, Manufacturing", why:"Corporate shoot demand, LinkedIn authority content, thought leadership" },
          { area:"Downtown SD / Point Loma",niches:"Restaurants, Boutique Gyms, Law Firms, Automotive, Event Venues", why:"Volume market — many SMBs, event coverage demand, automotive culture" },
        ].map((row,i)=>(
          <div key={i} style={{ display:"grid", gridTemplateColumns:"200px 220px 1fr", gap:14, padding:"9px 0", borderBottom:i<5?"1px solid #141414":"none" }}>
            <span style={{ color:"#38bdf8", fontSize:12 }}>{row.area}</span>
            <span style={{ color:"#d0d0d0", fontSize:11 }}>{row.niches}</span>
            <span style={{ color:"#505050", fontSize:11 }}>{row.why}</span>
          </div>
        ))}
      </div>
    </Sec>
  ),

  trainer: () => (
    <Sec title="TRAINER ECOSYSTEM" icon="💪" color="#e879f9">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        Trainers are not a single pipeline — they are a multi-segment ecosystem with different needs, budgets, and growth stages. Each segment has its own database, upsell path, and pricing. A trainer can exist in multiple segments simultaneously. Lifetime value tracking drives retention and upsell strategy.
      </p>

      <DB title="TRAINER MASTER DATABASE (All Segments)" emoji="💪" color="#e879f9"
        properties={[
          { type:"TEXT",     name:"Trainer Name" },
          { type:"TEXT",     name:"Instagram Handle" },
          { type:"TEXT",     name:"Email / Phone" },
          { type:"SELECT",   name:"Location",          detail:"Self Made Del Mar | Self Made [Location 2] | Independent | Online Only | Other Gym" },
          { type:"SELECT",   name:"Specialty",         detail:"Strength | HIIT | Bodybuilding | Yoga/Mobility | Nutrition | Athletic | Rehab | Online Coaching | General" },
          { type:"NUMBER",   name:"IG Follower Count" },
          { type:"SELECT",   name:"Content Activity",  detail:"Very Active | Active | Inconsistent | Inactive" },
          { type:"SELECT",   name:"Pipeline Stage",    detail:"Identified | Outreached | Responded | Call Scheduled | Call Done | Proposal Sent | Active Client | Inactive | Lost" },
          { type:"DATE",     name:"First Contact Date" },
          { type:"DATE",     name:"Last Contact Date" },
          { type:"DATE",     name:"Client Since",      detail:"Date became paying client" },
          { type:"SELECT",   name:"Active Services",   detail:"Multi-select: Snapshot | Short Form | YouTube | Podcast | Photography | Ads | GHL/CRM | Consulting | Studio Membership" },
          { type:"NUMBER",   name:"Monthly Value ($)" },
          { type:"ROLLUP",   name:"Total Revenue Paid ($)" },
          { type:"FORMULA",  name:"Months as Client" },
          { type:"FORMULA",  name:"LTV to Date ($)" },
          { type:"FORMULA",  name:"LTV Tier",          detail:"Platinum | Gold | Silver | Standard" },
          { type:"SELECT",   name:"Upsell Opportunity",detail:"Short Form | YouTube | Podcast | Ads | GHL | Full Retainer | None Identified" },
          { type:"TEXT",     name:"Upsell Notes" },
          { type:"CHECKBOX", name:"Testimonial On File?" },
          { type:"CHECKBOX", name:"Referral Asked?" },
          { type:"TEXT",     name:"Referred By" },
        ]}
        formulas={[
          { name:"Months as Client",  formula:'dateBetween(now(), prop("Client Since"), "months")' },
          { name:"LTV to Date",       formula:'prop("Monthly Value ($)") * max(prop("Months as Client"), 1)' },
          { name:"LTV Tier",          formula:'if(prop("Monthly Value ($)") >= 2000, "🏆 Platinum", if(prop("Monthly Value ($)") >= 1000, "🥇 Gold", if(prop("Monthly Value ($)") >= 500, "🥈 Silver", "Standard")))' },
        ]}
        views={[
          "🏆 Highest Value Trainers (LTV sorted)",
          "🔥 Most Active Trainers (multi-service)",
          "🎯 Upsell Opportunities (active clients with open upsell)",
          "📸 Snapshot-Only (upsell targets)",
          "📊 Multi-Service Clients",
          "❄️ Inactive — Re-engage",
          "📅 Outreach Queue",
          "💰 MRR by Trainer",
        ]}
      />

      <DB title="SNAPSHOT CLIENT SEGMENT" emoji="📸" color="#e879f9"
        properties={[
          { type:"RELATION", name:"→ Trainer Master DB" },
          { type:"SELECT",   name:"Package",           detail:"Snapshot Basic ($497) | Snapshot Pro ($797) | Snapshot Elite ($1,197)" },
          { type:"DATE",     name:"Shoot Date" },
          { type:"DATE",     name:"Delivery Date" },
          { type:"SELECT",   name:"Status",            detail:"Onboarding | Shoot Scheduled | Shot | Editing | In Review | Delivered | Complete" },
          { type:"FORMULA",  name:"Days Since Delivery" },
          { type:"FORMULA",  name:"Upsell Window Flag" },
          { type:"CHECKBOX", name:"Upsell Sent?" },
          { type:"SELECT",   name:"Upsell Target",     detail:"Short Form | YouTube | Podcast | Full Retainer | GHL | Ads" },
          { type:"CHECKBOX", name:"Testimonial Received?" },
        ]}
        formulas={[
          { name:"Days Since Delivery", formula:'dateBetween(now(), prop("Delivery Date"), "days")' },
          { name:"Upsell Window Flag",  formula:'if(and(prop("Days Since Delivery") >= 3, prop("Days Since Delivery") <= 14, prop("Upsell Sent?") == false), "🔴 UPSELL NOW", if(prop("Days Since Delivery") > 14 and prop("Upsell Sent?") == false, "🟡 Window Closing", ""))' },
        ]}
        views={["🔴 Upsell Window Open", "📅 Shoots This Week", "✅ Delivered — Needs Follow-Up"]}
      />

      <DB title="SHORT FORM CONTENT CLIENTS" emoji="📱" color="#e879f9"
        properties={[
          { type:"RELATION", name:"→ Trainer Master DB" },
          { type:"NUMBER",   name:"Monthly Value ($)" },
          { type:"NUMBER",   name:"Videos Per Month (committed)" },
          { type:"NUMBER",   name:"Videos Delivered (MTD)" },
          { type:"FORMULA",  name:"Delivery Rate %" },
          { type:"DATE",     name:"Next Shoot Date" },
          { type:"SELECT",   name:"Account Status",   detail:"Healthy | Needs Attention | At Risk | Paused" },
          { type:"TEXT",     name:"Performance Notes" },
        ]}
        formulas={[{ name:"Delivery Rate", formula:'round(prop("Videos Delivered (MTD)") / prop("Videos Per Month (committed)") * 100) & "%"' }]}
        views={["📋 All Short Form Clients", "🔴 Delivery Behind", "💰 By Monthly Value"]}
      />

      <DB title="PODCAST CLIENTS" emoji="🎙️" color="#e879f9"
        properties={[
          { type:"RELATION", name:"→ Trainer Master DB" },
          { type:"NUMBER",   name:"Monthly Value ($)" },
          { type:"NUMBER",   name:"Episodes Per Month" },
          { type:"NUMBER",   name:"Episodes Delivered (MTD)" },
          { type:"SELECT",   name:"Podcast Platform",  detail:"Spotify | Apple | Both | Custom RSS" },
          { type:"TEXT",     name:"Show Name" },
          { type:"TEXT",     name:"Podcast RSS / URL" },
          { type:"NUMBER",   name:"Avg Downloads (last ep)" },
          { type:"CHECKBOX", name:"Clips Repurposed via Opus?" },
        ]}
        views={["📋 All Podcast Clients", "📊 Downloads Performance", "♻️ Repurposing Queue"]}
      />

      <DB title="YOUTUBE CLIENTS" emoji="▶️" color="#e879f9"
        properties={[
          { type:"RELATION", name:"→ Trainer Master DB" },
          { type:"NUMBER",   name:"Monthly Value ($)" },
          { type:"NUMBER",   name:"Videos Per Month" },
          { type:"TEXT",     name:"YouTube Channel URL" },
          { type:"NUMBER",   name:"Subscribers" },
          { type:"NUMBER",   name:"Avg Views (last 30 days)" },
          { type:"DATE",     name:"Last Video Published" },
          { type:"CHECKBOX", name:"Shorts Being Repurposed?" },
          { type:"TEXT",     name:"Growth Notes" },
        ]}
        views={["📋 All YouTube Clients", "📊 Channel Performance", "📅 Publishing Schedule"]}
      />

      <DB title="ADS CLIENTS" emoji="📣" color="#e879f9"
        properties={[
          { type:"RELATION", name:"→ Trainer Master DB" },
          { type:"NUMBER",   name:"Monthly Mgmt Fee ($)" },
          { type:"NUMBER",   name:"Ad Spend Budget ($/mo)" },
          { type:"SELECT",   name:"Platform",           detail:"Meta (FB/IG) | Google | TikTok | YouTube | Multi-Platform" },
          { type:"NUMBER",   name:"Cost Per Lead ($)",  detail:"Current period" },
          { type:"NUMBER",   name:"Leads Generated (MTD)" },
          { type:"NUMBER",   name:"Conversions (MTD)" },
          { type:"FORMULA",  name:"ROAS",               detail:"Revenue from ads / Ad Spend" },
          { type:"SELECT",   name:"Campaign Status",    detail:"Active | Paused | Testing | Scaling" },
          { type:"TEXT",     name:"Campaign Link" },
        ]}
        formulas={[{ name:"ROAS", formula:'prop("Conversions (MTD)") * 197 / max(prop("Ad Spend Budget ($/mo)"), 1)' }]}
        views={["📊 All Ads Clients", "📈 Highest ROAS", "💰 By Ad Spend Volume"]}
      />

      <DB title="CONSULTING CLIENTS" emoji="💡" color="#e879f9"
        properties={[
          { type:"RELATION", name:"→ Trainer Master DB" },
          { type:"SELECT",   name:"Format",             detail:"Hourly | Monthly Retainer | One-Time Audit | Day Rate" },
          { type:"NUMBER",   name:"Rate ($)" },
          { type:"NUMBER",   name:"Hours Per Month" },
          { type:"TEXT",     name:"Focus Area",         detail:"Business strategy, content strategy, GHL, offer creation, etc." },
          { type:"DATE",     name:"Next Session Date" },
          { type:"TEXT",     name:"Session Notes Link" },
        ]}
        views={["📅 Upcoming Sessions", "💰 By Rate", "📋 All Consulting Clients"]}
      />

      <div style={{ background:"#0f0f0f", border:"1px solid #e879f933", borderRadius:10, padding:18 }}>
        <div style={{ color:"#e879f9", fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:2, marginBottom:14 }}>TRAINER ECOSYSTEM SEGMENTATION VIEWS</div>
        {[
          { view:"🏆 Highest Value Trainers", logic:"Master DB sorted by Monthly Value ($) DESC — these are the Platinum and Gold accounts deserving white-glove attention", trigger:"Monthly check-in, priority delivery, referral ask" },
          { view:"🔥 Most Active Trainers",   logic:"Master DB filtered: Active Services count ≥ 2 — these trainers are deep in the ecosystem", trigger:"Expansion offer, event invite, case study feature" },
          { view:"🎯 Upsell Opportunities",   logic:"Master DB filtered: Active Services = 1 AND Pipeline Stage = Active Client AND Upsell Opportunity ≠ None", trigger:"Targeted upsell campaign via GHL sequence" },
          { view:"📸 Snapshot-Only",          logic:"Snapshot Segment filtered: no Short Form, YouTube, Podcast, or Ads service active", trigger:"Priority upsell: Short Form Monthly at $997/mo" },
          { view:"💰 Multi-Service Clients",  logic:"Master DB filtered: Active Services count ≥ 3 — highest LTV segment", trigger:"Referral ask, annual contract offer, priority booking" },
        ].map((v,i)=>(
          <div key={i} style={{ background:"#141414", borderRadius:8, padding:"10px 13px", marginBottom:8 }}>
            <div style={{ color:"#e879f9", fontSize:12, fontWeight:600, marginBottom:4 }}>{v.view}</div>
            <div style={{ color:"#606060", fontSize:11, marginBottom:4 }}>{v.logic}</div>
            <div style={{ color:"#3a3a3a", fontSize:10 }}>Action: {v.trigger}</div>
          </div>
        ))}
      </div>
    </Sec>
  ),

  sales: () => (
    <Sec title="SALES COMMAND CENTER" icon="🎯" color="#818cf8">
      <DB title="LEAD DATABASE" emoji="🔍" color="#818cf8"
        properties={[
          { type:"TEXT",     name:"Full Name" },
          { type:"TEXT",     name:"Business Name" },
          { type:"EMAIL",    name:"Email" },
          { type:"PHONE",    name:"Phone" },
          { type:"SELECT",   name:"Niche",             detail:"Personal Trainer | Gym Owner | PT/Chiro | Med Spa | Real Estate | Automotive | Functional Med | Financial | Legal | Other" },
          { type:"SELECT",   name:"Lead Source",       detail:"Referral | Instagram | Cold Outreach | Studio Walk-In | Gym Network | Event | Partner | LinkedIn | GHL Funnel | SD Market DB" },
          { type:"SELECT",   name:"Pipeline Stage",    detail:"New Lead → Contacted → Call Scheduled → Call Completed → Proposal Sent → Negotiating → Closed Won → Closed Lost → Nurture" },
          { type:"DATE",     name:"Date Added" },
          { type:"DATE",     name:"Last Contact" },
          { type:"DATE",     name:"Next Follow-Up" },
          { type:"NUMBER",   name:"Estimated Deal Value ($)" },
          { type:"SELECT",   name:"Lead Temperature",  detail:"🔥 Hot | 🟡 Warm | ❄️ Cold" },
          { type:"SELECT",   name:"Services Interested In", detail:"Multi-select: all service types" },
          { type:"PERSON",   name:"Sales Owner",       detail:"Owner | Closer (future hire)" },
          { type:"RELATION", name:"→ Proposals" },
          { type:"RELATION", name:"→ Client Record (on close)" },
          { type:"RELATION", name:"→ SD Market DB",   detail:"If sourced from market intelligence" },
          { type:"RELATION", name:"→ Referral Log",   detail:"If referred by partner" },
          { type:"FORMULA",  name:"Days in Stage" },
          { type:"FORMULA",  name:"Follow-Up Urgency" },
          { type:"TEXT",     name:"Pain Points / Notes" },
          { type:"SELECT",   name:"Closed Lost Reason", detail:"Price | Timing | Competitor | No Decision | Budget | Not a Fit" },
        ]}
        formulas={[
          { name:"Days in Stage",      formula:'dateBetween(now(), prop("Last Contact"), "days")' },
          { name:"Follow-Up Urgency",  formula:'if(and(prop("Days in Stage") > 5, prop("Pipeline Stage") != "Closed Won", prop("Pipeline Stage") != "Closed Lost"), "🔴 Follow Up Now", if(prop("Days in Stage") > 3, "🟡 Soon", "🟢"))' },
        ]}
        views={["🔥 Hot Pipeline", "📅 Follow-Ups Due Today", "🗂 Kanban by Stage", "📊 By Niche", "📊 By Lead Source", "❌ Lost Deals (analysis)", "💰 Pipeline Value Summary"]}
      />

      <DB title="PROPOSAL DATABASE" emoji="📄" color="#818cf8"
        properties={[
          { type:"TEXT",     name:"Proposal Title" },
          { type:"RELATION", name:"→ Lead / Client" },
          { type:"DATE",     name:"Date Sent" },
          { type:"DATE",     name:"Expiry Date" },
          { type:"NUMBER",   name:"One-Time Value ($)" },
          { type:"NUMBER",   name:"Monthly Recurring ($)" },
          { type:"NUMBER",   name:"Close Probability %" },
          { type:"SELECT",   name:"Status",            detail:"Draft | Sent | Viewed | Accepted | Declined | Expired | Counter-Offered" },
          { type:"TEXT",     name:"Proposal Link" },
          { type:"CHECKBOX", name:"Contract Signed" },
          { type:"CHECKBOX", name:"Deposit Received" },
          { type:"FORMULA",  name:"Total Contract Value ($)" },
          { type:"FORMULA",  name:"Weighted Value ($)" },
          { type:"FORMULA",  name:"Days Since Sent" },
          { type:"FORMULA",  name:"Expiry Alert" },
          { type:"RELATION", name:"→ Proposal Pipeline Value DB (Financial)" },
        ]}
        formulas={[
          { name:"Total Contract Value", formula:'prop("One-Time Value ($)") + prop("Monthly Recurring ($)") * 12' },
          { name:"Weighted Value",       formula:'prop("Total Contract Value ($)") * prop("Close Probability %") / 100' },
          { name:"Days Since Sent",      formula:'dateBetween(now(), prop("Date Sent"), "days")' },
          { name:"Expiry Alert",         formula:'if(dateBetween(prop("Expiry Date"), now(), "days") <= 1 and prop("Status") == "Sent", "🔴 EXPIRES TODAY", "")' },
        ]}
        views={["⏳ Pending (Sent + Viewed)", "✅ Won This Month", "❌ Lost/Expired", "💰 Pipeline Value", "📊 Close Rate by Month"]}
      />

      <DB title="DISCOVERY CALL PIPELINE" emoji="📞" color="#818cf8"
        properties={[
          { type:"RELATION", name:"→ Lead" },
          { type:"DATE",     name:"Call Date & Time" },
          { type:"SELECT",   name:"Call Status",       detail:"Scheduled | Completed | No-Show | Rescheduled | Cancelled" },
          { type:"TEXT",     name:"Pain Points Captured" },
          { type:"TEXT",     name:"Budget Range" },
          { type:"SELECT",   name:"Fit Score",         detail:"⭐ Weak | ⭐⭐ Possible | ⭐⭐⭐ Strong | ⭐⭐⭐⭐ Ideal" },
          { type:"CHECKBOX", name:"Proposal Sent After Call" },
          { type:"DATE",     name:"Proposal Due",      detail:"Default: call date + 48 hrs" },
          { type:"TEXT",     name:"Recording Link" },
          { type:"CHECKBOX", name:"Added to GHL Sequence" },
        ]}
        views={["📅 Upcoming Calls", "✅ Completed — Awaiting Proposal", "❌ No-Shows (re-outreach)", "🏆 High Fit Score"]}
      />
    </Sec>
  ),

  clients: () => (
    <Sec title="CLIENT MANAGEMENT SYSTEM" icon="🤝" color="#38bdf8">
      <DB title="CLIENT DATABASE (Master)" emoji="👥" color="#38bdf8"
        properties={[
          { type:"TEXT",     name:"Client Name" },
          { type:"TEXT",     name:"Business Name" },
          { type:"SELECT",   name:"Client Type",       detail:"Retainer | Project-Based | Trainer Snapshot | Studio Member | One-Time | Partner" },
          { type:"SELECT",   name:"Niche",             detail:"All niche options" },
          { type:"EMAIL",    name:"Primary Email" },
          { type:"PHONE",    name:"Primary Phone" },
          { type:"DATE",     name:"Client Since" },
          { type:"SELECT",   name:"Status",            detail:"Active | Onboarding | Paused | Completed | At Risk | Churned" },
          { type:"NUMBER",   name:"Monthly Value ($)" },
          { type:"SELECT",   name:"Health Score",      detail:"🟢 Healthy | 🟡 Needs Attention | 🔴 At Risk" },
          { type:"DATE",     name:"Last Check-In Date" },
          { type:"DATE",     name:"Next Check-In Due" },
          { type:"SELECT",   name:"Services Active",   detail:"Multi-select" },
          { type:"RELATION", name:"→ Projects" },
          { type:"RELATION", name:"→ Deliverables" },
          { type:"RELATION", name:"→ Invoices (AR DB)" },
          { type:"RELATION", name:"→ MRR Tracker" },
          { type:"RELATION", name:"→ Client LTV DB" },
          { type:"TEXT",     name:"GHL Sub-Account ID" },
          { type:"CHECKBOX", name:"Contract Signed?" },
          { type:"CHECKBOX", name:"Onboarding Complete?" },
          { type:"FORMULA",  name:"Days Since Check-In" },
          { type:"FORMULA",  name:"Check-In Alert" },
        ]}
        formulas={[
          { name:"Days Since Check-In", formula:'dateBetween(now(), prop("Last Check-In Date"), "days")' },
          { name:"Check-In Alert",      formula:'if(prop("Days Since Check-In") > 14 and prop("Status") == "Active", "🔴 Check-In Overdue", if(prop("Days Since Check-In") > 10, "🟡 Soon", "🟢"))' },
        ]}
        views={["🔴 At-Risk Clients", "📅 Check-Ins Due This Week", "💰 By Monthly Value", "📊 By Niche", "✅ Onboarding Queue", "📈 All Active Clients"]}
      />

      <DB title="DELIVERABLES DATABASE" emoji="📦" color="#38bdf8"
        properties={[
          { type:"TEXT",     name:"Deliverable Name" },
          { type:"RELATION", name:"→ Client" },
          { type:"RELATION", name:"→ Project" },
          { type:"SELECT",   name:"Type",              detail:"Photo Set | Short Form Video | Reel | YouTube | Podcast | Thumbnail | Landing Page | Funnel | GHL Setup | Report | Brand Assets" },
          { type:"SELECT",   name:"Status",            detail:"Not Started | In Production | Editing | In Review | Revision Requested | Approved | Delivered | Archived" },
          { type:"DATE",     name:"Due Date" },
          { type:"DATE",     name:"Delivered Date" },
          { type:"PERSON",   name:"Assigned To",       detail:"Walter | Jaylen | Owner | Contractor" },
          { type:"NUMBER",   name:"Revision Count" },
          { type:"NUMBER",   name:"Max Revisions Allowed" },
          { type:"TEXT",     name:"Delivery Link" },
          { type:"CHECKBOX", name:"Client Approved?" },
          { type:"FORMULA",  name:"Overdue?" },
          { type:"FORMULA",  name:"Revision Overage?" },
        ]}
        formulas={[
          { name:"Overdue?",          formula:'if(and(dateBetween(now(), prop("Due Date"), "days") > 0, prop("Status") != "Delivered"), "🔴 OVERDUE", "")' },
          { name:"Revision Overage?", formula:'if(prop("Revision Count") > prop("Max Revisions Allowed"), "🔴 Over limit", "")' },
        ]}
        views={["🔴 Overdue", "📋 In Production", "⏳ Awaiting Approval", "📅 Due This Week", "✅ Delivered MTD", "👤 By Assignee"]}
      />
    </Sec>
  ),

  production: () => (
    <Sec title="PRODUCTION COMMAND CENTER" icon="🎬" color="#e879f9">
      <DB title="SHOOTS DATABASE" emoji="📷" color="#e879f9"
        properties={[
          { type:"TEXT",     name:"Shoot Name" },
          { type:"RELATION", name:"→ Client" },
          { type:"SELECT",   name:"Shoot Type",        detail:"Trainer Snapshot | Brand Shoot | YouTube | Podcast | Testimonial | Corporate | Event | Product | Real Estate | Studio Rental" },
          { type:"DATE",     name:"Shoot Date" },
          { type:"TIME",     name:"Call Time" },
          { type:"TEXT",     name:"Location" },
          { type:"PERSON",   name:"Primary Shooter",   detail:"Jaylen | Owner | Contractor" },
          { type:"PERSON",   name:"Second Shooter" },
          { type:"SELECT",   name:"Status",            detail:"Scheduled | Prep | Active | Wrapped | Raw Upload | Editing | Delivered | Archived" },
          { type:"CHECKBOX", name:"Shot List Prepared?" },
          { type:"CHECKBOX", name:"Equipment Prepped?" },
          { type:"CHECKBOX", name:"Raw Files Uploaded?" },
          { type:"TEXT",     name:"Raw Files Folder Link" },
          { type:"FORMULA",  name:"Editing Due Date",  detail:"Shoot Date + 3 days" },
          { type:"FORMULA",  name:"Upload Alert" },
        ]}
        formulas={[
          { name:"Editing Due Date", formula:'dateAdd(prop("Shoot Date"), 3, "days")' },
          { name:"Upload Alert",     formula:'if(prop("Raw Files Uploaded?") == false and prop("Status") == "Wrapped", "🔴 UPLOAD RAW FILES", "")' },
        ]}
        views={["📅 Upcoming Calendar", "📸 This Week", "🔴 Files Not Uploaded", "✅ Wrapped — Awaiting Edit", "🗂 By Type"]}
      />

      <DB title="EDITING DATABASE" emoji="✂️" color="#e879f9"
        properties={[
          { type:"TEXT",     name:"Edit Name" },
          { type:"RELATION", name:"→ Shoot" },
          { type:"RELATION", name:"→ Client" },
          { type:"RELATION", name:"→ Deliverable" },
          { type:"SELECT",   name:"Content Type",      detail:"Short Form | Reel | YouTube | Podcast | Thumbnail | Photo Edit | BTS | Ad | Talking Head" },
          { type:"PERSON",   name:"Editor Assigned",   detail:"Walter | Jaylen | Contractor" },
          { type:"SELECT",   name:"Edit Status",       detail:"Queued | In Progress | First Cut Done | In Review | Revision | Final Cut | Exported | Delivered" },
          { type:"DATE",     name:"First Cut Due" },
          { type:"DATE",     name:"Final Due Date" },
          { type:"NUMBER",   name:"Estimated Hours" },
          { type:"NUMBER",   name:"Actual Hours" },
          { type:"NUMBER",   name:"Revision Round" },
          { type:"TEXT",     name:"Frame.io Review Link" },
          { type:"TEXT",     name:"Premiere Pro Project Link" },
          { type:"FORMULA",  name:"Overdue?" },
          { type:"FORMULA",  name:"Hours Variance" },
        ]}
        formulas={[
          { name:"Overdue?",       formula:'if(and(dateBetween(now(), prop("Final Due Date"), "days") > 0, prop("Edit Status") != "Delivered"), "🔴 OVERDUE", "")' },
          { name:"Hours Variance", formula:'prop("Actual Hours") - prop("Estimated Hours")' },
        ]}
        views={[
          "🎬 Active Edits (all in progress)",
          "📋 Walter's Queue (filtered: Assigned=Walter)",
          "📋 Jaylen's Queue (filtered: Assigned=Jaylen)",
          "🔴 Overdue Edits",
          "⏳ Awaiting Review",
          "✅ Delivered This Week",
          "📊 Hours by Editor",
        ]}
      />
    </Sec>
  ),

  content: () => (
    <Sec title="CONTENT OPERATING SYSTEM" icon="📱" color="#f97316">
      <FlowDiagram color="#f97316" steps={["💡 Idea","📋 Planning","🎬 Shoot","⬆️ Upload","✂️ Edit","👁 Review","🔄 Revisions","✅ Approval","📤 Delivery","♻️ Repurposing","🗄 Archive"]} />

      <DB title="CONTENT PIPELINE DATABASE" emoji="🗺" color="#f97316"
        properties={[
          { type:"TEXT",     name:"Content Title / Hook" },
          { type:"RELATION", name:"→ Client" },
          { type:"SELECT",   name:"Stage",             detail:"Idea → Scripted → Shoot Scheduled → Shot → Editing → Review → Revision → Approved → Scheduled → Published → Repurposing → Archived" },
          { type:"SELECT",   name:"Format",            detail:"Short Form | Reel | YouTube | Podcast | Photo Set | Blog | Ad | Email | Story" },
          { type:"SELECT",   name:"Platform",          detail:"Instagram | TikTok | YouTube | LinkedIn | Podcast | Email | Website | Multi" },
          { type:"SELECT",   name:"Content Pillar",    detail:"Education | Results/Proof | BTS | Authority | Entertainment | Promo | Community" },
          { type:"DATE",     name:"Target Publish Date" },
          { type:"DATE",     name:"Published Date" },
          { type:"PERSON",   name:"Editor",            detail:"Walter | Jaylen" },
          { type:"TEXT",     name:"Script / Outline Link" },
          { type:"TEXT",     name:"Published URL" },
          { type:"CHECKBOX", name:"Repurposed?" },
          { type:"NUMBER",   name:"Repurpose Pieces Generated" },
        ]}
        views={["🗂 Kanban by Stage", "📅 Publishing Calendar", "♻️ Repurposing Queue", "📊 Volume by Client", "🔴 Overdue"]}
      />

      <DB title="REPURPOSING TRACKER" emoji="♻️" color="#f97316"
        properties={[
          { type:"RELATION", name:"→ Source Content" },
          { type:"RELATION", name:"→ Client" },
          { type:"SELECT",   name:"Source Type",       detail:"YouTube | Podcast | Brand Shoot | Interview | Testimonial" },
          { type:"SELECT",   name:"Output Type",       detail:"Short Form Clip | Audiogram | Quote Graphic | Blog Segment | Email | Story | LinkedIn Post | YouTube Short" },
          { type:"SELECT",   name:"Platform",          detail:"Instagram | TikTok | YouTube Shorts | LinkedIn | Facebook | Email | Podcast" },
          { type:"SELECT",   name:"Status",            detail:"Queued | In Production | Scheduled | Published" },
          { type:"DATE",     name:"Scheduled Date" },
          { type:"TEXT",     name:"File Link" },
          { type:"PERSON",   name:"Assigned To",       detail:"Walter | Jaylen" },
        ]}
        notes="Repurposing yield target: every YouTube or Podcast = minimum 5 derivative assets. Track yield ratio per client to identify production efficiency opportunities."
        views={["📅 Publishing Schedule", "♻️ Queue by Source", "📊 Yield by Client"]}
      />
    </Sec>
  ),

  team: () => (
    <Sec title="TEAM DASHBOARDS" icon="👤" color="#38bdf8">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        Three distinct Notion dashboards — one per team member. Each is a filtered view of the master databases. Owner can see everything. Walter and Jaylen see only their assigned work. All three dashboards update live with no manual input.
      </p>

      {[
        {
          name:"OWNER DASHBOARD", color:"#f97316", emoji:"👑",
          desc:"Full access to all systems. Strategic view, not operational. The CEO Scorecard IS the Owner Dashboard morning view. Supplemental views below.",
          sections:[
            "CEO Scorecard (home page — all rollups)",
            "Open Deals Pipeline — linked Lead DB filtered: Active stages",
            "Client Health Monitor — Client DB filtered: At Risk or Check-In Overdue",
            "Financial Snapshot — Monthly Revenue DB + MRR Tracker + AR Dashboard",
            "Overdue Anything — union view: overdue deliverables + edits + invoices",
            "Top Revenue Opportunities — SD Market DB filtered: Opp Score ≥ 7",
            "Trainer Upsell Board — Trainer Ecosystem filtered: Upsell Window Open",
            "Weekly Priorities — Task DB filtered: Due this week, CEO Review Required",
          ],
        },
        {
          name:"WALTER DASHBOARD", color:"#818cf8", emoji:"✂️",
          desc:"Walter's primary working view. Shows his edit queue, revision requests, upcoming shoots requiring editing, and delivery status. Walter should never need to leave this page during a work session.",
          sections:[
            "My Edit Queue — Editing DB filtered: Assigned=Walter, Status=Queued | In Progress | Revision. Sorted: Due Date ASC",
            "In Review — Editing DB filtered: Assigned=Walter, Status=In Review (waiting client feedback)",
            "First Cuts Due Today — Editing DB filtered: Assigned=Walter, First Cut Due=Today",
            "Overdue — Editing DB filtered: Assigned=Walter, Overdue formula ≠ empty. Pinned at top.",
            "Recent Deliveries — Editing DB filtered: Assigned=Walter, Delivered this week",
            "Repurposing Queue — Repurposing Tracker filtered: Assigned=Walter",
            "This Week's Shoots (needing Walter's attention after wrap)",
            "Client Notes — Deliverables DB filtered: Assigned=Walter, Client Feedback ≠ empty",
          ],
        },
        {
          name:"JAYLEN DASHBOARD", color:"#4ade80", emoji:"📷",
          desc:"Jaylen's operational hub. Shoot schedule, gear checklists, raw file upload status, and any editing tasks assigned. Jaylen starts every day here.",
          sections:[
            "My Shoots This Week — Shoots DB filtered: Assigned=Jaylen, Date=this week. Default: Calendar View",
            "Upcoming Shoots (14 days) — Shoots DB filtered: Assigned=Jaylen, Date within 14 days",
            "Shot Lists Due — Shoots DB filtered: Assigned=Jaylen, Shot List Prepared=false, Date within 7 days",
            "Raw Files to Upload — Shoots DB filtered: Assigned=Jaylen, Status=Wrapped, Upload=false. Priority: most recent first",
            "My Edit Queue — Editing DB filtered: Assigned=Jaylen (short form, selects, assists)",
            "Equipment Needed — Shoots DB filtered: Jaylen, equipment notes populated",
            "Completed This Week — Shoots DB filtered: Jaylen, Status=Wrapped/Archived, this week",
            "Direct Comms — Communication Log filtered: Jaylen mentioned or assigned",
          ],
        },
      ].map((dash,i)=>(
        <div key={i} style={{ background:"#0f0f0f", border:`1px solid ${dash.color}33`, borderRadius:12, marginBottom:20, overflow:"hidden" }}>
          <div style={{ background:`${dash.color}15`, borderBottom:`1px solid ${dash.color}33`, padding:"13px 20px", display:"flex", gap:10, alignItems:"center" }}>
            <span style={{ fontSize:18 }}>{dash.emoji}</span>
            <span style={{ color:dash.color, fontFamily:"'Bebas Neue',sans-serif", fontSize:17, letterSpacing:2 }}>{dash.name}</span>
          </div>
          <div style={{ padding:"14px 20px" }}>
            <div style={{ color:"#606060", fontSize:12, lineHeight:1.6, marginBottom:12 }}>{dash.desc}</div>
            <div style={{ display:"grid", gap:5 }}>
              {dash.sections.map((s,si)=>(
                <div key={si} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                  <span style={{ color:dash.color, fontSize:9, marginTop:4 }}>▸</span>
                  <span style={{ color:"#909090", fontSize:12 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </Sec>
  ),

  sop: () => (
    <Sec title="SOP LIBRARY" icon="📋" color="#facc15">
      {[
        { dept:"🎯 SALES", color:"#818cf8", sops:[
          { name:"Discovery Call Framework", steps:["Open with rapport question (30s)","Diagnose: 3 pain point questions","Present transformation, not service","Propose next step — not price yet","Send follow-up within 2 hrs via GHL template"] },
          { name:"Proposal Creation SOP", steps:["Pull pain points from Discovery Notes","Select services from Service Library","Build pricing from Pricing Library — never show floors","Create in PandaDoc using template","Send via GHL with 7-day expiry + auto-follow-up sequence"] },
          { name:"Follow-Up Sequence (6-touch)", steps:["Day 1: Proposal sent — GHL auto-email","Day 2: Personal text or DM","Day 4: Value-add — relevant case study or social proof","Day 7: Deadline reminder (expiry imminent)","Day 10: 'Is this still a priority?' reframe","Day 14: Move to 60-day Nurture Sequence if no response"] },
        ]},
        { dept:"🎬 PRODUCTION", color:"#e879f9", sops:[
          { name:"Shoot Day SOP", steps:["24-hr prior: Confirm client, review shot list, charge all gear","Morning of: Pack using Master Equipment Checklist in Notion","On location: B-roll first, interview/talking head second","Wrap: Verify card count, begin Dropbox backup before leaving location","Post-shoot: Update Shoots DB status, comment Jaylen → Walter in Notion with folder link"] },
          { name:"File Naming & Folder Structure SOP", steps:["RAW: /ClientName/YYYY-MM-DD/[ShootType]/RAW/","EDITED: /ClientName/YYYY-MM-DD/[ShootType]/EDITED/","DELIVERED: /ClientName/DELIVERED/YYYY-MM/","ARCHIVE: /ARCHIVE/ClientName/ (after 90 days)","File naming: ClientName_ContentType_YYYYMMDD_v1.ext"] },
        ]},
        { dept:"✂️ EDITING — WALTER & JAYLEN", color:"#4ade80", sops:[
          { name:"Short Form Edit SOP", steps:["Import into Premiere short-form template sequence (1080×1920)","Hook cut in first 3 seconds — no slow intros","Auto-captions — correct manually before export","Color: apply client preset LUT","Music: Envato Elements, match energy","Export: H.264, 1080×1920, 30fps","Upload to Frame.io with naming convention, tag client for review"] },
          { name:"YouTube Edit SOP", steps:["New sequence from 16:9 YouTube template","30-second hook: problem + promise","Chapter markers every 3–5 minutes","B-roll cutaway every 30–45 seconds of talking head","End screen template at −20 seconds","Mark thumbnail source frame","Export: H.264 1080p or 4K, YouTube preset, then upload"] },
          { name:"Podcast Edit SOP", steps:["Remove silence using Adobe's speech-to-text or auto editor","Noise reduction pass all tracks","Level match: −16 LUFS host, −18 LUFS guest","Apply approved intro/outro music","Export: AAC 320kbps stereo","Populate show notes template","Upload to client hosting platform with full metadata"] },
        ]},
        { dept:"🔧 GHL OPERATIONS", color:"#38bdf8", sops:[
          { name:"New Sub-Account Setup SOP", steps:["Clone from DGM Fitness Client template snapshot","Update: business name, logo, brand colors, domain","Activate default workflows: lead capture, follow-up, appointment booking","Test opt-in form and webhook trigger","Configure pipeline stages to match client's sales process","Add team member access, set permissions","Log sub-account ID in Client DB → GHL field"] },
        ]},
        { dept:"🤝 ONBOARDING", color:"#facc15", sops:[
          { name:"New Client Full Onboarding SOP", steps:["Day 0: Contract signed + deposit → GHL automation triggered","Day 0: Create Client record in Notion, link all related DBs","Day 1: Welcome email + Onboarding Questionnaire (GHL form) auto-sent","Day 2: Book onboarding call via Calendly link in GHL email","Day 3: Dropbox folder created and shared with client","Day 3–5 (if applicable): GHL sub-account cloned and configured","Day 5: Onboarding call: goals, brand guide, content preferences, shoot dates","Day 7: First shoot or first deliverable initiated","Day 14: First check-in — satisfaction survey sent via GHL automation","Day 30: Month-1 report generated and sent"] },
        ]},
      ].map((dept,di)=>(
        <div key={di} style={{ marginBottom:22 }}>
          <div style={{ color:dept.color, fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:2, marginBottom:10 }}>{dept.dept}</div>
          {dept.sops.map((sop,si)=>(
            <div key={si} style={{ background:"#0f0f0f", border:`1px solid ${dept.color}22`, borderRadius:10, marginBottom:8, overflow:"hidden" }}>
              <div style={{ background:`${dept.color}12`, borderBottom:`1px solid ${dept.color}22`, padding:"9px 15px" }}>
                <span style={{ color:"#f0f0f0", fontSize:12, fontWeight:600 }}>{sop.name}</span>
              </div>
              <div style={{ padding:"10px 15px" }}>
                {sop.steps.map((step,sti)=>(
                  <div key={sti} style={{ display:"flex", gap:9, marginBottom:5 }}>
                    <span style={{ color:dept.color, fontFamily:"monospace", fontSize:10, marginTop:2, minWidth:18 }}>{String(sti+1).padStart(2,"0")}</span>
                    <span style={{ color:"#909090", fontSize:12, lineHeight:1.5 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </Sec>
  ),

  knowledge: () => (
    <Sec title="KNOWLEDGE BASE" icon="🧠" color="#facc15">
      <DB title="SERVICE LIBRARY" emoji="🛠" color="#facc15"
        properties={[
          { type:"TEXT",    name:"Service Name" },
          { type:"SELECT",  name:"Category",          detail:"Photo | Video | Podcast | YouTube | Short Form | CRM | Lead Gen | Funnel | Consulting | Brand | Studio" },
          { type:"SELECT",  name:"Delivery Model",    detail:"One-Time | Monthly Retainer | Per-Project | Day Rate | Hourly" },
          { type:"NUMBER",  name:"Base Price ($)" },
          { type:"NUMBER",  name:"Minimum Accepted ($)" },
          { type:"NUMBER",  name:"Estimated Shoot Hours" },
          { type:"NUMBER",  name:"Estimated Edit Hours (Walter)" },
          { type:"NUMBER",  name:"Estimated Edit Hours (Jaylen)" },
          { type:"FORMULA", name:"Total Labor Hours" },
          { type:"FORMULA", name:"Implied Hourly Rate ($)" },
          { type:"TEXT",    name:"Deliverables Included" },
          { type:"TEXT",    name:"Not Included" },
          { type:"NUMBER",  name:"Max Revisions" },
          { type:"TEXT",    name:"Ideal Client Type" },
          { type:"TEXT",    name:"Upsell Path" },
          { type:"TEXT",    name:"Positioning Statement" },
        ]}
        formulas={[
          { name:"Total Labor Hours",    formula:'prop("Estimated Shoot Hours") + prop("Estimated Edit Hours (Walter)") + prop("Estimated Edit Hours (Jaylen)")' },
          { name:"Implied Hourly Rate",  formula:'round(prop("Base Price ($)") / max(prop("Total Labor Hours"), 1))' },
        ]}
      />

      <div style={{ background:"#0f0f0f", border:"1px solid #facc1533", borderRadius:10, padding:18, marginBottom:20 }}>
        <div style={{ color:"#facc15", fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:2, marginBottom:14 }}>MASTER PRICING REFERENCE</div>
        {[
          ["Trainer Snapshot Basic",       "$497",          "—",        "30-min, 10 photos, 1 video"],
          ["Trainer Snapshot Pro",         "$797",          "—",        "60-min, 25 photos, 3 videos, 1 reel"],
          ["Trainer Snapshot Elite",       "$1,197",        "—",        "90-min, 40 photos, 5 videos, 2 reels, 30-day plan"],
          ["Short Form Monthly",           "$997/mo",       "$997",     "8 videos/month, 2 shoots, captions, strategy"],
          ["YouTube Growth",               "$1,497/mo",     "$1,497",   "2 videos/month, thumbnails, SEO, 4 repurposed shorts"],
          ["Podcast Production",           "$797/mo",       "$797",     "4 eps/month, full production, show notes, 3 clips each"],
          ["Content Authority Retainer",   "$2,497/mo",     "$2,497",   "YouTube + Short Form + Podcast + strategy"],
          ["GHL Full Setup",               "$1,997",        "—",        "Sub-account, pipeline, 10 workflows, training"],
          ["GHL + Lead Gen Mgmt",          "$1,497/mo",     "$1,497",   "Active GHL management, lead gen, monthly report"],
          ["GHL White-Label (SaaS)",       "$297–497/mo",   "$297–497","Resell sub-account — $97 cost, $200–400 margin"],
          ["Brand Identity Package",       "$2,997",        "—",        "Guide, logo, colors, fonts, templates"],
          ["Full Brand + Content Launch",  "$4,997",        "—",        "Complete brand + 3-month content kickstart"],
          ["Studio Membership — Creator",  "$297/mo",       "$297",     "2 sessions/mo, raw files"],
          ["Studio Membership — Pro",      "$497/mo",       "$497",     "4 sessions/mo, raw + 1 edit"],
          ["Studio Membership — Authority","$797/mo",       "$797",     "6 sessions/mo + editing + strategy call"],
          ["Studio Half-Day Rental",       "$397",          "—",        "4 hrs, no team"],
          ["Studio Full-Day Rental",       "$697",          "—",        "8 hrs, no team"],
          ["Corporate Shoot Day",          "$997–$1,997",   "—",        "Full team, multiple setups"],
          ["Marketing Consulting",         "$297/hr",       "—",        "Strategy, audits, systems review"],
        ].map((p,i)=>(
          <div key={i} style={{ display:"grid", gridTemplateColumns:"240px 130px 100px 1fr", gap:12, padding:"7px 0", borderBottom:i<18?"1px solid #141414":"none" }}>
            <span style={{ color:"#d0d0d0", fontSize:12 }}>{p[0]}</span>
            <span style={{ color:"#facc15", fontSize:12, fontWeight:600 }}>{p[1]}</span>
            <span style={{ color:"#4ade80", fontSize:11 }}>{p[2]!=="—"?p[2]:""}</span>
            <span style={{ color:"#505050", fontSize:11 }}>{p[3]}</span>
          </div>
        ))}
      </div>
    </Sec>
  ),

  kpi: () => (
    <Sec title="KPI DASHBOARD" icon="📊" color="#4ade80">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        12 primary KPIs reviewed weekly. All sourced from live databases. Updated in KPI DB by owner each Monday. Auto-flagged for status using formula-based threshold logic.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:10, marginBottom:22 }}>
        {[
          { label:"MRR",                    target:"$15K → $30K/mo",   formula:"Sum: MRR Tracker Active",                          color:"#4ade80" },
          { label:"Total Monthly Revenue",  target:"$20K → $50K/mo",   formula:"MRR + Projects + Studio + Events",                 color:"#4ade80" },
          { label:"Active Retainers",       target:"8 → 20 clients",   formula:"Count: Client DB Active Retainers",                color:"#38bdf8" },
          { label:"Trainer Snapshots/Month",target:"4 → 15/month",     formula:"Count: Snapshot DB this month",                   color:"#e879f9" },
          { label:"New Leads (MTD)",        target:"15 → 40/month",    formula:"Count: Lead DB Date Added = this month",           color:"#818cf8" },
          { label:"Sales Close Rate",       target:"30% → 45%",        formula:"Closed Won / Proposals Sent × 100 (90 days)",     color:"#818cf8" },
          { label:"Client Retention Rate",  target:"85%+ monthly",     formula:"Active End / Active Start of Month × 100",        color:"#facc15" },
          { label:"Pieces Delivered (MTD)", target:"40 → 120+/month",  formula:"Count: Deliverables DB Delivered this month",     color:"#f97316" },
          { label:"Avg Revenue per Client", target:"$1,500 → $2,500",  formula:"Total MRR / Active Retainer Count",               color:"#4ade80" },
          { label:"Outstanding AR ($)",     target:"<$5,000 always",   formula:"Sum: Invoice DB Unpaid/Overdue",                  color:"#ef4444" },
          { label:"Studio Utilization %",   target:"40% → 70%",        formula:"Booked Hours / Available Hours × 100",           color:"#f97316" },
          { label:"Owner Ops Hours/Week",   target:"<20 → <10 hrs",    formula:"Manual time log — reduction = systems working",   color:"#facc15" },
        ].map((k,i)=>(
          <div key={i} style={{ background:"#0f0f0f", border:`1px solid ${k.color}33`, borderRadius:10, padding:"13px 15px" }}>
            <div style={{ color:"#3a3a3a", fontSize:9, letterSpacing:2, marginBottom:5, fontFamily:"monospace" }}>KPI</div>
            <div style={{ color:"#f0f0f0", fontSize:13, fontWeight:600, marginBottom:4 }}>{k.label}</div>
            <div style={{ color:k.color, fontSize:12, fontFamily:"monospace", marginBottom:5 }}>{k.target}</div>
            <div style={{ color:"#303030", fontSize:10, fontFamily:"monospace" }}>{k.formula}</div>
          </div>
        ))}
      </div>

      <div style={{ background:"#0f0f0f", border:"1px solid #4ade8033", borderRadius:10, padding:18 }}>
        <div style={{ color:"#4ade80", fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:2, marginBottom:14 }}>REVENUE GROWTH MILESTONES</div>
        {[
          { phase:"Phase 1 (Mo 1–3)",  mrr:"$10K MRR",  total:"$15K/mo", trigger:"5 retainers + 8 snapshots/month. Sales closer hired." },
          { phase:"Phase 2 (Mo 4–6)",  mrr:"$18K MRR",  total:"$25K/mo", trigger:"12 retainers + studio membership live. GHL white-label active." },
          { phase:"Phase 3 (Mo 7–9)",  mrr:"$25K MRR",  total:"$35K/mo", trigger:"18 retainers + med spa clients. Owner exits production." },
          { phase:"Phase 4 (Mo 10–12)",mrr:"$35K+ MRR", total:"$50K+/mo",trigger:"Full team operational. Events monthly. Digital products layered." },
        ].map((m,i)=>(
          <div key={i} style={{ display:"grid", gridTemplateColumns:"160px 120px 140px 1fr", gap:16, padding:"9px 0", borderBottom:i<3?"1px solid #141414":"none" }}>
            <span style={{ color:"#4ade80", fontSize:12 }}>{m.phase}</span>
            <span style={{ color:"#f0f0f0", fontSize:13, fontWeight:600 }}>{m.mrr}</span>
            <span style={{ color:"#909090", fontSize:12 }}>{m.total}</span>
            <span style={{ color:"#505050", fontSize:11 }}>{m.trigger}</span>
          </div>
        ))}
      </div>
    </Sec>
  ),

  revenue: () => (
    <Sec title="REVENUE OPPORTUNITIES DATABASE" icon="💰" color="#facc15">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        Ranked by composite score. Dot rating: 5 = highest.
      </p>
      <RevenueOpp rank={1} color="#f97316" title="Trainer Snapshot Volume Model" type="SERVICE" ease={5} profit={4} scale={5} time={5} details="Production-line snapshot system with 80 trainers across two locations. $5K–$15K/month with minimal overhead at scale. Junior shooter + sales closer = fully delegated. Gateway to all upsells. Fastest path to $30K/month." />
      <RevenueOpp rank={2} color="#4ade80" title="GHL White-Label SaaS Revenue" type="SAAS" ease={4} profit={5} scale={5} time={4} details="Resell GHL sub-accounts at $297–$497/month. Cost: $97/account. Margin: $200–$400/account. 20 clients = $4K–$8K near-passive MRR. Every active content client should have a GHL sub-account. This is the highest-margin line in the business." />
      <RevenueOpp rank={3} color="#818cf8" title="Studio Content Membership" type="MEMBERSHIP" ease={4} profit={5} scale={5} time={3} details="$297–$797/month. 3 tiers. Cap at 25 members = $7,500–$20,000 MRR. Near-zero marginal cost after setup. Cross-sell to every trainer in the gym. Members become agency clients at 3× the close rate of cold leads." />
      <RevenueOpp rank={4} color="#38bdf8" title="Med Spa & Functional Medicine Authority Packages" type="HIGH-TICKET" ease={3} profit={5} scale={3} time={3} details="La Jolla, Del Mar, Encinitas med spas are $2,500–$4,000/month accounts. They need brand authority, short form, and patient lead gen. 5 clients = $12,500–$20,000 MRR. Warm intro path: gym owner → referring physician → med spa owner." />
      <RevenueOpp rank={5} color="#e879f9" title="Monthly Studio Networking Events" type="EVENT" ease={4} profit={3} scale={4} time={3} details="$47–$97 tickets. 30–50 attendees. $1,500–$4,500/event + sponsorships. Direct pipeline for snapshot and retainer leads. Execute month 2. Each event generates 5–15 qualified leads. Anchor DGM as a Del Mar business institution." />
      <RevenueOpp rank={6} color="#facc15" title="Real Estate Content Packages" type="SERVICE" ease={3} profit={4} scale={4} time={3} details="Del Mar, Rancho Santa Fe, La Jolla realtors are high earners who need personal brand content. $1,500–$2,500/month retainers. 10 clients = $15K–$25K MRR. Warm intro path via gym trainer → realtor client relationships." />
      <RevenueOpp rank={7} color="#f97316" title="YouTube Authority Channel Management" type="SERVICE" ease={3} profit={4} scale={4} time={3} details="$1,497–$2,497/month. Fully managed YouTube for health professionals, med spas, attorneys. Scripting, production, SEO, thumbnails, shorts repurposing. Authority-building for trust-based businesses." />
      <RevenueOpp rank={8} color="#4ade80" title="Digital Course — Fitness Brand Content System" type="DIGITAL" ease={3} profit={4} scale={5} time={2} details="$497–$997 course for trainers who can't afford full service. Content strategy, Notion planning, GHL basics, Opus Clip. Sell via GHL funnel. Once built: passive income stream. Launch to existing 80-trainer network first." />
      <RevenueOpp rank={9} color="#818cf8" title="Studio Rental (Peerspace + Direct)" type="ASSET" ease={5} profit={3} scale={3} time={5} details="$197–$397/half day. 8–10 rentals/month = $1,600–$4,000/month from an asset already paid for. List on Peerspace. Zero extra labor. Fills unused studio time between bookings." />
      <RevenueOpp rank={10} color="#38bdf8" title="Corporate Wellness Content Partnerships" type="PARTNERSHIP" ease={2} profit={5} scale={3} time={2} details="Sorrento Valley and Carmel Valley tech companies need employee wellness content. $10K–$50K annual contracts. HR-level sale. Requires referral partner in wellness space. High complexity, high reward — build for Year 2." />
    </Sec>
  ),

  plan90: () => (
    <Sec title="90-DAY IMPLEMENTATION PLAN" icon="🗓" color="#818cf8">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        Revised plan integrating all new systems. Implementation order: Foundation first, Revenue second, Scale third. Do not build automation before the underlying databases are clean and accurate.
      </p>

      <PlanBlock phase="PHASE 1 — FOUNDATION" days="Days 1–30" color="#f97316" weeks={[
        { week:"WEEK 1 — Days 1–7", actions:[
          "Build full Notion workspace: all databases from this blueprint with exact properties",
          "CEO Scorecard built as home page — all rollup views configured",
          "Migrate all current clients into Client DB, MRR Tracker, and LTV DB",
          "Migrate all active leads into Lead DB with pipeline stages current",
          "Financial Command Center setup: Monthly Revenue DB, MRR Tracker, AR/Invoice DB",
          "Build SD Market Intelligence DB: enter initial 50 highest-priority targets",
          "Establish Dropbox folder structure and brief Walter and Jaylen on File Naming SOP",
        ], milestone:"Notion live. Data migrated. True MRR baseline and AR snapshot documented." },
        { week:"WEEK 2 — Days 8–14", actions:[
          "Production Command Center live: Shoots, Editing DBs configured",
          "Walter Dashboard configured: edit queue, revision queue, delivery views",
          "Jaylen Dashboard configured: shoot calendar, upload checklist, edit assignments",
          "Trainer Master DB built: enter all 80 trainers from both locations",
          "Studio Monetization Division DB built: Bookings, Membership, Events databases",
          "Write first 5 SOPs: Shoot Day, File Naming, Short Form Edit, Discovery Call, Onboarding",
          "Set up GHL onboarding automation — test trigger on 'Contract Signed' tag",
        ], milestone:"Team dashboards operational. Trainer ecosystem seeded. Studio DB live." },
        { week:"WEEK 3 — Days 15–21", actions:[
          "Trainer Outreach: 10 DMs/day using outreach prompt from Knowledge Base",
          "Launch first 3 Trainer Snapshots — test full production workflow end-to-end",
          "Referral Partner Division DB built: enter all known existing referral relationships",
          "Service Library and Pricing Library complete in Knowledge Base",
          "AR tracking: all unpaid invoices entered in Invoice DB — collect outstanding amount",
          "GHL: set up Studio Membership opt-in page and booking automation",
          "Conduct discovery calls for any warm leads in pipeline — target 3 proposals this week",
        ], milestone:"Trainer outreach machine running. Referral system live. First snapshots delivered." },
        { week:"WEEK 4 — Days 22–30", actions:[
          "Review all systems: fix gaps, update SOPs based on real usage",
          "Complete client check-ins: update Health Scores and Next Check-In dates for all active clients",
          "Identify 2 upsell opportunities from existing clients — build proposals",
          "Book and deliver 5+ Trainer Snapshots",
          "Financial review: run first monthly P&L using Monthly Revenue DB",
          "Set Month 2 KPI targets in KPI DB",
          "Begin planning Month 2 Studio Networking Event",
        ], milestone:"Phase 1 complete. All systems live. 5–8 Snapshots delivered. P&L baseline established." },
      ]} />

      <PlanBlock phase="PHASE 2 — GROWTH SYSTEMS" days="Days 31–60" color="#818cf8" weeks={[
        { week:"WEEK 5–6 — Days 31–45", actions:[
          "Scale Trainer Outreach to 15–20 DMs/day (split: Walter supports content, Jaylen supports outreach logistics)",
          "Hire part-time sales closer — train on Trainer Snapshot pitch, give access to Trainer Dashboard only",
          "Launch Studio Membership: soft-offer to 10 existing gym contacts first",
          "Pitch GHL white-label setup to 3–5 existing content clients",
          "SD Market DB: add 50 more targets, begin warm outreach via gym network introductions",
          "Revenue Forecast DB: build first 3-month forecast, track accuracy",
          "Project Profitability DB: populate retroactively for last 90 days — identify any loss-leaders",
        ], milestone:"Sales closer onboarded. Studio membership soft-launched. GHL upsells in pipeline." },
        { week:"WEEK 7–8 — Days 46–60", actions:[
          "Execute first Monthly Studio Networking Event — target 30+ attendees, $1,500+ revenue",
          "Post event content same-day: 3 reels, photos, stories — Walter edits day-of",
          "Follow up every attendee via GHL within 24 hrs — automated sequence",
          "Referral Partner outreach: formally establish partnerships with top 5 SD market contacts",
          "Build Authority Package for med spa / functional medicine — finalize pricing and proposal template",
          "Begin outreach to 5 La Jolla / Del Mar med spa targets via warm intro path",
          "Implement weekly 30-min KPI review every Monday — CEO scorecard as primary input",
        ], milestone:"First event executed. Med spa pipeline started. GHL upsells in progress." },
      ]} />

      <PlanBlock phase="PHASE 3 — SCALE & SYSTEMIZE" days="Days 61–90" color="#4ade80" weeks={[
        { week:"WEEK 9–10 — Days 61–75", actions:[
          "Close 2+ med spa / functional medicine retainers ($2,500–$4,000/mo each)",
          "Walter: full editorial lead — owner exits editing entirely; Walter reviews with Frame.io",
          "Jaylen: all shoots managed independently with shot list SOP — owner present for complex only",
          "Studio Rental: list on Peerspace, promote to local creator network, target 5+ bookings/month",
          "GHL white-label: 5+ clients activated — $1,000–$2,000 new MRR from SaaS alone",
          "Client LTV Review: identify top 5 clients by 36-month LTV projection — give Platinum treatment",
          "Digital product outline: structure first course, build GHL sales funnel for it",
        ], milestone:"Owner exits production. $20K+ MRR. Team autonomous. Platinum client program active." },
        { week:"WEEK 11–12 — Days 76–90", actions:[
          "Quarterly Review: full KPI analysis, team performance, P&L review, system gaps audit",
          "Plan Q2 strategy: new niches, events calendar, partnership expansion, geographic expansion",
          "Execute second monthly event — scale to 50+ attendees, add sponsor slot",
          "Referral Partner Dashboard review: identify top 3 partners, deepen relationships",
          "Real estate package finalized — begin outreach via gym trainer → realtor referral network",
          "Owner ops hours target: under 20/week — document what's still owner-dependent",
          "All SOPs at v2 — review and update based on 90 days of real operation",
        ], milestone:"90-Day Complete. Target: $25K+ MRR. Team runs production. Owner in CEO seat." },
      ]} />
    </Sec>
  ),

  implpriority: () => (
    <Sec title="IMPLEMENTATION PRIORITY RANKING" icon="🏁" color="#facc15">
      <p style={{ color:"#555", fontSize:13, marginBottom:22, lineHeight:1.7 }}>
        Every system ranked by four axes: Immediate ROI (revenue impact in 30 days), Revenue Impact (potential at scale), Operational Impact (reduces friction / owner dependency), and Ease of Implementation (speed to deploy). Scores 1–5.
      </p>

      <div style={{ color:"#facc15", fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:2, marginBottom:14 }}>🔴 FIRST 5 — BUILD IMMEDIATELY (Days 1–14)</div>

      <ImplCard rank={1} color="#f97316" name="Trainer Ecosystem + Snapshot Pipeline"
        reason="This is your existing revenue engine. Without a proper database, you're leaving upsells, follow-ups, and repeat bookings on the table every week."
        roi={5} rev={5} ops={5} ease={5} />
      <ImplCard rank={2} color="#f97316" name="Financial Command Center (MRR Tracker + AR + Invoice DB)"
        reason="You cannot manage what you don't measure. True MRR, outstanding AR, and project profitability must be known on Day 1. You likely have uncollected revenue right now."
        roi={5} rev={5} ops={5} ease={4} />
      <ImplCard rank={3} color="#f97316" name="CEO Scorecard + Team Dashboards (Walter + Jaylen)"
        reason="Replaces all ad-hoc check-ins and status meetings. Walter and Jaylen know exactly what to work on every day. Owner gets a 5-minute morning briefing instead of 45 minutes of operational noise."
        roi={4} rev={3} ops={5} ease={4} />
      <ImplCard rank={4} color="#f97316" name="Sales Command Center (Lead DB + Proposal DB + Discovery Pipeline)"
        reason="Every day without this, leads fall through cracks. Proposals expire without follow-up. Your close rate is lower than it should be because there's no system enforcing the sequence."
        roi={5} rev={5} ops={4} ease={4} />
      <ImplCard rank={5} color="#f97316" name="Client Management System + Deliverables DB"
        reason="Client retention is cheaper than acquisition. Health scores, check-in alerts, and delivery tracking prevent churn before it happens. Every churned retainer is $1,000–$2,500/month gone."
        roi={4} rev={4} ops={5} ease={4} />

      <div style={{ color:"#818cf8", fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:2, marginBottom:14, marginTop:24 }}>🟡 NEXT 5 — BUILD IN WEEKS 2–4</div>

      <ImplCard rank={6} color="#818cf8" name="Studio Monetization Division"
        reason="The studio is an underutilized asset generating $0 in dedicated revenue. Memberships alone at $297–$797/month × 20 members = $5,940–$15,940 MRR. This can be generating income within 2 weeks."
        roi={4} rev={5} ops={3} ease={4} />
      <ImplCard rank={7} color="#818cf8" name="SD Market Intelligence Database"
        reason="Outreach without targeting is noise. The SD Market DB turns your geographic advantage into a systematic prospecting machine. Feeds every other division with qualified leads."
        roi={3} rev={5} ops={4} ease={4} />
      <ImplCard rank={8} color="#818cf8" name="SOP Library (Sales + Production + Editing + Onboarding)"
        reason="Without SOPs, every Walter and Jaylen action depends on owner instruction. With SOPs, operations run without your input. This is the foundation of owner exit from daily operations."
        roi={3} rev={3} ops={5} ease={3} />
      <ImplCard rank={9} color="#818cf8" name="Referral Partner Division"
        reason="Referral partnerships are the highest-quality lead source. The system is lightweight to build (1 database + 1 log). The compound value of 10 active referral partners over 12 months can exceed any paid ad strategy."
        roi={3} rev={5} ops={3} ease={5} />
      <ImplCard rank={10} color="#818cf8" name="Content Operating System + Repurposing Tracker"
        reason="Repurposing multiplies the ROI of every shoot. Without tracking, Walter and Jaylen default to one deliverable per job. With a system, one 60-minute shoot generates 10–20 pieces, increasing client value and reducing new shoot volume."
        roi={3} rev={3} ops={4} ease={3} />

      <div style={{ color:"#4ade80", fontFamily:"'Bebas Neue',sans-serif", fontSize:16, letterSpacing:2, marginBottom:14, marginTop:24 }}>🟢 FINAL 5 — BUILD IN WEEKS 5–12</div>

      <ImplCard rank={11} color="#4ade80" name="Revenue Forecast + Project Profitability DB"
        reason="Forecasting requires historical data. Build this after 30 days of accurate revenue data. Profitability tracking requires real project data. These are CEO-level tools, not Day-1 tools."
        roi={2} rev={4} ops={4} ease={3} />
      <ImplCard rank={12} color="#4ade80" name="KPI Dashboard (full automation + monthly scorecard)"
        reason="The KPI dashboard is meaningless without 60+ days of data. Build the structure in Week 1 but only begin populating trends and automating rollups once the underlying databases are clean."
        roi={2} rev={3} ops={4} ease={3} />
      <ImplCard rank={13} color="#4ade80" name="Events + Workshop Division (full Events DB)"
        reason="Execute the first event manually with a basic Notion page. Build the full Events DB after you've run 2–3 events and know exactly what data you need to track. Over-engineering events on Day 1 slows execution."
        roi={3} rev={4} ops={3} ease={3} />
      <ImplCard rank={14} color="#4ade80" name="Client LTV + Revenue Forecast Automation"
        reason="LTV data becomes useful after 3–6 months of client history. Forecast automation requires GHL webhooks and Notion API integration. Build this in Month 2–3 with a contractor or tools integration."
        roi={2} rev={4} ops={3} ease={2} />
      <ImplCard rank={15} color="#4ade80" name="Digital Product System + Course Infrastructure"
        reason="Digital products are Year-1 supplemental, not core. Build the course outline in Month 3, launch in Month 4–5. Don't distract from the core service engine while it's still being built."
        roi={2} rev={4} ops={2} ease={2} />

      <div style={{ background:"#0a1400", border:"1px solid #2a3a00", borderRadius:10, padding:18, marginTop:20 }}>
        <div style={{ color:"#facc15", fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:2, marginBottom:12 }}>IMPLEMENTATION PRINCIPLE</div>
        <div style={{ color:"#606060", fontSize:13, lineHeight:1.8 }}>
          Revenue-generating databases come before operational databases. Operational databases come before reporting databases. Reporting databases come before automation. If you build the CEO Scorecard before the underlying data exists, it shows zeros. If you build automation before SOPs are written, the automation is wrong. The order in this roadmap is not arbitrary — each phase creates the foundation for the next.
        </div>
      </div>
    </Sec>
  ),

  rhythm: () => (
    <Sec title="CEO OPERATING RHYTHM" icon="🔄" color="#f97316">
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom:18 }}>
        <div>
          <RhythmBlock title="DAILY CEO SCHEDULE" color="#f97316" items={[
            { time:"6:30 AM", action:"Open CEO Scorecard. Revenue snapshot, overdue flags, team workload. Set today's top 3 priorities." },
            { time:"7:00 AM", action:"Strategic block — reading, competitive analysis, offer development. No operations." },
            { time:"8:00 AM", action:"Sales block: follow-ups, proposals, discovery calls, trainer outreach responses." },
            { time:"10:00 AM",action:"Operations: production check, Walter and Jaylen briefing, client issues." },
            { time:"12:00 PM",action:"Lunch. No phones. Protected." },
            { time:"1:00 PM", action:"Deep work: proposal writing, partnerships, strategy, events planning." },
            { time:"3:00 PM", action:"BD block: SD Market outreach, referral partner touches, event planning." },
            { time:"5:00 PM", action:"Team wrap: Slack/Notion review, task delegation, tomorrow's priorities queued." },
            { time:"5:30 PM", action:"EOD: close tasks in Notion, update CEO Scorecard priorities, log wins." },
          ]} />
        </div>
        <div>
          <RhythmBlock title="WEEKLY CEO SCHEDULE" color="#818cf8" items={[
            { time:"MONDAY",   action:"KPI Review (30 min). Weekly priorities set. Sales pipeline review. Walter + Jaylen sync." },
            { time:"TUESDAY",  action:"Sales-heavy: discovery calls, proposals, trainer outreach. Studio shoots if booked." },
            { time:"WEDNESDAY",action:"Operations: client check-ins, production review, deliverable QC, Walter/Jaylen check." },
            { time:"THURSDAY", action:"BD: referral partner touches, SD market outreach, event planning, partnership development." },
            { time:"FRIDAY",   action:"Finance: invoice review, MRR audit, AR collection follow-ups. Prep Monday priorities." },
            { time:"SATURDAY", action:"Optional: events, shoots, community. Protected before 10 AM." },
            { time:"SUNDAY",   action:"PROTECTED. Strategic reading, journaling, weekly preview. No client work." },
          ]} />
        </div>
      </div>

      <RhythmBlock title="MONTHLY CEO REVIEW — First Monday (90 min)" color="#4ade80" items={[
        { time:"0–15 min",  action:"Revenue: MRR, total rev, new clients, churn. Compare to targets. Update KPI DB." },
        { time:"15–30 min", action:"Client Health: review all Health Scores. Flag at-risk clients, schedule retention calls." },
        { time:"30–45 min", action:"Production: delivery rate, overdue items, Walter/Jaylen performance, content yield per shoot." },
        { time:"45–60 min", action:"Sales: close rate, lead sources, pipeline volume, proposal follow-up effectiveness." },
        { time:"60–75 min", action:"Studio: utilization rate, membership count, event pipeline, corporate shoot activity." },
        { time:"75–90 min", action:"Set Month+1 targets in KPI DB. Identify top 3 priorities. Schedule key meetings." },
      ]} />

      <RhythmBlock title="QUARTERLY PLANNING SESSION — Half Day (4 hrs)" color="#facc15" items={[
        { time:"Hour 1", action:"90-Day Scorecard: pull all KPIs. Honest assessment — what worked, what failed, why." },
        { time:"Hour 2", action:"Market analysis: niche performance, pricing audit, competitor landscape, new SD opportunities." },
        { time:"Hour 3", action:"Next 90-day plan: revenue targets, new services, hiring plan, system improvements, milestones." },
        { time:"Hour 4", action:"Owner vision check: does the business match the life being built? Adjust trajectory. Write decisions." },
      ]} />

      <div style={{ background:"#0f0f0f", border:"1px solid #f9731633", borderRadius:10, padding:18, marginTop:4 }}>
        <div style={{ color:"#f97316", fontFamily:"'Bebas Neue',sans-serif", fontSize:14, letterSpacing:2, marginBottom:14 }}>OWNER DEPENDENCY EXIT — DELEGATION TIMELINE</div>
        {[
          ["Trainer Snapshot sales calls",    "Sales Closer",             "Day 30",  "Train on discovery script + snapshot pitch deck"],
          ["Short form editing",              "Walter (primary)",         "Day 1",   "Enforce short form edit SOP + Frame.io review"],
          ["YouTube editing",                 "Walter",                   "Day 45",  "After YouTube SOP tested and Walter signed off"],
          ["Podcast editing",                 "Walter",                   "Day 45",  "After Podcast SOP tested; Jaylen assists on clips"],
          ["Shoot day execution",             "Jaylen",                   "Day 1",   "Shot list SOP + equipment checklist required sign-off"],
          ["Client monthly reports",          "Walter + GHL automation",  "Day 30",  "Report template + GHL 25th-of-month trigger"],
          ["Social scheduling / repurposing", "Jaylen + VA (Month 2)",    "Day 60",  "After repurposing pipeline is systematized"],
          ["GHL client management",           "Dedicated contractor",     "Day 60",  "Once GHL retainers scale to 5+ accounts"],
          ["Bookkeeping / invoicing",         "Bookkeeper + auto-billing","Day 30",  "GHL recurring billing + QuickBooks or Wave"],
          ["Event logistics",                 "Operations assistant",     "Day 60",  "Once event format proven at Month 2"],
          ["Studio bookings management",      "Jaylen + booking system",  "Day 45",  "GHL booking page + calendar automation"],
        ].map((d,i)=>(
          <div key={i} style={{ display:"grid", gridTemplateColumns:"200px 160px 75px 1fr", gap:12, padding:"7px 0", borderBottom:i<10?"1px solid #141414":"none", alignItems:"flex-start" }}>
            <span style={{ color:"#d0d0d0", fontSize:11 }}>{d[0]}</span>
            <span style={{ color:"#f97316", fontSize:11 }}>{d[1]}</span>
            <span style={{ color:"#4ade80", fontSize:10, fontFamily:"monospace" }}>{d[2]}</span>
            <span style={{ color:"#505050", fontSize:10 }}>{d[3]}</span>
          </div>
        ))}
      </div>
    </Sec>
  ),
};

export default function DGMOSv2() {
  const [active, setActive] = useState("scorecard");

  return (
    <div style={{ minHeight:"100vh", background:"#080808", fontFamily:"'Inter',sans-serif", color:"#e0e0e0" }}>
      {/* Fonts loaded in index.html */}

      {/* Header */}
      <div style={{ borderBottom:"1px solid #141414", padding:"16px 28px", display:"flex", alignItems:"center", gap:20, background:"#050505", position:"sticky", top:0, zIndex:100 }}>
        <div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, letterSpacing:4, color:"#f0f0f0", lineHeight:1 }}>DAILY GRIND MEDIA</div>
          <div style={{ color:"#282828", fontSize:10, letterSpacing:3, marginTop:1 }}>BUSINESS OPERATING SYSTEM v2.0 — EXECUTIVE EDITION</div>
        </div>
        <div style={{ marginLeft:"auto", display:"flex", gap:20, alignItems:"center" }}>
          {[
            { label:"TEAM", value:"Owner · Walter · Jaylen", color:"#38bdf8" },
            { label:"MARKET", value:"Del Mar, CA", color:"#818cf8" },
            { label:"TARGET", value:"$8K → $50K+ MRR", color:"#4ade80" },
          ].map((item,i)=>(
            <div key={i} style={{ textAlign:"right" }}>
              <div style={{ color:"#252525", fontSize:9, letterSpacing:2 }}>{item.label}</div>
              <div style={{ color:item.color, fontSize:12 }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:"flex" }}>
        {/* Sidebar */}
        <div style={{ width:210, borderRight:"1px solid #111", minHeight:"calc(100vh - 73px)", background:"#060606", padding:"14px 0", position:"sticky", top:73, height:"calc(100vh - 73px)", overflowY:"auto", flexShrink:0 }}>
          {GROUPS.map(group => (
            <div key={group} style={{ marginBottom:4 }}>
              <div style={{ color:"#1e1e1e", fontSize:9, letterSpacing:3, padding:"8px 16px 4px", fontFamily:"monospace" }}>{group}</div>
              {SECTIONS.filter(s=>s.group===group).map(s=>(
                <button key={s.id} onClick={()=>setActive(s.id)} style={{
                  display:"flex", alignItems:"center", gap:8, width:"100%", padding:"9px 16px",
                  background: active===s.id ? "#111" : "transparent",
                  border:"none",
                  borderLeft: active===s.id ? "2px solid #f97316" : "2px solid transparent",
                  cursor:"pointer",
                  color: active===s.id ? "#e0e0e0" : "#404040",
                  fontSize:11, textAlign:"left", transition:"all 0.12s",
                }}>
                  <span style={{ fontSize:13 }}>{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          ))}
          <div style={{ margin:"16px", borderTop:"1px solid #111", paddingTop:12 }}>
            <div style={{ color:"#1a1a1a", fontSize:10 }}>18 Systems</div>
            <div style={{ color:"#1a1a1a", fontSize:10 }}>60+ Databases</div>
            <div style={{ color:"#1a1a1a", fontSize:10 }}>200+ Properties</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, padding:"36px 44px", maxWidth:1020, overflowX:"hidden" }}>
          {sections[active] ? sections[active]() : <div style={{ color:"#333" }}>Select a section</div>}
        </div>
      </div>
    </div>
  );
}
