// Header.jsx — Binaan Landing Page
const BracketMark = ({ size = 28, color = '#F4F4F2' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path d="M4 4 L4 14 M4 4 L14 4" stroke={color} strokeWidth="2.5" strokeLinecap="square"/>
    <path d="M28 28 L28 18 M28 28 L18 28" stroke={color} strokeWidth="2.5" strokeLinecap="square"/>
  </svg>
);

const Header = ({ onNavigate }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    ['Problem', 'problem'],
    ['Demo', 'demo'],
    ['Systems', 'systems'],
    ['Process', 'process'],
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? 'rgba(26,26,26,0.96)' : 'transparent',
      borderBottom: scrolled ? '1px solid rgba(168,168,168,0.12)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 300ms cubic-bezier(0.4,0,0.2,1)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 48px',
        height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button onClick={() => onNavigate('hero')} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 10, padding: 0,
        }}>
          <BracketMark size={24} />
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
            fontSize: 19, color: '#F4F4F2', letterSpacing: '-0.02em',
          }}>BINAAN</span>
        </button>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          {navLinks.map(([label, id]) => (
            <button key={id} onClick={() => onNavigate(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500,
              color: '#A8A8A8', letterSpacing: '0.01em',
              transition: 'color 180ms ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#F4F4F2'}
            onMouseLeave={e => e.currentTarget.style.color = '#A8A8A8'}
            >{label}</button>
          ))}

          <button onClick={() => onNavigate('demo')} style={{
            background: 'transparent', color: '#F4F4F2',
            border: '1px solid rgba(168,168,168,0.5)',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
            fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '8px 18px', borderRadius: 3, cursor: 'pointer',
            transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='#F4F4F2'; e.currentTarget.style.transform='translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(168,168,168,0.5)'; e.currentTarget.style.transform='none'; }}
          >View Demo</button>

          <button onClick={() => onNavigate('contact')} style={{
            background: '#1F3D2B', color: '#F4F4F2', border: 'none',
            fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
            fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '9px 22px', borderRadius: 3, cursor: 'pointer',
            boxShadow: '0 0 18px rgba(31,61,43,0.35), 0 4px 12px rgba(0,0,0,0.3)',
            transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='#244A34'; e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 0 28px rgba(31,61,43,0.5), 0 6px 18px rgba(0,0,0,0.35)'; }}
          onMouseLeave={e => { e.currentTarget.style.background='#1F3D2B'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 0 18px rgba(31,61,43,0.35), 0 4px 12px rgba(0,0,0,0.3)'; }}
          >Book Call</button>
        </nav>
      </div>
    </header>
  );
};

Object.assign(window, { Header, BracketMark });
