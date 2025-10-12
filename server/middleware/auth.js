// // server/middleware/auth.js
// import { createClient } from '@supabase/supabase-js'

// const supabaseAdminAuth = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)

// // Récupère le JWT "Bearer ..." du header
// export const tokenFrom = (req) => (req.headers.authorization || '').split(' ')[1] || null

// // Récupère l'utilisateur Supabase à partir du token
// export async function requireUser(req, res, next) {
//   try {
//     const token = tokenFrom(req)
//     console.log('requireUser - Token:', token ? 'Present' : 'Missing')
    
//     if (!token) return res.status(401).json({ error: 'Missing Authorization header' })

//     const { data, error } = await supabaseAdminAuth.auth.getUser(token)
//     console.log('requireUser - Auth result:', { data, error })
    
//     if (error || !data?.user) return res.status(401).json({ error: 'Invalid token' })

//     req.user = data.user            // { id, email, ... }
//     console.log('requireUser - User set:', req.user)
//     next()
//   } catch (e) {
//     console.error('requireUser - Error:', e)
//     return res.status(401).json({ error: 'Unauthorized' })
//   }
// }



// ================================
// server/middleware/auth.js
import { createClient } from '@supabase/supabase-js'
const supabaseAdminAuth = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE)

export const tokenFrom = (req) => (req.headers.authorization || '').split(' ')[1] || null

export async function requireUser(req, res, next) {
  // 1) Ignore les preflight CORS
  if (req.method === 'OPTIONS') return next()

  // 2) Log utile
  console.log(`[AUTH] ${req.method} ${req.originalUrl}`)

  try {
    const token = tokenFrom(req)
    console.log('requireUser - Token:', token ? 'Present' : 'Missing')

    if (!token) return res.status(401).json({ error: 'Missing Authorization header' })

    const { data, error } = await supabaseAdminAuth.auth.getUser(token)
    console.log('requireUser - Auth result:', { error, userId: data?.user?.id })

    if (error || !data?.user) return res.status(401).json({ error: 'Invalid token' })

    req.user = data.user
    next()
  } catch (e) {
    console.error('requireUser - Error:', e)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
