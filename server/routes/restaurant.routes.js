import { Router } from 'express'
import { ok, created, bad, fail } from '../utils/http.js'
import * as svc from '../services/restaurant.service.js'
const r = Router()

r.get('/menu', async (_req, res) => {
  try {
    const { data, error } = await svc.getMenu()
    if (error) return bad(res, error.message)
    return ok(res, data)
  } catch (e) { return fail(res, e.message) }
})

r.post('/orders', async (req, res) => {
  try {
    const { data, error } = await svc.makeOrder(req, req.body)
    if (error) return bad(res, error.message)
    return created(res, data)
  } catch (e) { return bad(res, e.message) }
})

export default r
