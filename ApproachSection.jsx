const ApproachSection = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [expanded, setExpanded] = React.useState(null);

  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const layers = [
    { num: '01', title: 'Website Layer',   desc: 'Premium property landing page built to capture attention and move buyers toward one action.' },
    { num: '02', title: 'Lead Capture',    desc: 'Buyer intent and inquiry form with qualifying questions embedded directly in the page.' },
    { num: '03', title: 'Response System', desc: 'Fast reply before leads go cold. Agent notified. Buyer gets instant confirmation.' },
    { num: '04', title: 'Booking Flow',    desc: 'Viewing request and calendar logic. Slots selected. Viewing confirmed.' },
    { num: '05', title: 'Follow-Up',       desc: 'Structured reminders and lead reactivation. Nothing falls through the gap.' },
  ];

  return (
    <section id="approach" ref={sectionRef} style={{
      background: '#1A1A1A',
      padding: isMobile ? '72px 22px' : '120px 64px',
      borderTop: '1px solid rgba(168,168,168,0.07)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(168,168,168,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(168,168,168,0.028) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      {/* Green radial glow — top right */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 520, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(31,61,43,0.18) 0%, transparent 68%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Dim green glow — bottom left */}
      <div style={{
        position: 'absolute', bottom: -80, left: -80,
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(31,61,43,0.1) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
          transition: 'all 0.6s ease 0.1s',
        }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#8C7A5B' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B' }}>The Approach</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 32 : 72, alignItems: 'start',
        }}>
          {/* Left: headline */}
          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s',
          }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
              color: '#F4F4F2', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20,
            }}>The website is the surface.<br/>The system is the engine.</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 14 : 16,
              color: '#A8A8A8', lineHeight: 1.75, marginBottom: 14 }}>Binaan builds both.</p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 14 : 16,
              color: '#A8A8A8', lineHeight: 1.75 }}>
              A premium property page captures attention. The system behind it captures intent, alerts the agent, and moves the buyer toward a viewing.
            </p>
            <div style={{
              marginTop: 28, height: 2, width: visible ? 40 : 0, background: '#1F3D2B',
              transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1) 0.7s',
            }} />
          </div>

          {/* Right: interactive accordion layers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {layers.map((layer, i) => {
              const isOpen = expanded === i;
              return (
                <div key={i}
                  onMouseEnter={() => setExpanded(i)}
                  onMouseLeave={() => setExpanded(null)}
                  style={{
                    display: 'flex', gap: 16, alignItems: 'flex-start',
                    padding: '16px 10px',
                    borderBottom: i < layers.length - 1 ? '1px solid rgba(168,168,168,0.08)' : 'none',
                    cursor: 'default',
                    background: isOpen ? 'rgba(31,61,43,0.06)' : 'transparent',
                    borderRadius: 4,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateX(20px)',
                    transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.1}s, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.1}s, background 0.2s ease`,
                  }}
                >
                  {/* Number */}
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                    color: isOpen ? '#4ade80' : '#8C7A5B',
                    letterSpacing: '0.1em', minWidth: 22, paddingTop: 3,
                    transition: 'color 200ms ease',
                  }}>{layer.num}</div>

                  {/* Accent bar */}
                  <div style={{
                    width: 2, minHeight: 32, alignSelf: 'stretch', flexShrink: 0,
                    background: isOpen ? '#1F3D2B' : (i === 0 ? 'rgba(31,61,43,0.35)' : 'rgba(168,168,168,0.12)'),
                    boxShadow: isOpen ? '0 0 10px rgba(31,61,43,0.7)' : 'none',
                    transition: 'background 250ms ease, box-shadow 250ms ease',
                  }} />

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{
                        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                        fontSize: 14, letterSpacing: '-0.01em',
                        color: isOpen ? '#F4F4F2' : 'rgba(244,244,242,0.65)',
                        transition: 'color 200ms ease',
                      }}>{layer.title}</div>
                      {/* +/× toggle icon */}
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        transition: 'transform 280ms cubic-bezier(0.34,1.2,0.64,1)',
                      }}>
                        <line x1="6.5" y1="1" x2="6.5" y2="12" stroke={isOpen ? 'rgba(74,222,128,0.7)' : 'rgba(168,168,168,0.4)'} strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="1" y1="6.5" x2="12" y2="6.5" stroke={isOpen ? 'rgba(74,222,128,0.7)' : 'rgba(168,168,168,0.4)'} strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                    {/* Expanding description */}
                    <div style={{
                      maxHeight: isOpen ? 80 : 0,
                      overflow: 'hidden',
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? 7 : 0,
                      transition: 'max-height 0.3s ease, opacity 0.25s ease, margin-top 0.2s ease',
                      fontFamily: "'Inter', sans-serif", fontSize: 12.5,
                      color: '#888', lineHeight: 1.65,
                    }}>{layer.desc}</div>
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

Object.assign(window, { ApproachSection });
