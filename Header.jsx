const BracketMark = ({ size = 28, color = '#F4F4F2' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M4 4 L4 14 M4 4 L14 4" stroke={color} strokeWidth="2.5" strokeLinecap="square"/>
    <path d="M28 28 L28 18 M28 28 L18 28" stroke={color} strokeWidth="2.5" strokeLinecap="square"/>
  </svg>
);

const Header = ({ onNavigate }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); };
  }, []);

  const navLinks = [['Problem','problem'],['Demo','demo'],['Systems','systems'],['Process','process']];

  const handleNav = (id) => { setMenuOpen(false); onNavigate(id); };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: (scrolled || menuOpen) ? 'rgba(26,26,26,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(168,168,168,0.12)' : '1px solid transparent',
      backdropFilter: (scrolled || menuOpen) ? 'blur(16px)' : 'none',
      transition: 'all 300ms cubic-bezier(0.4,0,0.2,1)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: isMobile ? '0 20px' : '0 48px',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={() => handleNav('hero')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 10, padding: 0,
        }}>
          <BracketMark size={22} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 17, color: '#F4F4F2', letterSpacing: '-0.02em',
          }}>BINAAN</span>
        </button>

        {isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => handleNav('contact')} style={{
              background: '#1F3D2B', color: '#F4F4F2', border: 'none',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '8px 14px', borderRadius: 3, cursor: 'pointer',
            }}>Book Call</button>
            <button onClick={() => setMenuOpen(o => !o)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 6, display: 'flex', flexDirection: 'column', gap: 5,
            }}>
              <span style={{ display:'block', width:22, height:1.5, background: menuOpen ? 'transparent' : '#F4F4F2', transition:'all 200ms' }} />
              <span style={{ display:'block', width:22, height:1.5, background:'#F4F4F2', transform: menuOpen ? 'rotate(45deg) translateY(-3px)' : 'none', transition:'all 200ms', marginTop: menuOpen ? 0 : 0 }} />
              <span style={{ display:'block', width:menuOpen ? 22 : 16, height:1.5, background:'#F4F4F2', transform: menuOpen ? 'rotate(-45deg) translateY(3px)' : 'none', transition:'all 200ms' }} />
            </button>
          </div>
        ) : (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {navLinks.map(([label, id]) => (
              <button key={id} onClick={() => onNavigate(id)} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
                color: '#A8A8A8', letterSpacing: '0.01em', transition: 'color 180ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color='#F4F4F2'}
              onMouseLeave={e => e.currentTarget.style.color='#A8A8A8'}
              >{label}</button>
            ))}
            <button onClick={() => onNavigate('demo')} style={{
              background: 'transparent', color: '#F4F4F2',
              border: '1px solid rgba(168,168,168,0.5)',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '8px 16px', borderRadius: 3, cursor: 'pointer',
              transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#F4F4F2'; e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(168,168,168,0.5)'; e.currentTarget.style.transform='none'; }}
            >View Demo</button>
            <button onClick={() => onNavigate('contact')} style={{
              background: '#1F3D2B', color: '#F4F4F2', border: 'none',
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
              fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '9px 20px', borderRadius: 3, cursor: 'pointer',
              boxShadow: '0 0 18px rgba(31,61,43,0.35)',
              transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#244A34'; e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#1F3D2B'; e.currentTarget.style.transform='none'; }}
            >Book Call</button>
          </nav>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={{
          background: 'rgba(18,18,18,0.98)', borderTop: '1px solid rgba(168,168,168,0.1)',
          padding: '20px 20px 24px',
        }}>
          {navLinks.map(([label, id]) => (
            <button key={id} onClick={() => handleNav(id)} style={{
              display: 'block', width: '100%', background: 'none', border: 'none',
              cursor: 'pointer', padding: '14px 0',
              borderBottom: '1px solid rgba(168,168,168,0.07)',
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
              color: '#A8A8A8', textAlign: 'left', letterSpacing: '0.01em',
            }}>{label}</button>
          ))}
        </div>
      )}
    </header>
  );
};

Object.assign(window, { Header, BracketMark });
