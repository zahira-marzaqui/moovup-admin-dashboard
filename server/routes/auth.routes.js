import { Router } from 'express'
import { ok, bad, fail } from '../utils/http.js'
import { requireUser } from '../middleware/auth.js'
import { loadAdminRole } from '../middleware/roles.js'

const r = Router()

// GET /api/auth/profile - Récupérer le profil de l'admin connecté
r.get('/profile',
  requireUser,
  loadAdminRole,
  async (req, res) => {
    try {
      // req.admin est défini par loadAdminRole middleware
      return ok(res, {
        id: req.admin.id,
        name: req.admin.name,
        role: req.admin.role,
        email: req.user.email
      })
    } catch (e) {
      return fail(res, e.message)
    }
  }
)

export default r
