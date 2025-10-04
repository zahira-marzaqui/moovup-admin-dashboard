// src/api/http.js
import { supabase } from '../config/supabaseClient'

const API_URL = process.env.REACT_APP_API_URL

async function authHeader() {
  const { data } = await supabase.auth.getSession()
  const token = data?.session?.access_token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function apiGet(path) {
  const headers = { 'Content-Type': 'application/json', ...(await authHeader()) }
  const res = await fetch(`${API_URL}${path}`, { headers })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPost(path, body) {
  const headers = { 'Content-Type': 'application/json', ...(await authHeader()) }
  const res = await fetch(`${API_URL}${path}`, { method: 'POST', headers, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPatch(path, body) {
  const headers = { 'Content-Type': 'application/json', ...(await authHeader()) }
  const res = await fetch(`${API_URL}${path}`, { method: 'PATCH', headers, body: JSON.stringify(body) })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiDelete(path) {
  const headers = { ...(await authHeader()) }
  const res = await fetch(`${API_URL}${path}`, { method: 'DELETE', headers })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}
