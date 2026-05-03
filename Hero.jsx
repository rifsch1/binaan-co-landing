const Hero = ({ onNavigate }) => {
  const videoRef = React.useRef(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [headlineVisible, setHeadlineVisible] = React.useState(false);
  const [statsVisible, setStatsVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    const t1 = setTimeout(() => setHeadlineVisible(true), 200);
    const t2 = setTimeout(() => setStatsVisible(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
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

  const words = ['Property', 'websites', 'that', 'turn', 'interest', 'into', 'booked', 'viewings.'];

  const stats = [
    { value: 68, suffix: '%', label: 'Viewing Conversion' },
    { value: 2, prefix: '< ', suffix: 'm', label: 'Lead Response' },
    { value: 3, suffix: '×', label: 'More Inquiries' },
    { value: 24, suffix: '/7', label: 'Always On' },
  ];

  return (
    <section id="hero" style={{
      position: 'relative', width: '100%',
      height: '100vh', minHeight: isMobile ? 600 : 700,
      display: 'flex', flexDirection: 'column',
      background: '#0D0D0D',
    }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <video ref={videoRef} muted loop playsInline autoPlay
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: videoLoaded ? 1 : 0, transition: 'opacity 1.8s ease',
          }}
          src="uploads/Binaan Co Website Hero Video.mp4"
        />
      </div>

      <div style={{ position:'absolute', inset:0, zIndex:1, opacity:0.035,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize:'180px 180px', pointerEvents:'none' }} />

      <div style={{ position:'absolute', inset:0, zIndex:2, background:'rgba(12,12,12,0.52)' }} />

      <div style={{ position:'absolute', top:0, left:0, right:0, height:200, zIndex:3,
        background:'linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)',
        pointerEvents:'none' }} />

      <div style={{ position:'absolute', inset:0, zIndex:3,
        background:'linear-gradient(105deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.65) 38%, rgba(10,10,10,0.2) 62%, transparent 100%)',
        pointerEvents:'none' }} />

      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:180, zIndex:3,
        background:'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 45%, transparent 100%)',
        pointerEvents:'none' }} />

      {!isMobile && (
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:2, zIndex:10,
          background:'linear-gradient(to bottom, transparent 0%, #1F3D2B 30%, #1F3D2B 70%, transparent 100%)',
          opacity: headlineVisible ? 0.7 : 0, transition:'opacity 1s ease 0.5s' }} />
      )}

      <div style={{
        position:'relative', zIndex:10,
        flex:1, display:'flex', alignItems:'center',
        maxWidth:1280, margin:'0 auto', width:'100%',
        padding: isMobile ? '72px 22px 24px' : '88px 64px 32px',
        minHeight:0,
      }}>
        <div style={{ maxWidth: isMobile ? '100%' : 640 }}>

          <div style={{
            display:'flex', alignItems:'center', gap:10, marginBottom: isMobile ? 20 : 28,
            opacity: headlineVisible ? 1 : 0,
            transform: headlineVisible ? 'none' : 'translateY(12px)',
            transition:'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s',
          }}>
            <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
              letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>Property Conversion Systems</span>
            <span style={{ width:5, height:5, borderRadius:'50%', background:'#1F3D2B',
              boxShadow:'0 0 8px rgba(31,61,43,0.8)', animation:'pulse 2s ease-in-out infinite' }} />
          </div>

          <h1 style={{
            fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
            fontSize: isMobile ? 28 : 'clamp(26px, 2.8vw, 44px)',
            color:'#F4F4F2', letterSpacing:'-0.025em', lineHeight:1.1,
            marginBottom: isMobile ? 14 : 18,
            display:'flex', flexWrap:'wrap', gap:'0.2em',
          }}>
            {words.map((word, i) => (
              <span key={i} style={{
                display:'inline-block',
                opacity: headlineVisible ? 1 : 0,
                transform: headlineVisible ? 'none' : 'translateY(20px)',
                transition:`opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${0.2+i*0.07}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${0.2+i*0.07}s`,
              }}>{word}</span>
            ))}
          </h1>

          <p style={{
            fontFamily:"'Inter', sans-serif",
            fontSize: isMobile ? 14 : 'clamp(13px, 0.9vw, 15px)',
            fontWeight:400, color:'rgba(244,244,242,0.65)', lineHeight:1.7,
            maxWidth: isMobile ? '100%' : 460, marginBottom: isMobile ? 24 : 28,
            opacity: headlineVisible ? 1 : 0,
            transform: headlineVisible ? 'none' : 'translateY(16px)',
            transition:'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.75s',
          }}>
            We build the website and the system behind it. Designed to move property traffic into actual viewing appointments.
          </p>

          <div style={{
            display:'flex', gap:10, alignItems:'center', flexWrap:'wrap',
            marginBottom:8,
            opacity: headlineVisible ? 1 : 0,
            transform: headlineVisible ? 'none' : 'translateY(16px)',
            transition:'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.88s',
          }}>
            <button onClick={() => onNavigate('demo')} style={{
              background:'#1F3D2B', color:'#F4F4F2', border:'none',
              fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
              fontSize:11, letterSpacing:'0.07em', textTransform:'uppercase',
              padding: isMobile ? '13px 24px' : '14px 32px', borderRadius:3, cursor:'pointer',
              boxShadow:'0 0 20px rgba(31,61,43,0.5)',
              transition:'all 180ms cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#244A34'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#1F3D2B'; }}
            >View Demo</button>

            <button onClick={() => onNavigate('problem')} style={{
              background:'transparent', color:'#F4F4F2',
              border:'1px solid rgba(244,244,242,0.25)',
              fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
              fontSize:11, letterSpacing:'0.07em', textTransform:'uppercase',
              padding: isMobile ? '13px 24px' : '14px 32px', borderRadius:3, cursor:'pointer',
              transition:'all 180ms cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(244,244,242,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(244,244,242,0.25)'; }}
            >How It Works</button>
          </div>

          {!isMobile && (
            <p style={{
              fontFamily:"'Inter', sans-serif", fontSize:11,
              color:'rgba(168,168,168,0.5)', letterSpacing:'0.04em',
              opacity: headlineVisible ? 1 : 0, transition:'opacity 0.7s ease 1.1s',
            }}>Built for property agents in Malaysia &amp; Singapore.</p>
          )}
        </div>
      </div>

      <div style={{ position:'relative', zIndex:10, width:'100%', padding: isMobile ? '0 22px' : '0 64px' }}>
        <div style={{
          maxWidth:1280, margin:'0 auto',
          borderTop:'1px solid rgba(244,244,242,0.08)',
          display:'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? '16px 12px' : 0,
          paddingTop:20, paddingBottom: isMobile ? 24 : 28,
        }}>
          {stats.map((stat, i) => (
            <AnimatedStat key={i} stat={stat} index={i} visible={statsVisible} isMobile={isMobile} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity:1; box-shadow:0 0 8px rgba(31,61,43,0.8); }
          50% { opacity:0.5; box-shadow:0 0 16px rgba(31,61,43,0.4); }
        }
      `}</style>
    </section>
  );
};

const AnimatedStat = ({ stat, index, visible, isMobile }) => {
  const [count, setCount] = React.useState(0);
  const started = React.useRef(false);

  React.useEffect(() => {
    if (!visible || started.current) return;
    started.current = true;
    const delay = index * 120;
    const duration = 1400;
    const startTime = performance.now() + delay;
    const target = stat.value;
    const tick = (now) => {
      if (now < startTime) { requestAnimationFrame(tick); return; }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible]);

  const isFirstInRow = isMobile ? (index % 2 === 0) : (index === 0);

  return (
    <div style={{
      paddingLeft: isFirstInRow ? 0 : (isMobile ? 12 : 28),
      borderLeft: isFirstInRow ? 'none' : '1px solid rgba(244,244,242,0.07)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(12px)',
      transition:`opacity 0.6s ease ${0.1+index*0.1}s, transform 0.6s ease ${0.1+index*0.1}s`,
    }}>
      <div style={{
        fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
        fontSize: isMobile ? 22 : 'clamp(18px, 1.8vw, 26px)',
        color:'#F4F4F2', letterSpacing:'-0.02em', lineHeight:1, marginBottom:5,
      }}>
        {stat.prefix||''}{count}{stat.suffix}
      </div>
      <div style={{
        fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:500,
        color:'#A8A8A8', letterSpacing:'0.07em', textTransform:'uppercase',
      }}>{stat.label}</div>
    </div>
  );
};

Object.assign(window, { Hero, AnimatedStat });
