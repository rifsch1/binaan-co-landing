// DemoSection.jsx — Binaan Landing Page v2
// Video in browser frame + live system activity ticker

const DemoSection = ({ onNavigate }) => {
  const videoRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(false);
  const [started, setStarted] = React.useState(false);

  // Live activity ticker
  const [tickerItems, setTickerItems] = React.useState([
    { id: 1, text: 'New inquiry received — Ara Damansara unit', time: 'just now', dot: '#1F3D2B' },
    { id: 2, text: 'Viewing booked — Saturday 10 May, 2:00 PM', time: '2m ago', dot: '#8C7A5B' },
    { id: 3, text: 'Agent notified — Ahmad Razif', time: '4m ago', dot: '#1F3D2B' },
  ]);

  const tickerMessages = [
    { text: 'Buyer inquiry — Mont Kiara 3BR unit', dot: '#1F3D2B' },
    { text: 'Viewing confirmed — Bangsar South', dot: '#8C7A5B' },
    { text: 'Follow-up sent — lead reactivated', dot: '#1F3D2B' },
    { text: 'New lead — Budget RM 850K–1.2M', dot: '#1F3D2B' },
    { text: 'Booking request — Sunday 11 May 10 AM', dot: '#8C7A5B' },
    { text: 'Agent alert — 3 new inquiries today', dot: '#1F3D2B' },
  ];

  React.useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const msg = tickerMessages[idx % tickerMessages.length];
      idx++;
      setTickerItems(prev => [
        { id: Date.now(), text: msg.text, time: 'just now', dot: msg.dot, fresh: true },
        ...prev.slice(0, 2).map(item => ({
          ...item,
          time: item.time === 'just now' ? '1m ago' : item.time === '1m ago' ? '2m ago' : item.time === '2m ago' ? '4m ago' : item.time,
          fresh: false,
        })),
      ]);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
      setStarted(true);
    }
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play(); setPlaying(true);
    } else {
      videoRef.current.pause(); setPlaying(false);
    }
  };

  const steps = ['Property Page', 'Buyer Inquiry', 'Fast Response', 'Booking Request', 'Viewing Booked'];

  return (
    <section id="demo" style={{
      background: '#0F0F0F',
      padding: '130px 64px',
      borderTop: '1px solid rgba(168,168,168,0.07)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, background: '#8C7A5B' }} />
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B',
          }}>Demo Experience</span>
        </div>

        {/* Headline row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'flex-end', marginBottom: 52 }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 'clamp(32px, 3.8vw, 56px)', color: '#F4F4F2',
            letterSpacing: '-0.025em', lineHeight: 1.03, margin: 0,
          }}>See how the system works.</h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 16,
            color: '#A8A8A8', lineHeight: 1.75, margin: 0,
          }}>
            A premium property page captures attention. The system behind it captures intent, alerts the agent, and moves the buyer toward a booked viewing.
          </p>
        </div>

        {/* Main layout: video + sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'stretch' }}>

          {/* ── Browser-frame video ── */}
          <div style={{
            background: '#141414', border: '1px solid rgba(168,168,168,0.12)',
            borderRadius: 4, overflow: 'hidden',
            boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          }}>
            {/* Chrome bar */}
            <div style={{
              background: '#1C1C1C', borderBottom: '1px solid rgba(168,168,168,0.08)',
              padding: '11px 18px', display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{ display: 'flex', gap: 7 }}>
                {['rgba(255,80,80,0.4)', 'rgba(255,180,0,0.3)', 'rgba(0,200,80,0.3)'].map((c, i) => (
                  <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <div style={{
                flex: 1, background: '#252525', border: '1px solid rgba(168,168,168,0.1)',
                borderRadius: 3, padding: '5px 12px', display: 'flex', alignItems: 'center',
                gap: 8, maxWidth: 400, margin: '0 auto',
              }}>
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="7" width="12" height="8" rx="1" stroke="#555" strokeWidth="1.2"/>
                  <path d="M5 7V5a3 3 0 016 0v2" stroke="#555" strokeWidth="1.2"/>
                </svg>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#555', letterSpacing: '0.01em' }}>
                  demo.binaanco.com
                </span>
                {/* Live dot */}
                <div style={{
                  marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%',
                  background: '#1F3D2B',
                  boxShadow: '0 0 6px rgba(31,61,43,0.9)',
                  animation: 'breathe 2s ease-in-out infinite',
                }} />
              </div>
              <div style={{ width: 72 }} />
            </div>

            {/* Video */}
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#0A0A0A' }}>
              <video
                ref={videoRef}
                onClick={handleVideoClick}
                onEnded={() => setPlaying(false)}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', cursor: 'pointer',
                }}
                src="uploads/Binaan Co Website Demo Video.mp4"
              />

              {/* Play overlay */}
              {!started && (
                <div onClick={handlePlay} style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(8,8,8,0.75)', cursor: 'pointer', zIndex: 5,
                  backdropFilter: 'blur(6px)',
                }}>
                  <div style={{
                    width: 88, height: 88, borderRadius: '50%',
                    background: 'rgba(31,61,43,0.95)',
                    border: '1px solid rgba(31,61,43,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 18,
                    boxShadow: '0 0 60px rgba(31,61,43,0.5), 0 12px 40px rgba(0,0,0,0.6)',
                    transition: 'all 220ms ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform='scale(1.07)'; e.currentTarget.style.boxShadow='0 0 80px rgba(31,61,43,0.7), 0 16px 48px rgba(0,0,0,0.7)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 0 60px rgba(31,61,43,0.5), 0 12px 40px rgba(0,0,0,0.6)'; }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#F4F4F2" style={{ marginLeft: 3 }}>
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                    fontSize: 14, color: '#F4F4F2', letterSpacing: '0.06em', textTransform: 'uppercase',
                    marginBottom: 6,
                  }}>Watch the Demo</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(168,168,168,0.6)' }}>
                    Full conversion journey — 3 minutes
                  </div>
                </div>
              )}

              {/* Paused overlay */}
              {started && !playing && (
                <div onClick={handleVideoClick} style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.45)', cursor: 'pointer', zIndex: 5,
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'rgba(31,61,43,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(31,61,43,0.5)',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#F4F4F2" style={{ marginLeft: 3 }}>
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Journey steps */}
            <div style={{
              padding: '16px 18px', background: '#161616',
              borderTop: '1px solid rgba(168,168,168,0.07)',
              display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto',
            }}>
              {steps.map((step, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 500,
                    color: '#A8A8A8', letterSpacing: '0.07em', textTransform: 'uppercase',
                    padding: '6px 12px', whiteSpace: 'nowrap',
                    background: i === steps.length - 1 ? 'rgba(31,61,43,0.2)' : 'transparent',
                    border: i === steps.length - 1 ? '1px solid rgba(31,61,43,0.4)' : '1px solid transparent',
                    color: i === steps.length - 1 ? '#1F3D2B' : '#666',
                  }}>{step}</div>
                  {i < steps.length - 1 && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M4 8h8M8 4l4 4-4 4" stroke="#333" strokeWidth="1.2" strokeLinecap="square"/>
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── Live activity sidebar ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {/* System status header */}
            <div style={{
              background: '#141414', border: '1px solid rgba(168,168,168,0.1)',
              padding: '20px 20px 16px',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 14,
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A5B',
                }}>System Status</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: '50%', background: '#1F3D2B',
                    boxShadow: '0 0 8px rgba(31,61,43,1)',
                    animation: 'breathe 2s ease-in-out infinite',
                  }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#1F3D2B', fontWeight: 600, letterSpacing: '0.06em' }}>LIVE</span>
                </div>
              </div>
              {/* Status rows */}
              {[
                ['Lead Capture', true],
                ['Response System', true],
                ['Booking Flow', true],
                ['Follow-Up', true],
              ].map(([name, active]) => (
                <div key={name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '7px 0',
                  borderBottom: '1px solid rgba(168,168,168,0.06)',
                }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#888' }}>{name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{
                      width: 5, height: 5, borderRadius: '50%',
                      background: '#1F3D2B',
                      boxShadow: '0 0 5px rgba(31,61,43,0.7)',
                    }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#1F3D2B', letterSpacing: '0.06em' }}>ON</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Live activity feed */}
            <div style={{
              background: '#141414', border: '1px solid rgba(168,168,168,0.1)',
              padding: '16px 20px', flex: 1,
              overflow: 'hidden',
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A5B',
                marginBottom: 16,
              }}>Live Activity</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {tickerItems.map((item, i) => (
                  <div key={item.id} style={{
                    padding: '10px 0',
                    borderBottom: i < tickerItems.length - 1 ? '1px solid rgba(168,168,168,0.06)' : 'none',
                    opacity: item.fresh ? 0 : 1,
                    transform: item.fresh ? 'translateY(-6px)' : 'none',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                    animation: item.fresh ? 'fadeIn 0.5s ease forwards' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: item.dot, flexShrink: 0, marginTop: 4,
                        boxShadow: `0 0 5px ${item.dot}`,
                      }} />
                      <div>
                        <div style={{
                          fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#D0D0D0',
                          lineHeight: 1.4, marginBottom: 3,
                        }}>{item.text}</div>
                        <div style={{
                          fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#555',
                          letterSpacing: '0.04em',
                        }}>{item.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA card */}
            <div style={{
              background: '#1F3D2B', border: '1px solid rgba(31,61,43,0.5)',
              padding: '20px',
              boxShadow: '0 0 30px rgba(31,61,43,0.25)',
            }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 16, color: '#F4F4F2', marginBottom: 8,
                letterSpacing: '-0.01em',
              }}>Ready to see yours?</div>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(244,244,242,0.65)',
                lineHeight: 1.6, marginBottom: 16,
              }}>Book a strategy call. We'll audit your current setup and show you the gap.</div>
              <button onClick={() => onNavigate('contact')} style={{
                width: '100%', background: '#F4F4F2', color: '#1A1A1A', border: 'none',
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '12px', borderRadius: 3, cursor: 'pointer',
                transition: 'all 180ms ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='#FFFFFF'; e.currentTarget.style.transform='translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background='#F4F4F2'; e.currentTarget.style.transform='none'; }}
              >Book Strategy Call</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { DemoSection });
