const Footer = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const navLinks = [['Problem','problem'],['Demo','demo'],['Systems','systems'],['Process','process'],['Contact','contact']];

  return (
    <footer style={{ background:'#111111', borderTop:'1px solid rgba(168,168,168,0.08)',
      padding: isMobile ? '48px 22px 28px' : '56px 48px 32px' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr',
          gap: isMobile ? 36 : 64,
          marginBottom: isMobile ? 36 : 52,
          paddingBottom: isMobile ? 36 : 52,
          borderBottom:'1px solid rgba(168,168,168,0.08)',
        }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <path d="M4 4 L4 14 M4 4 L14 4" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
                <path d="M28 28 L28 18 M28 28 L18 28" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
              </svg>
              <span style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
                fontSize:16, color:'#F4F4F2', letterSpacing:'-0.02em' }}>BINAAN</span>
            </div>
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:'#555',
              lineHeight:1.75, maxWidth:280, marginBottom:20 }}>
              We build the website and the system behind it. Designed to move property interest into booked viewings.
            </p>
            <div style={{ fontFamily:"'Inter', sans-serif", fontSize:11, color:'#444' }}>Malaysia &amp; Singapore</div>
          </div>

          <div>
            <div style={{ fontFamily:"'Inter', sans-serif", fontSize:9, fontWeight:600,
              letterSpacing:'0.12em', textTransform:'uppercase', color:'#8C7A5B', marginBottom:16 }}>Navigation</div>
            <div style={{ display:'flex', flexDirection: isMobile ? 'row' : 'column',
              flexWrap: isMobile ? 'wrap' : 'nowrap', gap: isMobile ? '10px 20px' : 10 }}>
              {navLinks.map(([label, id]) => (
                <button key={id} onClick={() => onNavigate(id)} style={{
                  background:'none', border:'none', cursor:'pointer', padding:0,
                  fontFamily:"'Inter', sans-serif", fontSize:12, color:'#555',
                  textAlign:'left', transition:'color 180ms ease',
                }}
                onMouseEnter={e => e.currentTarget.style.color='#F4F4F2'}
                onMouseLeave={e => e.currentTarget.style.color='#555'}
                >{label}</button>
              ))}
            </div>
          </div>

          {!isMobile && (
            <div>
              <div style={{ fontFamily:"'Inter', sans-serif", fontSize:9, fontWeight:600,
                letterSpacing:'0.12em', textTransform:'uppercase', color:'#8C7A5B', marginBottom:16 }}>Connect</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {[['LinkedIn','#'],['Instagram','#']].map(([label, href]) => (
                  <a key={label} href={href} style={{ fontFamily:"'Inter', sans-serif", fontSize:12,
                    color:'#555', textDecoration:'none', transition:'color 180ms ease' }}
                  onMouseEnter={e => e.currentTarget.style.color='#F4F4F2'}
                  onMouseLeave={e => e.currentTarget.style.color='#555'}
                  >{label}</a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
          flexWrap:'wrap', gap:12 }}>
          <div style={{ fontFamily:"'Inter', sans-serif", fontSize:11, color:'#333' }}>
            © 2026 Binaan Co · Property websites that convert.
          </div>
          <div style={{ fontFamily:"'Inter', sans-serif", fontSize:11, color:'#333' }}>
            Malaysia · Singapore
          </div>
        </div>
      </div>
    </footer>
  );
};

Object.assign(window, { Footer });
