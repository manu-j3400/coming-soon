import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Supabase with the SERVICE_ROLE_KEY
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

if (process.env.NODE_ENV === 'production' && process.env.TURNSTILE_SECRET_KEY?.includes('000000000AA')) {
  console.error("CRITICAL: Production is using insecure Testing Keys!");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Strict Method Control
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, token } = req.body;

  try {
    // 2. Turnstile Verification (The Bot Wall)
    const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const verificationResponse = await fetch(verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });

    const verificationData = await verificationResponse.json();

    if (!verificationData.success) {
      return res.status(403).json({ error: 'Security challenge failed' });
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
    // Ensure ip is a string and handle the undefined case
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1').toString();

    // Now .update(ip) will work because ip is definitely a string
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