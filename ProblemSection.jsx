const ProblemSection = () => {
  const sectionRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [brokenActive, setBrokenActive] = React.useState(-1);
  const [goodActive, setGoodActive] = React.useState(-1);

  const brokenFlow = ['Traffic', 'Listing', 'Interest', 'Drop-off'];
  const goodFlow   = ['Traffic', 'Inquiry', 'Response', 'Booking', 'Viewing'];

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

  React.useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true; vid.playsInline = true;
    const tryPlay = () => vid.play().catch(() => {});
    vid.addEventListener('canplay', tryPlay);
    vid.addEventListener('loadeddata', () => setVideoLoaded(true));
    tryPlay();
    return () => vid.removeEventListener('canplay', tryPlay);
  }, []);

  // Start sequential node glow animations once the section is visible
  React.useEffect(() => {
    if (!visible) return;
    let bInterval, gInterval;

    // Delay start so entrance animations finish first
    const t1 = setTimeout(() => {
      setBrokenActive(0);
      bInterval = setInterval(() => {
        setBrokenActive(prev => (prev + 1) % brokenFlow.length);
      }, 950);
    }, 900);

    const t2 = setTimeout(() => {
      setGoodActive(0);
      gInterval = setInterval(() => {
        setGoodActive(prev => (prev + 1) % goodFlow.length);
      }, 820);
    }, 1300);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      clearInterval(bInterval); clearInterval(gInterval);
    };
  }, [visible]);

  // --- Node renderers ---

  function renderBrokenNode(step, i) {
    const isActive = i === brokenActive;
    const isLast = i === brokenFlow.length - 1;
    return (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 4 : 6 }}>
        <div style={{
          borderRadius: 999,
          padding: isMobile ? '8px 14px' : '11px 20px',
          border: `1px solid ${
            isActive ? 'rgba(139,26,26,0.8)'
            : isLast  ? 'rgba(139,26,26,0.3)'
            :            'rgba(168,168,168,0.35)'
          }`,
          background: isActive
            ? 'rgba(139,26,26,0.13)'
            : isLast ? 'rgba(139,26,26,0.07)' : 'rgba(255,255,255,0.65)',
          boxShadow: isActive
            ? '0 0 0 3px rgba(139,26,26,0.12), 0 0 22px 7px rgba(139,26,26,0.16), 0 4px 14px rgba(139,26,26,0.1)'
            : '0 2px 8px rgba(0,0,0,0.07)',
          transform: isActive ? 'translateY(-5px) scale(1.07)' : 'translateY(0) scale(1)',
          transition: 'all 0.38s cubic-bezier(0.34,1.1,0.64,1)',
          color: isActive || isLast ? '#8B1A1A' : '#555',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: isMobile ? 11 : 12.5, fontWeight: 600,
          whiteSpace: 'nowrap', cursor: 'default',
          backdropFilter: isActive ? 'blur(4px)' : 'none',
          WebkitBackdropFilter: isActive ? 'blur(4px)' : 'none',
        }}>
          {step}
        </div>
        {i < brokenFlow.length - 1 && (
          <svg width={isMobile ? 18 : 24} height="12" viewBox="0 0 24 12" fill="none" style={{ flexShrink: 0 }}>
            <line x1="0" y1="6" x2="15" y2="6"
              stroke={i === brokenActive ? '#8B1A1A' : 'rgba(168,168,168,0.4)'}
              strokeWidth={i === brokenActive ? 1.6 : 1}
              style={{
                transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                filter: i === brokenActive ? 'drop-shadow(0 0 3px rgba(139,26,26,0.65))' : 'none',
              }}
            />
            <path d="M12 2l6 4-6 4"
              stroke={i === brokenActive ? '#8B1A1A' : 'rgba(168,168,168,0.4)'}
              strokeWidth={i === brokenActive ? 1.6 : 1}
              strokeLinecap="square"
              style={{
                transition: 'stroke 0.3s ease',
                filter: i === brokenActive ? 'drop-shadow(0 0 3px rgba(139,26,26,0.65))' : 'none',
              }}
            />
          </svg>
        )}
      </div>
    );
  }

  function renderGoodNode(step, i) {
    const isActive = i === goodActive;
    const isLast = i === goodFlow.length - 1;
    return (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 3 : 5 }}>
        <div style={{
          borderRadius: 999,
          padding: isMobile ? '8px 13px' : '11px 18px',
          border: `1px solid ${
            isActive ? 'rgba(74,222,128,0.55)'
            : isLast  ? 'rgba(31,61,43,0.6)'
            :            'rgba(168,168,168,0.15)'
          }`,
          background: isActive
            ? 'rgba(31,61,43,0.28)'
            : isLast ? '#1F3D2B' : 'rgba(255,255,255,0.04)',
          boxShadow: isActive
            ? '0 0 0 3px rgba(31,61,43,0.2), 0 0 28px 8px rgba(31,61,43,0.24), 0 4px 14px rgba(31,61,43,0.18)'
            : isLast ? '0 0 12px 2px rgba(31,61,43,0.18)' : '0 2px 8px rgba(0,0,0,0.18)',
          transform: isActive ? 'translateY(-5px) scale(1.07)' : 'translateY(0) scale(1)',
          transition: 'all 0.38s cubic-bezier(0.34,1.1,0.64,1)',
          color: isActive || isLast ? '#F4F4F2' : 'rgba(244,244,242,0.45)',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: isMobile ? 11 : 12.5, fontWeight: 600,
          whiteSpace: 'nowrap', cursor: 'default',
        }}>
          {step}
        </div>
        {i < goodFlow.length - 1 && (
          <svg width={isMobile ? 15 : 20} height="12" viewBox="0 0 20 12" fill="none" style={{ flexShrink: 0 }}>
            <line x1="0" y1="6" x2="12" y2="6"
              stroke={i === goodActive ? '#4ade80' : 'rgba(31,61,43,0.4)'}
              strokeWidth={i === goodActive ? 1.6 : 1}
              style={{
                transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                filter: i === goodActive ? 'drop-shadow(0 0 4px rgba(74,222,128,0.8))' : 'none',
              }}
            />
            <path d="M10 2l4 4-4 4"
              stroke={i === goodActive ? '#4ade80' : 'rgba(31,61,43,0.4)'}
              strokeWidth={i === goodActive ? 1.6 : 1}
              strokeLinecap="square"
              style={{
                transition: 'stroke 0.3s ease',
                filter: i === goodActive ? 'drop-shadow(0 0 4px rgba(74,222,128,0.8))' : 'none',
              }}
            />
          </svg>
        )}
      </div>
    );
  }

  return (
    <section id="problem" ref={sectionRef} style={{
      position: 'relative', overflow: 'hidden',
      padding: isMobile ? '72px 22px' : '120px 64px',
      borderTop: '1px solid rgba(168,168,168,0.2)',
    }}>
      <video ref={videoRef} muted loop playsInline autoPlay
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: videoLoaded ? 0.06 : 0,
          transition: 'opacity 2s ease', zIndex: 0,
          filter: 'grayscale(80%) contrast(1.1)',
        }}
        src="uploads/offer-bg.mp4"
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(244,244,242,0.93)', zIndex: 1 }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)',
          transition: 'all 0.6s ease 0.1s',
        }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#8C7A5B' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B' }}>The Problem</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 16 : 72, marginBottom: isMobile ? 36 : 60, alignItems: 'start',
        }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
            color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0,
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s',
          }}>Most property websites stop at attention.</h2>

          <div style={{
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.35s',
          }}>
            {['They show the listing. They wait for the buyer to act.',
              'But interest does not become a viewing by itself.',
              'Without a system, leads get delayed, missed, or forgotten.'].map((text, i) => (
              <p key={i} style={{ fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 14 : 16, color: '#444', lineHeight: 1.75, marginBottom: 10 }}>{text}</p>
            ))}
          </div>
        </div>

        {/* Ghost stat row */}
        {!isMobile && (
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
            marginBottom: -20, position: 'relative', zIndex: 3,
            opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.6s ease 0.45s',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingLeft: 4 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 'clamp(36px,3.5vw,52px)', letterSpacing: '-0.04em',
                color: 'rgba(139,26,26,0.18)', lineHeight: 1, userSelect: 'none' }}>73%</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(139,26,26,0.5)' }}>of leads drop off</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, paddingLeft: 4 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 'clamp(36px,3.5vw,52px)', letterSpacing: '-0.04em',
                color: 'rgba(31,61,43,0.18)', lineHeight: 1, userSelect: 'none' }}>3×</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(31,61,43,0.5)' }}>more viewings booked</span>
            </div>
          </div>
        )}

        {/* Two panels */}
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 12 : 16,
        }}>

          {/* Broken flow panel */}
          <div style={{
            background: '#E8E8E6', border: '1px solid rgba(168,168,168,0.25)',
            padding: isMobile ? '28px 20px 32px' : '36px 36px 40px',
            position: 'relative', overflow: 'hidden',
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'all 0.6s ease 0.5s',
          }}>
            <div style={{
              position: 'absolute', right: -8, bottom: -16,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: 120, letterSpacing: '-0.06em', lineHeight: 1,
              color: 'rgba(139,26,26,0.05)', userSelect: 'none', pointerEvents: 'none',
            }}>73%</div>

            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#A8A8A8', marginBottom: 28,
              position: 'relative' }}>Without a system</div>

            {/* Nodes */}
            <div style={{
              display: 'flex', alignItems: 'center',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              gap: isMobile ? 8 : 6,
              position: 'relative', paddingBottom: 8,
            }}>
              {brokenFlow.map((step, i) => renderBrokenNode(step, i))}
            </div>

            <div style={{ marginTop: 24, fontFamily: "'Inter', sans-serif", fontSize: 12,
              color: '#A8A8A8', lineHeight: 1.6,
              opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 1s' }}>
              Interest never converts. Leads disappear.
            </div>
          </div>

          {/* Good flow panel */}
          <div style={{
            background: '#1A1A1A', border: '1px solid rgba(31,61,43,0.25)',
            padding: isMobile ? '28px 20px 32px' : '36px 36px 40px',
            position: 'relative', overflow: 'hidden',
            opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)',
            transition: 'all 0.6s ease 0.6s',
          }}>
            <div style={{
              position: 'absolute', right: -4, bottom: -16,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: 120, letterSpacing: '-0.06em', lineHeight: 1,
              color: 'rgba(31,61,43,0.15)', userSelect: 'none', pointerEvents: 'none',
            }}>3×</div>

            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8C7A5B', marginBottom: 28,
              position: 'relative' }}>With Binaan</div>

            {/* Nodes */}
            <div style={{
              display: 'flex', alignItems: 'center',
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              gap: isMobile ? 8 : 5,
              position: 'relative', paddingBottom: 8,
            }}>
              {goodFlow.map((step, i) => renderGoodNode(step, i))}
            </div>

            <div style={{ marginTop: 24, fontFamily: "'Inter', sans-serif", fontSize: 12,
              color: '#A8A8A8', lineHeight: 1.6,
              opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 1.1s' }}>
              Every inquiry is captured and moved toward a viewing.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ProblemSection });
