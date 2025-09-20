import { z } from 'zod'
import * as repo from '../repos/products.repo.js'

const ProductIn = z.object({
  brand: z.enum(['EVOLVE','ANAIS']),
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.string().optional(),
  stock_quantity: z.number().int().nonnegative().default(0),
  image_url: z.string().url().optional(),
  is_active: z.boolean().default(true)
})

// Pour PATCH (toutes les clés deviennent optionnelles)
const ProductPatch = ProductIn.partial()

// mapping rôle -> brand autorisée (SUPER_ADMIN = toutes)
const ROLE_BRAND = {
  MANAGER_EVOLVE: 'EVOLVE',
  MANAGER_ANAIS: 'ANAIS'
}

function assertBrandAllowed(role, brand) {
  if (role === 'SUPER_ADMIN') return
  const allowed = ROLE_BRAND[role]
  if (!allowed) throw new Error(`Forbidden for role ${role}`)
  if (brand !== allowed) throw new Error(`Managers of ${allowed} cannot access brand ${brand}`)
}

export async function getList(req, params) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  let { brand, page, limit } = params

  // 🔒 si manager, forcer la brand autorisée
  if (role !== 'SUPER_ADMIN') {
    brand = ROLE_BRAND[role]
  }

  return repo.list({ brand, page, limit })
}

export async function getOne(req, id) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  const { data, error } = await repo.getById(id)
  if (error) return { error }

  if (!data) return { data: null }

  // 🔒 vérifier que la brand du produit correspond au rôle
  assertBrandAllowed(role, data.brand)

  return { data }
}

export async function create(req, payload) {
  const parsed = ProductIn.parse(payload)
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')
  assertBrandAllowed(role, parsed.brand)
  return repo.createOne(parsed)
}

export async function update(req, id, payload) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  // 1) Charger le produit existant
  const { data: existing, error: e1 } = await repo.getById(id)
  if (e1) throw new Error(e1.message)
  if (!existing) throw new Error('Product not found')

  // 2) Vérifier que le manager a le droit sur la brand du produit
  assertBrandAllowed(role, existing.brand)

  // 3) Interdire de changer la brand si manager (super admin peut)
  if (role !== 'SUPER_ADMIN' && payload.brand && payload.brand !== existing.brand) {
    throw new Error(`Managers cannot change brand from ${existing.brand} to ${payload.brand}`)
  }

  const patch = ProductPatch.parse(payload)
  return repo.updateOne(id, patch)
}

export async function remove(req, id) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  const { data: existing, error: e1 } = await repo.getById(id)
  if (e1) throw new Error(e1.message)
  if (!existing) throw new Error('Product not found')

  // Vérifie que le manager a droit sur la brand
  assertBrandAllowed(role, existing.brand)

  // On fait seulement un soft delete (jamais hard)
  return repo.softDelete(id)
}

