const FinalCTASection = ({ onNavigate }) => {
  const ctaSectionRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const loadingIntervalRef = React.useRef(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [ctaVisible, setCtaVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  const [form, setForm] = React.useState({
    name: '', email: '', phone: '',
    project_type: '', budget: '', timeline: '', location: '', notes: '',
  });
  const [submitState, setSubmitState] = React.useState('idle'); // idle | loading | success | error
  const [loadingText, setLoadingText] = React.useState('Loading.');
  const [formError, setFormError] = React.useState('');

  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  React.useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true; vid.playsInline = true;
    const tryPlay = () => vid.play().catch(() => {});
    vid.addEventListener('canplay', tryPlay);
    vid.addEventListener('loadeddata', () => setVideoLoaded(true));
    tryPlay();
    return () => vid.removeEventListener('canplay', tryPlay);
  }, []);

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCtaVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ctaSectionRef.current) obs.observe(ctaSectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Loading dots animation
  React.useEffect(() => {
    if (submitState === 'loading') {
      let dots = 1;
      loadingIntervalRef.current = setInterval(() => {
        dots = dots === 3 ? 1 : dots + 1;
        setLoadingText('Loading' + '.'.repeat(dots));
      }, 420);
    } else {
      clearInterval(loadingIntervalRef.current);
    }
    return () => clearInterval(loadingIntervalRef.current);
  }, [submitState]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');
    const required = ['name', 'email', 'phone', 'project_type', 'budget', 'timeline', 'location'];
    for (const key of required) {
      if (!form[key].trim()) { setFormError('Please fill in all required fields.'); return; }
    }
    const webhookUrl = window.BINAI_MAKE_WEBHOOK || '';
    if (!webhookUrl) { setFormError('Service temporarily unavailable. Please try again later.'); return; }

    setSubmitState('loading');
    // Fire and forget (no-cors returns opaque response)
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, source: 'Form' }),
      mode: 'no-cors',
    }).catch(() => {});
    // Minimum animation time so the dots play meaningfully
    await new Promise(r => setTimeout(r, 2400));
    setSubmitState('success');
  }

  const h2Words = ['Turn', 'your', 'property', 'traffic', 'into', 'booked', 'viewings.'];
  const GREEN = '#1F3D2B';

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(168,168,168,0.15)', borderRadius: 6,
    padding: '10px 14px', color: '#F4F4F2', fontSize: 13,
    outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif", transition: 'border-color 0.15s',
    colorScheme: 'dark',
  };
  const labelStyle = {
    display: 'block', color: 'rgba(244,244,242,0.5)', fontSize: 11,
    marginBottom: 5, fontWeight: 500, letterSpacing: '0.02em',
  };
  const fieldStyle = { marginBottom: 14 };

  return (
    <section id="contact" ref={ctaSectionRef} style={{
      background: '#1A1A1A',
      padding: isMobile ? '88px 22px 80px' : '100px 48px 80px',
      borderTop: '1px solid rgba(168,168,168,0.08)',
      position: 'relative', overflow: 'hidden',
    }}>
      <video ref={videoRef} muted loop playsInline autoPlay
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: videoLoaded ? 1 : 0, transition: 'opacity 1.8s ease', zIndex: 0,
        }}
        src="uploads/cta-bg.mp4"
      />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(26,26,26,0.80)' }} />

      {!isMobile && (
        <div style={{ position: 'absolute', bottom: 40, right: 40, opacity: 0.04, pointerEvents: 'none', zIndex: 2 }}>
          <svg width="160" height="160" viewBox="0 0 32 32" fill="none">
            <path d="M4 4 L4 14 M4 4 L14 4" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
            <path d="M28 28 L28 18 M28 28 L18 28" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="square"/>
          </svg>
        </div>
      )}

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 40 : 80,
          alignItems: 'start',
        }}>

          {/* Left — headline */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: 24, height: 1, background: '#8C7A5B' }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8C7A5B' }}>Next Step</span>
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
              fontSize: isMobile ? 28 : 'clamp(30px, 3.5vw, 52px)',
              color: '#F4F4F2', letterSpacing: '-0.03em', lineHeight: 1.05,
              marginBottom: 18, display: 'flex', flexWrap: 'wrap', gap: '0.22em',
            }}>
              {h2Words.map((word, i) => (
                <span key={i} style={{
                  display: 'inline-block',
                  opacity: ctaVisible ? 1 : 0,
                  transform: ctaVisible ? 'none' : 'translateY(20px)',
                  transition: `opacity 0.55s cubic-bezier(0.4,0,0.2,1) ${0.1 + i * 0.07}s, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${0.1 + i * 0.07}s`,
                }}>{word}</span>
              ))}
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: isMobile ? 14 : 15,
              color: '#A8A8A8', lineHeight: 1.7, maxWidth: 400,
              opacity: ctaVisible ? 1 : 0,
              transition: 'opacity 0.7s ease 0.6s',
            }}>
              Share your project details and our team will review and respond within 24 hours.
            </p>
          </div>

          {/* Right — form */}
          <div style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s',
          }}>
            {submitState === 'success' ? (
              <div style={{
                background: 'rgba(10,10,10,0.82)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(168,168,168,0.12)', borderRadius: 14,
                padding: '52px 32px', textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 22, fontWeight: 700, marginBottom: 16,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#4ade80',
                  textShadow: '0 0 24px rgba(74,222,128,0.7), 0 0 48px rgba(74,222,128,0.3)',
                }}>Enquiry received ✓</div>
                <p style={{
                  color: 'rgba(244,244,242,0.65)', fontSize: 14, lineHeight: 1.7,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  Thank you, {form.name.split(' ')[0]}. We'll contact you on WhatsApp within 48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                background: 'rgba(10,10,10,0.82)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(168,168,168,0.12)', borderRadius: 14,
                padding: isMobile ? '28px 20px' : '32px 28px',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Ahmad Rashid" style={inputStyle}
                      disabled={submitState === 'loading'} />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>WhatsApp Number *</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+60 11 1234 5678" style={inputStyle}
                      disabled={submitState === 'loading'} />
                  </div>
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com" style={inputStyle}
                    disabled={submitState === 'loading'} />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Project Type *</label>
                  <select name="project_type" value={form.project_type} onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    disabled={submitState === 'loading'}>
                    <option value="">Select project type…</option>
                    <option>New Residential Home</option>
                    <option>Commercial Building</option>
                    <option>Major Renovation</option>
                    <option>Interior Design</option>
                    <option>Mixed Development</option>
                    <option>Government Project</option>
                    <option>Other</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Budget *</label>
                    <select name="budget" value={form.budget} onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      disabled={submitState === 'loading'}>
                      <option value="">Select range…</option>
                      <option>Below MYR 50,000</option>
                      <option>MYR 50,000 – 150,000</option>
                      <option>MYR 150,000 – 500,000</option>
                      <option>MYR 500,000 – 1,000,000</option>
                      <option>Above MYR 1,000,000</option>
                      <option>SGD 50,000 – 200,000</option>
                      <option>Above SGD 200,000</option>
                    </select>
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Timeline *</label>
                    <select name="timeline" value={form.timeline} onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      disabled={submitState === 'loading'}>
                      <option value="">Select…</option>
                      <option>ASAP / Within 1 month</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>6–12 months</option>
                      <option>12+ months / Exploring</option>
                    </select>
                  </div>
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Location *</label>
                  <input name="location" value={form.location} onChange={handleChange}
                    placeholder="e.g. Kuala Lumpur, Malaysia"
                    style={inputStyle} disabled={submitState === 'loading'} />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Notes <span style={{ opacity: 0.5 }}>(optional)</span></label>
                  <textarea name="notes" value={form.notes} onChange={handleChange}
                    rows={2} placeholder="Brief description of your project…"
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 60, lineHeight: 1.5 }}
                    disabled={submitState === 'loading'} />
                </div>

                {formError && (
                  <div style={{ color: '#FF6B6B', fontSize: 12, marginBottom: 12,
                    background: 'rgba(255,107,107,0.08)', padding: '9px 12px', borderRadius: 6 }}>
                    {formError}
                  </div>
                )}

                {submitState === 'loading' ? (
                  <div style={{
                    textAlign: 'center', padding: '13px 0',
                    fontFamily: "'Inter', sans-serif", fontSize: 14,
                    color: 'rgba(244,244,242,0.6)', letterSpacing: '0.04em',
                  }}>
                    {loadingText}
                  </div>
                ) : (
                  <button type="submit" style={{
                    width: '100%', background: GREEN, color: '#F4F4F2',
                    border: 'none', borderRadius: 6, padding: '13px 0',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    transition: 'background 0.15s',
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#244A34'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = GREEN; }}
                  >
                    Submit Enquiry
                  </button>
                )}

                <p style={{ textAlign: 'center', color: 'rgba(244,244,242,0.22)', fontSize: 11,
                  marginTop: 12, fontFamily: "'Inter', sans-serif" }}>
                  Kept confidential — used only to respond to your enquiry.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

Object.assign(window, { FinalCTASection });
