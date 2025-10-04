// src/features/products/useProducts.js
import { useEffect, useState } from 'react'
import { apiGet } from '../../api/http'

export function useProducts(brand) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    apiGet(`/api/products?brand=${encodeURIComponent(brand || '')}`)
      .then((res) => mounted && setData(res.data ?? res))
      .catch((e) => mounted && setError(e.message))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [brand])

  return { data, loading, error }
}
