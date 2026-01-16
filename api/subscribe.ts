import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Supabase with the SERVICE_ROLE_KEY
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimitBuckets = new Map<string, number[]>();

const getClientIp = (req: VercelRequest) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  const rawIp = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor?.split(',')[0];
  return (rawIp || req.socket.remoteAddress || '127.0.0.1').toString().trim();
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(ip) ?? [];
  const recent = bucket.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitBuckets.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimitBuckets.set(ip, recent);
  return false;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Strict Method Control
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    // 2. Rate limiting (best-effort for serverless)
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many requests' });
    }

    // 3. Paranoid Input Validation
    if (!email || typeof email !== 'string' || email.length > 255) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid security format' });
    }

    // 4. Metadata Extraction & Hashing
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');
    const emailHash = crypto.createHash('sha256').update(email.toLowerCase().trim()).digest('hex');

    // 5. Database Interaction
    // The 'check_rate_limit' trigger in Postgres will handle the Shadow Ban automatically.
    const { error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email: email.toLowerCase().trim(), 
          email_hash: emailHash,
          signup_ip_hash: ipHash,
          user_agent: req.headers['user-agent']?.substring(0, 255)
        }
      ]);

    if (error) {
      // 6. Deception: Return success on duplicate to prevent 'Email Enumeration' attacks
      if (error.code === '23505') {
        return res.status(200).json({ message: 'Success' });
      }
      throw error;
    }

    return res.status(200).json({ message: 'Success' });

  } catch (err) {
    // 7. Silent Logging: Log internally, but never tell the user what went wrong
    console.error('[SECURITY AUDIT ERROR]:', err);
    return res.status(500).json({ error: 'Internal Security Error' });
  }
}