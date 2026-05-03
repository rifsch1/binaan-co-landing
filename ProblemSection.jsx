// ProblemSection.jsx — Binaan Landing Page v2
// Animated flow diagrams with line-draw effect

const ProblemSection = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const brokenFlow = ['Traffic', 'Listing View', 'Interest', 'Drop-off'];
  const goodFlow   = ['Traffic', 'Inquiry', 'Fast Response', 'Booking', 'Viewing'];

  return (
    <section id="problem" ref={sectionRef} style={{
      background: '#F4F4F2',
      padding: '130px 64px',
      borderTop: '1px solid rgba(168,168,168,0.2)',
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
          }}>The Problem</span>
        </div>

        {/* Grid: headline + body */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80,
          marginBottom: 72, alignItems: 'start',
        }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 'clamp(30px, 3.5vw, 52px)', color: '#1A1A1A',
            letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0,
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s',
          }}>
            Most property websites stop at attention.
          </h2>
          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.35s',
          }}>
            {[
              'They show the listing. They display the images. They wait for the buyer to act.',
              'But interest does not become a viewing by itself.',
              'Without a system, leads get delayed, missed, or forgotten.',
            ].map((text, i) => (
              <p key={i} style={{
                fontFamily: "'Inter', sans-serif", fontSize: 17, color: '#444',
                lineHeight: 1.75, marginBottom: 14,
              }}>{text}</p>
            ))}
          </div>
        </div>

        {/* Flow diagrams */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

          {/* Broken flow */}
          <div style={{
            background: '#E8E8E6', border: '1px solid rgba(168,168,168,0.25)',
            padding: '40px',
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'all 0.6s ease 0.5s',
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A8A8A8',
              marginBottom: 28,
            }}>Without a system</div>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0 }}>
              {brokenFlow.map((step, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
                    color: i === brokenFlow.length - 1 ? '#8B1A1A' : '#444',
                    padding: '11px 18px',
                    border: `1px solid ${i === brokenFlow.length - 1 ? 'rgba(139,26,26,0.35)' : 'rgba(168,168,168,0.3)'}`,
                    background: i === brokenFlow.length - 1 ? 'rgba(139,26,26,0.07)' : 'transparent',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateX(-8px)',
                    transition: `all 0.5s ease ${0.55 + i * 0.1}s`,
                  }}>{step}</div>
                  {i < brokenFlow.length - 1 && (
                    <div style={{ padding: '0 4px' }}>
                      {/* Animated connector line */}
                      <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                        <line x1="0" y1="7" x2="16" y2="7" stroke={i === brokenFlow.length - 2 ? '#8B1A1A' : '#A8A8A8'} strokeWidth="1.2"
                          strokeDasharray="16" strokeDashoffset={visible ? 0 : 16}
                          style={{ transition: `stroke-dashoffset 0.4s ease ${0.7 + i * 0.1}s` }}
                        />
                        <path d="M14 3l4 4-4 4" stroke={i === brokenFlow.length - 2 ? '#8B1A1A' : '#A8A8A8'} strokeWidth="1.2" strokeLinecap="square"
                          opacity={visible ? 1 : 0}
                          style={{ transition: `opacity 0.3s ease ${0.8 + i * 0.1}s` }}
                        />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div style={{
              marginTop: 24, fontFamily: "'Inter', sans-serif", fontSize: 13,
              color: '#A8A8A8', lineHeight: 1.6,
              opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 1s',
            }}>
              Interest never converts. Leads disappear.
            </div>
          </div>

          {/* Good flow */}
          <div style={{
            background: '#1A1A1A', border: '1px solid rgba(31,61,43,0.25)',
            padding: '40px',
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'all 0.6s ease 0.6s',
            boxShadow: '0 0 40px rgba(31,61,43,0.08)',
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A5B',
              marginBottom: 28,
            }}>With Binaan</div>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0 }}>
              {goodFlow.map((step, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600,
                    color: i === goodFlow.length - 1 ? '#F4F4F2' : 'rgba(244,244,242,0.7)',
                    padding: '11px 14px',
                    border: `1px solid ${i === goodFlow.length - 1 ? 'rgba(31,61,43,0.7)' : 'rgba(168,168,168,0.12)'}`,
                    background: i === goodFlow.length - 1 ? '#1F3D2B' : 'transparent',
                    boxShadow: i === goodFlow.length - 1 ? '0 0 16px rgba(31,61,43,0.35)' : 'none',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateX(-8px)',
                    transition: `all 0.5s ease ${0.65 + i * 0.1}s`,
                  }}>{step}</div>
                  {i < goodFlow.length - 1 && (
                    <div style={{ padding: '0 3px' }}>
                      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                        <line x1="0" y1="7" x2="13" y2="7" stroke="rgba(31,61,43,0.7)" strokeWidth="1.2"
                          strokeDasharray="13" strokeDashoffset={visible ? 0 : 13}
                          style={{ transition: `stroke-dashoffset 0.4s ease ${0.8 + i * 0.1}s` }}
                        />
                        <path d="M11 3l4 4-4 4" stroke="rgba(31,61,43,0.7)" strokeWidth="1.2" strokeLinecap="square"
                          opacity={visible ? 1 : 0}
                          style={{ transition: `opacity 0.3s ease ${0.85 + i * 0.1}s` }}
                        />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div style={{
              marginTop: 24, fontFamily: "'Inter', sans-serif", fontSize: 13,
              color: '#A8A8A8', lineHeight: 1.6,
              opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 1.1s',
            }}>
              Every inquiry is captured, responded to, and moved toward a viewing.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ProblemSection });
