const FinalCTASection = ({ onNavigate }) => {
  const ctaSectionRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [ctaVisible, setCtaVisible] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  const [form, setForm] = React.useState({
    name: '', email: '', phone: '',
    project_type: '', budget: '', timeline: '', location: '', notes: '',
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [formError, setFormError] = React.useState('');

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

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCtaVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ctaSectionRef.current) observer.observe(ctaSectionRef.current);
    return () => observer.disconnect();
  }, []);

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
    setSubmitting(true);
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'Form' }),
        mode: 'no-cors',
      });
      setSubmitted(true);
    } catch (_) {
      setFormError('Something went wrong. Please try again or contact us directly.');
    }
    setSubmitting(false);
  }

  const h2Words = ['Turn', 'your', 'property', 'traffic', 'into', 'booked', 'viewings.'];
  const GREEN = '#1F3D2B';
  const whatsappNum = (window.BINAI_WHATSAPP || '+6738000000').replace(/\D/g, '');
  const whatsappMsg = encodeURIComponent("Hi Binaan, I'd like to discuss my project.");

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(168,168,168,0.15)',
    borderRadius: 6, padding: '10px 14px', color: '#F4F4F2',
    fontSize: 13, outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif", transition: 'border-color 0.15s',
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
      {/* Ambient video background */}
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
            {submitted ? (
              <div style={{
                background: 'rgba(10,10,10,0.80)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(168,168,168,0.12)', borderRadius: 14,
                padding: '48px 32px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>🌱</div>
                <h3 style={{ color: '#F4F4F2', fontSize: 18, fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif", marginBottom: 10 }}>
                  Thank you, {form.name.split(' ')[0]}.
                </h3>
                <p style={{ color: 'rgba(244,244,242,0.55)', fontSize: 14, lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif", marginBottom: 28 }}>
                  We've received your enquiry and will be in touch within 24 hours.
                </p>
                <a
                  href={`https://wa.me/${whatsappNum}?text=${whatsappMsg}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: '#25D366', color: '#fff',
                    padding: '11px 24px', borderRadius: 8,
                    fontSize: 13, fontWeight: 600, textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{
                background: 'rgba(10,10,10,0.80)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(168,168,168,0.12)', borderRadius: 14,
                padding: isMobile ? '28px 20px' : '32px 28px',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="Ahmad Rashid" style={inputStyle} />
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Phone *</label>
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+60 11 1234 5678" style={inputStyle} />
                  </div>
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    placeholder="you@example.com" style={inputStyle} />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Project Type *</label>
                  <select name="project_type" value={form.project_type} onChange={handleChange}
                    style={{ ...inputStyle, cursor: 'pointer' }}>
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
                      style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select range…</option>
                      <option>Below BND 50,000</option>
                      <option>BND 50,000 – 100,000</option>
                      <option>BND 100,000 – 200,000</option>
                      <option>BND 200,000 – 500,000</option>
                      <option>BND 500,000 – 1,000,000</option>
                      <option>Above BND 1,000,000</option>
                    </select>
                  </div>
                  <div style={fieldStyle}>
                    <label style={labelStyle}>Timeline *</label>
                    <select name="timeline" value={form.timeline} onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}>
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
                    placeholder="e.g. Kuala Lumpur, Malaysia" style={inputStyle} />
                </div>

                <div style={fieldStyle}>
                  <label style={labelStyle}>Notes <span style={{ opacity: 0.5 }}>(optional)</span></label>
                  <textarea name="notes" value={form.notes} onChange={handleChange}
                    rows={2} placeholder="Brief description of your project…"
                    style={{ ...inputStyle, resize: 'vertical', minHeight: 60, lineHeight: 1.5 }} />
                </div>

                {formError && (
                  <div style={{ color: '#FF6B6B', fontSize: 12, marginBottom: 12,
                    background: 'rgba(255,107,107,0.08)', padding: '9px 12px', borderRadius: 6 }}>
                    {formError}
                  </div>
                )}

                <button type="submit" disabled={submitting} style={{
                  width: '100%', background: GREEN, color: '#F4F4F2',
                  border: 'none', borderRadius: 6, padding: '13px 0',
                  fontSize: 12, fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.7 : 1, transition: 'opacity 0.2s, background 0.15s',
                  fontFamily: "'Space Grotesk', sans-serif",
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                }}
                onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = '#244A34'; }}
                onMouseLeave={e => { e.currentTarget.style.background = GREEN; }}
                >
                  {submitting ? 'Submitting…' : 'Submit Enquiry'}
                </button>

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
