// Footer.jsx — Binaan Landing Page

const Footer = ({ onNavigate }) => {
  const navLinks = [
    ['Problem', 'problem'],
    ['Demo', 'demo'],
    ['Systems', 'systems'],
    ['Process', 'process'],
    ['Contact', 'contact'],
  ];

  return (
    <footer style={{
      background: '#111111',
      borderTop: '1px solid rgba(168,168,168,0.08)',
      padding: '64px 48px 36px',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
          gap: 80, marginBottom: 64,
          paddingBottom: 64,
          borderBottom: '1px solid rgba(168,168,168,0.08)',
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path d="M4 4 L4 14 M4 4 L14 4" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
                <path d="M28 28 L28 18 M28 28 L18 28" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
              </svg>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 18, color: '#F4F4F2', letterSpacing: '-0.02em',
              }}>BINAAN</span>
            </div>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 14,
              color: '#555', lineHeight: 1.75, maxWidth: 300,
              marginBottom: 28,
            }}>
              We build the website and the system behind it. Designed to move property interest into booked viewings.
            </p>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12,
              color: '#444', letterSpacing: '0.04em',
            }}>Malaysia &amp; Singapore</div>
          </div>

          {/* Nav */}
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#8C7A5B', marginBottom: 20,
            }}>Navigation</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map(([label, id]) => (
                <button key={id} onClick={() => onNavigate(id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  fontFamily: "'Inter', sans-serif", fontSize: 13,
                  color: '#555', textAlign: 'left',
                  transition: 'color 180ms ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color='#F4F4F2'}
                onMouseLeave={e => e.currentTarget.style.color='#555'}
                >{label}</button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#8C7A5B', marginBottom: 20,
            }}>Connect</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['LinkedIn', '#'], ['Instagram', '#']].map(([label, href]) => (
                <a key={label} href={href} style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 13,
                  color: '#555', textDecoration: 'none',
                  transition: 'color 180ms ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color='#F4F4F2'}
                onMouseLeave={e => e.currentTarget.style.color='#555'}
                >{label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12,
            color: '#333', letterSpacing: '0.03em',
          }}>
            © 2026 Binaan Co · Property websites that turn interest into booked viewings.
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12,
            color: '#333', letterSpacing: '0.03em',
          }}>
            Malaysia · Singapore
          </div>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { Footer });
