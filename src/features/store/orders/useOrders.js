import { useEffect, useState } from 'react'
import { apiGet } from '../../../api/http'

/**
 * Hook pour récupérer les commandes depuis l'API admin
 * @param {object} options - filtres { brand, status, page, limit }
 */
export function useOrders(options = {}) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [meta, setMeta] = useState({ page: 1, limit: 50, count: 0 })

  useEffect(() => {
    let active = true
    setLoading(true)

    const params = new URLSearchParams()
    if (options.brand) params.append('brand', options.brand)
    if (options.status) params.append('status', options.status)
    if (options.page) params.append('page', options.page)
    if (options.limit) params.append('limit', options.limit)

    apiGet(`/api/admin/orders?${params.toString()}`)
      .then((res) => {
        if (!active) return
        const list = Array.isArray(res?.data) ? res.data : []
        setOrders(list)
        setMeta({
          page: res.page ?? 1,
          limit: res.limit ?? 50,
          count: res.count ?? list.length,
        })
      })
      .catch((err) => {
        if (active) setError(err.message || 'Erreur chargement commandes')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [options.brand, options.status, options.page, options.limit])

  return { orders, loading, error, meta, setOrders }
}
