const ProcessSection = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [hoveredStep, setHoveredStep] = React.useState(null);
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

  const steps = [
    { num:'01', title:'Audit', desc:'We review your current property page and inquiry flow. We map where leads are being lost.' },
    { num:'02', title:'Design', desc:'We create the premium property experience around one clear action: booking a viewing.' },
    { num:'03', title:'Build', desc:'We develop the website and connect the lead capture system behind it.' },
    { num:'04', title:'Automate', desc:'We add response, booking, and follow-up workflows so leads do not disappear.' },
  ];

  return (
    <section id="process" ref={sectionRef} style={{
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

        <h2 style={{
          fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
          fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
          color:'#1A1A1A', letterSpacing:'-0.02em', lineHeight:1.1,
          marginBottom: isMobile ? 28 : 48, maxWidth:440,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
          transition:'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.1s',
        }}>A simple process from audit to launch.</h2>

        {/* Connector line + grid wrapper */}
        <div style={{ position:'relative' }}>
          {/* Dashed SVG connector line — desktop only */}
          {!isMobile && (
            <svg style={{ position:'absolute', top:52, left:0, width:'100%', height:2,
              overflow:'visible', pointerEvents:'none', zIndex:0 }}
              preserveAspectRatio="none">
              <line x1="0" y1="1" x2="100%" y2="1"
                stroke="rgba(31,61,43,0.2)" strokeWidth="1" strokeDasharray="5 5"
                strokeDashoffset={visible ? 0 : 800}
                style={{ transition:'stroke-dashoffset 1.4s ease 0.3s' }} />
            </svg>
          )}

          <div style={{
            display:'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap:0, position:'relative', zIndex:1,
          }}>
            {steps.map((step, i) => {
              const isHov = hoveredStep === i;
              const revealTransform = visible ? (isHov && !isMobile ? 'translateY(-3px)' : 'none') : 'translateY(24px)';
              return (
                <div key={i}
                  onMouseEnter={() => !isMobile && setHoveredStep(i)}
                  onMouseLeave={() => !isMobile && setHoveredStep(null)}
                  style={{
                    padding: isMobile ? '24px 16px' : '32px 28px',
                    borderLeft: i===0 ? '2px solid #1F3D2B' : '1px solid rgba(168,168,168,0.25)',
                    borderBottom: isMobile && i<2 ? '1px solid rgba(168,168,168,0.2)' : 'none',
                    opacity: visible ? 1 : 0,
                    transform: revealTransform,
                    transition:`opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${0.18+i*0.12}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${0.18+i*0.12}s`,
                    cursor: isMobile ? 'default' : 'pointer',
                  }}>
                  <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:12, fontWeight:700,
                    color:'#8C7A5B', letterSpacing:'0.08em', marginBottom:12 }}>{step.num}</div>
                  <div style={{ display:'flex', alignItems:'center', marginBottom:12 }}>
                    <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
                      fontSize: isMobile ? 18 : 20, color:'#1A1A1A',
                      letterSpacing:'-0.01em' }}>{step.title}</div>
                    <span style={{
                      opacity: isHov && !isMobile ? 1 : 0,
                      transition:'opacity 180ms ease',
                      color:'#1F3D2B', marginLeft:8, fontSize:14,
                    }}>→</span>
                  </div>
                  <div style={{
                    width: isHov && !isMobile ? '100%' : 20, height:2, background:'#1F3D2B',
                    marginBottom:14, transition:'width 300ms ease',
                  }} />
                  <div style={{ fontFamily:"'Inter', sans-serif", fontSize: isMobile ? 12 : 13,
                    color:'#555', lineHeight:1.65 }}>{step.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ProcessSection });
