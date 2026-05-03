const OfferSection = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const columns = [
    { label:'Website Layer', items:['Premium property landing page','Mobile-responsive layout','Property gallery','Floor plan section','Strong CTA structure'] },
    { label:'System Layer', items:['Inquiry capture form','Agent lead notification','Booking request flow','Automated follow-up logic','Basic lead tracking'] },
    { label:'Conversion Layer', items:['CTA placement','Copy structure','Lead qualification questions','Viewing-focused user flow','Conversion-first structure'] },
  ];

  return (
    <section id="offer" style={{
      background:'#1A1A1A',
      padding: isMobile ? '72px 22px' : '112px 48px',
      borderTop:'1px solid rgba(168,168,168,0.08)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>The Offer</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 12 : 64, alignItems:'start', marginBottom: isMobile ? 28 : 48 }}>
          <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
            fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
            color:'#F4F4F2', letterSpacing:'-0.02em', lineHeight:1.1, margin:0 }}>The Property Conversion Website.</h2>
          {!isMobile && (
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:15, color:'#A8A8A8', lineHeight:1.75, margin:0 }}>
              A premium property website with the systems required to capture, respond to, and move inquiries toward booked viewings.
            </p>
          )}
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap:1, background:'rgba(168,168,168,0.08)', marginBottom: isMobile ? 24 : 44 }}>
          {columns.map((col, i) => (
            <div key={i} style={{ background:'#1A1A1A', padding: isMobile ? '24px 20px' : '32px 28px',
              borderTop: i===1 ? '2px solid #1F3D2B' : '2px solid rgba(168,168,168,0.1)' }}>
              <div style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
                letterSpacing:'0.12em', textTransform:'uppercase',
                color: i===1 ? '#8C7A5B' : '#666', marginBottom:20 }}>{col.label}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {col.items.map((item, j) => (
                  <div key={j} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0, marginTop:2 }}>
                      <path d="M3 8l4 4 6-7" stroke={i===1?'#1F3D2B':'#A8A8A8'} strokeWidth="1.6" strokeLinecap="square"/>
                    </svg>
                    <span style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:'#A8A8A8', lineHeight:1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
          <button style={{
            background:'#1F3D2B', color:'#F4F4F2', border:'none',
            fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
            fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase',
            padding:'13px 28px', borderRadius:3, cursor:'pointer',
            boxShadow:'0 0 18px rgba(31,61,43,0.35)',
            transition:'all 180ms cubic-bezier(0.4,0,0.2,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='#244A34'; }}
          onMouseLeave={e => { e.currentTarget.style.background='#1F3D2B'; }}
          >Book Strategy Call</button>
          {!isMobile && (
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:'#555' }}>
              One call. We audit your setup and show you exactly where the gap is.
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { OfferSection });
