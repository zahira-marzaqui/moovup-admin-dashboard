import React from 'react'
import { useOrders } from './useOrders'
import AdminOrderRow from './AdminOrderRow'

export default function OrdersTable() {
  const { orders, loading, error } = useOrders({ brand: 'ANAIS', page: 1, limit: 10 })

  if (loading) return <p>Chargement…</p>
  if (error) return <p>Erreur : {error}</p>
  if (!orders.length) return <p>Aucune commande trouvée</p>

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Brand</th>
          <th>Status</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((o) => (
          <AdminOrderRow key={o.id} order={o} />
        ))}
      </tbody>
    </table>
  )
}
