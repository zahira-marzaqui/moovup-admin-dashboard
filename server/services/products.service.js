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

// export async function getList(params) {
//   return repo.list(params)
// }

// export async function create(payload) {
//   const parsed = ProductIn.parse(payload)
//   return repo.createOne(parsed)
// }

// mapping rôle -> brand autorisée (SUPER_ADMIN = toutes)
const ROLE_BRAND = {
  MANAGER_EVOLVE: 'EVOLVE',
  MANAGER_ANAIS: 'ANAIS'
}

export async function getList(params) {
  return repo.list(params)
}

export async function create(req, payload) {
  const parsed = ProductIn.parse(payload)

  const role = req?.admin?.role // injecté par loadAdminRole
  if (!role) throw new Error('Admin role required')

  // SUPER_ADMIN peut tout faire
  if (role !== 'SUPER_ADMIN') {
    const allowedBrand = ROLE_BRAND[role]
    if (!allowedBrand) throw new Error(`Forbidden for role ${role}`)
    if (parsed.brand !== allowedBrand) {
      throw new Error(`Managers of ${allowedBrand} cannot create products for brand ${parsed.brand}`)
    }
  }

  return repo.createOne(parsed)
}
