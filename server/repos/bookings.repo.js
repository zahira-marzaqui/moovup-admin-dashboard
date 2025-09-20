import { createUserClient } from '../supabase.js'
const tokenFrom = (req) => (req.headers.authorization || '').split(' ')[1] || null

export async function listMine(req) {
  const db = createUserClient(tokenFrom(req))
  return db.from('service_bookings').select('*').order('booking_date', { ascending: false }).limit(50)
}

export async function create(req, payload) {
  const db = createUserClient(tokenFrom(req))
  return db.from('service_bookings').insert([payload]).select().single()
}
