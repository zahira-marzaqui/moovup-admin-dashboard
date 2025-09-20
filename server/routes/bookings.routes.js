import { Router } from 'express'
import { ok, created, bad, fail } from '../utils/http.js'
import * as svc from '../services/bookings.service.js'
const r = Router()

r.get('/me', async (req, res) => {
  try {
    const { data, error } = await svc.listMine(req)
    if (error) return bad(res, error.message)
    return ok(res, data)
  } catch (e) { return fail(res, e.message) }
})

r.post('/', async (req, res) => {
  try {
    const { data, error } = await svc.create(req, req.body)
    if (error) return bad(res, error.message)
    return created(res, data)
  } catch (e) { return bad(res, e.message) }
})

export default r
