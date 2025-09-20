import * as repo from '../repos/bookings.repo.js'
export const listMine = (req) => repo.listMine(req)
export const create = (req, p) => repo.create(req, p)
