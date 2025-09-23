import { z } from 'zod'
import * as repo from '../repos/bookings.repo.js'

const ROLE_BRAND = { MANAGER_EVOLVE: 'EVOLVE', MANAGER_ANAIS: 'ANAIS' }
const Status = z.enum(['EN_ATTENTE','CONFIRMEE','ARRIVE','TERMINE','ANNULE'])
const PatchStatus = z.object({ status: Status })

const canAccessBrand = (role, brand) => {
  if (role === 'SUPER_ADMIN') return true
  return ROLE_BRAND[role] === brand
}

export async function list(req, params) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')
  // Forcer la brand si manager
  let { brand, status, from, to, page, limit } = params
  if (role !== 'SUPER_ADMIN') brand = ROLE_BRAND[role]
  return repo.list({ brand, status, from, to, page, limit })
}

export async function patchStatus(req, id, payload) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  // 1) booking
  const { data: b, error } = await repo.getById(id)
  if (error) throw new Error(error.message)
  if (!b) throw new Error('Booking not found')

  // 2) contrôle brand
  const bookingBrand = b.services?.brand
  if (role !== 'SUPER_ADMIN' && ROLE_BRAND[role] !== bookingBrand) {
    throw new Error(`Not allowed to manage brand ${bookingBrand}`)
  }

  // 3) valider status
  const { status } = PatchStatus.parse(payload)


  // (optionnel) valider transitions ici (ex: pas TERMINE depuis EN_ATTENTE)
  return repo.updateStatus(id, status)
}
