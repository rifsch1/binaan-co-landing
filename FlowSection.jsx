const FlowSection = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [hoveredStep, setHoveredStep] = React.useState(null);

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

  const steps = [
    { num: '01', title: 'Visitor lands on property page', sub: 'Premium page. Clear CTA. One action.' },
    { num: '02', title: 'Buyer submits inquiry',          sub: 'Intent captured with qualifying context.' },
    { num: '03', title: 'Agent receives qualified lead',  sub: 'Notified instantly. Lead summary included.' },
    { num: '04', title: 'Buyer gets fast response',       sub: 'Automated reply. Confirmation sent.' },
    { num: '05', title: 'Viewing is requested or booked', sub: 'Slot selected. Calendar confirmed.' },
    { num: '06', title: 'Follow-up keeps the lead warm',  sub: 'Reminders run. Deal flow maintained.' },
  ];

  return (
    <section id="flow" ref={sectionRef} style={{
      background: '#1A1A1A',
      padding: isMobile ? '72px 22px' : '120px 64px',
      borderTop: '1px solid rgba(168,168,168,0.07)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
          transition: 'all 0.6s ease 0.1s',
        }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#8C7A5B' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B' }}>Flow</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 12 : 64, alignItems: 'start', marginBottom: isMobile ? 28 : 56,
        }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
            color: '#F4F4F2', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0,
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
            transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s',
          }}>From property traffic to booked viewing.</h2>
          {!isMobile && (
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 15,
              color: '#A8A8A8', lineHeight: 1.75, margin: 0,
              opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
              transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.32s',
            }}>
              Most property pages end at the inquiry form. Binaan continues the journey after the click. That is where conversion happens.
            </p>
          )}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 0,
          borderTop: '1px solid rgba(168,168,168,0.08)',
          borderLeft: '1px solid rgba(168,168,168,0.08)',
        }}>
          {steps.map((step, i) => {
            const isHov = hoveredStep === i;
            const isLast = i === steps.length - 1;
            return (
              <div key={i}
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
                style={{
                  padding: isMobile ? '24px 20px' : '32px 28px',
                  borderRight: '1px solid rgba(168,168,168,0.08)',
                  borderBottom: '1px solid rgba(168,168,168,0.08)',
                  position: 'relative', overflow: 'hidden', cursor: 'default',
                  background: isHov ? 'rgba(31,61,43,0.07)' : 'transparent',
                  opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
                  transition: `background 220ms ease, opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.08}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.08}s`,
                }}
              >
                {/* Top green accent line on hover */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, #1F3D2B, transparent)',
                  opacity: isHov ? 1 : 0,
                  transition: 'opacity 250ms ease',
                }} />

                {/* Ghost step number */}
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: isMobile ? 32 : 42,
                  fontWeight: 700,
                  color: isHov ? 'rgba(31,61,43,0.2)' : 'rgba(168,168,168,0.07)',
                  letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 12,
                  userSelect: 'none',
                  transition: 'color 250ms ease',
                }}>{step.num}</div>

                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                  fontSize: isMobile ? 14 : 15,
                  color: isHov ? '#F4F4F2' : 'rgba(244,244,242,0.65)',
                  letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 8,
                  transition: 'color 200ms ease',
                }}>{step.title}</div>

                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 12,
                  color: isHov ? '#888' : '#555', lineHeight: 1.6,
                  transition: 'color 200ms ease',
                }}>{step.sub}</div>

                {isLast && (
                  <div style={{
                    marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6,
                    background: isHov ? 'rgba(31,61,43,0.28)' : 'rgba(31,61,43,0.18)',
                    border: `1px solid ${isHov ? 'rgba(74,222,128,0.45)' : 'rgba(31,61,43,0.35)'}`,
                    padding: '4px 10px',
                    transition: 'background 250ms ease, border-color 250ms ease',
                    boxShadow: isHov ? '0 0 16px rgba(74,222,128,0.15)' : 'none',
                  }}>
                    <div style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: isHov ? '#4ade80' : '#1F3D2B',
                      boxShadow: isHov ? '0 0 8px rgba(74,222,128,0.8)' : '0 0 6px rgba(31,61,43,0.8)',
                      animation: 'flowConvBreathe 2s ease-in-out infinite',
                      transition: 'background 250ms ease, box-shadow 250ms ease',
                    }} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: isHov ? '#4ade80' : '#1F3D2B',
                      textShadow: isHov ? '0 0 12px rgba(74,222,128,0.6)' : 'none',
                      transition: 'color 250ms ease, text-shadow 250ms ease',
                      animation: isHov ? 'flowConvGlow 1.8s ease-in-out infinite' : 'none',
                    }}>Conversion</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes flowConvBreathe {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
        @keyframes flowConvGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(74,222,128,0.5); }
          50%       { text-shadow: 0 0 20px rgba(74,222,128,0.9), 0 0 36px rgba(74,222,128,0.3); }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { FlowSection });
