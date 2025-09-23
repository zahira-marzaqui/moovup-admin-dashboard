import { z } from 'zod'
import * as repo from '../repos/menu_items.repo.js'

const MenuItemIn = z.object({
  brand: z.literal('POPULO'),
  name: z.string().min(2),
  category: z.string(),
  price: z.number().positive(),
  image_url: z.string().url().optional(),
  is_available: z.boolean().default(true)
})
const MenuItemPatch = MenuItemIn.partial()

const ROLE_BRAND = { MANAGER_POPULO: 'POPULO' }
const assertBrandAllowed = (role, brand) => {
  if (role === 'SUPER_ADMIN') return
  const allowed = ROLE_BRAND[role]
  if (!allowed) throw new Error(`Forbidden for role ${role}`)
  if (brand !== allowed) throw new Error(`Managers of ${allowed} cannot access brand ${brand}`)
}

export async function getList(req, params) {
  const role = req?.admin?.role; if (!role) throw new Error('Admin role required')
  let { brand = 'POPULO', page, limit } = params
  if (role !== 'SUPER_ADMIN') brand = ROLE_BRAND[role] || 'POPULO'
  return repo.list({ brand, page, limit })
}

export async function getOne(req, id) {
  const role = req?.admin?.role; if (!role) throw new Error('Admin role required')
  const { data, error } = await repo.getById(id)
  if (error) return { error }
  if (!data) return { data: null }
  assertBrandAllowed(role, data.brand)
  return { data }
}

export async function create(req, payload) {
  const parsed = MenuItemIn.parse(payload)
  const role = req?.admin?.role; if (!role) throw new Error('Admin role required')
  assertBrandAllowed(role, parsed.brand)    // ⇒ doit être POPULO sauf SUPER_ADMIN
  return repo.createOne(parsed)
}

export async function update(req, id, payload) {
  const role = req?.admin?.role; if (!role) throw new Error('Admin role required')
  const { data: existing, error } = await repo.getById(id)
  if (error) throw new Error(error.message)
  if (!existing) throw new Error('Menu item not found')
  assertBrandAllowed(role, existing.brand)
  if (role !== 'SUPER_ADMIN' && payload.brand && payload.brand !== existing.brand)
    throw new Error(`Managers cannot change brand from ${existing.brand} to ${payload.brand}`)
  const patch = MenuItemPatch.parse(payload)
  return repo.updateOne(id, patch)
}

export async function remove(req, id) {
  const role = req?.admin?.role; if (!role) throw new Error('Admin role required')
  const { data: existing, error } = await repo.getById(id)
  if (error) throw new Error(error.message)
  if (!existing) throw new Error('Menu item not found')
  assertBrandAllowed(role, existing.brand)
  return repo.softDelete(id)   // soft delete (is_available=false)
}
