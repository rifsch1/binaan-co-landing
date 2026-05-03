// SystemsSection.jsx — Binaan Landing Page v2
// Hover-animated cards with staggered entrance

const SystemsSection = () => {
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [active, setActive] = React.useState(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const systems = [
    {
      num: '01',
      title: 'Lead Capture System',
      tagline: 'Turns visitors into qualified inquiries.',
      desc: 'Buyer name, contact, budget range, preferred viewing time, and buying timeline — captured before they leave the page.',
      metric: '100%', metricLabel: 'Inquiries qualified',
    },
    {
      num: '02',
      title: 'Response System',
      tagline: 'Replies before the lead goes cold.',
      desc: 'Instant confirmation, agent notification, lead summary, and next action — sent automatically on every inquiry.',
      metric: '< 2m', metricLabel: 'Average response',
    },
    {
      num: '03',
      title: 'Booking System',
      tagline: 'Moves interest into scheduled viewings.',
      desc: 'Viewing request form, preferred time slots, calendar link, and agent follow-up trigger — all in one flow.',
      metric: '3×', metricLabel: 'More viewings booked',
    },
    {
      num: '04',
      title: 'Follow-Up System',
      tagline: 'Keeps serious buyers warm.',
      desc: 'Reminder messages, re-engagement prompts, missed lead follow-up, and lead status tracking — structured and automated.',
      metric: '0', metricLabel: 'Leads fall through',
    },
  ];

  return (
    <section id="systems" ref={sectionRef} style={{
      background: '#161616',
      padding: '130px 64px',
      borderTop: '1px solid rgba(168,168,168,0.06)',
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
          }}>Systems</span>
        </div>

        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 'clamp(30px, 3.5vw, 52px)', color: '#F4F4F2',
          letterSpacing: '-0.02em', lineHeight: 1.05,
          marginBottom: 56, maxWidth: 560,
          opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)',
          transition: 'all 0.65s cubic-bezier(0.4,0,0.2,1) 0.2s',
        }}>
          Four systems behind every property page.
        </h2>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(255,255,255,0.04)' }}>
          {systems.map((sys, i) => {
            const isHovered = active === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{
                  background: isHovered ? '#1A1A1A' : '#161616',
                  padding: '40px 28px 32px',
                  cursor: 'default',
                  transition: 'background 220ms ease',
                  position: 'relative', overflow: 'hidden',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(32px)',
                  transitionProperty: 'background, opacity, transform',
                  transitionDuration: '220ms, 0.6s, 0.6s',
                  transitionTimingFunction: 'ease, cubic-bezier(0.4,0,0.2,1), cubic-bezier(0.4,0,0.2,1)',
                  transitionDelay: `0ms, ${0.35 + i * 0.1}s, ${0.35 + i * 0.1}s`,
                }}
              >
                {/* Animated top border line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  height: 2,
                  width: isHovered ? '100%' : '0%',
                  background: '#1F3D2B',
                  transition: 'width 320ms cubic-bezier(0.4,0,0.2,1)',
                  boxShadow: isHovered ? '0 0 12px rgba(31,61,43,0.6)' : 'none',
                }} />

                {/* Number */}
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: '#8C7A5B', marginBottom: 20,
                }}>{sys.num}</div>

                {/* Title */}
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: 18, color: '#F4F4F2', letterSpacing: '-0.01em',
                  lineHeight: 1.2, marginBottom: 12,
                }}>{sys.title}</div>

                {/* Divider */}
                <div style={{
                  width: isHovered ? '100%' : '40%', height: 1,
                  background: 'rgba(168,168,168,0.12)',
                  marginBottom: 14,
                  transition: 'width 400ms ease',
                }} />

                {/* Tagline */}
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 14,
                  color: isHovered ? '#D0D0D0' : '#A8A8A8',
                  lineHeight: 1.6, marginBottom: 20,
                  transition: 'color 200ms ease',
                }}>{sys.tagline}</div>

                {/* Expanded detail */}
                <div style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 12,
                  color: '#666', lineHeight: 1.65,
                  maxHeight: isHovered ? 120 : 0,
                  overflow: 'hidden',
                  opacity: isHovered ? 1 : 0,
                  transition: 'max-height 300ms ease, opacity 250ms ease',
                  marginBottom: isHovered ? 20 : 0,
                }}>{sys.desc}</div>

                {/* Metric badge */}
                <div style={{
                  marginTop: 'auto',
                  opacity: isHovered ? 1 : 0.35,
                  transition: 'opacity 250ms ease',
                  display: 'flex', alignItems: 'baseline', gap: 8,
                  paddingTop: 16,
                  borderTop: '1px solid rgba(168,168,168,0.08)',
                }}>
                  <span style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: 28, color: '#F4F4F2', letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}>{sys.metric}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 11,
                    color: '#8C7A5B', letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>{sys.metricLabel}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { SystemsSection });
