import { createAdminClient } from '../supabase.js'
const db = createAdminClient()

export async function list({ brand, page = 1, limit = 50 }) {
  const from = (page - 1) * limit
  const to = from + limit - 1
  let q = db.from('services')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(from, to)
  if (brand) q = q.eq('brand', brand)
  return q
}

export const getById   = (id)        => db.from('services').select('*').eq('id', id).single()
export const createOne = (payload)   => db.from('services').insert([payload]).select().single()
export const updateOne = (id, patch) => db.from('services').update(patch).eq('id', id).select().single()
export const softDelete= (id)        => db.from('services').update({ is_active: false }).eq('id', id).select().single()
