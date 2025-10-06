// src/features/orders/AdminOrderRow.jsx
import { apiPatch } from '../../../api/http'


export default function AdminOrderRow({ order, onUpdated }) {
  const onChangeStatus = async (e) => {
    const status = e.target.value
    try {
      const updated = await apiPatch(`/api/admin/orders/${order.id}/status`, { status })
      onUpdated?.(updated)
    } catch (err) {
      alert('Erreur: ' + err.message)
    }
  }

  return (
    <tr>
      <td>{order.id.slice(0,8)}</td>
      <td>{order.brand}</td>
      <td>
        <select defaultValue={order.status} onChange={onChangeStatus}>
          <option>EN_ATTENTE</option>
          <option>EN_COURS</option>
          <option>PRET</option>
          <option>LIVREE</option>
          <option>ANNULEE</option>
        </select>
      </td>
      <td>{order.total_amount} MAD</td>
    </tr>
  )
}
