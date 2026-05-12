/**
 * BinAI Chat Widget — Standalone floating lead-capture widget for binaan.co
 * Dependencies: React 18 (UMD), no build step required
 * Config (set in index.html before this script):
 *   window.BINAI_OPENAI_KEY   — OpenAI API key
 *   window.BINAI_MAKE_WEBHOOK — Make.com webhook URL
 */

const BINAI_SYSTEM_PROMPT = `You are BinAI, the intelligent lead qualification assistant for Binaan Co. — a premium property development and construction studio based in Brunei, serving clients across Malaysia and Singapore.

Your mission is to engage potential clients in a warm, professional conversation to understand their project needs and collect their contact information for Binaan's team.

INFORMATION TO COLLECT (all 7 required before completing):
1. Full name
2. Email address
3. Phone number (with country code)
4. Project type (e.g., new residential home, commercial building, renovation, interior design, mixed development, government project)
5. Approximate budget in BND or MYR (reassure them rough estimates are fine)
6. Project timeline (when they'd like to start and/or urgency)
7. Project location (city and country)

CONVERSATION STYLE:
- Greet warmly, introduce yourself briefly, explain you're here to understand their project
- Ask 1–2 questions at a time — never list all questions at once
- Acknowledge each answer naturally before moving on
- If an answer is vague, gently ask for clarification with helpful examples
- Keep responses concise and warm (2–4 sentences per message)
- Never reveal you are scoring or qualifying them

WHEN ALL 7 PIECES OF INFORMATION ARE COLLECTED:
Write a warm closing message thanking the client and letting them know Binaan's team will review their requirements and be in touch within 24 hours.

Then on a NEW LINE, output ONLY this exact marker and JSON (the system strips it):
[LEAD_COMPLETE]{"name":"VALUE","email":"VALUE","phone":"VALUE","project_type":"VALUE","budget":"VALUE","timeline":"VALUE","location":"VALUE"}

Use actual values from the conversation. Use "Not provided" only if genuinely missing after asking.`;

function BinAIChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  const apiKey = window.BINAI_OPENAI_KEY || '';
  const webhookUrl = window.BINAI_MAKE_WEBHOOK || '';

  React.useEffect(() => {
    if (open && messages.length === 0) {
      fetchGreeting();
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
      { role: 'user', content: 'Hello' },
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
        temperature: 0.7,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI ${res.status}`);
    const data = await res.json();
    return data.choices[0].message.content;
  }

  async function fetchGreeting() {
    setLoading(true);
    try {
      const text = await callOpenAI([]);
      setMessages([{ role: 'assistant', content: text }]);
    } catch (e) {
      setMessages([{ role: 'assistant', content: "Hello! I'm BinAI. I'm having a moment connecting — please try again shortly." }]);
    }
    setLoading(false);
  }

  async function sendMessage() {
    const userText = input.trim();
    if (!userText || loading || submitted) return;
    setInput('');

    const history = [
      ...messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
      { role: 'user', content: userText },
    ];
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

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
      }

      setMessages(prev => [...prev, { role: 'assistant', content: cleanReply }]);

      if (isComplete && leadData) {
        setSubmitted(true);
        if (webhookUrl) {
          fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...leadData, source: 'Chatbot' }),
          }).catch(() => {});
        }
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having a moment connecting. Please try again." }]);
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  const GREEN = '#1F3D2B';
  const LIGHT_GREEN = '#2A5239';

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, fontFamily: "'Inter', sans-serif" }}>
      {open && (
        <div style={{
          position: 'absolute', bottom: 72, right: 0,
          width: 360, height: 520,
          background: '#111', borderRadius: 16,
          border: '1px solid #2C2C2C',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ background: GREEN, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
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
              color: 'rgba(244,244,242,0.7)', fontSize: 18, cursor: 'pointer', lineHeight: 1,
            }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '9px 13px', borderRadius: 12,
                  background: msg.role === 'user' ? GREEN : '#1E1E1E',
                  color: '#F4F4F2', fontSize: 13.5, lineHeight: 1.55,
                  borderBottomRightRadius: msg.role === 'user' ? 3 : 12,
                  borderBottomLeftRadius: msg.role === 'user' ? 12 : 3,
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 4, padding: '6px 4px' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 7, height: 7, borderRadius: '50%', background: GREEN,
                    animation: `binaiDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            )}
            {submitted && (
              <div style={{
                textAlign: 'center', padding: '10px 16px', marginTop: 4,
                background: 'rgba(31,61,43,0.2)', borderRadius: 10,
                color: 'rgba(244,244,242,0.6)', fontSize: 12,
                border: '1px solid rgba(31,61,43,0.3)',
              }}>
                Enquiry received — our team will be in touch within 24 hours.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #1E1E1E', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading || submitted}
              placeholder={submitted ? 'Enquiry submitted' : 'Type your message…'}
              style={{
                flex: 1, background: '#1A1A1A', border: '1px solid #2C2C2C',
                borderRadius: 8, padding: '8px 12px',
                color: '#F4F4F2', fontSize: 13.5, outline: 'none',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || submitted || !input.trim()}
              style={{
                background: GREEN, border: 'none', borderRadius: 8,
                width: 38, height: 38, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: (loading || submitted || !input.trim()) ? 0.5 : 1,
                flexShrink: 0, transition: 'opacity 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F4F4F2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: 54, height: 54, borderRadius: '50%',
          background: GREEN, border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(31,61,43,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', transition: 'transform 0.15s',
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
        {!open && messages.length === 0 && (
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
