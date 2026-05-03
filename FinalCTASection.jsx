const FinalCTASection = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  return (
    <section id="contact" style={{
      background:'#1A1A1A',
      padding: isMobile ? '88px 22px' : '128px 48px',
      borderTop:'1px solid rgba(168,168,168,0.08)',
      position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, opacity:0.025,
        backgroundImage:'linear-gradient(rgba(244,244,242,1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,242,1) 1px, transparent 1px)',
        backgroundSize:'72px 72px', pointerEvents:'none' }} />
      {!isMobile && (
        <div style={{ position:'absolute', bottom:40, right:40, opacity:0.04, pointerEvents:'none' }}>
          <svg width="160" height="160" viewBox="0 0 32 32" fill="none">
            <path d="M4 4 L4 14 M4 4 L14 4" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
            <path d="M28 28 L28 18 M28 28 L18 28" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
          </svg>
        </div>
      )}
      <div style={{ maxWidth:1280, margin:'0 auto', position:'relative' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>Next Step</span>
        </div>
        <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
          fontSize: isMobile ? 28 : 'clamp(32px, 4.5vw, 64px)',
          color:'#F4F4F2', letterSpacing:'-0.03em', lineHeight:1.0,
          marginBottom:18, maxWidth: isMobile ? '100%' : 680 }}>
          Turn your property traffic into booked viewings.
        </h2>
        <p style={{ fontFamily:"'Inter', sans-serif", fontSize: isMobile ? 14 : 16,
          color:'#A8A8A8', lineHeight:1.7,
          marginBottom: isMobile ? 32 : 44, maxWidth:460 }}>
          Send us your current listing or property page. We'll show you where the conversion flow breaks.
        </p>
        <div style={{ display:'flex', gap:12, alignItems:'center',
          flexDirection: isMobile ? 'column' : 'row', flexWrap:'wrap',
          alignItems: isMobile ? 'flex-start' : 'center' }}>
          <button onClick={() => onNavigate('contact')} style={{
            background:'#1F3D2B', color:'#F4F4F2', border:'none',
            fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
            fontSize:12, letterSpacing:'0.06em', textTransform:'uppercase',
            padding: isMobile ? '14px 28px' : '16px 36px', borderRadius:3, cursor:'pointer',
            boxShadow:'0 0 24px rgba(31,61,43,0.45)',
            transition:'all 180ms cubic-bezier(0.4,0,0.2,1)',
            width: isMobile ? '100%' : 'auto',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='#244A34'; }}
          onMouseLeave={e => { e.currentTarget.style.background='#1F3D2B'; }}
          >Book Strategy Call</button>
          <button onClick={() => onNavigate('demo')} style={{
            background:'transparent', color:'#F4F4F2',
            border:'1px solid rgba(168,168,168,0.4)',
            fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
            fontSize:12, letterSpacing:'0.06em', textTransform:'uppercase',
            padding: isMobile ? '14px 28px' : '16px 36px', borderRadius:3, cursor:'pointer',
            transition:'all 180ms cubic-bezier(0.4,0,0.2,1)',
            width: isMobile ? '100%' : 'auto',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(244,244,242,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(168,168,168,0.4)'; }}
          >View Demo</button>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { FinalCTASection });
