// src/api/http.js
import { supabase } from '../config/supabaseClient'

const API_URL = process.env.REACT_APP_API_URL

async function authHeader() {
  console.log('🔍 [authHeader] Récupération du token...')
  
  // Essayer d'abord localStorage
  const localToken = localStorage.getItem('token')
  if (localToken) {
    console.log('✅ [authHeader] Token trouvé dans localStorage')
    return { Authorization: `Bearer ${localToken}` }
  }
  
  // Fallback vers Supabase
  try {
    console.log('🔍 [authHeader] Tentative Supabase...')
    const { data } = await supabase.auth.getSession()
    const token = data?.session?.access_token
    console.log('🔍 [authHeader] Token Supabase:', token ? 'OUI' : 'NON')
    return token ? { Authorization: `Bearer ${token}` } : {}
  } catch (error) {
    console.error('❌ [authHeader] Erreur Supabase:', error)
    return {}
  }
}

export async function apiGet(path) {
  console.log('🔍 [apiGet] Début appel:', path)
  console.log('🔍 [apiGet] API_URL:', API_URL)
  
  const headers = { 'Content-Type': 'application/json', ...(await authHeader()) }
  console.log('🔍 [apiGet] Headers:', headers)
  console.log('🔍 [apiGet] URL complète:', `${API_URL}${path}`)
  
  try {
    const res = await fetch(`${API_URL}${path}`, { headers })
    console.log('🔍 [apiGet] Réponse status:', res.status)
    
    if (!res.ok) {
      const errorText = await res.text()
      console.error('❌ [apiGet] Erreur HTTP:', res.status, errorText)
      throw new Error(errorText)
    }
    
    const data = await res.json()
    console.log('✅ [apiGet] Données reçues:', data)
    return data
  } catch (error) {
    console.error('❌ [apiGet] Erreur fetch:', error)
    throw error
  }
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
