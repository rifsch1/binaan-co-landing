const SystemsSection = () => {
  const sectionRef = React.useRef(null);
  const diagramRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [diagramVisible, setDiagramVisible] = React.useState(false);
  const [active, setActive] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setDiagramVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (diagramRef.current) observer.observe(diagramRef.current);
    return () => observer.disconnect();
  }, []);

  const systems = [
    {
      num: '01', title: 'Lead Capture', tagline: 'Turns visitors into qualified inquiries.',
      desc: 'Buyer name, contact, budget, preferred viewing time — captured before they leave the page.',
      metric: '100%', metricLabel: 'Inquiries qualified', metricColor: '#4ade80',
    },
    {
      num: '02', title: 'Response System', tagline: 'Replies before the lead goes cold.',
      desc: 'Instant confirmation, agent notification, lead summary, and next action — sent automatically.',
      metric: '< 2m', metricLabel: 'Average response', metricColor: '#F4C95D',
    },
    {
      num: '03', title: 'Booking System', tagline: 'Moves interest into scheduled viewings.',
      desc: 'Viewing request form, preferred time slots, calendar link, and agent follow-up trigger.',
      metric: '3×', metricLabel: 'More viewings booked', metricColor: '#4ade80',
    },
    {
      num: '04', title: 'Follow-Up System', tagline: 'Keeps serious buyers warm.',
      desc: 'Reminder messages, re-engagement prompts, missed lead follow-up, and lead status tracking.',
      metric: '0', metricLabel: 'Leads fall through', metricColor: 'rgba(244,244,242,0.9)',
    },
  ];

  const integrations = [
    { label: 'CRM / Database', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 5v6c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 11v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )},
    { label: 'WhatsApp', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8.5 10.5c.5 1 1.5 2.5 3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { label: 'Booking Calendar', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 14h4M8 17h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { label: 'Email / Notifs', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
    { label: 'Property Page', icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 8h18M8 3v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 13h10M7 16h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )},
  ];

  return (
    <section id="systems" ref={sectionRef} style={{
      background: '#161616',
      padding: isMobile ? '72px 22px' : '120px 64px',
      borderTop: '1px solid rgba(168,168,168,0.06)',
      position: 'relative',
    }}>
      {!isMobile && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRight: '1px solid rgba(168,168,168,0.05)',
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'sticky', top: '50vh',
            transform: 'translateX(-50%) rotate(-90deg)',
            transformOrigin: 'center center',
            fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(168,168,168,0.2)',
            whiteSpace: 'nowrap',
          }}>Systems</div>
        </div>
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
          transition: 'all 0.6s ease 0.1s',
        }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#8C7A5B' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B' }}>Systems</span>
        </div>

        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
          color: '#F4F4F2', letterSpacing: '-0.02em', lineHeight: 1.1,
          marginBottom: isMobile ? 28 : 48, maxWidth: 480,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s',
        }}>Four systems behind every property page.</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: 1, background: 'rgba(255,255,255,0.04)',
        }}>
          {systems.map((sys, i) => {
            const isHov = active === i;
            const isGreen = sys.metricColor === '#4ade80';
            return (
              <div key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  background: isHov ? '#1A1A1A' : '#161616',
                  padding: isMobile ? '24px 16px 20px' : '36px 24px 28px',
                  cursor: 'default', position: 'relative', overflow: 'hidden',
                  opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)',
                  transitionProperty: 'background, opacity, transform',
                  transitionDuration: '220ms, 0.6s, 0.6s',
                  transitionTimingFunction: 'ease, cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,0.2,1)',
                  transitionDelay: `0ms, ${0.3 + i * 0.1}s, ${0.3 + i * 0.1}s`,
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, height: 2,
                  width: isHov ? '100%' : '0%',
                  background: `linear-gradient(90deg, ${sys.metricColor}, transparent)`,
                  transition: 'width 350ms cubic-bezier(0.4,0,0.2,1)',
                }} />

                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8C7A5B',
                  marginBottom: 14 }}>{sys.num}</div>

                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: isMobile ? 14 : 17, color: '#F4F4F2', letterSpacing: '-0.01em',
                  lineHeight: 1.2, marginBottom: 10 }}>{sys.title}</div>

                <div style={{
                  width: isHov ? '100%' : '36%', height: 1, background: 'rgba(168,168,168,0.12)',
                  marginBottom: 10, transition: 'width 400ms ease',
                }} />

                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 12 : 13,
                  color: isHov ? (isGreen ? 'rgba(74,222,128,0.85)' : '#D0D0D0') : '#888',
                  lineHeight: 1.6, marginBottom: 14,
                  transition: 'color 200ms ease',
                  textShadow: isHov && isGreen ? '0 0 12px rgba(74,222,128,0.3)' : 'none',
                }}>{sys.tagline}</div>

                {!isMobile && (
                  <div style={{
                    maxHeight: isHov ? 120 : 0, overflow: 'hidden',
                    opacity: isHov ? 1 : 0,
                    transition: 'max-height 300ms ease, opacity 250ms ease',
                    fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#666', lineHeight: 1.65,
                    marginBottom: isHov ? 16 : 0,
                  }}>{sys.desc}</div>
                )}

                {/* Metric */}
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 6,
                  paddingTop: 12, borderTop: '1px solid rgba(168,168,168,0.08)',
                  opacity: isHov ? 1 : 0.55,
                  transition: 'opacity 250ms ease',
                }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', lineHeight: 1,
                    color: sys.metricColor,
                    textShadow: isHov
                      ? `0 0 20px ${sys.metricColor}, 0 0 40px ${sys.metricColor}55`
                      : 'none',
                    transition: 'text-shadow 300ms ease',
                    animation: isHov && isGreen ? 'sysMetricGlow 1.8s ease-in-out infinite' : 'none',
                  }}>{sys.metric}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 9,
                    color: isHov ? sys.metricColor : '#8C7A5B',
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    transition: 'color 200ms ease',
                  }}>{sys.metricLabel}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration flow diagram */}
        {!isMobile && (
          <div ref={diagramRef} style={{
            marginTop: 64, paddingTop: 48,
            borderTop: '1px solid rgba(168,168,168,0.06)',
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(168,168,168,0.35)',
              marginBottom: 32,
              opacity: diagramVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.1s',
            }}>Integration layer</div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <svg style={{
                position: 'absolute', top: '50%', left: 0, width: '100%',
                height: 2, overflow: 'visible', pointerEvents: 'none', zIndex: 0,
                transform: 'translateY(-50%)',
              }}>
                {integrations.slice(0, -1).map((_, i) => {
                  const pct = 100 / (integrations.length - 1);
                  const xPct1 = i * pct + pct * 0.15;
                  const xPct2 = (i + 1) * pct - pct * 0.15;
                  return (
                    <line key={i}
                      x1={`${xPct1}%`} y1="1" x2={`${xPct2}%`} y2="1"
                      stroke="rgba(168,168,168,0.15)" strokeWidth="1"
                      strokeDasharray="4 4"
                      strokeDashoffset={diagramVisible ? 0 : 200}
                      style={{ transition: `stroke-dashoffset 1.2s ease ${0.3 + i * 0.15}s` }}
                    />
                  );
                })}
              </svg>

              {integrations.map((node, i) => (
                <div key={i} style={{
                  position: 'relative', zIndex: 1,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                  flex: '0 0 auto',
                  opacity: diagramVisible ? 1 : 0, transform: diagramVisible ? 'none' : 'translateY(12px)',
                  transition: `all 0.55s cubic-bezier(0.4,0,0.2,1) ${0.25 + i * 0.12}s`,
                }}>
                  <div style={{
                    width: 52, height: 52,
                    background: '#1E1E1E', border: '1px solid rgba(168,168,168,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#A8A8A8', transition: 'border-color 220ms, background 220ms, color 220ms, box-shadow 220ms',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(74,222,128,0.4)';
                    e.currentTarget.style.background = 'rgba(31,61,43,0.12)';
                    e.currentTarget.style.color = '#4ade80';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(74,222,128,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(168,168,168,0.12)';
                    e.currentTarget.style.background = '#1E1E1E';
                    e.currentTarget.style.color = '#A8A8A8';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    {node.icon}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500,
                    color: 'rgba(168,168,168,0.5)', textAlign: 'center', whiteSpace: 'nowrap',
                  }}>{node.label}</div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 32, fontFamily: "'Inter', sans-serif", fontSize: 12,
              color: 'rgba(168,168,168,0.3)', lineHeight: 1.6,
              opacity: diagramVisible ? 1 : 0, transition: 'opacity 0.6s ease 1s',
            }}>
              All systems connect automatically. No manual switching between tools.
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes sysMetricGlow {
          0%, 100% { text-shadow: 0 0 20px #4ade80, 0 0 40px rgba(74,222,128,0.35); }
          50%       { text-shadow: 0 0 32px #4ade80, 0 0 64px rgba(74,222,128,0.6), 0 0 80px rgba(74,222,128,0.2); }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { SystemsSection });
