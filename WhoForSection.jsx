// WhoForSection.jsx — Binaan Landing Page

const WhoForSection = () => {
  const cards = [
    {
      title: 'Property Agents',
      desc: 'For agents promoting premium listings and wanting stronger inquiry flow from every property page.',
    },
    {
      title: 'Real Estate Teams',
      desc: 'For teams that need structured lead handling, faster response systems, and less manual follow-up.',
    },
    {
      title: 'New Launch Marketers',
      desc: 'For property campaigns that need landing pages, lead capture, and follow-up working together.',
    },
    {
      title: 'Boutique Developers',
      desc: 'For property projects that need a premium digital experience and a conversion flow behind it.',
    },
  ];

  return (
    <section id="who" style={{
      background: '#F4F4F2',
      padding: '120px 48px',
      borderTop: '1px solid rgba(168,168,168,0.2)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, background: '#8C7A5B' }} />
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B',
          }}>Built For</span>
        </div>

        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 'clamp(30px, 3.5vw, 52px)', color: '#1A1A1A',
          letterSpacing: '-0.02em', lineHeight: 1.05,
          marginBottom: 56, maxWidth: 560,
        }}>
          Built for agents who need more than a listing page.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'rgba(168,168,168,0.2)' }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              background: '#F4F4F2',
              padding: '36px 28px',
              borderTop: '2px solid transparent',
              transition: 'all 180ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#1A1A1A'; e.currentTarget.style.borderTopColor='#1F3D2B'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#F4F4F2'; e.currentTarget.style.borderTopColor='transparent'; }}
            >
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 18, color: '#1A1A1A', letterSpacing: '-0.01em',
                lineHeight: 1.2, marginBottom: 16,
                transition: 'color 180ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color='#F4F4F2'}
              onMouseLeave={e => e.currentTarget.style.color='#1A1A1A'}
              >{card.title}</div>
              <div style={{ width: 24, height: 1, background: 'rgba(168,168,168,0.4)', marginBottom: 16 }} />
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 14,
                color: '#666', lineHeight: 1.65,
              }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { WhoForSection });
