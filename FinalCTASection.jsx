// FinalCTASection.jsx — Binaan Landing Page

const FinalCTASection = ({ onNavigate }) => (
  <section id="contact" style={{
    background: '#1A1A1A',
    padding: '140px 48px',
    borderTop: '1px solid rgba(168,168,168,0.08)',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Subtle grid texture */}
    <div style={{
      position: 'absolute', inset: 0, opacity: 0.025,
      backgroundImage: 'linear-gradient(rgba(244,244,242,1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,242,1) 1px, transparent 1px)',
      backgroundSize: '72px 72px', pointerEvents: 'none',
    }} />

    {/* Corner bracket watermark */}
    <div style={{ position: 'absolute', bottom: 48, right: 48, opacity: 0.04, pointerEvents: 'none' }}>
      <svg width="180" height="180" viewBox="0 0 32 32" fill="none">
        <path d="M4 4 L4 14 M4 4 L14 4" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
        <path d="M28 28 L28 18 M28 28 L18 28" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
      </svg>
    </div>

    <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>

      {/* Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ display: 'inline-block', width: 28, height: 1, background: '#8C7A5B' }} />
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B',
        }}>Next Step</span>
      </div>

      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: 'clamp(36px, 5vw, 72px)', color: '#F4F4F2',
        letterSpacing: '-0.03em', lineHeight: 1.0,
        marginBottom: 24, maxWidth: 760,
      }}>
        Turn your property traffic into booked viewings.
      </h2>

      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: 18,
        color: '#A8A8A8', lineHeight: 1.7,
        marginBottom: 48, maxWidth: 520,
      }}>
        Send us your current listing or property page. We'll show you where the conversion flow breaks.
      </p>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => onNavigate('contact')} style={{
          background: '#1F3D2B', color: '#F4F4F2', border: 'none',
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
          fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase',
          padding: '17px 40px', borderRadius: 3, cursor: 'pointer',
          boxShadow: '0 0 24px rgba(31,61,43,0.45), 0 8px 24px rgba(0,0,0,0.3)',
          transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background='#244A34'; e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 0 36px rgba(31,61,43,0.6), 0 10px 30px rgba(0,0,0,0.35)'; }}
        onMouseLeave={e => { e.currentTarget.style.background='#1F3D2B'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 0 24px rgba(31,61,43,0.45), 0 8px 24px rgba(0,0,0,0.3)'; }}
        >Book Strategy Call</button>

        <button onClick={() => onNavigate('demo')} style={{
          background: 'transparent', color: '#F4F4F2',
          border: '1px solid rgba(168,168,168,0.4)',
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
          fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase',
          padding: '17px 40px', borderRadius: 3, cursor: 'pointer',
          boxShadow: '0 0 10px rgba(168,168,168,0.1)',
          transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(244,244,242,0.6)'; e.currentTarget.style.transform='translateY(-1px)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(168,168,168,0.4)'; e.currentTarget.style.transform='none'; }}
        >View Demo Experience</button>
      </div>
    </div>
  </section>
);

Object.assign(window, { FinalCTASection });
