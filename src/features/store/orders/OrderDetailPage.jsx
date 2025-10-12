import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  CalendarIcon,
  UserIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
  PencilIcon,
  XMarkIcon,
} from "../../../components/Icons";
import { apiGet } from "../../../api/http";
import OrderStatusChanger from "./OrderStatusChanger";
import { getBrandColors, getBrandName, getBrandButtonClasses, getBrandLoadingClasses } from "../../../utils/brandColors";

export default function OrderDetailPage({ brand = "anais" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Obtenir les couleurs de la marque
  const brandColors = getBrandColors(brand);
  const brandName = getBrandName(brand);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      // Pour l'instant, on utilise des données mockées
      // En production, ce serait : const data = await apiGet(`/api/admin/orders/${id}`);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockOrders = [
        {
          id: 1,
          orderNumber: "CMD-2024-001",
          clientName: "Marie Dubois",
          clientEmail: "marie.dubois@email.com",
          clientPhone: "+33 6 12 34 56 78",
          items: [
            { name: "Crème Hydratante", quantity: 2, price: 25 },
            { name: "Sérum Anti-âge", quantity: 1, price: 45 }
          ],
          totalAmount: 95,
          status: "processing",
          shippingAddress: "123 Rue de la Paix, 75001 Paris",
          orderDate: "2024-01-15",
          deliveryDate: "2024-01-18",
          notes: "Livraison en point relais",
          brand: "anais",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          orderNumber: "CMD-2024-002",
          clientName: "Sophie Martin",
          clientEmail: "sophie.martin@email.com",
          clientPhone: "+33 6 23 45 67 89",
          items: [
            { name: "Masque Purifiant", quantity: 1, price: 30 },
            { name: "Tonique", quantity: 1, price: 20 }
          ],
          totalAmount: 50,
          status: "shipped",
          shippingAddress: "456 Avenue des Champs, 75008 Paris",
          orderDate: "2024-01-16",
          deliveryDate: "2024-01-19",
          notes: "Livraison à domicile",
          brand: "anais",
          createdAt: "2024-01-16",
        },
        {
          id: 3,
          orderNumber: "CMD-2024-003",
          clientName: "Julie Leroy",
          clientEmail: "julie.leroy@email.com",
          clientPhone: "+33 6 34 56 78 90",
          items: [
            { name: "Kit Complet", quantity: 1, price: 120 }
          ],
          totalAmount: 120,
          status: "delivered",
          shippingAddress: "789 Boulevard Saint-Germain, 75006 Paris",
          orderDate: "2024-01-17",
          deliveryDate: "2024-01-20",
          notes: "Client VIP",
          brand: "anais",
          createdAt: "2024-01-17",
        },
        {
          id: 4,
          orderNumber: "CMD-2024-004",
          clientName: "Claire Moreau",
          clientEmail: "claire.moreau@email.com",
          clientPhone: "+33 6 45 67 89 01",
          items: [
            { name: "Produit Test", quantity: 1, price: 15 }
          ],
          totalAmount: 15,
          status: "cancelled",
          shippingAddress: "321 Rue de Rivoli, 75001 Paris",
          orderDate: "2024-01-18",
          deliveryDate: null,
          notes: "Annulé par le client",
          brand: "anais",
          createdAt: "2024-01-18",
        },
        {
          id: 5,
          orderNumber: "CMD-2024-005",
          clientName: "Emma Petit",
          clientEmail: "emma.petit@email.com",
          clientPhone: "+33 6 56 78 90 12",
          items: [
            { name: "Complément Alimentaire", quantity: 3, price: 35 }
          ],
          totalAmount: 105,
          status: "pending",
          shippingAddress: "654 Rue de la République, 69002 Lyon",
          orderDate: "2024-01-19",
          deliveryDate: "2024-01-22",
          notes: "Commande en attente de traitement",
          brand: "evolve",
          createdAt: "2024-01-19",
        },
      ];

      const foundOrder = mockOrders.find(o => o.id === parseInt(id) && o.brand === brand);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError("Commande non trouvée");
      }
    } catch (error) {
      console.error("Erreur lors du chargement de la commande:", error);
      setError("Erreur lors du chargement de la commande");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = () => {
    setShowStatusModal(true);
  };

  const handleStatusSuccess = () => {
    setShowStatusModal(false);
    loadOrder(); // Recharger les données
  };

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
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "processing": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "shipped": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "delivered": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending": return "En attente";
      case "processing": return "En cours";
      case "shipped": return "Expédiée";
      case "delivered": return "Livrée";
      case "cancelled": return "Annulée";
      default: return "Inconnu";
    }
  };

  // Les fonctions getBrandColor et getBrandName sont maintenant importées depuis brandColors.js

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
          brand === 'anais' 
            ? 'border-anais-900'
            : brand === 'evolve'
            ? 'border-evolve-900'
            : 'border-populo-900'
        }`}></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">
          {error || "Commande non trouvée"}
        </div>
        <button
          onClick={() => navigate(`/${brand}/orders`)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            brand === 'anais' 
              ? 'bg-anais-900 hover:bg-anais-800 text-white'
              : brand === 'evolve'
              ? 'bg-evolve-900 hover:bg-evolve-800 text-white'
              : 'bg-populo-900 hover:bg-populo-800 text-white'
          }`}
        >
          Retour aux commandes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/${brand}/orders`)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Retour aux commandes
          </button>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Détails de la commande {getBrandName()}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {order.orderNumber} • {order.clientName}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
          <button
            onClick={handleChangeStatus}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              brand === 'anais' 
                ? 'bg-anais-100 hover:bg-anais-200 dark:bg-anais-900 dark:hover:bg-anais-800 text-pink-600 dark:text-anais-100'
                : brand === 'evolve'
                ? 'bg-evolve-100 hover:bg-evolve-200 dark:bg-evolve-900 dark:hover:bg-evolve-800 text-evolve-900 dark:text-evolve-100'
                : 'bg-populo-100 hover:bg-populo-200 dark:bg-populo-900 dark:hover:bg-populo-800 text-populo-900 dark:text-populo-100'
            }`}
          >
            <PencilIcon className="h-4 w-4" />
            Changer le statut
          </button>
        </div>
      </div>

      {/* En-tête de la commande */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {order.orderNumber}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Commande créée le {formatDate(order.orderDate)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              {order.totalAmount}€
            </div>
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
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Actions rapides
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {order.status === "pending" && (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Marquer comme en cours
            </button>
          )}
          
          {order.status === "processing" && (
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Marquer comme expédiée
            </button>
          )}
          
          {order.status === "shipped" && (
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
                {order.shippingAddress}
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
            <thead className="bg-gray-50 dark:bg-gray-800">
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
                      {(item.quantity * item.price).toFixed(2)}MAD
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                  Total de la commande
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white">
                  {order.totalAmount}MAD
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

      

      {/* Modal de changement de statut */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Changer le statut
              </h2>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <OrderStatusChanger
              order={order}
              onSuccess={handleStatusSuccess}
              onCancel={() => setShowStatusModal(false)}
              brand={brand}
            />
          </div>
        </div>
      )}
    </div>
  );
}

