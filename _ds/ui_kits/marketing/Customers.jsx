(function(){
/* Customers page. The LAYOUT is real; the CONTENT is not — there are no
   testimonials, logos or case studies anywhere in the live site repo.
   Every quote, name and metric here is a placeholder marked in the UI so
   it cannot be shipped by accident. Logos and photos are drop slots.
   Fill these before this page goes near production. */
const __mv = n => { const C = props => { const R = (window.MV||{})[n];
  return R ? React.createElement(R, props) : null; }; C.displayName = n; return C; };
const Logo=__mv("Logo"), Icon=__mv("Icon"), Button=__mv("Button");

const MAX={maxWidth:"var(--page-max)",margin:"0 auto",padding:"0 var(--space-8)"};
const DISPLAY={fontFamily:"var(--font-display)",fontVariationSettings:'"wdth" 118,"wght" 800',fontWeight:800,lineHeight:"var(--lh-display)",letterSpacing:"var(--ls-mega)",textWrap:"balance",margin:0};
const NAV=["Features","Pricing","Compare","About"];

const STORIES=[
  {field:"cobalt",id:"cust-1",sector:"Apparel · Melbourne",
   quote:"Placeholder quote — one sentence on what changed, in the operator's own words.",
   who:"Name, Role",metric:["—","Stat worth quoting"]},
  {field:"violet",id:"cust-2",sector:"Skincare · Auckland",
   quote:"Placeholder quote — keep these to a single concrete claim, not a testimonial cliché.",
   who:"Name, Role",metric:["—","Stat worth quoting"]},
  {field:"mint",id:"cust-3",sector:"Furniture · Brisbane",
   quote:"Placeholder quote — the strongest one leads the page, so put your best story first.",
   who:"Name, Role",metric:["—","Stat worth quoting"]}
];

function Todo({children}){
  return <span style={{display:"inline-block",background:"var(--warning-dim)",color:"var(--warning)",
    fontSize:11,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",padding:"2px 7px",
    borderRadius:4,marginRight:8,verticalAlign:"middle"}}>{children}</span>;
}

function Nav(){
  return (
    <header style={{position:"sticky",top:0,zIndex:40,background:"var(--field-paper)"}}>
      <div style={{...MAX,height:88,display:"flex",alignItems:"center",gap:"var(--space-10)"}}>
        <Logo variant="lockup" height={24} base="../../" style={{color:"var(--ink-strong)",flex:"none"}}/>
        <nav style={{display:"flex",gap:"var(--space-6)",flex:1}}>
          {NAV.map(n=><a key={n} href="#" style={{fontSize:15,fontWeight:n==="Customers"?800:600,
            color:"var(--ink-strong)",textDecoration:"none",whiteSpace:"nowrap"}}>{n}</a>)}
        </nav>
        <a href="#" style={{fontSize:15,fontWeight:600,color:"var(--ink-strong)",textDecoration:"none",whiteSpace:"nowrap"}}>Sign in</a>
        <Button as="a" href="#" size="lg" shape="pill" variant="ink" className="mv-press"
          style={{padding:"0 22px",fontSize:15}}>Start free</Button>
      </div>
    </header>
  );
}

function Hero(){
  return (
    <section style={{background:"var(--field-paper)",padding:"0 var(--space-8) var(--space-8)"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",background:"var(--field-ink)",color:"#fff",
        borderRadius:"var(--radius-panel)",padding:"var(--space-20) var(--space-16)",
        display:"grid",gap:"var(--space-6)"}}>
        <span className="mv-eyebrow" style={{color:"#C8FF2E"}}>Customers</span>
        <h1 style={{...DISPLAY,fontSize:"var(--fs-display-5)",maxWidth:"14ch"}}>
          People who <span style={{color:"#C8FF2E"}}>make things.</span>
        </h1>
        <p style={{margin:0,maxWidth:"48ch",fontSize:20,lineHeight:1.45,color:"rgb(255 255 255/.78)",textWrap:"pretty"}}>
          Shopify-first manufacturers running real production on Manuva — apparel, skincare, food, furniture.
        </p>
      </div>
    </section>
  );
}

function LogoWall(){
  return (
    <section style={{background:"var(--field-paper)",padding:"var(--space-16) 0"}}>
      <div style={{...MAX,display:"grid",gap:"var(--space-6)",justifyItems:"center"}}>
        <span className="mv-eyebrow" style={{color:"var(--ink-faint)"}}>
          <Todo>Needs real logos</Todo>Trusted by manufacturers across ANZ
        </span>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"var(--space-4)",width:"100%"}}>
          {[1,2,3,4,5,6].map(i=>(
            <div key={i} style={{aspectRatio:"3/2",position:"relative"}}>
              <image-slot id={`cust-logo-${i}`} shape="rounded" radius="12" fit="contain"
                placeholder={`Customer logo ${i}`}></image-slot>
            </div>))}
        </div>
      </div>
    </section>
  );
}

