/**
 * BinAI Chat Widget — Standalone floating lead-capture widget for binaan.co
 * Config (set in index.html before this script):
 *   window.BINAI_OPENAI_KEY   — OpenAI API key
 *   window.BINAI_MAKE_WEBHOOK — Make.com webhook URL
 *   window.BINAI_WHATSAPP     — WhatsApp number (e.g. +601172250309)
 */

const BINAI_SYSTEM_PROMPT = `You are BinAI, the intelligent client assistant for Binaan Co. — a premium property development and construction studio based in Brunei, serving clients in Malaysia and Singapore.

---
ABOUT BINAAN CO.
Binaan Co. builds property conversion systems — high-converting landing pages, lead qualification chatbots (like yourself), and automated lead management pipelines — for property developers, contractors, and estate agents. Services include:
• Conversion-optimised property websites
• AI lead qualification chatbots
• Lead tracking dashboards (Google Sheets + automated scoring)
• Make.com automation workflows (email follow-ups, WhatsApp alerts, CRM sync)

Pricing: Project-based. Discovery call → bespoke proposal. Typical range: MYR 5,000–50,000 depending on scope.
Turnaround: Typically 2–4 weeks per project.
Contact: WhatsApp first, then formal proposal. Not accepting walk-ins.
Based: Bandar Seri Begawan, Brunei. Serving MY, SG, BN.

FAQ:
Q: Do you build normal construction projects?
A: No — Binaan Co. focuses on digital systems for property businesses, not physical construction.
Q: Can I see examples?
A: Yes, you're currently on one of Binaan's own demo sites. Book a call and we'll walk you through case studies.
Q: How long does a project take?
A: Most projects deliver within 2–4 weeks after a signed agreement.
Q: Do you offer monthly retainers?
A: Yes — maintenance and optimisation retainers are available post-launch.

---
YOUR ROLE
Your primary role is to answer questions about Binaan's services AND collect enquiry details from potential clients so Binaan's team can follow up.

INFORMATION TO COLLECT (all 8 required before marking complete):
1. Full name
2. Email address
3. WhatsApp number (with country code — e.g. +60 11 1234 5678)
4. Project type (new residential home, commercial building, renovation, interior design, mixed development, government project)
5. Approximate budget in BND, MYR, or SGD (rough estimates are fine)
6. Project timeline (when they'd like to start / urgency)
7. Project location (city and country)
8. Any additional notes or specific requirements (optional — ask once, accept "none" gracefully)

COLLECTION RULES — SOPs:
- Answer FAQs and service questions first before pivoting to data collection
- Never list all questions at once — ask 1–2 at a time in natural flow
- Acknowledge each answer warmly before the next question
- For budget: suggest ranges (e.g. "Under MYR 50k / MYR 50–150k / MYR 150–500k / MYR 500k–1M / Above MYR 1M") — reassure rough estimates are fine
- For project type: offer clear examples if they're unsure
- For timeline: offer options (ASAP / 1–3 months / 3–6 months / 6–12 months / Just exploring)
- For WhatsApp: ask naturally — "What's your WhatsApp number so our team can reach you?"
- For notes: ask "Any other details you'd like to share about your project? No worries if not."
- If a piece of info is unclear, ask once for clarification with examples, then move on
- Never say you are scoring or qualifying them
- Keep messages concise: 2–4 sentences max

WHEN ALL 8 PIECES ARE COLLECTED:
Write a warm closing message: thank them, tell them Binaan's team will review their requirements and reach out on WhatsApp within 24 hours.

Then on a NEW LINE, output EXACTLY this marker and JSON (the UI strips it — never display it):
[LEAD_COMPLETE]{"name":"VALUE","email":"VALUE","phone":"VALUE","project_type":"VALUE","budget":"VALUE","timeline":"VALUE","location":"VALUE","notes":"VALUE"}

Use actual collected values. Use "Not provided" only if genuinely skipped.`;

