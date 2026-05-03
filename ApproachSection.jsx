const ApproachSection = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if(e.isIntersecting){ setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if(sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const layers = [
    { num:'01', title:'Website Layer', desc:'Premium property landing page built to capture attention and move buyers toward one action.' },
    { num:'02', title:'Lead Capture', desc:'Buyer intent and inquiry form with qualifying questions embedded directly in the page.' },
    { num:'03', title:'Response System', desc:'Fast reply before leads go cold. Agent notified. Buyer gets instant confirmation.' },
    { num:'04', title:'Booking Flow', desc:'Viewing request and calendar logic. Slots selected. Viewing confirmed.' },
    { num:'05', title:'Follow-Up', desc:'Structured reminders and lead reactivation. Nothing falls through the gap.' },
  ];

  return (
    <section id="approach" ref={sectionRef} style={{
      background:'#1A1A1A',
      padding: isMobile ? '72px 22px' : '120px 64px',
      borderTop:'1px solid rgba(168,168,168,0.07)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>

        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16,
          opacity:visible?1:0, transform:visible?'none':'translateY(16px)', transition:'all 0.6s ease 0.1s' }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>The Approach</span>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 32 : 72, alignItems:'start',
        }}>
          <div style={{ opacity:visible?1:0, transform:visible?'none':'translateY(24px)',
            transition:'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s' }}>
            <h2 style={{
              fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
              fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
              color:'#F4F4F2', letterSpacing:'-0.02em', lineHeight:1.1, marginBottom:20,
            }}>The website is the surface.<br/>The system is the engine.</h2>
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize: isMobile ? 14 : 16,
              color:'#A8A8A8', lineHeight:1.75, marginBottom:14 }}>Binaan builds both.</p>
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize: isMobile ? 14 : 16,
              color:'#A8A8A8', lineHeight:1.75 }}>
              A premium property page captures attention. The system behind it captures intent, alerts the agent, and moves the buyer toward a viewing.
            </p>
            <div style={{ marginTop:28, height:2, width:visible?40:0, background:'#1F3D2B',
              transition:'width 0.8s cubic-bezier(0.4,0,0.2,1) 0.7s' }} />
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
            {layers.map((layer, i) => (
              <div key={i} style={{
                display:'flex', gap:16, alignItems:'flex-start',
                padding:'18px 0',
                borderBottom: i<layers.length-1 ? '1px solid rgba(168,168,168,0.08)' : 'none',
                opacity:visible?1:0, transform:visible?'none':'translateX(20px)',
                transition:`opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${0.3+i*0.1}s, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${0.3+i*0.1}s`,
              }}>
                <div style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
                  color:'#8C7A5B', letterSpacing:'0.1em', minWidth:22, paddingTop:2 }}>{layer.num}</div>
                <div style={{ width:2, minHeight:32, alignSelf:'stretch', flexShrink:0,
                  background: i===0 ? '#1F3D2B' : 'rgba(168,168,168,0.12)' }} />
                <div>
                  <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
                    fontSize:14, color:'#F4F4F2', letterSpacing:'-0.01em', marginBottom:4 }}>{layer.title}</div>
                  <div style={{ fontFamily:"'Inter', sans-serif", fontSize:12,
                    color:'#666', lineHeight:1.65 }}>{layer.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ApproachSection });
