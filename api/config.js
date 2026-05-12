export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://binaan.co');
  res.setHeader('Cache-Control', 'no-store');
  res.json({ openaiKey: process.env.OPENAI_API || '' });
}
