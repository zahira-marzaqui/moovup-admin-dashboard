import { createAdminClient } from '../supabase.js'
const db = createAdminClient()

// LIST (avec pagination simple)
export async function list({ brand, page = 1, limit = 50 }) {
  const from = (page - 1) * limit
  const to = from + limit - 1

  let q = db.from('products')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (brand) q = q.eq('brand', brand)
  return q
}

// READ ONE
export const getById = (id) =>
  db.from('products').select('*').eq('id', id).single()

// CREATE
export const createOne = (payload) =>
  db.from('products').insert([payload]).select().single()

// UPDATE (patch)
export const updateOne = (id, payload) =>
  db.from('products').update(payload).eq('id', id).select().single()

// Soft DELETE = désactiver
export const softDelete = (id) =>
  db.from('products')
    .update({ is_active: false })
    .eq('id', id)
    .select()
    .single()
