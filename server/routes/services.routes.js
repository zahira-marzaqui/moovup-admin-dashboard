import { Router } from 'express'
import { ok, bad, fail } from '../utils/http.js'
import * as svc from '../services/services.service.js'
const r = Router()

r.get('/', async (req, res) => {
  try {
    const { data, error } = await svc.getList({ brand: req.query.brand })
    if (error) return bad(res, error.message)
    return ok(res, data)
  } catch (e) { return fail(res, e.message) }
})

export default r
