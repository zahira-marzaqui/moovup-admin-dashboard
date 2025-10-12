import { Router } from 'express'
import { ok, bad, fail } from '../utils/http.js'
import * as svc from '../services/populo_orders.service.js'
import { requireUser } from '../middleware/auth.js'
import { loadAdminRole, requireRole } from '../middleware/roles.js'

const r = Router()

// GET /api/admin/populo-orders - Liste des commandes Populo
r.get('/',
  requireUser, loadAdminRole, requireRole('SUPER_ADMIN', 'MANAGER_POPULO'),
  async (req, res) => {
    try {
      const page = Number(req.query.page || 1)
      const limit = Number(req.query.limit || 50)
      const { data, error, count } = await svc.list(req, {
        status: req.query.status,
        from: req.query.from, 
        to: req.query.to, 
        page, 
        limit
      })
      if (error) return bad(res, error.message)
      return ok(res, { data, count, page, limit })
    } catch (e) { return fail(res, e.message) }
  }
)

// GET /api/admin/populo-orders/:id - Détail d'une commande Populo
r.get('/:id',
  requireUser, loadAdminRole, requireRole('SUPER_ADMIN', 'MANAGER_POPULO'),
  async (req, res) => {
    try {
      const { data, error } = await svc.getById(req, req.params.id)
      if (error) return bad(res, error.message)
      return ok(res, data)
    } catch (e) { return fail(res, e.message) }
  }
)

// POST /api/admin/populo-orders - Créer une nouvelle commande Populo
r.post('/',
  requireUser, loadAdminRole, requireRole('SUPER_ADMIN', 'MANAGER_POPULO'),
  async (req, res) => {
    try {
      const { data, error } = await svc.create(req, req.body)
      if (error) return bad(res, error.message)
      return ok(res, data)
    } catch (e) { return fail(res, e.message) }
  }
)

// PUT /api/admin/populo-orders/:id - Mettre à jour une commande Populo
r.put('/:id',
  requireUser, loadAdminRole, requireRole('SUPER_ADMIN', 'MANAGER_POPULO'),
  async (req, res) => {
    try {
      const { data, error } = await svc.update(req, req.params.id, req.body)
      if (error) return bad(res, error.message)
      return ok(res, data)
    } catch (e) { return fail(res, e.message) }
  }
)

// PATCH /api/admin/populo-orders/:id/status - Changer le statut d'une commande Populo
r.patch('/:id/status',
  requireUser, loadAdminRole, requireRole('SUPER_ADMIN', 'MANAGER_POPULO'),
  async (req, res) => {
    try {
      const { data, error } = await svc.patchStatus(req, req.params.id, req.body)
      if (error) return bad(res, error.message)
      return ok(res, data)
    } catch (e) { return bad(res, e.message) }
  }
)

// DELETE /api/admin/populo-orders/:id - Supprimer une commande Populo
r.delete('/:id',
  requireUser, loadAdminRole, requireRole('SUPER_ADMIN', 'MANAGER_POPULO'),
  async (req, res) => {
    try {
      const { data, error } = await svc.remove(req, req.params.id)
      if (error) return bad(res, error.message)
      return ok(res, data)
    } catch (e) { return fail(res, e.message) }
  }
)

export default r



