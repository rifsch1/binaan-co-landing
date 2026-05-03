// Hero.jsx — Binaan Landing Page v2
// Cinematic video hero + staggered word reveal + animated stats

const Hero = ({ onNavigate }) => {
  const videoRef = React.useRef(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [headlineVisible, setHeadlineVisible] = React.useState(false);
  const [statsVisible, setStatsVisible] = React.useState(false);

  // Staggered entrance
  React.useEffect(() => {
    const t1 = setTimeout(() => setHeadlineVisible(true), 200);
    const t2 = setTimeout(() => setStatsVisible(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Force video play
  React.useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.playsInline = true;
    const tryPlay = () => {
      vid.play().catch(() => {});
    };
    vid.addEventListener('canplay', tryPlay);
    vid.addEventListener('loadeddata', () => setVideoLoaded(true));
    tryPlay();
    return () => vid.removeEventListener('canplay', tryPlay);
  }, []);

  const words = ['Property', 'websites', 'that', 'turn', 'interest', 'into', 'booked', 'viewings.'];

  const stats = [
    { value: 68, suffix: '%', label: 'Viewing Conversion Rate' },
    { value: 2, prefix: '< ', suffix: ' min', label: 'Lead Response Time' },
    { value: 3, suffix: '×', label: 'More Qualified Inquiries' },
    { value: 24, suffix: '/7', label: 'System Always On' },
  ];

  return (
    <section id="hero" style={{
      position: 'relative', width: '100%',
      height: '100vh', minHeight: 700,
      display: 'flex', flexDirection: 'column',
      background: '#0D0D0D',
    }}>
      {/* ── Video background — clipped to section ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
        <video
          ref={videoRef}
          muted loop playsInline autoPlay
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            opacity: videoLoaded ? 1 : 0,
            transition: 'opacity 1.8s ease',
          }}
          src="uploads/Binaan Co Website Hero Video.mp4"
        />
      </div>

      {/* ── Animated noise/grain overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
        pointerEvents: 'none',
      }} />

      {/* ── Graphite overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'rgba(12,12,12,0.52)',
      }} />

      {/* ── Top vignette ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 220, zIndex: 3,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Left gradient for text legibility ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'linear-gradient(105deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.65) 38%, rgba(10,10,10,0.2) 62%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Bottom vignette ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, zIndex: 3,
        background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.5) 45%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Subtle scan line animation ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        pointerEvents: 'none',
      }} />

      {/* ── Thin grid overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3, opacity: 0.018,
        backgroundImage: 'linear-gradient(rgba(244,244,242,1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,242,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      {/* ── Animated green accent line (left edge) ── */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, zIndex: 10,
        background: 'linear-gradient(to bottom, transparent 0%, #1F3D2B 30%, #1F3D2B 70%, transparent 100%)',
        opacity: headlineVisible ? 0.7 : 0,
        transition: 'opacity 1s ease 0.5s',
      }} />

      {/* ── Main hero content ── */}
      <div style={{
        position: 'relative', zIndex: 10,
        flex: 1, display: 'flex', alignItems: 'center',
        maxWidth: 1280, margin: '0 auto', width: '100%',
        padding: '88px 64px 32px',
        minHeight: 0,
      }}>
        <div style={{ maxWidth: 680 }}>

          {/* Eyebrow label */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32,
            opacity: headlineVisible ? 1 : 0,
            transform: headlineVisible ? 'none' : 'translateY(12px)',
            transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s',
          }}>
            <span style={{ display: 'inline-block', width: 32, height: 1, background: '#8C7A5B' }} />
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8C7A5B',
            }}>Property Conversion Systems</span>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#1F3D2B',
              boxShadow: '0 0 8px rgba(31,61,43,0.8)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
          </div>

          {/* Animated word-by-word headline */}
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 'clamp(38px, 5vw, 76px)', color: '#F4F4F2',
            letterSpacing: '-0.03em', lineHeight: 1.0,
            marginBottom: 20,
            display: 'flex', flexWrap: 'wrap', gap: '0.22em',
          }}>
            {words.map((word, i) => (
              <span key={i} style={{
                display: 'inline-block',
                opacity: headlineVisible ? 1 : 0,
                transform: headlineVisible ? 'none' : 'translateY(24px)',
                transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${0.2 + i * 0.07}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${0.2 + i * 0.07}s`,
              }}>{word}</span>
            ))}
          </h1>

          {/* Sub */}
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 1.2vw, 18px)',
            fontWeight: 400, color: 'rgba(244,244,242,0.65)', lineHeight: 1.7,
            maxWidth: 480, marginBottom: 32,
            opacity: headlineVisible ? 1 : 0,
            transform: headlineVisible ? 'none' : 'translateY(16px)',
            transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.75s',
          }}>
            We build the website and the system behind it. Designed to move property traffic into actual viewing appointments.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: 10,
            opacity: headlineVisible ? 1 : 0,
            transform: headlineVisible ? 'none' : 'translateY(16px)',
            transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1) 0.88s',
          }}>
            <button onClick={() => onNavigate('demo')} style={{
              background: '#1F3D2B', color: '#F4F4F2', border: 'none',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 12, letterSpacing: '0.07em', textTransform: 'uppercase',
              padding: '15px 36px', borderRadius: 3, cursor: 'pointer',
              boxShadow: '0 0 20px rgba(31,61,43,0.5), 0 6px 20px rgba(0,0,0,0.3)',
              transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#244A34'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 0 32px rgba(31,61,43,0.7), 0 10px 28px rgba(0,0,0,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#1F3D2B'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 0 20px rgba(31,61,43,0.5), 0 6px 20px rgba(0,0,0,0.3)'; }}
            >View Demo Experience</button>

            <button onClick={() => onNavigate('problem')} style={{
              background: 'transparent', color: '#F4F4F2',
              border: '1px solid rgba(244,244,242,0.25)',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 12, letterSpacing: '0.07em', textTransform: 'uppercase',
              padding: '15px 36px', borderRadius: 3, cursor: 'pointer',
              transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(244,244,242,0.7)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.background='rgba(244,244,242,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(244,244,242,0.25)'; e.currentTarget.style.transform='none'; e.currentTarget.style.background='transparent'; }}
            >See How It Works</button>
          </div>

          {/* Trust line */}
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12,
            color: 'rgba(168,168,168,0.5)', letterSpacing: '0.04em',
            opacity: headlineVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 1.1s',
          }}>
            Built for property agents in Malaysia &amp; Singapore.
          </p>
        </div>
      </div>

      {/* ── Animated Stats Bar ── */}
      <div style={{
        position: 'relative', zIndex: 10, width: '100%', padding: '0 64px',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          borderTop: '1px solid rgba(244,244,242,0.08)',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          paddingTop: 24, paddingBottom: 32,
        }}>
          {stats.map((stat, i) => (
            <AnimatedStat
              key={i}
              stat={stat}
              index={i}
              visible={statsVisible}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(31,61,43,0.8); }
          50% { opacity: 0.5; box-shadow: 0 0 16px rgba(31,61,43,0.4); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
};

// Animated stat counter
const AnimatedStat = ({ stat, index, visible }) => {
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

  return (
    <div style={{
      paddingLeft: index === 0 ? 0 : 32,
      borderLeft: index === 0 ? 'none' : '1px solid rgba(244,244,242,0.07)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(12px)',
      transition: `opacity 0.6s ease ${0.1 + index * 0.1}s, transform 0.6s ease ${0.1 + index * 0.1}s`,
    }}>
      <div style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: 'clamp(24px, 2.8vw, 38px)',
        color: '#F4F4F2', letterSpacing: '-0.02em', lineHeight: 1,
        marginBottom: 7,
      }}>
        {stat.prefix || ''}{count}{stat.suffix}
      </div>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 500,
        color: '#A8A8A8', letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>{stat.label}</div>
    </div>
  );
};

Object.assign(window, { Hero, AnimatedStat });
