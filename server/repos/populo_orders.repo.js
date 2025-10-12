// server/repos/populo_orders.repo.js
import { createAdminClient } from '../supabase.js'
const db = createAdminClient()

export async function list({ status, from, to, page = 1, limit = 50 }) {
  const fromIdx = (page - 1) * limit
  const toIdx = fromIdx + limit - 1

  let q = db
    .from('populo_orders')
    .select(
      `
      id,
      user_id,
      order_type,
      status,
      total_amount,
      delivery_address,
      notes,
      created_at,
      updated_at,
      populo_order_items(*)
      `,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(fromIdx, toIdx)

  if (status) q = q.eq('status', status)
  if (from) q = q.gte('created_at', from)
  if (to) q = q.lte('created_at', to)

  return q
}

export const getById = (id) =>
  db
    .from('populo_orders')
    .select(
      `
      id,
      user_id,
      order_type,
      status,
      total_amount,
      delivery_address,
      notes,
      created_at,
      updated_at,
      populo_order_items(*)
      `
    )
    .eq('id', id)
    .single()

export const updateStatus = (id, status) =>
  db.from('populo_orders').update({ status }).eq('id', id).select().single()

export const create = (orderData) =>
  db.from('populo_orders').insert(orderData).select().single()

export const update = (id, orderData) =>
  db.from('populo_orders').update(orderData).eq('id', id).select().single()

export const remove = (id) =>
  db.from('populo_orders').delete().eq('id', id)

