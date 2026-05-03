const DemoSection = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const [tickerItems, setTickerItems] = React.useState([
    { id:1, text:'New inquiry — Ara Damansara unit', time:'just now', dot:'#1F3D2B' },
    { id:2, text:'Viewing booked — Saturday, 2:00 PM', time:'2m ago', dot:'#8C7A5B' },
    { id:3, text:'Agent notified — Ahmad Razif', time:'4m ago', dot:'#1F3D2B' },
  ]);

  const msgs = [
    { text:'Buyer inquiry — Mont Kiara 3BR', dot:'#1F3D2B' },
    { text:'Viewing confirmed — Bangsar South', dot:'#8C7A5B' },
    { text:'Follow-up sent — lead reactivated', dot:'#1F3D2B' },
    { text:'New lead — Budget RM 850K–1.2M', dot:'#1F3D2B' },
    { text:'Booking request — Sunday 10 AM', dot:'#8C7A5B' },
  ];

  React.useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      const msg = msgs[idx % msgs.length]; idx++;
      setTickerItems(prev => [
        { id:Date.now(), text:msg.text, time:'just now', dot:msg.dot, fresh:true },
        ...prev.slice(0,2).map(item => ({
          ...item, fresh:false,
          time: item.time==='just now'?'1m ago':item.time==='1m ago'?'2m ago':item.time,
        })),
      ]);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const steps = ['Property Page','Buyer Inquiry','Fast Response','Booking','Viewing Booked'];

  return (
    <section id="demo" style={{
      background:'#0F0F0F', padding: isMobile ? '72px 22px' : '120px 64px',
      borderTop:'1px solid rgba(168,168,168,0.07)',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>

        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <span style={{ display:'inline-block', width:24, height:1, background:'#8C7A5B' }} />
          <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
            letterSpacing:'0.14em', textTransform:'uppercase', color:'#8C7A5B' }}>Demo Experience</span>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 12 : 48,
          alignItems:'flex-end', marginBottom: isMobile ? 28 : 48,
        }}>
          <h2 style={{
            fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
            fontSize: isMobile ? 26 : 'clamp(28px, 3.2vw, 48px)',
            color:'#F4F4F2', letterSpacing:'-0.025em', lineHeight:1.05, margin:0,
          }}>See how the system works.</h2>
          {!isMobile && (
            <p style={{ fontFamily:"'Inter', sans-serif", fontSize:15,
              color:'#A8A8A8', lineHeight:1.75, margin:0 }}>
              A premium property page captures attention. The system behind it captures intent, alerts the agent, and moves the buyer toward a booked viewing.
            </p>
          )}
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
          gap:16, alignItems:'stretch',
        }}>
          {/* Browser-frame video */}
          <div style={{
            background:'#141414', border:'1px solid rgba(168,168,168,0.12)',
            borderRadius:4, overflow:'hidden',
            boxShadow:'0 24px 60px rgba(0,0,0,0.7)',
          }}>
            <div style={{
              background:'#1C1C1C', borderBottom:'1px solid rgba(168,168,168,0.08)',
              padding:'10px 16px', display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{ display:'flex', gap:6 }}>
                {['rgba(255,80,80,0.4)','rgba(255,180,0,0.3)','rgba(0,200,80,0.3)'].map((c,i) => (
                  <div key={i} style={{ width:10, height:10, borderRadius:'50%', background:c }} />
                ))}
              </div>
              <div style={{
                flex:1, background:'#252525', border:'1px solid rgba(168,168,168,0.1)',
                borderRadius:3, padding:'4px 10px', display:'flex', alignItems:'center',
                gap:8, maxWidth:320, margin:'0 auto',
              }}>
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="7" width="12" height="8" rx="1" stroke="#555" strokeWidth="1.2"/>
                  <path d="M5 7V5a3 3 0 016 0v2" stroke="#555" strokeWidth="1.2"/>
                </svg>
                <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, color:'#555' }}>demo.binaanco.com</span>
                <div style={{ marginLeft:'auto', width:5, height:5, borderRadius:'50%',
                  background:'#1F3D2B', boxShadow:'0 0 6px rgba(31,61,43,0.9)',
                  animation:'breathe 2s ease-in-out infinite' }} />
              </div>
            </div>

            <div style={{ position:'relative', width:'100%', paddingBottom:'56.25%', background:'#0A0A0A' }}>
              <iframe
                src="demo.html"
                title="Binaan Co — Interactive Demo Experience"
                style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
                allow="autoplay"
              />
            </div>

            <div style={{
              padding:'12px 16px', background:'#161616',
              borderTop:'1px solid rgba(168,168,168,0.07)',
              display:'flex', alignItems:'center', gap:0, overflowX:'auto',
            }}>
              {steps.map((step, i) => (
                <React.Fragment key={i}>
                  <div style={{
                    fontFamily:"'Inter', sans-serif", fontSize:9, fontWeight:500,
                    color: i===steps.length-1 ? '#1F3D2B' : '#555',
                    padding:'5px 10px', whiteSpace:'nowrap',
                    background: i===steps.length-1 ? 'rgba(31,61,43,0.2)' : 'transparent',
                    border: i===steps.length-1 ? '1px solid rgba(31,61,43,0.4)' : '1px solid transparent',
                    letterSpacing:'0.06em', textTransform:'uppercase',
                  }}>{step}</div>
                  {i<steps.length-1 && (
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}>
                      <path d="M4 8h8M8 4l4 4-4 4" stroke="#333" strokeWidth="1.2" strokeLinecap="square"/>
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Sidebar — hidden on mobile */}
          {!isMobile && (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div style={{ background:'#141414', border:'1px solid rgba(168,168,168,0.1)', padding:'18px 18px 14px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                  <span style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
                    letterSpacing:'0.12em', textTransform:'uppercase', color:'#8C7A5B' }}>System Status</span>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:'#1F3D2B',
                      boxShadow:'0 0 8px rgba(31,61,43,1)', animation:'breathe 2s ease-in-out infinite' }} />
                    <span style={{ fontFamily:"'Inter', sans-serif", fontSize:9, color:'#1F3D2B', fontWeight:600, letterSpacing:'0.06em' }}>LIVE</span>
                  </div>
                </div>
                {[['Lead Capture',true],['Response System',true],['Booking Flow',true],['Follow-Up',true]].map(([name]) => (
                  <div key={name} style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'6px 0', borderBottom:'1px solid rgba(168,168,168,0.06)' }}>
                    <span style={{ fontFamily:"'Inter', sans-serif", fontSize:11, color:'#888' }}>{name}</span>
                    <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                      <div style={{ width:4, height:4, borderRadius:'50%', background:'#1F3D2B' }} />
                      <span style={{ fontFamily:"'Inter', sans-serif", fontSize:9, color:'#1F3D2B', letterSpacing:'0.06em' }}>ON</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background:'#141414', border:'1px solid rgba(168,168,168,0.1)', padding:'14px 18px', flex:1, overflow:'hidden' }}>
                <div style={{ fontFamily:"'Inter', sans-serif", fontSize:10, fontWeight:600,
                  letterSpacing:'0.12em', textTransform:'uppercase', color:'#8C7A5B', marginBottom:14 }}>Live Activity</div>
                <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                  {tickerItems.map((item, i) => (
                    <div key={item.id} style={{
                      padding:'9px 0', borderBottom: i<tickerItems.length-1 ? '1px solid rgba(168,168,168,0.06)' : 'none',
                      animation: item.fresh ? 'fadeIn 0.5s ease forwards' : 'none',
                    }}>
                      <div style={{ display:'flex', alignItems:'flex-start', gap:9 }}>
                        <div style={{ width:5, height:5, borderRadius:'50%', background:item.dot,
                          flexShrink:0, marginTop:4, boxShadow:`0 0 5px ${item.dot}` }} />
                        <div>
                          <div style={{ fontFamily:"'Inter', sans-serif", fontSize:11, color:'#D0D0D0',
                            lineHeight:1.4, marginBottom:2 }}>{item.text}</div>
                          <div style={{ fontFamily:"'Inter', sans-serif", fontSize:9, color:'#555' }}>{item.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background:'#1F3D2B', border:'1px solid rgba(31,61,43,0.5)', padding:'18px',
                boxShadow:'0 0 28px rgba(31,61,43,0.25)' }}>
                <div style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
                  fontSize:15, color:'#F4F4F2', marginBottom:6 }}>Ready to see yours?</div>
                <div style={{ fontFamily:"'Inter', sans-serif", fontSize:12, color:'rgba(244,244,242,0.65)',
                  lineHeight:1.6, marginBottom:14 }}>Book a strategy call. We'll audit your setup.</div>
                <button onClick={() => onNavigate('contact')} style={{
                  width:'100%', background:'#F4F4F2', color:'#1A1A1A', border:'none',
                  fontFamily:"'Space Grotesk', sans-serif", fontWeight:700,
                  fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase',
                  padding:'11px', borderRadius:3, cursor:'pointer', transition:'all 180ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.background='#F4F4F2'; }}
                >Book Strategy Call</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes breathe { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.85)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
      `}</style>
    </section>
  );
};

Object.assign(window, { DemoSection });
