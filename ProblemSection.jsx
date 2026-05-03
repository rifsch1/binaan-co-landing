const ProblemSection = () => {
  const sectionRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [hoveredDrop, setHoveredDrop] = React.useState(false);
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

  React.useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.playsInline = true;
    const tryPlay = () => vid.play().catch(() => {});
    vid.addEventListener('canplay', tryPlay);
    vid.addEventListener('loadeddata', () => setVideoLoaded(true));
    tryPlay();
    return () => vid.removeEventListener('canplay', tryPlay);
  }, []);

  const brokenFlow = ['Traffic','Listing','Interest','Drop-off'];
  const goodFlow   = ['Traffic','Inquiry','Response','Booking','Viewing'];

  return (
    <section id="problem" ref={sectionRef} style={{
      position:'relative', overflow:'hidden',
      padding: isMobile ? '72px 22px' : '120px 64px',
      borderTop:'1px solid rgba(168,168,168,0.2)',
    }}>
      {/* Ambient video behind light section */}
      <video ref={videoRef} muted loop playsInline autoPlay
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', objectPosition:'center',
          opacity: videoLoaded ? 0.06 : 0,
          transition:'opacity 2s ease', zIndex:0,
          filter:'grayscale(80%) contrast(1.1)',
        }}
        src="uploads/offer-bg.mp4"
      />
      {/* Light overlay keeps section feel white/light */}
      <div style={{ position:'absolute', inset:0, background:'rgba(244,244,242,0.93)', zIndex:1 }} />

      <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:2 }}>

        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16,
          opacity:visible?1:0, transform:visible?'none':'translateY(16px)', transition:'all 0.6s ease 0.1s' }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>The Problem</span>
        </div>

        <div style={{
          display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 16 : 72, marginBottom: isMobile ? 36 : 60, alignItems:'start',
        }}>
          <h2 style={{
            fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
            fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
            color:'#1A1A1A', letterSpacing:'-0.02em', lineHeight:1.1, margin:0,
            opacity:visible?1:0, transform:visible?'none':'translateY(24px)',
            transition:'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s',
          }}>Most property websites stop at attention.</h2>

          <div style={{ opacity:visible?1:0, transform:visible?'none':'translateY(24px)',
            transition:'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.35s' }}>
            {['They show the listing. They wait for the buyer to act.',
              'But interest does not become a viewing by itself.',
              'Without a system, leads get delayed, missed, or forgotten.'].map((text, i) => (
              <p key={i} style={{ fontFamily:"'Inter', sans-serif",
                fontSize: isMobile ? 14 : 16, color:'#444', lineHeight:1.75, marginBottom:10 }}>{text}</p>
            ))}
          </div>
        </div>

        {/* Floating stat row — appears above the two panels */}
        {!isMobile && (
          <div style={{
            display:'grid', gridTemplateColumns:'1fr 1fr', gap:16,
            marginBottom:-20, position:'relative', zIndex:3,
            opacity:visible?1:0, transform:visible?'translateY(0)':'translateY(12px)',
            transition:'all 0.6s ease 0.45s',
          }}>
            {/* Broken side stat */}
            <div style={{ display:'flex', alignItems:'baseline', gap:8, paddingLeft:4 }}>
              <span style={{
                fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
                fontSize:'clamp(36px,3.5vw,52px)', letterSpacing:'-0.04em',
                color:'rgba(139,26,26,0.18)', lineHeight:1, userSelect:'none',
              }}>73%</span>
              <span style={{
                fontFamily:"'Inter', sans-serif", fontSize:11, fontWeight:600,
                letterSpacing:'0.1em', textTransform:'uppercase',
                color:'rgba(139,26,26,0.5)',
              }}>of leads drop off</span>
            </div>
            {/* Good side stat */}
            <div style={{ display:'flex', alignItems:'baseline', gap:8, paddingLeft:4 }}>
              <span style={{
                fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
                fontSize:'clamp(36px,3.5vw,52px)', letterSpacing:'-0.04em',
                color:'rgba(31,61,43,0.18)', lineHeight:1, userSelect:'none',
              }}>3×</span>
              <span style={{
                fontFamily:"'Inter', sans-serif", fontSize:11, fontWeight:600,
                letterSpacing:'0.1em', textTransform:'uppercase',
                color:'rgba(31,61,43,0.5)',
              }}>more viewings booked</span>
            </div>
          </div>
        )}

        <div style={{
          display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 16,
        }}>
          {/* Broken flow */}
          <div style={{
            background:'#E8E8E6', border:'1px solid rgba(168,168,168,0.25)',
            padding: isMobile ? '28px 20px' : '36px',
            position:'relative', overflow:'hidden',
            opacity:visible?1:0, transform:visible?'none':'translateY(24px)', transition:'all 0.6s ease 0.5s',
          }}>
            {/* Ghost number watermark */}
            <div style={{
              position:'absolute', right:-8, bottom:-16,
              fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
              fontSize:120, letterSpacing:'-0.06em', lineHeight:1,
              color:'rgba(139,26,26,0.05)', userSelect:'none', pointerEvents:'none',
            }}>73%</div>
            <div style={{ fontFamily:"'Inter', sans-serif", fontSize:9, fontWeight:600,
              letterSpacing:'0.12em', textTransform:'uppercase', color:'#A8A8A8', marginBottom:22,
              position:'relative' }}>Without a system</div>
            <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:0, position:'relative' }}>
              {brokenFlow.map((step, i) => {
                const isLast = i === brokenFlow.length - 1;
                const boxEl = (
                  <div style={{
                    fontFamily:"'Space Grotesk', sans-serif", fontSize:12, fontWeight:600,
                    color: isLast ? '#8B1A1A' : '#444',
                    padding:'9px 14px',
                    border:`1px solid ${isLast ? 'rgba(139,26,26,0.35)' : 'rgba(168,168,168,0.3)'}`,
                    background: isLast ? 'rgba(139,26,26,0.07)' : 'transparent',
                    boxShadow: visible ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    transform: visible ? 'translateY(-2px)' : 'none',
                    opacity:visible?1:0,
                    transition:`all 0.5s ease ${0.55+i*0.1}s`,
                  }}>{step}</div>
                );
                return (
                  <React.Fragment key={i}>
                    {isLast ? (
                      <div style={{ position:'relative' }}
                        onMouseEnter={() => !isMobile && setHoveredDrop(true)}
                        onMouseLeave={() => !isMobile && setHoveredDrop(false)}
                      >
                        {boxEl}
                        <div style={{
                          position:'absolute', bottom:'calc(100% + 6px)', left:'50%',
                          transform:'translateX(-50%)',
                          background:'rgba(139,26,26,0.1)', border:'1px solid rgba(139,26,26,0.25)',
                          color:'#8B1A1A', fontSize:11, fontFamily:"'Inter', sans-serif",
                          padding:'4px 10px', borderRadius:2, whiteSpace:'nowrap',
                          opacity: hoveredDrop ? 1 : 0,
                          transition:'opacity 200ms ease', pointerEvents:'none',
                        }}>~73% of leads lost here</div>
                      </div>
                    ) : boxEl}
                    {i < brokenFlow.length - 1 && (
                      <div style={{ padding:'0 3px' }}>
                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                          <line x1="0" y1="6" x2="13" y2="6"
                            stroke={i===brokenFlow.length-2?'#8B1A1A':'#A8A8A8'} strokeWidth="1.2"
                            strokeDasharray="13" strokeDashoffset={visible?0:13}
                            style={{ transition:`stroke-dashoffset 0.4s ease ${i*0.2+0.6}s` }} />
                          <path d="M11 2l4 4-4 4"
                            stroke={i===brokenFlow.length-2?'#8B1A1A':'#A8A8A8'} strokeWidth="1.2" strokeLinecap="square"
                            opacity={visible?1:0} style={{ transition:`opacity 0.3s ease ${i*0.2+0.7}s` }} />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            <div style={{ marginTop:18, fontFamily:"'Inter', sans-serif", fontSize:12, color:'#A8A8A8', lineHeight:1.6,
              opacity:visible?1:0, transition:'opacity 0.5s ease 1s' }}>Interest never converts. Leads disappear.</div>
          </div>

          {/* Good flow */}
          <div style={{
            background:'#1A1A1A', border:'1px solid rgba(31,61,43,0.25)',
            padding: isMobile ? '28px 20px' : '36px',
            position:'relative', overflow:'hidden',
            opacity:visible?1:0, transform:visible?'none':'translateY(24px)', transition:'all 0.6s ease 0.6s',
          }}>
            {/* Ghost number watermark */}
            <div style={{
              position:'absolute', right:-4, bottom:-16,
              fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
              fontSize:120, letterSpacing:'-0.06em', lineHeight:1,
              color:'rgba(31,61,43,0.15)', userSelect:'none', pointerEvents:'none',
            }}>3×</div>
            <div style={{ fontFamily:"'Inter', sans-serif", fontSize:9, fontWeight:600,
              letterSpacing:'0.12em', textTransform:'uppercase', color:'#8C7A5B', marginBottom:22,
              position:'relative' }}>With Binaan</div>
            <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:0, position:'relative' }}>
              {goodFlow.map((step, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    fontFamily:"'Space Grotesk', sans-serif", fontSize:12, fontWeight:600,
                    color: i===goodFlow.length-1 ? '#F4F4F2' : 'rgba(244,244,242,0.7)',
                    padding:'9px 11px',
                    border:`1px solid ${i===goodFlow.length-1 ? 'rgba(31,61,43,0.7)' : 'rgba(168,168,168,0.12)'}`,
                    background: i===goodFlow.length-1 ? '#1F3D2B' : 'transparent',
                    boxShadow: visible ? '0 2px 8px rgba(0,0,0,0.18)' : 'none',
                    transform: visible ? 'translateY(-2px)' : 'none',
                    opacity:visible?1:0,
                    transition:`all 0.5s ease ${0.65+i*0.1}s`,
                  }}>{step}</div>
                  {i<goodFlow.length-1 && (
                    <div style={{ padding:'0 2px' }}>
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                        <line x1="0" y1="6" x2="10" y2="6" stroke="rgba(31,61,43,0.7)" strokeWidth="1.2"
                          strokeDasharray="10" strokeDashoffset={visible?0:10}
                          style={{ transition:`stroke-dashoffset 0.4s ease ${0.8+i*0.1}s` }} />
                        <path d="M8 2l4 4-4 4" stroke="rgba(31,61,43,0.7)" strokeWidth="1.2" strokeLinecap="square"
                          opacity={visible?1:0} style={{ transition:`opacity 0.3s ease ${0.85+i*0.1}s` }} />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div style={{ marginTop:18, fontFamily:"'Inter', sans-serif", fontSize:12, color:'#A8A8A8', lineHeight:1.6,
              opacity:visible?1:0, transition:'opacity 0.5s ease 1.1s' }}>Every inquiry is captured and moved toward a viewing.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ProblemSection });
