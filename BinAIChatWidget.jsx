// BinAIChatWidget.jsx — floating AI lead chatbot for binaan.co
// Calls Gemini REST API directly from the browser (static site, no backend needed).
// ⚠️  API key is browser-visible. Rotate at aistudio.google.com after each demo cycle.

const BINAI_SYSTEM_PROMPT = `You are BinAI, the intelligent lead qualification assistant for Binaan Co. — a premium property development and construction studio based in Brunei, serving clients across Malaysia and Singapore.

Your mission is to engage potential clients in a warm, professional conversation to understand their project needs and collect their contact information for Binaan's sales team.

INFORMATION TO COLLECT (all 7 required before completing):
1. Full name
2. Email address
3. Phone number (with country code)
4. Project type (e.g., new residential home, commercial building, renovation, interior design, mixed development)
5. Approximate budget in BND or MYR (rough estimates are perfectly fine)
6. Project timeline (when they'd like to start and/or how urgent it is)
7. Project location (city and country)

CONVERSATION STYLE:
- Start with a warm, welcoming greeting that explains who you are and how you can help
- Ask 1-2 questions at a time — never dump all questions at once
- Acknowledge each answer naturally before moving to the next topic
- If answers are vague, gently ask for clarification with helpful examples
- Be empathetic and show genuine interest in their project
- Keep responses concise but warm (3-5 sentences per message)
- Never reveal that you are scoring or qualifying them

WHEN ALL 7 PIECES OF INFORMATION ARE COLLECTED:
Write a warm closing message thanking the client and letting them know Binaan's team will review their requirements and be in touch within 24 hours.

Then, on a NEW LINE immediately after your closing, output ONLY this marker and JSON (the system strips it — users will not see it):
[LEAD_COMPLETE]{"name": "VALUE", "email": "VALUE", "phone": "VALUE", "project_type": "VALUE", "budget": "VALUE", "timeline": "VALUE", "location": "VALUE"}`;

const BINAI_SCORING_PROMPT = (lead) => `You are an expert lead scoring analyst for Binaan Co., a premium property development and construction studio in Brunei.

Score this lead 0-100 using:
- Budget alignment (30pts): 500k+ BND/MYR=30, 200-500k=22, 100-200k=14, 50-100k=8, below 50k=3
- Project type fit (25pts): commercial/mixed dev=25, new residential=20, major reno=15, minor reno=8, unclear=3
- Timeline urgency (20pts): 1-3 months=20, 3-6 months=15, 6-12 months=10, 12+ months=4
- Information quality (15pts): all 7 fields=15, 5-6=10, 3-4=5, fewer=2
- Geographic fit (10pts): Brunei/Malaysia=10, Singapore=9, other SEA=6, other=3

Hot(70-100): contact within 2 hours | Warm(40-69): follow up 48h | Cold(0-39): nurture

Lead: ${JSON.stringify(lead)}

Respond with ONLY valid JSON, no markdown:
{"score":<integer>,"classification":"<Hot|Warm|Cold>","reasoning":"<2-3 sentences>","follow_up_message":"<personalised ready-to-send message>","recommended_action":"<specific next step>","key_strengths":["<s1>"],"concerns":["<c1>"]}`;

// ─── Colours matching Binaan brand ────────────────────────────────────────────
const BC = {
  bg: '#1A1A1A', surface: '#222', surface2: '#1E1E1E',
  border: '#2C2C2C', green: '#1F3D2B', greenHover: '#2A5038',
  text: '#F4F4F2', muted: '#888',
};

const CLS_STYLE = {
  Hot:  { bg: 'rgba(239,68,68,0.15)',   color: '#f87171', border: 'rgba(239,68,68,0.3)' },
  Warm: { bg: 'rgba(245,158,11,0.15)',  color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  Cold: { bg: 'rgba(59,130,246,0.15)',  color: '#60a5fa', border: 'rgba(59,130,246,0.3)' },
};

// ─── Helper: call Gemini REST API ────────────────────────────────────────────
async function binaiCallGemini(displayMessages, systemPrompt, temperature = 0.7) {
  const apiKey = window.BINAI_API_KEY || '';
  const model  = 'gemini-2.5-flash';

  // Build contents: prepend a silent trigger so history always starts with 'user'
  const contents = [
    { role: 'user', parts: [{ text: 'Hello' }] },  // silent trigger
    ...displayMessages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
  ];

  const body = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: { temperature, maxOutputTokens: 600 },
  };

  const res  = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.candidates[0].content.parts[0].text;
}

