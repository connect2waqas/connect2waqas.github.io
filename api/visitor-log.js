/**
 * Vercel Serverless Function: Visitor Log Proxy
 * Keeps Supabase URL and Keys completely hidden from the browser/public DevTools.
 * Accessible at: /api/visitor-log
 */
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Serverless environment variables (SUPABASE_URL, SUPABASE_ANON_KEY) are not set.' });
  }

  // 1. GET: Fetch latest 5 visitor logs
  if (req.method === 'GET') {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/visitor_log?select=id,name,role,message,created_at&order=created_at.desc&limit=5`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: errorText });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // 2. POST: Insert new visitor note
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { name, role, message } = body || {};

      if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required.' });
      }

      // Basic sanitization
      const cleanName = String(name).slice(0, 100).trim();
      const cleanRole = role ? String(role).slice(0, 100).trim() : null;
      const cleanMessage = String(message).slice(0, 1000).trim();

      const response = await fetch(`${supabaseUrl}/rest/v1/visitor_log`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify([{
          name: cleanName,
          role: cleanRole,
          message: cleanMessage
        }])
      });

      if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: errorText });
      }

      const data = await response.json();
      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
