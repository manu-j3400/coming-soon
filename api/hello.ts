import { VercelRequest, VercelResponse } from "@vercel/node";
// api/hello.ts
export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ 
    message: "Bouncer is active",
    // We check for the key WITHOUT the VITE_ prefix
    env_check: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SECURE" : "MISSING" 
  });
}