// ─── Helper: parse [LEAD_COMPLETE] marker ────────────────────────────────────
function binaiParseComplete(text) {
  const MARKER = '[LEAD_COMPLETE]';
  if (!text.includes(MARKER)) return { reply: text.trim(), lead: null };
  const idx    = text.indexOf(MARKER);
  const reply  = text.slice(0, idx).trim();
  const jsonStr = text.slice(idx + MARKER.length).trim();
  try   { return { reply, lead: JSON.parse(jsonStr) }; }
  catch { return { reply, lead: null }; }
}

// ─── Helper: save lead to Google Apps Script (fire-and-forget) ───────────────
function binaiSaveToSheets(leadData, scoreResult) {
  const url = window.BINAI_SHEETS_URL;
  if (!url) return;
  try {
    const payload = encodeURIComponent(JSON.stringify({
      ...leadData,
      score: scoreResult.score,
      classification: scoreResult.classification,
      reasoning: scoreResult.reasoning,
      follow_up_message: scoreResult.follow_up_message,
      recommended_action: scoreResult.recommended_action,
      key_strengths: (scoreResult.key_strengths || []).join(', '),
      concerns: (scoreResult.concerns || []).join(', '),
    }));
    fetch(`${url}?data=${payload}`, { mode: 'no-cors' }).catch(() => {});
  } catch (e) { console.warn('BinAI: Sheets save error', e); }
}

