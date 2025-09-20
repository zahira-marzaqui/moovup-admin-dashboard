import { Router } from 'express'
import { ok, created, bad, fail } from '../utils/http.js'
import * as svc from '../services/products.service.js'
import { requireUser } from '../middleware/auth.js'
import { loadAdminRole, requireRole } from '../middleware/roles.js'

const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
  try {
    const { data, error } = await svc.getList({ brand: req.query.brand })
    if (error) return bad(res, error.message)
    return ok(res, data)
  } catch (e) { return fail(res, e.message) }
})

// productsRouter.post('/', async (req, res) => {
//   try {
//     const { data, error } = await svc.create(req.body)
//     if (error) return bad(res, error.message)
//     return created(res, data)
//   } catch (e) { return bad(res, e.message) }
// })

// création PRODUIT -> managers + super admin
productsRouter.post('/',
  requireUser,
  loadAdminRole,
  requireRole('SUPER_ADMIN','MANAGER_EVOLVE','MANAGER_ANAIS'),
  async (req, res) => {
    try {
      const { data, error } = await svc.create(req, req.body) // <-- passer req
      if (error) return bad(res, error.message)
      return created(res, data)
    } catch (e) { return bad(res, e.message) }
  }
)

export default productsRouter