// Quick-reply chip sets keyed by keyword patterns in the last assistant message
const CHIP_SETS = [
  {
    patterns: [/budget/i, /how much/i, /price range/i, /investment/i, /cost/i],
    chips: ['Under MYR 50k', 'MYR 50k–150k', 'MYR 150k–500k', 'MYR 500k–1M', 'Above MYR 1M'],
  },
  {
    patterns: [/timeline/i, /when.*start/i, /start.*when/i, /time.*frame/i, /urgency/i, /looking to/i],
    chips: ['ASAP', '1–3 months', '3–6 months', '6–12 months', 'Just exploring'],
  },
  {
    patterns: [/type of project/i, /kind of project/i, /what.*project/i, /project type/i, /what are you/i, /what kind/i],
    chips: ['New Home', 'Commercial', 'Renovation', 'Interior Design', 'Mixed Development', 'Government'],
  },
];

function getChipsForMessage(text) {
  if (!text) return [];
  for (const set of CHIP_SETS) {
    if (set.patterns.some(p => p.test(text))) return set.chips;
  }
  return [];
}

function BinAIChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [leadComplete, setLeadComplete] = React.useState(false);
  const [btnHover, setBtnHover] = React.useState(false);
  const messagesEndRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const openedOnce = React.useRef(false);

  const apiKey = window.BINAI_OPENAI_KEY || '';
  const webhookUrl = window.BINAI_MAKE_WEBHOOK || '';

  // Fetch greeting on first open
  React.useEffect(() => {
    if (open && !openedOnce.current) {
      openedOnce.current = true;
      fetchGreeting();
    }
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 320);
    }
  }, [open]);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  async function callOpenAI(history) {
    const openaiMessages = [
      { role: 'system', content: BINAI_SYSTEM_PROMPT },
      ...history,
    ];
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openaiMessages,
        temperature: 0.72,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const data = await res.json();
    return data.choices[0].message.content;
  }

  async function fetchGreeting() {
    setLoading(true);
    try {
      const text = await callOpenAI([
        { role: 'user', content: 'Hi' },
      ]);
      setMessages([{ role: 'assistant', content: text }]);
    } catch (_) {
      setMessages([{ role: 'assistant', content: "Hi there! I'm BinAI. I'm having a brief connection issue — please try again in a moment." }]);
    }
    setLoading(false);
  }

  async function sendMessage(overrideText) {
    const userText = (overrideText || input).trim();
    if (!userText || loading) return;
    setInput('');

    const updatedMessages = [...messages, { role: 'user', content: userText }];
    setMessages(updatedMessages);
    setLoading(true);

    const history = updatedMessages.map(m => ({ role: m.role, content: m.content }));

    try {
      const fullText = await callOpenAI(history);
      const isComplete = fullText.includes('[LEAD_COMPLETE]');
      let cleanReply = fullText.trim();
      let leadData = null;

      if (isComplete) {
        const idx = fullText.indexOf('[LEAD_COMPLETE]');
        cleanReply = fullText.slice(0, idx).trim();
        const jsonStr = fullText.slice(idx + '[LEAD_COMPLETE]'.length).trim();
        try { leadData = JSON.parse(jsonStr); } catch (_) {
          const m = jsonStr.match(/\{[\s\S]*\}/);
          if (m) try { leadData = JSON.parse(m[0]); } catch (_) {}
        }
        setLeadComplete(true);
        if (leadData && webhookUrl) {
          fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...leadData, source: 'Chatbot' }),
            mode: 'no-cors',
          }).catch(() => {});
        }
      }

      setMessages(prev => [...prev, { role: 'assistant', content: cleanReply }]);
    } catch (_) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I had a brief issue connecting. Please try again." }]);
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  const lastAiMsg = [...messages].reverse().find(m => m.role === 'assistant');
  const chips = loading || leadComplete ? [] : getChipsForMessage(lastAiMsg ? lastAiMsg.content : '');

  const GREEN = '#1F3D2B';
  const LIGHT_GREEN = '#2A5239';

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, fontFamily: "'Inter', sans-serif" }}>

      {/* Chat panel — always mounted for smooth animation */}
      <div style={{
        position: 'absolute', bottom: 72, right: 0,
        width: 360,
        background: '#111', borderRadius: 16,
        border: '1px solid #2C2C2C',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        // Smooth open/close animation
        maxHeight: open ? 540 : 0,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'max-height 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease',
        transformOrigin: 'bottom right',
      }}>

        {/* Header */}
        <div style={{ background: GREEN, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: LIGHT_GREEN,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, color: '#F4F4F2', fontWeight: 700, flexShrink: 0,
          }}>B</div>
          <div>
            <div style={{ color: '#F4F4F2', fontWeight: 600, fontSize: 14 }}>BinAI Assistant</div>
            <div style={{ color: 'rgba(244,244,242,0.6)', fontSize: 11 }}>Binaan Co. — Property Enquiries</div>
          </div>
          <button onClick={() => setOpen(false)} style={{
            marginLeft: 'auto', background: 'none', border: 'none',
            color: 'rgba(244,244,242,0.7)', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: 4,
          }}>✕</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '82%', padding: '9px 13px', borderRadius: 12,
                background: msg.role === 'user' ? GREEN : '#1E1E1E',
                color: '#F4F4F2', fontSize: 13.5, lineHeight: 1.55,
                borderBottomRightRadius: msg.role === 'user' ? 3 : 12,
                borderBottomLeftRadius: msg.role === 'user' ? 12 : 3,
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: 5, padding: '6px 4px', alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 7, height: 7, borderRadius: '50%', background: GREEN,
                  animation: `binaiDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          )}

          {leadComplete && !loading && (
            <div style={{
              textAlign: 'center', padding: '9px 14px', marginTop: 2,
              background: 'rgba(31,61,43,0.18)', borderRadius: 10,
              color: 'rgba(74,222,128,0.8)', fontSize: 12,
              border: '1px solid rgba(31,61,43,0.3)',
            }}>
              Enquiry received — our team will reach out on WhatsApp within 24 hours.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick-reply chips */}
        {chips.length > 0 && (
          <div style={{
            padding: '6px 12px 4px',
            display: 'flex', flexWrap: 'wrap', gap: 6,
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}>
            {chips.map(chip => (
              <button key={chip} onClick={() => sendMessage(chip)} style={{
                background: 'rgba(31,61,43,0.25)', border: '1px solid rgba(31,61,43,0.5)',
                borderRadius: 20, padding: '5px 12px', cursor: 'pointer',
                color: 'rgba(244,244,242,0.85)', fontSize: 11.5, fontFamily: "'Inter', sans-serif",
                transition: 'background 0.15s, border-color 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(31,61,43,0.5)'; e.currentTarget.style.borderColor = '#2A5239'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(31,61,43,0.25)'; e.currentTarget.style.borderColor = 'rgba(31,61,43,0.5)'; }}
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid #1E1E1E', display: 'flex', gap: 8, flexShrink: 0 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
            placeholder="Type your message…"
            style={{
              flex: 1, background: '#1A1A1A', border: '1px solid #2C2C2C',
              borderRadius: 8, padding: '8px 12px',
              color: '#F4F4F2', fontSize: 13.5, outline: 'none',
              fontFamily: "'Inter', sans-serif",
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              background: GREEN, border: 'none', borderRadius: 8,
              width: 38, height: 38, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: (loading || !input.trim()) ? 0.45 : 1,
              flexShrink: 0, transition: 'opacity 0.2s',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        style={{
          width: 54, height: 54, borderRadius: '50%',
          background: GREEN, border: 'none', cursor: 'pointer',
          boxShadow: btnHover ? '0 6px 28px rgba(31,61,43,0.75)' : '0 4px 20px rgba(31,61,43,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          transform: btnHover ? 'rotate(8deg) scale(1.12)' : 'none',
          transition: 'transform 0.18s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.18s ease',
        }}
      >
        {!open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F4F4F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        )}
        {!open && !leadComplete && (
          <div style={{
            position: 'absolute', top: -2, right: -2,
            width: 10, height: 10, borderRadius: '50%',
            background: '#4CAF82', border: '2px solid #111',
            animation: 'binaiPulse 2s ease-in-out infinite',
          }} />
        )}
      </button>

      <style>{`
        @keyframes binaiDot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        @keyframes binaiPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { BinAIChatWidget });
