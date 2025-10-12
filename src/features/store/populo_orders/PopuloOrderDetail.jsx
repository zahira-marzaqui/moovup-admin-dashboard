import React from "react";
import {
  CalendarIcon,
  UserIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
} from "../../../components/Icons";

export default function PopuloOrderDetail({ order }) {
  if (!order) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Aucune commande sélectionnée
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Non définie";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "EN_ATTENTE": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "EN_COURS": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "PRET": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "LIVREE": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "ANNULEE": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "EN_ATTENTE": return "En attente";
      case "EN_COURS": return "En cours";
      case "PRET": return "Prêt";
      case "LIVREE": return "Livrée";
      case "ANNULEE": return "Annulée";
      default: return "Inconnu";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête de la commande */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {order.orderNumber}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Commande créée le {formatDate(order.orderDate)}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {order.totalAmount}€
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {order.items.length} article{order.items.length > 1 ? 's' : ''}
            </p>
            {order.deliveryDate && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Livraison prévue le {formatDate(order.deliveryDate)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Actions rapides
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {order.status === "EN_ATTENTE" && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Marquer comme en cours
            </button>
          )}
          
          {order.status === "EN_COURS" && (
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Marquer comme prêt
            </button>
          )}
          
          {order.status === "PRET" && (
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Marquer comme livrée
            </button>
          )}
          
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Envoyer un email
          </button>
          
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Annuler la commande
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations client */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Informations client
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Nom complet
              </label>
              <p className="text-gray-900 dark:text-white">{order.clientName}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </label>
              <p className="text-gray-900 dark:text-white">{order.clientEmail}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Téléphone
              </label>
              <p className="text-gray-900 dark:text-white">{order.clientPhone}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Adresse de livraison
              </label>
              <p className="text-gray-900 dark:text-white whitespace-pre-line">
                {order.deliveryAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Détails de la commande */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ClipboardDocumentListIcon className="h-5 w-5" />
            Détails de la commande
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date de commande
                </label>
                <p className="text-gray-900 dark:text-white">{formatDate(order.orderDate)}</p>
              </div>
            </div>
            
            {order.deliveryDate && (
              <div className="flex items-center gap-2">
                <TruckIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Date de livraison prévue
                  </label>
                  <p className="text-gray-900 dark:text-white">{formatDate(order.deliveryDate)}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <CurrencyDollarIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Montant total
                </label>
                <p className="text-gray-900 dark:text-white font-semibold">{order.totalAmount}€</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                Statut de la commande
              </label>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Articles commandés */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Articles commandés
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Quantité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Prix unitaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {item.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {item.price}€
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {(item.quantity * item.price).toFixed(2)}€
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                  Total de la commande
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                  {order.totalAmount}€
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Notes
          </h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {order.notes}
          </p>
        </div>
      )}

      
    </div>
  );
}


