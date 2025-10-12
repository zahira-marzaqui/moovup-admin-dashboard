// server/services/populo_orders.service.js
import { z } from 'zod'
import * as repo from '../repos/populo_orders.repo.js'

// ✅ Statuts des COMMANDES POPULO en français
const POPULO_ORDER_STATUSES = ['EN_ATTENTE', 'EN_COURS', 'PRET', 'LIVREE', 'ANNULEE']
const PopuloOrderStatus = z.enum(POPULO_ORDER_STATUSES)

// Helpers
const isSuperAdmin = (role) => role === 'SUPER_ADMIN'
const isPopuloManager = (role) => role === 'MANAGER_POPULO'

export async function list(req, params) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  // 🔒 Seuls SUPER_ADMIN et MANAGER_POPULO peuvent accéder aux commandes Populo
  if (!isSuperAdmin(role) && !isPopuloManager(role)) {
    throw new Error('Access denied: Only SUPER_ADMIN and MANAGER_POPULO can access Populo orders')
  }

  let { status, from, to, page, limit } = params

  // Validation du status si fourni
  if (status) {
    PopuloOrderStatus.parse(status)
  }

  return repo.list({ status, from, to, page, limit })
}

export async function getById(req, id) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  // 🔒 Contrôle d'accès
  if (!isSuperAdmin(role) && !isPopuloManager(role)) {
    throw new Error('Access denied: Only SUPER_ADMIN and MANAGER_POPULO can access Populo orders')
  }

  return repo.getById(id)
}

export async function patchStatus(req, id, payload) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  // 🔒 Contrôle d'accès
  if (!isSuperAdmin(role) && !isPopuloManager(role)) {
    throw new Error('Access denied: Only SUPER_ADMIN and MANAGER_POPULO can manage Populo orders')
  }

  // 1) Charger la commande
  const { data: order, error } = await repo.getById(id)
  if (error) throw new Error(error.message)
  if (!order) throw new Error('Populo order not found')

  // 2) Valider le body { status: ... }
  const { status } = z.object({ status: PopuloOrderStatus }).parse(payload)

  // 3) Validation des transitions de statut (optionnel)
  const transitions = {
    EN_ATTENTE: ['EN_COURS', 'ANNULEE'],
    EN_COURS: ['PRET', 'ANNULEE'],
    PRET: ['LIVREE', 'ANNULEE'],
    LIVREE: [],
    ANNULEE: []
  }
  
  if (!transitions[order.status]?.includes(status)) {
    throw new Error(`Transition interdite: ${order.status} -> ${status}`)
  }

  // 4) Update
  return repo.updateStatus(id, status)
}

export async function create(req, orderData) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  // 🔒 Contrôle d'accès
  if (!isSuperAdmin(role) && !isPopuloManager(role)) {
    throw new Error('Access denied: Only SUPER_ADMIN and MANAGER_POPULO can create Populo orders')
  }

  // Validation des données
  const schema = z.object({
    user_id: z.string().uuid(),
    order_type: z.string(),
    status: PopuloOrderStatus.default('EN_ATTENTE'),
    total_amount: z.number().positive(),
    delivery_address: z.string().optional(),
    notes: z.string().optional()
  })

  const validatedData = schema.parse(orderData)
  return repo.create(validatedData)
}

export async function update(req, id, orderData) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  // 🔒 Contrôle d'accès
  if (!isSuperAdmin(role) && !isPopuloManager(role)) {
    throw new Error('Access denied: Only SUPER_ADMIN and MANAGER_POPULO can update Populo orders')
  }

  // Vérifier que la commande existe
  const { data: order, error } = await repo.getById(id)
  if (error) throw new Error(error.message)
  if (!order) throw new Error('Populo order not found')

  // Validation des données
  const schema = z.object({
    order_type: z.string().optional(),
    status: PopuloOrderStatus.optional(),
    total_amount: z.number().positive().optional(),
    delivery_address: z.string().optional(),
    notes: z.string().optional()
  })

  const validatedData = schema.parse(orderData)
  return repo.update(id, validatedData)
}

export async function remove(req, id) {
  const role = req?.admin?.role
  if (!role) throw new Error('Admin role required')

  // 🔒 Contrôle d'accès
  if (!isSuperAdmin(role) && !isPopuloManager(role)) {
    throw new Error('Access denied: Only SUPER_ADMIN and MANAGER_POPULO can delete Populo orders')
  }

  // Vérifier que la commande existe
  const { data: order, error } = await repo.getById(id)
  if (error) throw new Error(error.message)
  if (!order) throw new Error('Populo order not found')

  return repo.remove(id)
}



