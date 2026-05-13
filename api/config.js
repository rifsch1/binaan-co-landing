export default function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowed = [
    'https://binaan.co',
    'https://www.binaan.co',
  ];
  const isVercelPreview = /https:\/\/[a-z0-9-]+-[a-z0-9]+\.vercel\.app$/.test(origin);
  const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

  if (allowed.includes(origin) || isVercelPreview || isLocalhost) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Cache-Control', 'no-store');
  res.json({ openaiKey: process.env.OPENAI_API || '' });
}
