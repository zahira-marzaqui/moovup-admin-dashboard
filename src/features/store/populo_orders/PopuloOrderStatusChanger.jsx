import React, { useState } from "react";
import { XMarkIcon } from "../../../components/Icons";
import { apiPatch } from "../../../api/http";

export default function PopuloOrderStatusChanger({ order, onSuccess, onCancel }) {
  const [newStatus, setNewStatus] = useState(order?.status || "EN_ATTENTE");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const statusOptions = [
    { value: "EN_ATTENTE", label: "En attente", color: "bg-yellow-100 text-yellow-800" },
    { value: "EN_COURS", label: "En cours", color: "bg-blue-100 text-blue-800" },
    { value: "PRET", label: "Prêt", color: "bg-purple-100 text-purple-800" },
    { value: "LIVREE", label: "Livrée", color: "bg-green-100 text-green-800" },
    { value: "ANNULEE", label: "Annulée", color: "bg-red-100 text-red-800" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newStatus === order.status) {
      onCancel();
      return;
    }

    setLoading(true);
    setError("");
    
    try {
      await apiPatch(`/api/admin/populo-orders/${order.id}/status`, { status: newStatus });
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      setError("Erreur lors de la mise à jour du statut");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStatusInfo = () => {
    return statusOptions.find(option => option.value === order.status);
  };

  const getNewStatusInfo = () => {
    return statusOptions.find(option => option.value === newStatus);
  };

  return (
    <div className="p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Informations de la commande */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Commande {order.orderNumber}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Client: {order.clientName}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          Montant: {order.totalAmount}€
        </p>
      </div>

      {/* Statut actuel */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Statut actuel
        </label>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCurrentStatusInfo()?.color}`}>
            {getCurrentStatusInfo()?.label}
          </span>
        </div>
      </div>

      {/* Nouveau statut */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Nouveau statut
        </label>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {newStatus !== order.status && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Nouveau statut:</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNewStatusInfo()?.color}`}>
              {getNewStatusInfo()?.label}
            </span>
          </div>
        )}
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          Annuler
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || newStatus === order.status}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          Mettre à jour
        </button>
      </div>
    </div>
  );
}



