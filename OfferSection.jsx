// OfferSection.jsx — Binaan Landing Page

const OfferSection = () => {
  const columns = [
    {
      label: 'Website Layer',
      items: [
        'Premium property landing page',
        'Mobile-responsive layout',
        'Property gallery',
        'Floor plan and details section',
        'Strong CTA structure',
      ],
    },
    {
      label: 'System Layer',
      items: [
        'Inquiry capture form',
        'Agent lead notification',
        'Booking request flow',
        'Automated follow-up logic',
        'Basic lead tracking setup',
      ],
    },
    {
      label: 'Conversion Layer',
      items: [
        'CTA placement',
        'Copy structure',
        'Lead qualification questions',
        'Viewing-focused user flow',
        'Conversion-first page structure',
      ],
    },
  ];

  return (
    <section id="offer" style={{
      background: '#1A1A1A',
      padding: '120px 48px',
      borderTop: '1px solid rgba(168,168,168,0.08)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, background: '#8C7A5B' }} />
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B',
          }}>The Offer</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start', marginBottom: 64 }}>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 'clamp(30px, 3.5vw, 52px)', color: '#F4F4F2',
            letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0,
          }}>
            The Property Conversion Website.
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 17,
            color: '#A8A8A8', lineHeight: 1.75, margin: 0,
          }}>
            A premium property website with the systems required to capture, respond to, and move inquiries toward booked viewings.
          </p>
        </div>

        {/* 3 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(168,168,168,0.08)', marginBottom: 56 }}>
          {columns.map((col, i) => (
            <div key={i} style={{
              background: '#1A1A1A',
              padding: '36px 32px',
              borderTop: i === 1 ? '2px solid #1F3D2B' : '2px solid rgba(168,168,168,0.1)',
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: i === 1 ? '#8C7A5B' : '#666',
                marginBottom: 24,
              }}>{col.label}</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {col.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <path d="M3 8l4 4 6-7" stroke={i === 1 ? '#1F3D2B' : '#A8A8A8'} strokeWidth="1.6" strokeLinecap="square"/>
                    </svg>
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 14,
                      color: '#A8A8A8', lineHeight: 1.5,
                    }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button style={{
            background: '#1F3D2B', color: '#F4F4F2', border: 'none',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
            fontSize: 12, letterSpacing: '0.06em', textTransform: 'uppercase',
            padding: '15px 36px', borderRadius: 3, cursor: 'pointer',
            boxShadow: '0 0 18px rgba(31,61,43,0.35), 0 6px 18px rgba(0,0,0,0.25)',
            transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='#244A34'; e.currentTarget.style.transform='translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='#1F3D2B'; e.currentTarget.style.transform='none'; }}
          >Book Strategy Call</button>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#555' }}>
            One call. We audit your setup and show you exactly where the gap is.
          </span>
        </div>

      </div>
    </section>
  );
};

Object.assign(window, { OfferSection });
