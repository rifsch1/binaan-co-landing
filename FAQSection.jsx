const FAQSection = () => {
  const [open, setOpen] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const faqs = [
    { q:'Is this just a website?', a:'No. The website is the front layer. The system behind it captures, responds to, and organises leads. Without the system, a website is just a brochure.' },
    { q:'Do I need to replace my current website?', a:'Not always. We can start with a campaign-specific property page that sits alongside your existing setup.' },
    { q:'Is this for one property or multiple listings?', a:'Start with one high-priority listing or campaign. Expand once the system is working and the conversion flow is proven.' },
    { q:'Do you manage ads?', a:'Not in the first version. Binaan focuses on converting the traffic you already have. Once the system is converting, ads compound the result.' },
    { q:'Can this work with WhatsApp?', a:'Yes. The system can be designed around WhatsApp-based lead handling — notifications, confirmations, and follow-up.' },
    { q:'Is this only for luxury property?', a:'No. But the design language works especially well for premium listings and serious agents who want to position above the market.' },
  ];

  return (
    <section id="faq" style={{
      background:'#F4F4F2',
      padding: isMobile ? '72px 22px' : '112px 48px',
      borderTop:'1px solid rgba(168,168,168,0.2)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>FAQ</span>
        </div>
        <div style={{
          display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 28 : 72, alignItems:'start',
        }}>
          <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
            fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
            color:'#1A1A1A', letterSpacing:'-0.02em', lineHeight:1.1, margin:0 }}>Questions before the call.</h2>
          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {faqs.map((faq, i) => {
              const isOpen = open===i;
              return (
                <div key={i} style={{ borderBottom:'1px solid rgba(168,168,168,0.25)' }}>
                  <button onClick={() => setOpen(isOpen?null:i)} style={{
                    width:'100%', background:'none', border:'none', cursor:'pointer',
                    padding:'18px 0', display:'flex', justifyContent:'space-between',
                    alignItems:'center', gap:16, textAlign:'left',
                  }}>
                    <span style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
                      fontSize: isMobile ? 14 : 15, color:'#1A1A1A', letterSpacing:'-0.01em', lineHeight:1.3 }}>{faq.q}</span>
                    <span style={{ width:18, height:18, flexShrink:0, display:'flex', alignItems:'center',
                      justifyContent:'center', transition:'transform 200ms ease',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2v12M2 8h12" stroke="#1A1A1A" strokeWidth="1.6" strokeLinecap="square"/>
                      </svg>
                    </span>
                  </button>
                  <div style={{ maxHeight: isOpen?200:0, overflow:'hidden', transition:'max-height 250ms ease' }}>
                    <div style={{ fontFamily:"'Inter', sans-serif", fontSize: isMobile ? 13 : 14,
                      color:'#555', lineHeight:1.75, paddingBottom:18 }}>{faq.a}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { FAQSection });
