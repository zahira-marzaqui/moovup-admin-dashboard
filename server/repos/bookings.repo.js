import { createAdminClient } from '../supabase.js'
const db = createAdminClient()

export async function list({ brand, status, from, to, page = 1, limit = 50 }) {
  const fromIdx = (page - 1) * limit
  const toIdx = fromIdx + limit - 1
  let q = db.from('service_bookings')
    .select('*, services(name, brand)', { count: 'exact' })
    .order('booking_date', { ascending: false })
    .range(fromIdx, toIdx)

  if (brand) q = q.eq('services.brand', brand)
  if (status) q = q.eq('status', status)
  if (from) q = q.gte('booking_date', from)
  if (to) q = q.lte('booking_date', to)
  return q
}

export const getById = (id) =>
  db.from('service_bookings').select('*, services(brand)').eq('id', id).single()

export const updateStatus = (id, status) =>
  db.from('service_bookings').update({ status }).eq('id', id).select().single()
