/**
 * BinAI Contact Form — standalone lead capture form for binaan.co
 * Submits to Make.com webhook, then shows WhatsApp CTA
 * Config (set in index.html):
 *   window.BINAI_MAKE_WEBHOOK — Make.com webhook URL
 *   window.BINAI_WHATSAPP    — Binaan WhatsApp number e.g. "+6738000000"
 */

const WHATSAPP_NUMBER = (window.BINAI_WHATSAPP || '+6738000000').replace(/\D/g, '');
const WHATSAPP_MSG = encodeURIComponent("Hi Binaan, I'd like to discuss my project.");

function BinAIContactForm() {
  const [form, setForm] = React.useState({
    name: '', email: '', phone: '',
    project_type: '', budget: '', timeline: '', location: '', notes: '',
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');

  const webhookUrl = window.BINAI_MAKE_WEBHOOK || '';

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const required = ['name', 'email', 'phone', 'project_type', 'budget', 'timeline', 'location'];
    for (const key of required) {
      if (!form[key].trim()) {
        setError('Please fill in all required fields.');
        return;
      }
    }
    if (!webhookUrl) { setError('Service temporarily unavailable. Please try again later.'); return; }

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
      setError('Something went wrong. Please try again or contact us directly.');
    }
    setSubmitting(false);
  }

  const GREEN = '#1F3D2B';
  const inputStyle = {
    width: '100%', background: '#1A1A1A', border: '1px solid #2C2C2C',
    borderRadius: 8, padding: '10px 14px', color: '#F4F4F2',
    fontSize: 14, outline: 'none', boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
  };
  const labelStyle = { display: 'block', color: 'rgba(244,244,242,0.7)', fontSize: 13, marginBottom: 6, fontWeight: 500 };
  const fieldStyle = { marginBottom: 18 };

  if (submitted) {
    return (
      <div id="contact" style={{ padding: '80px 24px', maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          background: '#111', border: '1px solid #2C2C2C',
          borderRadius: 16, padding: '48px 36px',
        }}>
          <div style={{ fontSize: 36, marginBottom: 16 }}>🌱</div>
          <h3 style={{ color: '#F4F4F2', fontSize: 22, fontWeight: 600, marginBottom: 10 }}>
            Thank you, {form.name.split(' ')[0]}.
          </h3>
          <p style={{ color: 'rgba(244,244,242,0.6)', fontSize: 15, lineHeight: 1.6, marginBottom: 32 }}>
            We've received your enquiry and will review your requirements. Our team will be in touch within 24 hours.
          </p>
          <p style={{ color: 'rgba(244,244,242,0.5)', fontSize: 13, marginBottom: 20 }}>
            Want to connect directly?
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#25D366', color: '#fff',
              padding: '13px 28px', borderRadius: 10,
              fontSize: 15, fontWeight: 600, textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
              transition: 'transform 0.15s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <section id="contact" style={{ padding: '80px 24px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ color: GREEN, fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Get in Touch
          </p>
          <h2 style={{ color: '#F4F4F2', fontSize: 'clamp(26px, 4vw, 34px)', fontWeight: 700, marginBottom: 14, lineHeight: 1.2 }}>
            Tell us about your project
          </h2>
          <p style={{ color: 'rgba(244,244,242,0.55)', fontSize: 15, lineHeight: 1.6 }}>
            Share your requirements and our team will review and respond within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: '#111', border: '1px solid #2C2C2C',
          borderRadius: 16, padding: '36px 32px',
        }}>
          {/* Row: Name + Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 0 }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Ahmad Rashid" style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Phone *</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+673 8 123 456" style={inputStyle} />
            </div>
          </div>

          {/* Email */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Email Address *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} />
          </div>

          {/* Project Type */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Project Type *</label>
            <select name="project_type" value={form.project_type} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
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

          {/* Budget + Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={fieldStyle}>
              <label style={labelStyle}>Budget Range *</label>
              <select name="budget" value={form.budget} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
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
              <select name="timeline" value={form.timeline} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="">Select timeline…</option>
                <option>ASAP / Within 1 month</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>6–12 months</option>
                <option>12+ months / Exploring</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Project Location *</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Bandar Seri Begawan, Brunei" style={inputStyle} />
          </div>

          {/* Notes */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Additional Notes <span style={{ opacity: 0.5 }}>(optional)</span></label>
            <textarea
              name="notes" value={form.notes} onChange={handleChange}
              rows={3} placeholder="Describe your project, land status, number of floors, or anything helpful…"
              style={{ ...inputStyle, resize: 'vertical', minHeight: 80, lineHeight: 1.5 }}
            />
          </div>

          {error && (
            <div style={{ color: '#FF6B6B', fontSize: 13, marginBottom: 16, background: 'rgba(255,107,107,0.08)', padding: '10px 14px', borderRadius: 8 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%', background: GREEN, color: '#F4F4F2',
              border: 'none', borderRadius: 10, padding: '14px 0',
              fontSize: 15, fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.7 : 1, transition: 'opacity 0.2s',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {submitting ? 'Submitting…' : 'Submit Enquiry'}
          </button>

          <p style={{ textAlign: 'center', color: 'rgba(244,244,242,0.35)', fontSize: 12, marginTop: 14 }}>
            Your details are kept confidential and used only to respond to your enquiry.
          </p>
        </form>
      </div>
    </section>
  );
}
