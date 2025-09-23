import { createAdminClient } from '../supabase.js'
const db = createAdminClient()

export async function list({ brand = 'POPULO', page = 1, limit = 50 }) {
  const from = (page - 1) * limit
  const to = from + limit - 1
  let q = db.from('menu_items')
    .select('*', { count: 'exact' })
    .eq('is_available', true)
    .order('created_at', { ascending: false })
    .range(from, to)
  if (brand) q = q.eq('brand', brand)
  return q
}

export const getById   = (id)        => db.from('menu_items').select('*').eq('id', id).single()
export const createOne = (payload)   => db.from('menu_items').insert([payload]).select().single()
export const updateOne = (id, patch) => db.from('menu_items').update(patch).eq('id', id).select().single()
export const softDelete= (id)        => db.from('menu_items').update({ is_available: false }).eq('id', id).select().single()
