// FlowSection.jsx — Binaan Landing Page v2
// Animated step reveal with connecting line draw

const FlowSection = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    { num: '01', title: 'Visitor lands on property page', sub: 'Premium page. Clear CTA. One action.' },
    { num: '02', title: 'Buyer submits inquiry', sub: 'Intent captured with qualifying context.' },
    { num: '03', title: 'Agent receives qualified lead', sub: 'Notified instantly. Lead summary included.' },
    { num: '04', title: 'Buyer gets fast response', sub: 'Automated reply. Confirmation sent.' },
    { num: '05', title: 'Viewing is requested or booked', sub: 'Slot selected. Calendar confirmed.' },
    { num: '06', title: 'Follow-up keeps the lead warm', sub: 'Reminders run. Deal flow maintained.' },
  ];

  return (
    <section id="flow" ref={sectionRef} style={{
      background: '#1A1A1A',
      padding: '130px 64px',
      borderTop: '1px solid rgba(168,168,168,0.07)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
          transition: 'all 0.6s ease 0.1s',
        }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, background: '#8C7A5B' }} />
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B',
          }}>Flow</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          alignItems: 'start', marginBottom: 72,
        }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 'clamp(30px, 3.5vw, 52px)', color: '#F4F4F2',
            letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0,
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
            transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s',
          }}>
            From property traffic to booked viewing.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 17,
            color: '#A8A8A8', lineHeight: 1.75, margin: 0,
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
            transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.32s',
          }}>
            Most property pages end at the inquiry form. Binaan continues the journey after the click. That is where conversion happens.
          </p>
        </div>

        {/* Steps grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          borderTop: '1px solid rgba(168,168,168,0.08)',
          borderLeft: '1px solid rgba(168,168,168,0.08)',
        }}>
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div key={i} style={{
                padding: '40px 32px',
                borderRight: '1px solid rgba(168,168,168,0.08)',
                borderBottom: '1px solid rgba(168,168,168,0.08)',
                position: 'relative', overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(28px)',
                transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${0.35 + i * 0.1}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${0.35 + i * 0.1}s`,
                cursor: 'default',
                background: 'transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Large ghost number */}
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 48,
                  fontWeight: 700, color: 'rgba(168,168,168,0.07)',
                  letterSpacing: '-0.04em', lineHeight: 1,
                  marginBottom: 16, userSelect: 'none',
                }}>{step.num}</div>

                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                  fontSize: 16, color: '#F4F4F2',
                  letterSpacing: '-0.01em', lineHeight: 1.3,
                  marginBottom: 10,
                }}>{step.title}</div>

                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 13,
                  color: '#555', lineHeight: 1.6,
                }}>{step.sub}</div>

                {/* Final step badge */}
                {isLast && (
                  <div style={{
                    marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'rgba(31,61,43,0.18)', border: '1px solid rgba(31,61,43,0.35)',
                    padding: '5px 12px',
                  }}>
                    <div style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: '#1F3D2B',
                      boxShadow: '0 0 6px rgba(31,61,43,0.8)',
                      animation: 'breathe2 2s ease-in-out infinite',
                    }} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                      letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1F3D2B',
                    }}>Conversion</span>
                  </div>
                )}

                {/* Step connector arrow (right edge, not on last in row) */}
                {i % 3 !== 2 && (
                  <div style={{
                    position: 'absolute', right: -1, top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 2,
                  }}>
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
                      <path d="M1 1l6 6-6 6" stroke="rgba(168,168,168,0.15)" strokeWidth="1.2" strokeLinecap="square"/>
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes breathe2 {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px rgba(31,61,43,0.8); }
          50% { opacity: 0.4; box-shadow: 0 0 12px rgba(31,61,43,0.3); }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { FlowSection });
