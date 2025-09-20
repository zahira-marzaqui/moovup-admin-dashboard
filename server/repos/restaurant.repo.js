import { createAdminClient, createUserClient } from '../supabase.js'
const tokenFrom = (req) => (req.headers.authorization || '').split(' ')[1] || null

export const listMenu = async () => {
  const db = createAdminClient()
  return db.from('menu_items').select('*').eq('brand','POPULO').eq('is_available',true).order('created_at', { ascending:false })
}

export const placeOrder = async (req, payload) => {
  const db = createUserClient(tokenFrom(req))
  return db.from('restaurant_orders').insert([payload]).select().single()
}
