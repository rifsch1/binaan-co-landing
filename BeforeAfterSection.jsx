const BeforeAfterSection = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const rows = [
    { without:'Listing page only', with:'Conversion-focused property page' },
    { without:'Passive inquiry form', with:'Qualified lead capture' },
    { without:'Manual follow-up', with:'Structured response workflow' },
    { without:'Slow reply', with:'Faster lead handling' },
    { without:'Lost interest', with:'Clear booking path' },
  ];

  return (
    <section id="proof" style={{
      background:'#1A1A1A',
      padding: isMobile ? '72px 22px' : '112px 48px',
      borderTop:'1px solid rgba(168,168,168,0.08)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>Proof Framework</span>
        </div>
        <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
          fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
          color:'#F4F4F2', letterSpacing:'-0.02em', lineHeight:1.1,
          marginBottom: isMobile ? 28 : 44, maxWidth:480 }}>What changes when the system is built correctly.</h2>
        <div style={{ border:'1px solid rgba(168,168,168,0.1)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
            borderBottom:'1px solid rgba(168,168,168,0.1)' }}>
            <div style={{ padding: isMobile ? '12px 16px' : '14px 28px',
              fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
              letterSpacing:'0.1em', textTransform:'uppercase', color:'#555',
              borderRight:'1px solid rgba(168,168,168,0.1)' }}>Without</div>
            <div style={{ padding: isMobile ? '12px 16px' : '14px 28px',
              fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
              letterSpacing:'0.1em', textTransform:'uppercase', color:'#8C7A5B' }}>With Binaan</div>
          </div>
          {rows.map((row, i) => (
            <div key={i} style={{
              display:'grid', gridTemplateColumns:'1fr 1fr',
              borderBottom: i<rows.length-1 ? '1px solid rgba(168,168,168,0.07)' : 'none',
              transition:'background 180ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.02)'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}
            >
              <div style={{ padding: isMobile ? '14px 16px' : '18px 28px',
                display:'flex', alignItems:'center', gap:10,
                borderRight:'1px solid rgba(168,168,168,0.07)' }}>
                <div style={{ width:4, height:4, background:'#3A3A3A', flexShrink:0 }} />
                <span style={{ fontFamily:"'Inter', sans-serif", fontSize: isMobile ? 12 : 14,
                  color:'#555', lineHeight:1.5 }}>{row.without}</span>
              </div>
              <div style={{ padding: isMobile ? '14px 16px' : '18px 28px',
                display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:4, height:4, background:'#1F3D2B', flexShrink:0 }} />
                <span style={{ fontFamily:"'Inter', sans-serif", fontSize: isMobile ? 12 : 14,
                  color:'#F4F4F2', lineHeight:1.5 }}>{row.with}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { BeforeAfterSection });
