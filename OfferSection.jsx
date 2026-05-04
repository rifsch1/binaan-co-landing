const OfferSection = () => {
  const videoRef = React.useRef(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [hoveredCol, setHoveredCol] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  React.useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.playsInline = true;
    const tryPlay = () => vid.play().catch(() => {});
    vid.addEventListener('canplay', tryPlay);
    vid.addEventListener('loadeddata', () => setVideoLoaded(true));
    tryPlay();
    return () => vid.removeEventListener('canplay', tryPlay);
  }, []);

  const columns = [
    {
      label:'Website Layer',
      items:['Premium property landing page','Mobile-responsive layout','Property gallery','Floor plan section','Strong CTA structure'],
      included:['Custom domain setup','Hosting & SSL included','Space Grotesk brand typography','Retina-ready image handling','WhatsApp click-to-chat button'],
    },
    {
      label:'System Layer',
      items:['Inquiry capture form','Agent lead notification','Booking request flow','Automated follow-up logic','Basic lead tracking'],
      included:['WhatsApp auto-reply integration','Email + SMS agent alert','Lead data export (CSV)','Booking calendar link','Viewing confirmation message'],
    },
    {
      label:'Conversion Layer',
      items:['CTA placement','Copy structure','Lead qualification questions','Viewing-focused user flow','Conversion-first structure'],
      included:['Urgency & social proof elements','Buyer intent scoring logic','A/B headline variants','Friction-reduced form design','Above-the-fold CTA audit'],
    },
  ];

  return (
    <section id="offer" style={{
      background:'#1A1A1A',
      padding: isMobile ? '72px 22px' : '112px 48px',
      borderTop:'1px solid rgba(168,168,168,0.08)',
      position:'relative', overflow:'hidden',
    }}>
      {/* Ambient video background */}
      <video ref={videoRef} muted loop playsInline autoPlay
        style={{
          position:'absolute', inset:0, width:'100%', height:'100%',
          objectFit:'cover', objectPosition:'center',
          opacity: videoLoaded ? 1 : 0, transition:'opacity 1.8s ease', zIndex:0,
        }}
        src="uploads/offer-bg.mp4"
      />
      {/* Dark overlay */}
      <div style={{ position:'absolute', inset:0, zIndex:1, background:'rgba(26,26,26,0.91)' }} />

      {/* Content */}
      <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>The Offer</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 12 : 64, alignItems:'start', marginBottom: isMobile ? 28 : 48 }}>
          <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
            fontSize: isMobile ? 24 : 'clamp(26px, 3vw, 44px)',
            color:'#F4F4F2', letterSpacing:'-0.02em', lineHeight:1.1, margin:0 }}>The Property Conversion Website.</h2>
          {!isMobile && (
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:15, color:'#A8A8A8', lineHeight:1.75, margin:0 }}>
              A premium property website with the systems required to capture, respond to, and move inquiries toward booked viewings.
            </p>
          )}
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap:1, background:'rgba(168,168,168,0.08)', marginBottom: isMobile ? 24 : 44 }}>
          {columns.map((col, i) => {
            const isHov = hoveredCol === i;
            const borderTop = isHov
              ? '2px solid #1F3D2B'
              : (i===1 ? '2px solid #1F3D2B' : '2px solid rgba(168,168,168,0.1)');
            return (
              <div key={i}
                onMouseEnter={() => !isMobile && setHoveredCol(i)}
                onMouseLeave={() => !isMobile && setHoveredCol(null)}
                style={{
                  background:'#1A1A1A', padding: isMobile ? '24px 20px' : '32px 28px',
                  borderTop,
                  transform: isHov && !isMobile ? 'translateY(-4px)' : 'none',
                  boxShadow: isHov && !isMobile
                    ? (i===1 ? '0 0 36px rgba(31,61,43,0.35)' : '0 8px 32px rgba(0,0,0,0.3), 0 0 20px rgba(31,61,43,0.15)')
                    : 'none',
                  transition:'all 220ms cubic-bezier(0.4,0,0.2,1)',
                }}>
                <div style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
                  letterSpacing:'0.12em', textTransform:'uppercase',
                  color: i===1 ? '#8C7A5B' : '#666', marginBottom:20 }}>{col.label}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:16 }}>
                  {col.items.map((item, j) => (
                    <div key={j} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0, marginTop:2 }}>
                        <path d="M3 8l4 4 6-7" stroke={i===1?'#1F3D2B':'#A8A8A8'} strokeWidth="1.6" strokeLinecap="square"/>
                      </svg>
                      <span style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:'#A8A8A8', lineHeight:1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Expandable "What's included" */}
                {!isMobile && (
                  <div style={{
                    borderTop:'1px solid rgba(168,168,168,0.1)',
                    paddingTop: isHov ? 14 : 0,
                    maxHeight: isHov ? 220 : 0,
                    overflow:'hidden',
                    opacity: isHov ? 1 : 0,
                    transition:'max-height 200ms ease, opacity 180ms ease, padding-top 200ms ease',
                  }}>
                    <div style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
                      letterSpacing:'0.12em', textTransform:'uppercase',
                      color:'rgba(31,61,43,0.7)', marginBottom:10 }}>What's included</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                      {col.included.map((item, j) => (
                        <div key={j} style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                          <div style={{ width:3, height:3, borderRadius:'50%', background:'#1F3D2B',
                            flexShrink:0, marginTop:6 }} />
                          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:12,
                            color:'rgba(168,168,168,0.7)', lineHeight:1.5 }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap' }}>
          <button onClick={() => window.open('https://wa.me/601172250309?text=Hey%20I%20just%20saw%20your%20property%20system%20demo.%20Curious%20how%20this%20would%20work%20for%20one%20of%20my%20listings.', '_blank', 'noopener,noreferrer')} style={{
            background:'#1F3D2B', color:'#F4F4F2', border:'none',
            fontFamily:"'Space Grotesk', sans-serif", fontWeight:600,
            fontSize:11, letterSpacing:'0.06em', textTransform:'uppercase',
            padding:'13px 28px', borderRadius:3, cursor:'pointer',
            boxShadow:'0 0 18px rgba(31,61,43,0.35)',
            transition:'all 180ms cubic-bezier(0.4,0,0.2,1)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background='#244A34'; }}
          onMouseLeave={e => { e.currentTarget.style.background='#1F3D2B'; }}
          >Message on WhatsApp</button>
          {!isMobile && (
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:'#555' }}>
              One call. We audit your setup and show you exactly where the gap is.
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { OfferSection });
