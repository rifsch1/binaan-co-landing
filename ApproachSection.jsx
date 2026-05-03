// ApproachSection.jsx — Binaan Landing Page v2
// Staggered layer reveal with animated accent lines

const ApproachSection = () => {
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

  const layers = [
    { num: '01', title: 'Website Layer', desc: 'Premium property landing page built to capture attention and move buyers toward one action.' },
    { num: '02', title: 'Lead Capture', desc: 'Buyer intent and inquiry form with qualifying questions embedded directly in the page.' },
    { num: '03', title: 'Response System', desc: 'Fast reply before leads go cold. Agent notified. Buyer gets instant confirmation.' },
    { num: '04', title: 'Booking Flow', desc: 'Viewing request and calendar logic. Slots selected. Viewing confirmed without back-and-forth.' },
    { num: '05', title: 'Follow-Up', desc: 'Structured reminders and lead reactivation. Nothing falls through the gap.' },
  ];

  return (
    <section id="approach" ref={sectionRef} style={{
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
          }}>The Approach</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left */}
          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s',
          }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: 'clamp(30px, 3.5vw, 52px)', color: '#F4F4F2',
              letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 28,
            }}>
              The website is the surface.<br />The system is the engine.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 17, color: '#A8A8A8',
              lineHeight: 1.75, marginBottom: 16,
            }}>Binaan builds both.</p>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 17, color: '#A8A8A8',
              lineHeight: 1.75,
            }}>
              A premium property page captures attention. The system behind it captures intent, alerts the agent, and moves the buyer toward a viewing.
            </p>

            {/* Animated accent bar */}
            <div style={{
              marginTop: 36, height: 2,
              width: visible ? 48 : 0,
              background: '#1F3D2B',
              transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1) 0.7s',
            }} />
          </div>

          {/* Right: stacked architecture */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {layers.map((layer, i) => (
              <div key={i} style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                padding: '20px 0',
                borderBottom: i < layers.length - 1 ? '1px solid rgba(168,168,168,0.08)' : 'none',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateX(20px)',
                transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.1}s, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${0.3 + i * 0.1}s`,
              }}>
                {/* Number */}
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                  color: '#8C7A5B', letterSpacing: '0.1em', minWidth: 24,
                  paddingTop: 3,
                }}>{layer.num}</div>

                {/* Animated left accent line */}
                <div style={{
                  width: 2, minHeight: 36, alignSelf: 'stretch', flexShrink: 0,
                  background: i === 0
                    ? `linear-gradient(to bottom, #1F3D2B ${visible ? '100%' : '0%'}, transparent 100%)`
                    : 'rgba(168,168,168,0.12)',
                  transition: i === 0 ? `background 1s ease ${0.4 + i * 0.1}s` : 'none',
                }} />

                {/* Content */}
                <div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                    fontSize: 15, color: '#F4F4F2', letterSpacing: '-0.01em',
                    marginBottom: 5,
                  }}>{layer.title}</div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 13,
                    color: '#666', lineHeight: 1.65,
                  }}>{layer.desc}</div>
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
