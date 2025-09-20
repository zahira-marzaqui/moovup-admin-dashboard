import { createAdminClient } from '../supabase.js'
const db = createAdminClient()

export async function list({ brand }) {
  let q = db.from('services').select('*').eq('is_active', true).order('created_at', { ascending: false })
  if (brand) q = q.eq('brand', brand)
  return q
}
