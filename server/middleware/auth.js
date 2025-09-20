// server/middleware/auth.js
import { createClient } from '@supabase/supabase-js'

const supabaseAdminAuth = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)

// Récupère le JWT "Bearer ..." du header
export const tokenFrom = (req) => (req.headers.authorization || '').split(' ')[1] || null

// Récupère l'utilisateur Supabase à partir du token
export async function requireUser(req, res, next) {
  try {
    const token = tokenFrom(req)
    if (!token) return res.status(401).json({ error: 'Missing Authorization header' })

    const { data, error } = await supabaseAdminAuth.auth.getUser(token)
    if (error || !data?.user) return res.status(401).json({ error: 'Invalid token' })

    req.user = data.user            // { id, email, ... }
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
