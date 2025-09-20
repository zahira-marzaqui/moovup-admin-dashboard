import { createAdminClient } from '../supabase.js'
const db = createAdminClient()

export async function list({ brand, limit = 50 }) {
  let q = db.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false }).limit(limit)
  if (brand) q = q.eq('brand', brand)
  return q
}

export async function createOne(payload) {
  return db.from('products').insert([payload]).select().single()
}
