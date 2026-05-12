const WhoForSection = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [hovered, setHovered] = React.useState(null);

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

  const cards = [
    {
      title: 'Property Agents',
      desc: 'Agents promoting premium listings wanting stronger inquiry flow from every property page.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9,22 9,12 15,12 15,22"/>
        </svg>
      ),
    },
    {
      title: 'Real Estate Teams',
      desc: 'Teams that need structured lead handling, faster response, and less manual follow-up.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      ),
    },
    {
      title: 'New Launch Marketers',
      desc: 'Property campaigns that need landing pages, lead capture, and follow-up working together.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
        </svg>
      ),
    },
    {
      title: 'Boutique Developers',
      desc: 'Property projects needing a premium digital experience and a conversion flow behind it.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="1"/>
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          <line x1="12" y1="12" x2="12" y2="17"/>
          <line x1="9" y1="15" x2="15" y2="15"/>
        </svg>
      ),
    },
  ];

  return (
    <section id="who" ref={sectionRef} style={{
      background: '#F4F4F2',
      padding: isMobile ? '72px 22px' : '112px 48px',
      borderTop: '1px solid rgba(168,168,168,0.2)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(14px)',
          transition: 'all 0.6s ease 0.1s',
        }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#8C7A5B' }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B' }}>Built For</span>
        </div>

        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
          color: '#1A1A1A', letterSpacing: '-0.02em', lineHeight: 1.1,
          marginBottom: isMobile ? 28 : 44, maxWidth: 480,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s',
        }}>Built for agents who need more than a listing page.</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap: 1, background: 'rgba(168,168,168,0.2)',
        }}>
          {cards.map((card, i) => {
            const isHov = hovered === i;
            return (
              <div key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHov ? '#1A1A1A' : '#F4F4F2',
                  padding: isMobile ? '24px 16px 28px' : '36px 28px 40px',
                  borderTop: `2px solid ${isHov ? '#1F3D2B' : 'transparent'}`,
                  cursor: 'default',
                  transition: 'background 220ms ease, border-top-color 220ms ease',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(20px)',
                  transitionProperty: 'background, border-top-color, opacity, transform',
                  transitionDuration: '220ms, 220ms, 0.6s, 0.6s',
                  transitionTimingFunction: 'ease, ease, cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,0.2,1)',
                  transitionDelay: `0ms, 0ms, ${0.3 + i * 0.1}s, ${0.3 + i * 0.1}s`,
                }}
              >
                {/* Icon */}
                <div style={{
                  width: isMobile ? 44 : 52, height: isMobile ? 44 : 52,
                  borderRadius: 10,
                  background: isHov ? 'rgba(31,61,43,0.25)' : 'rgba(168,168,168,0.12)',
                  border: `1px solid ${isHov ? 'rgba(31,61,43,0.5)' : 'rgba(168,168,168,0.25)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isHov ? '#4ade80' : '#888',
                  marginBottom: isMobile ? 16 : 20,
                  transition: 'background 220ms ease, border-color 220ms ease, color 220ms ease, box-shadow 220ms ease',
                  boxShadow: isHov ? '0 0 18px rgba(74,222,128,0.18)' : 'none',
                }}>
                  {card.icon}
                </div>

                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: isMobile ? 13 : 16, letterSpacing: '-0.01em', lineHeight: 1.2,
                  marginBottom: 12,
                  color: isHov ? '#F4F4F2' : '#1A1A1A',
                  transition: 'color 220ms ease',
                }}>{card.title}</div>

                <div style={{
                  width: 20, height: 1,
                  background: isHov ? 'rgba(31,61,43,0.6)' : 'rgba(168,168,168,0.4)',
                  marginBottom: 12,
                  transition: 'background 220ms ease, width 300ms ease',
                  ...(isHov && { width: 36 }),
                }} />

                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 12 : 13,
                  color: isHov ? '#888' : '#666', lineHeight: 1.65,
                  transition: 'color 220ms ease',
                }}>{card.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { WhoForSection });
