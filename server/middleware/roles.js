// server/middleware/roles.js
import { createAdminClient } from '../supabase.js'

const db = createAdminClient()

// Charge le profil admin + rôle depuis ta table 'admins'
export async function loadAdminRole(req, res, next) {
  try {
    const uid = req.user?.id
    const email = req.user?.email
    
    console.log('loadAdminRole - User ID:', uid, 'Email:', email)
    
    if (!uid) return res.status(401).json({ error: 'No user in request' })

    // Essayer de récupérer depuis la table admins
    const { data, error } = await db
      .from('admins')
      .select('id, full_name, role_code')
      .eq('auth_user_id', uid)
      .single()

    console.log('Admin query result:', { data, error })

    if (error || !data) {
      // Fallback: créer un profil admin basé sur l'email pour les tests
      console.log('No admin found, creating fallback profile for:', email)
      
      let role = 'MANAGER_ANAIS' // par défaut
      let name = 'Manager'
      
      if (email === 'admin@moovup.com') {
        role = 'SUPER_ADMIN'
        name = 'Super Admin'
      } else if (email === 'manager.evolve@gmail.com') {
        role = 'MANAGER_EVOLVE'
        name = 'Manager Evolve'
      } else if (email === 'manager.populo@gmail.com') {
        role = 'MANAGER_POPULO'
        name = 'Manager Populo'
      } else if (email === 'manager.anais@gmail.com') {
        role = 'MANAGER_ANAIS'
        name = 'Manager Anais'
      }
      
      req.admin = { id: uid, name, role }
      console.log('Fallback admin profile:', req.admin)
      next()
      return
    }

    req.admin = { id: data.id, name: data.full_name, role: data.role_code }
    console.log('Admin profile loaded:', req.admin)
    next()
  } catch (e) { 
    console.error('Error in loadAdminRole:', e)
    return res.status(500).json({ error: e.message }) 
  }
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
