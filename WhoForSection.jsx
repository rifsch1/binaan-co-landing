const WhoForSection = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const cards = [
    { title:'Property Agents', desc:'Agents promoting premium listings wanting stronger inquiry flow from every property page.' },
    { title:'Real Estate Teams', desc:'Teams that need structured lead handling, faster response, and less manual follow-up.' },
    { title:'New Launch Marketers', desc:'Property campaigns that need landing pages, lead capture, and follow-up working together.' },
    { title:'Boutique Developers', desc:'Property projects needing a premium digital experience and a conversion flow behind it.' },
  ];

  return (
    <section id="who" style={{
      background:'#F4F4F2',
      padding: isMobile ? '72px 22px' : '112px 48px',
      borderTop:'1px solid rgba(168,168,168,0.2)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>Built For</span>
        </div>
        <h2 style={{
          fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
          fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
          color:'#1A1A1A', letterSpacing:'-0.02em', lineHeight:1.1,
          marginBottom: isMobile ? 28 : 44, maxWidth:480,
        }}>Built for agents who need more than a listing page.</h2>
        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
          gap:1, background:'rgba(168,168,168,0.2)',
        }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              background:'#F4F4F2', padding: isMobile ? '24px 16px' : '32px 24px',
              borderTop:'2px solid transparent', transition:'all 180ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='#1A1A1A'; e.currentTarget.style.borderTopColor='#1F3D2B'; e.currentTarget.querySelector('.card-title').style.color='#F4F4F2'; }}
            onMouseLeave={e => { e.currentTarget.style.background='#F4F4F2'; e.currentTarget.style.borderTopColor='transparent'; e.currentTarget.querySelector('.card-title').style.color='#1A1A1A'; }}
            >
              <div className="card-title" style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
                fontSize: isMobile ? 13 : 16, color:'#1A1A1A', letterSpacing:'-0.01em',
                lineHeight:1.2, marginBottom:12, transition:'color 180ms ease' }}>{card.title}</div>
              <div style={{ width:20, height:1, background:'rgba(168,168,168,0.4)', marginBottom:12 }} />
              <div style={{ fontFamily:"'Inter', sans-serif", fontSize: isMobile ? 12 : 13,
                color:'#666', lineHeight:1.65 }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { WhoForSection });