// ─── Main widget component ────────────────────────────────────────────────────
function BinAIChatWidget() {
  const [isOpen,      setIsOpen]      = React.useState(false);
  const [messages,    setMessages]    = React.useState([]);
  const [input,       setInput]       = React.useState('');
  const [loading,     setLoading]     = React.useState(false);
  const [initing,     setIniting]     = React.useState(false);
  const [isComplete,  setIsComplete]  = React.useState(false);
  const [leadResult,  setLeadResult]  = React.useState(null);
  const [newMsgDot,   setNewMsgDot]   = React.useState(false);

  const bottomRef   = React.useRef(null);
  const inputRef    = React.useRef(null);
  const initialized = React.useRef(false);

  // Auto-scroll
  React.useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 60);
  }, [messages, loading]);

  // Open/close
  React.useEffect(() => {
    if (isOpen) {
      setNewMsgDot(false);
      setTimeout(() => inputRef.current?.focus(), 120);
      if (!initialized.current) { initialized.current = true; initChat(); }
    }
  }, [isOpen]);

  const initChat = async () => {
    setIniting(true);
    try {
      const text    = await binaiCallGemini([], BINAI_SYSTEM_PROMPT);
      const { reply } = binaiParseComplete(text);
      setMessages([{ role: 'assistant', content: reply }]);
    } catch {
      setMessages([{ role: 'assistant', content: "Hi! I'm BinAI from Binaan Co. I'm here to help you get started with your project. Could you tell me your name?" }]);
    }
    setIniting(false);
  };

  const send = async () => {
    if (!input.trim() || loading || isComplete) return;
    const userMsg  = { role: 'user', content: input.trim() };
    const updated  = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    try {
      const text            = await binaiCallGemini(updated, BINAI_SYSTEM_PROMPT);
      const { reply, lead } = binaiParseComplete(text);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      if (!isOpen) setNewMsgDot(true);

      if (lead) {
        setIsComplete(true);
        // Score lead
        try {
          const scoreRaw = await binaiCallGemini(
            [{ role: 'user', content: BINAI_SCORING_PROMPT(lead) }],
            'You are a JSON-only scoring assistant. Respond with only valid JSON.',
            0.3
          );
          const clean = scoreRaw.trim().replace(/^```json\s*/, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
          const score = JSON.parse(clean);
          setLeadResult({ lead_data: lead, score_result: score });
          binaiSaveToSheets(lead, score);
        } catch (e) {
          console.warn('BinAI scoring error:', e);
          setLeadResult({ lead_data: lead, score_result: null });
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting right now. Please try again in a moment." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const sr       = leadResult?.score_result;
  const clsStyle = sr ? (CLS_STYLE[sr.classification] || {}) : {};

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes binaiPop {
          from { opacity:0; transform: translateY(14px) scale(0.95); }
          to   { opacity:1; transform: none; }
        }
        @keyframes binaiDot {
          0%,60%,100% { transform:translateY(0); opacity:.45; }
          30%          { transform:translateY(-5px); opacity:1; }
        }
        #binai-input:focus { outline: none; border-color: #2A5038 !important; }
        #binai-send:hover:not(:disabled) { background: #2A5038 !important; }
        #binai-btn:hover { background: #2A5038 !important; }
      `}</style>

      {/* ── Floating trigger button ── */}
      <button
        id="binai-btn"
        onClick={() => setIsOpen(o => !o)}
        title="Chat with BinAI"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 99990,
          width: 56, height: 56, borderRadius: '50%',
          background: BC.green, border: 'none', cursor: 'pointer',
          boxShadow: '0 6px 24px rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.2s',
        }}
      >
        {newMsgDot && (
          <div style={{
            position: 'absolute', top: 6, right: 6,
            width: 10, height: 10, borderRadius: '50%',
            background: '#ef4444', border: '2px solid #1A1A1A',
          }} />
        )}
        {isOpen ? (
          // X icon
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke={BC.text} strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
          </svg>
        ) : (
          // Chat bubble icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill={BC.text}>
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        )}
      </button>

      {/* ── Chat panel ── */}
      {isOpen && (
        <div style={{
          position: 'fixed', bottom: 92, right: 24, zIndex: 99989,
          width: 360, maxHeight: 540,
          background: BC.bg, border: `1px solid ${BC.border}`,
          borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.65)',
          display: 'flex', flexDirection: 'column',
          fontFamily: '"Inter", system-ui, sans-serif',
          animation: 'binaiPop 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        }}>

          {/* Header */}
          <div style={{
            background: BC.surface2, borderBottom: `1px solid ${BC.border}`,
            padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 10,
            flexShrink: 0,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: BC.green,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: BC.text, flexShrink: 0,
            }}>B</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: BC.text }}>BinAI Assistant</div>
              <div style={{ fontSize: 11, color: BC.muted, display: 'flex', alignItems: 'center', gap: 5, marginTop: 1 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
                Online · Binaan Co.
              </div>
            </div>
            {isComplete && (
              <div style={{
                fontSize: 10, fontWeight: 600, color: '#4ade80',
                background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)',
                padding: '3px 9px', borderRadius: 20,
              }}>✓ Received</div>
            )}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 0 }}>
            {initing ? (
              <div style={{ color: BC.muted, fontSize: 12, textAlign: 'center', margin: 'auto' }}>
                Connecting…
              </div>
            ) : (
              <>
                {messages.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 8,
                    flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                  }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                      background: m.role === 'assistant' ? BC.green : '#2C2C2C',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700, color: BC.text,
                    }}>{m.role === 'assistant' ? 'B' : 'U'}</div>
                    <div style={{
                      maxWidth: '76%', padding: '9px 13px', fontSize: 13, lineHeight: 1.55,
                      borderRadius: 14,
                      borderBottomLeftRadius:  m.role === 'assistant' ? 4 : 14,
                      borderBottomRightRadius: m.role === 'user'      ? 4 : 14,
                      background: m.role === 'assistant' ? BC.surface : BC.green,
                      color: BC.text,
                    }}>{m.content}</div>
                  </div>
                ))}

                {loading && (
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: BC.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: BC.text, flexShrink: 0 }}>B</div>
                    <div style={{ background: BC.surface, padding: '10px 14px', borderRadius: 14, borderBottomLeftRadius: 4, display: 'flex', gap: 5 }}>
                      {[0,1,2].map(n => (
                        <div key={n} style={{ width: 7, height: 7, borderRadius: '50%', background: BC.muted, animation: `binaiDot 1.2s ${n * 0.18}s infinite ease-in-out` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </>
            )}
          </div>

          {/* Score strip */}
          {sr && (
            <div style={{
              background: BC.surface2, borderTop: `1px solid ${BC.border}`,
              padding: '9px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 11, color: BC.muted }}>Lead score</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: BC.text }}>{sr.score}<span style={{ fontSize: 12, color: BC.muted, fontWeight: 400 }}>/100</span></span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: clsStyle.bg, color: clsStyle.color, border: `1px solid ${clsStyle.border}` }}>{sr.classification}</span>
              </div>
            </div>
          )}

          {/* Input */}
          <div style={{
            borderTop: `1px solid ${BC.border}`, padding: '10px 12px',
            display: 'flex', gap: 8, flexShrink: 0, background: BC.bg,
          }}>
            <input
              id="binai-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
              disabled={loading || isComplete || initing}
              placeholder={isComplete ? "We'll be in touch soon!" : "Type a message…"}
              style={{
                flex: 1, background: BC.surface, border: `1px solid ${BC.border}`,
                borderRadius: 10, padding: '9px 14px', fontSize: 13,
                color: BC.text, fontFamily: '"Inter", sans-serif',
                opacity: (loading || isComplete || initing) ? 0.45 : 1,
                transition: 'border-color 0.15s',
              }}
            />
            <button
              id="binai-send"
              onClick={send}
              disabled={!input.trim() || loading || isComplete}
              style={{
                background: BC.green, border: 'none', borderRadius: 10,
                width: 38, height: 38, cursor: 'pointer', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: (!input.trim() || loading || isComplete) ? 0.35 : 1,
                transition: 'opacity 0.15s, background 0.15s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke={BC.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