function Stories(){
  return (
    <section style={{background:"var(--field-paper)",padding:"var(--space-12) 0 var(--space-20)"}}>
      <div style={{...MAX,display:"grid",gap:"var(--space-5)"}}>
        {STORIES.map((s,i)=>(
          <article key={s.id} style={{display:"grid",gridTemplateColumns:i%2?"1fr 1.1fr":"1.1fr 1fr",
            background:`var(--field-${s.field})`,color:`var(--on-${s.field})`,
            borderRadius:"var(--radius-panel)",overflow:"hidden",minHeight:420}}>
            <div style={{position:"relative",order:i%2?2:1,minHeight:320}}>
              <image-slot id={s.id} shape="rect" fit="cover"
                placeholder="Drop a photo — the floor, the product, the people"></image-slot>
            </div>
            <div style={{order:i%2?1:2,padding:"var(--space-16)",display:"grid",
              alignContent:"space-between",gap:"var(--space-10)"}}>
              <span className="mv-eyebrow" style={{opacity:.72}}>{s.sector}</span>
              <blockquote style={{margin:0,display:"grid",gap:"var(--space-6)"}}>
                <p style={{margin:0,fontFamily:"var(--font-display)",
                  fontVariationSettings:'"wdth" 106,"wght" 700',fontSize:30,lineHeight:1.18,
                  letterSpacing:"-.025em",textWrap:"balance"}}>
                  <Todo>Placeholder</Todo>“{s.quote}”
                </p>
                <footer style={{fontSize:15,opacity:.78}}>{s.who}</footer>
              </blockquote>
              <div style={{display:"flex",alignItems:"baseline",gap:12,
                borderTop:"var(--border-rule) solid rgb(255 255 255/.28)",paddingTop:"var(--space-5)"}}>
                <span className="mv-numeral" style={{fontSize:52,lineHeight:1}}>{s.metric[0]}</span>
                <span className="mv-eyebrow" style={{opacity:.7}}>{s.metric[1]}</span>
              </div>
            </div>
          </article>))}
      </div>
    </section>
  );
}

function Sectors(){
  const list=[["shirt","Apparel & textiles"],["flask","Skincare & cosmetics"],["cookie","Food & beverage"],
    ["armchair","Furniture & homewares"],["wrench","Hardware & tools"],["package","Contract manufacturing"]];
  return (
    <section style={{background:"var(--tint-cobalt)",padding:"var(--space-20) 0"}}>
      <div style={{...MAX,display:"grid",gap:"var(--space-10)"}}>
        <h2 style={{...DISPLAY,fontSize:"var(--fs-display-2)",color:"var(--ink-strong)",maxWidth:"16ch"}}>
          Built for people who make physical things.
        </h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"var(--space-4)"}}>
          {list.map(([icon,label])=>(
            <div key={label} style={{background:"var(--bg-card)",borderRadius:"var(--radius-tile)",
              padding:"var(--space-6)",display:"flex",alignItems:"center",gap:"var(--space-4)"}}>
              <span style={{width:44,height:44,flex:"none",display:"grid",placeItems:"center",
                borderRadius:"var(--radius-md)",background:"var(--field-cobalt)",color:"#fff"}}>
                <Icon name={icon} size={21}/></span>
              <span style={{fontSize:16,fontWeight:600,color:"var(--ink-strong)"}}>{label}</span>
            </div>))}
        </div>
      </div>
    </section>
  );
}

