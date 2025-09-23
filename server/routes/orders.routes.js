import { Router } from 'express'
import { ok, bad, fail } from '../utils/http.js'
import * as svc from '../services/orders.service.js'
import { requireUser } from '../middleware/auth.js'
import { loadAdminRole, requireRole } from '../middleware/roles.js'

const r = Router()

r.get('/',
  requireUser, loadAdminRole, requireRole('SUPER_ADMIN','MANAGER_EVOLVE','MANAGER_ANAIS'),
  async (req, res) => {
    try {
      const page = Number(req.query.page || 1)
      const limit = Number(req.query.limit || 50)
      const { data, error, count } = await svc.list(req, {
        brand: req.query.brand, status: req.query.status,
        from: req.query.from, to: req.query.to, page, limit
      })
      if (error) return bad(res, error.message)
      return ok(res, { data, count, page, limit })
    } catch (e) { return fail(res, e.message) }
  }
)

r.patch('/:id/status',
  requireUser, loadAdminRole, requireRole('SUPER_ADMIN','MANAGER_EVOLVE','MANAGER_ANAIS'),
  async (req, res) => {
    try {
      const { data, error } = await svc.patchStatus(req, req.params.id, req.body)
      if (error) return bad(res, error.message)
      return ok(res, data)
    } catch (e) { return bad(res, e.message) }
  }
)

export default r
