const FinalCTASection = ({ onNavigate }) => {
  const ctaSectionRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [ctaVisible, setCtaVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
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

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if(e.isIntersecting){ setCtaVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if(ctaSectionRef.current) observer.observe(ctaSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const h2Words = ['Turn', 'your', 'property', 'traffic', 'into', 'booked', 'viewings.'];

  return (
    <section id="contact" ref={ctaSectionRef} style={{
      background:'#1A1A1A',
      padding: isMobile ? '88px 22px' : '128px 48px',
      borderTop:'1px solid rgba(168,168,168,0.08)',
      position:'relative', overflow:'hidden',
    }}>
      {/* Ambient video */}
      <video ref={videoRef} muted loop playsInline autoPlay
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', objectPosition:'center',
          opacity: videoLoaded ? 1 : 0, transition:'opacity 1.8s ease', zIndex:0,
        }}
        src="uploads/cta-bg.mp4"
      />
      {/* Dark overlay — more transparent than Offer to let video breathe */}
      <div style={{ position:'absolute', inset:0, zIndex:1, background:'rgba(26,26,26,0.72)' }} />

      {/* Corner bracket watermark */}
      {!isMobile && (
        <div style={{ position:'absolute', bottom:40, right:40, opacity:0.04, pointerEvents:'none', zIndex:2 }}>
          <svg width="160" height="160" viewBox="0 0 32 32" fill="none">
            <path d="M4 4 L4 14 M4 4 L14 4" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
            <path d="M28 28 L28 18 M28 28 L18 28" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
          </svg>
        </div>
      )}

      <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>Next Step</span>
        </div>

        {/* Word-by-word h2 reveal */}
        <h2 style={{
          fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
          fontSize: isMobile ? 28 : 'clamp(32px, 4.5vw, 64px)',
          color:'#F4F4F2', letterSpacing:'-0.03em', lineHeight:1.0,
          marginBottom:18, maxWidth: isMobile ? '100%' : 680,
          display:'flex', flexWrap:'wrap', gap:'0.22em',
        }}>
          {h2Words.map((word, i) => (
            <span key={i} style={{
              display:'inline-block',
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'none' : 'translateY(20px)',
              transition:`opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${0.1+i*0.07}s, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${0.1+i*0.07}s`,
            }}>{word}</span>
          ))}
        </h2>

        <p style={{
          fontFamily:"'Inter', sans-serif", fontSize: isMobile ? 14 : 16,
          color:'#A8A8A8', lineHeight:1.7,
          marginBottom: isMobile ? 32 : 44, maxWidth:460,
          opacity: ctaVisible ? 1 : 0,
          transition:'opacity 0.7s ease 0.6s',
        }}>
          Send us your current listing or property page. We'll show you where the conversion flow breaks.
        </p>

        <div style={{ display:'flex', gap:12,
          flexDirection: isMobile ? 'column' : 'row', flexWrap:'wrap',
          alignItems: isMobile ? 'flex-start' : 'center' }}>

          {/* Primary CTA with ring pulse */}
          <div style={{ position:'relative', display:'inline-block', width: isMobile ? '100%' : 'auto' }}>
            {/* Ring pulse div */}
            <div style={{
              position:'absolute', inset:-7, borderRadius:4,
              border:'1.5px solid rgba(31,61,43,0.65)',
              pointerEvents:'none',
              animation:'ringPulse 2.8s ease-out infinite',
            }} />
            <button onClick={() => onNavigate('contact')} style={{
              background:'#1F3D2B', color:'#F4F4F2', border:'none',
              fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
              fontSize:12, letterSpacing:'0.06em', textTransform:'uppercase',
              padding: isMobile ? '14px 28px' : '16px 36px', borderRadius:3, cursor:'pointer',
              boxShadow:'0 0 24px rgba(31,61,43,0.45)',
              transition:'all 180ms cubic-bezier(0.4,0,0.2,1)',
              position:'relative', zIndex:1,
              width: isMobile ? '100%' : 'auto',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#244A34'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#1F3D2B'; }}
            >Book Strategy Call</button>
          </div>

          <button onClick={() => onNavigate('demo')} style={{
            background:'transparent', color:'#F4F4F2',
            border:'1px solid rgba(168,168,168,0.4)',
            fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
            fontSize:12, letterSpacing:'0.06em', textTransform:'uppercase',
            padding: isMobile ? '14px 28px' : '16px 36px', borderRadius:3, cursor:'pointer',
            transition:'all 180ms cubic-bezier(0.4,0,0.2,1)',
            width: isMobile ? '100%' : 'auto',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(244,244,242,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(168,168,168,0.4)'; }}
          >View Demo</button>
        </div>
      </div>

      <style>{`
        @keyframes ringPulse {
          0% { opacity: 0.75; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

Object.assign(window, { FinalCTASection });
