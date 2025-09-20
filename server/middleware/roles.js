// server/middleware/roles.js
import { createAdminClient } from '../supabase.js'

const db = createAdminClient()

// Charge le profil admin + rôle depuis ta table 'admins'
export async function loadAdminRole(req, res, next) {
  try {
    const uid = req.user?.id
    if (!uid) return res.status(401).json({ error: 'No user in request' })

    // Ici, on suppose que 'admins' contient une colonne 'auth_user_id uuid' qui référence auth.users.id
    const { data, error } = await db
      .from('admins')
      .select('id, full_name, role_code')
      .eq('auth_user_id', uid)
      .single()

    if (error || !data) return res.status(403).json({ error: 'Not an admin' })

    req.admin = { id: data.id, name: data.full_name, role: data.role_code } // e.g. 'SUPER_ADMIN'
    next()
  } catch (e) { return res.status(500).json({ error: e.message }) }
}

// Vérifie un rôle minimal requis
export const requireRole = (...allowed) => (req, res, next) => {
  const role = req.admin?.role
  if (!role) return res.status(403).json({ error: 'Admin role required' })
  if (!allowed.includes(role) && !allowed.includes('ANY')) {
    return res.status(403).json({ error: `Forbidden for role ${role}` })
  }
  next()
}
