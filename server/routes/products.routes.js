import { Router } from 'express'
import { ok, created, bad, fail } from '../utils/http.js'
import * as svc from '../services/products.service.js'
import { requireUser } from '../middleware/auth.js'
import { loadAdminRole, requireRole } from '../middleware/roles.js'

const r = Router()

// LIST (protégé par rôle)
r.get('/',
  requireUser,
  loadAdminRole,
  requireRole('SUPER_ADMIN','MANAGER_EVOLVE','MANAGER_ANAIS'),
  async (req, res) => {
    try {
      const page = Number(req.query.page || 1)
      const limit = Number(req.query.limit || 50)
      const { data, error, count } = await svc.getList(req, { brand: req.query.brand, page, limit })
      if (error) return bad(res, error.message)
      return ok(res, { data, count, page, limit })
    } catch (e) { return fail(res, e.message) }
  }
)

// READ ONE (protégé par rôle)
r.get('/:id',
  requireUser,
  loadAdminRole,
  requireRole('SUPER_ADMIN','MANAGER_EVOLVE','MANAGER_ANAIS'),
  async (req, res) => {
    try {
      const { data, error } = await svc.getOne(req, req.params.id)
      if (error) return bad(res, error.message)
      if (!data) return res.status(404).json({ error: 'Not found' })
      return ok(res, data)
    } catch (e) { return fail(res, e.message) }
  }
)


// CREATE -> managers + super admin
r.post('/',
  requireUser,
  loadAdminRole,
  requireRole('SUPER_ADMIN','MANAGER_EVOLVE','MANAGER_ANAIS'),
  async (req, res) => {
    try {
      const { data, error } = await svc.create(req, req.body)
      if (error) return bad(res, error.message)
      return created(res, data)
    } catch (e) { return bad(res, e.message) }
  }
)

// UPDATE (PATCH) -> managers + super admin
r.patch('/:id',
  requireUser,
  loadAdminRole,
  requireRole('SUPER_ADMIN','MANAGER_EVOLVE','MANAGER_ANAIS'),
  async (req, res) => {
    try {
      const { data, error } = await svc.update(req, req.params.id, req.body)
      if (error) return bad(res, error.message)
      return ok(res, data)
    } catch (e) { return bad(res, e.message) }
  }
)

// DELETE -> managers + super admin
//  - Soft delete par défaut (is_active=false)
r.delete('/:id',
  requireUser,
  loadAdminRole,
  requireRole('SUPER_ADMIN','MANAGER_EVOLVE','MANAGER_ANAIS'),
  async (req, res) => {
    try {
      const { data, error } = await svc.remove(req, req.params.id)
      if (error) return bad(res, error.message)
      return ok(res, data)
    } catch (e) { return bad(res, e.message) }
  }
)


export default r
