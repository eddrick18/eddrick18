import { createHash, createHmac } from 'node:crypto';

const key = '{portfolio-visitors}:ids';
const register = `
local requests = redis.call('INCR', KEYS[2])
if requests == 1 then redis.call('EXPIRE', KEYS[2], 60) end
if requests > 20 then return -1 end
redis.call('SADD', KEYS[1], ARGV[1])
return redis.call('SCARD', KEYS[1])
`;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  const reply = (status, body) => { res.statusCode = status; res.end(JSON.stringify(body)); };
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return reply(405, {error:'Method not allowed'});
  }
  let visitorId;
  if (req.method === 'POST') {
    if (req.headers.origin !== `https://${req.headers.host}`) return reply(403, {error:'Origin not allowed'});
    if (!req.headers['content-type']?.startsWith('application/json')) return reply(415, {error:'JSON required'});
    try {
      if (Number(req.headers['content-length']) > 1024) return reply(413, {error:'Request too large'});
      let body = req.body;
      if (body === undefined) {
        let raw = '';
        for await (const chunk of req) {
          raw += chunk;
          if (Buffer.byteLength(raw) > 1024) return reply(413, {error:'Request too large'});
        }
        body = JSON.parse(raw);
      } else if (typeof body === 'string') body = JSON.parse(body);
      if (Buffer.byteLength(JSON.stringify(body) || "") > 1024) return reply(413, {error:"Request too large"});
      visitorId = body?.visitorId;
      if (typeof visitorId !== 'string' || !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(visitorId)) return reply(400, {error:'Invalid visitor ID'});
    } catch { return reply(400, {error:'Invalid request'}); }
  }
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return reply(503, {error:'Visitor count unavailable'});
  try {
    let command = ['SCARD', key];
    if (visitorId && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production')) {
      const id = createHash('sha256').update(visitorId.toLowerCase()).digest('hex');
      const ip = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim();
      const bucket = createHmac('sha256', token).update(ip).digest('hex');
      command = ['EVAL', register, 2, key, `{portfolio-visitors}:rate:${bucket}`, id];
    }
    const result = await fetch(url, {
      method:'POST', headers:{Authorization:`Bearer ${token}`, 'Content-Type':'application/json'},
      body:JSON.stringify(command), signal:AbortSignal.timeout(5000),
    });
    if (!result.ok) throw Error('Storage unavailable');
    const data = await result.json();
    if (data.result === -1) { res.setHeader('Retry-After', '60'); return reply(429, {error:'Please try again later'}); }
    if (data.error || !Number.isSafeInteger(data.result) || data.result < 0) throw Error('Invalid count');
    return reply(200, {count:data.result});
  } catch { return reply(503, {error:'Visitor count unavailable'}); }
}
