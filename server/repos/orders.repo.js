// server/repos/orders.repo.js
import { createAdminClient } from '../supabase.js'
const db = createAdminClient()

export async function list({ brand, status, from, to, page = 1, limit = 50 }) {
  const fromIdx = (page - 1) * limit
  const toIdx = fromIdx + limit - 1

  // Pas de join vers profiles/auth.users (inexistant / non exposé)
  let q = db
    .from('orders')
    .select(
      `
      id,
      user_id,
      brand,
      order_type,
      status,
      total_amount,
      delivery_address,
      notes,
      created_at,
      updated_at,
      order_items(*)
      `,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(fromIdx, toIdx)

  if (brand) q = q.eq('brand', brand)
  if (status) q = q.eq('status', status)
  if (from) q = q.gte('created_at', from)
  if (to) q = q.lte('created_at', to)

  return q
}

export const getById = (id) =>
  db
    .from('orders')
    .select(
      `
      id,
      user_id,
      brand,
      order_type,
      status,
      total_amount,
      delivery_address,
      notes,
      created_at,
      updated_at,
      order_items(*)
      `
    )
    .eq('id', id)
    .single()

export const updateStatus = (id, status) =>
  db.from('orders').update({ status }).eq('id', id).select().single()