function CTA(){
  return (
    <section style={{background:"var(--field-paper)",padding:"var(--space-20) var(--space-8)"}}>
      <div style={{maxWidth:"var(--page-max)",margin:"0 auto",background:"var(--field-cobalt)",color:"#fff",
        borderRadius:"var(--radius-panel)",padding:"var(--space-20) var(--space-16)",textAlign:"center",
        display:"grid",justifyItems:"center",gap:"var(--space-6)"}}>
        <h2 style={{...DISPLAY,fontSize:"var(--fs-display-4)",maxWidth:"14ch"}}>Add your floor to the list.</h2>
        <p style={{margin:0,fontSize:19,lineHeight:1.45,color:"rgb(255 255 255/.82)",maxWidth:"38ch",textWrap:"pretty"}}>
          14 days free with full Pro access. No credit card required.
        </p>
        <div style={{display:"flex",gap:"var(--space-3)"}}>
          <Button as="a" href="#" size="xl" shape="pill" className="mv-press"
            style={{background:"#C8FF2E",borderColor:"#C8FF2E",color:"#141413",padding:"0 32px"}}>Start free</Button>
          <Button as="a" href="#" size="xl" shape="pill" variant="ghost" className="mv-press"
            style={{color:"#fff",borderColor:"rgb(255 255 255/.42)",padding:"0 32px"}}>Book a demo</Button>
        </div>
      </div>
    </section>
  );
}

function Footer(){
  return (
    <footer style={{background:"var(--field-ink)",color:"rgb(255 255 255/.62)"}}>
      <div style={{...MAX,padding:"var(--space-16) var(--space-8)",display:"grid",
        gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:"var(--space-10)"}}>
        <div style={{display:"grid",gap:"var(--space-5)",alignContent:"start"}}>
          <Logo variant="lockup" height={24} base="../../" style={{color:"#fff"}}/>
          <span style={{fontSize:15,maxWidth:"28ch",lineHeight:1.5}}>Manufacturing operations, finally simple.</span>
          <a href="mailto:hello@manuva.app" style={{fontSize:14,color:"rgb(255 255 255/.62)"}}>hello@manuva.app</a>
        </div>
        {[["Product",["Features","Pricing"]],
          ["Compare",["vs Katana","vs MRPeasy"]],
          ["Company",["About","Privacy","Terms"]]].map(([h,items])=>(
          <div key={h} style={{display:"grid",gap:"var(--space-3)",alignContent:"start"}}>
            <span className="mv-eyebrow" style={{color:"#C8FF2E",marginBottom:4}}>{h}</span>
            {items.map(i=><a key={i} href="#" style={{fontSize:14,color:"rgb(255 255 255/.62)",
              textDecoration:"none"}}>{i}</a>)}
          </div>))}
      </div>
      <div style={{borderTop:"var(--border-rule) solid rgb(255 255 255/.12)"}}>
        <div style={{...MAX,padding:"var(--space-5) var(--space-8)",display:"flex",
          justifyContent:"space-between",fontSize:12,color:"rgb(255 255 255/.42)"}}>
          <span>© 2026 Pac Technologies Pty Ltd</span><span className="mv-mono">manuva.app/customers</span>
        </div>
      </div>
    </footer>
  );
}

function Customers(){
  return (<div style={{background:"var(--field-paper)"}}>
    <Nav/><Hero/><LogoWall/><Stories/><Sectors/><CTA/><Footer/>
  </div>);
}
Object.assign(window,{Customers});
})();
