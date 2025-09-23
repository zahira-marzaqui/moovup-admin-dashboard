// server/services/orders_admin.service.js
import { z } from 'zod'
import * as repo from '../repos/orders.repo.js' // <- adapte le nom si besoin

// Managers par brand (les commandes ne concernent que EVOLVE / ANAIS)
const ROLE_BRAND = {
  MANAGER_EVOLVE: 'EVOLVE',
  MANAGER_ANAIS: 'ANAIS'
}

// ✅ Statuts des COMMANDES en français (alignés avec ta demande)
const ORDER_STATUSES = ['EN_ATTENTE', 'EN_COURS', 'PRET', 'LIVREE', 'ANNULEE']
const OrderStatus = z.enum(ORDER_STATUSES)

// Helpers
const isSuperAdmin = (role) => role === 'SUPER_ADMIN'
const canAccessBrand = (role, brand) => isSuperAdmin(role) || ROLE_BRAND[role] === brand

export async function list(req, params) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  let { brand, status, from, to, page, limit } = params

  // 🔒 Forcer la brand si manager
  if (!isSuperAdmin(role)) {
    brand = ROLE_BRAND[role]
  }

  // (optionnel) si tu veux valider le status côté service :
  if (status) {
    OrderStatus.parse(status)
  }

  return repo.list({ brand, status, from, to, page, limit })
}

export async function patchStatus(req, id, payload) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  // 1) Charger la commande
  const { data: order, error } = await repo.getById(id)
  if (error) throw new Error(error.message)
  if (!order) throw new Error('Order not found')

  // 2) Contrôle d’accès par brand
  if (!canAccessBrand(role, order.brand)) {
    throw new Error(`Not allowed to manage brand ${order.brand}`)
  }

  // 3) Valider le body { status: ... }
  const { status } = z.object({ status: OrderStatus }).parse(payload)

  // (Optionnel) Valider transition (ex: pas PRET -> EN_ATTENTE). Exemple simple :
  // const transitions = {
  //   EN_ATTENTE: ['EN_COURS', 'ANNULEE'],
  //   EN_COURS: ['PRET', 'ANNULEE'],
  //   PRET: ['LIVREE', 'ANNULEE'],
  //   LIVREE: [],
  //   ANNULEE: []
  // }
  // if (!transitions[order.status]?.includes(status)) {
  //   throw new Error(`Transition interdite: ${order.status} -> ${status}`)
  // }

  // 4) Update
  return repo.updateStatus(id, status)
}
