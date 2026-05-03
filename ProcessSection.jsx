const ProcessSection = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const steps = [
    { num:'01', title:'Audit', desc:'We review your current property page and inquiry flow. We map where leads are being lost.' },
    { num:'02', title:'Design', desc:'We create the premium property experience around one clear action: booking a viewing.' },
    { num:'03', title:'Build', desc:'We develop the website and connect the lead capture system behind it.' },
    { num:'04', title:'Automate', desc:'We add response, booking, and follow-up workflows so leads do not disappear.' },
  ];

  return (
    <section id="process" style={{
      background:'#F4F4F2',
      padding: isMobile ? '72px 22px' : '112px 48px',
      borderTop:'1px solid rgba(168,168,168,0.2)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>Process</span>
        </div>
        <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
          fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
          color:'#1A1A1A', letterSpacing:'-0.02em', lineHeight:1.1,
          marginBottom: isMobile ? 28 : 48, maxWidth:440 }}>A simple process from audit to launch.</h2>
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap:0,
        }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              padding: isMobile ? '24px 16px' : '32px 28px',
              borderLeft: i===0 ? '2px solid #1F3D2B' : '1px solid rgba(168,168,168,0.25)',
              borderBottom: isMobile && i<2 ? '1px solid rgba(168,168,168,0.2)' : 'none',
            }}>
              <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:12, fontWeight:700,
                color:'#8C7A5B', letterSpacing:'0.08em', marginBottom:12 }}>{step.num}</div>
              <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
                fontSize: isMobile ? 18 : 20, color:'#1A1A1A', marginBottom:12,
                letterSpacing:'-0.01em' }}>{step.title}</div>
              <div style={{ width:20, height:2, background:'#1F3D2B', marginBottom:14 }} />
              <div style={{ fontFamily:"'Inter', sans-serif", fontSize: isMobile ? 12 : 13,
                color:'#555', lineHeight:1.65 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ProcessSection });
