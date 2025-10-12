import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet, apiPatch } from "../../../api/http";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
  Squares2X2Icon,
  TableCellsIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  TruckIcon,
} from "../../../components/Icons";
import PopuloOrderFilters from "./PopuloOrderFilters";
import PopuloOrderStatusChanger from "./PopuloOrderStatusChanger";

export default function PopuloOrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    dateRange: { start: "", end: "" },
    amountRange: { min: "", max: "" },
  });
  const [viewMode, setViewMode] = useState('cards'); // 'cards' ou 'table'

  // Charger les commandes Populo depuis l'API
  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiGet('/api/admin/populo-orders');
      setOrders(response.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des commandes:", error);
      // Fallback avec des données mockées si l'API échoue
      const mockOrders = [
        {
          id: 1,
          orderNumber: "POP-2024-001",
          clientName: "Sarah Benali",
          clientEmail: "sarah.benali@email.com",
          clientPhone: "+33 6 12 34 56 78",
          items: [
            { name: "Salade Buddha Bowl", quantity: 1, price: 45 },
            { name: "Smoothie Detox", quantity: 2, price: 25 }
          ],
          totalAmount: 95,
          status: "EN_ATTENTE",
          deliveryAddress: "123 Rue Mohammed V, Casablanca",
          orderDate: "2024-01-15",
          deliveryDate: "2024-01-18",
          notes: "Livraison en point relais",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          orderNumber: "POP-2024-002",
          clientName: "Ahmed Alami",
          clientEmail: "ahmed.alami@email.com",
          clientPhone: "+33 6 23 45 67 89",
          items: [
            { name: "Wrap Avocat", quantity: 1, price: 35 },
            { name: "Jus de Grenade", quantity: 1, price: 20 }
          ],
          totalAmount: 55,
          status: "EN_COURS",
          deliveryAddress: "456 Avenue Hassan II, Rabat",
          orderDate: "2024-01-16",
          deliveryDate: "2024-01-19",
          notes: "Livraison à domicile",
          createdAt: "2024-01-16",
        },
        {
          id: 3,
          orderNumber: "POP-2024-003",
          clientName: "Fatima Zahra",
          clientEmail: "fatima.zahra@email.com",
          clientPhone: "+33 6 34 56 78 90",
          items: [
            { name: "Plateau Healthy", quantity: 1, price: 80 }
          ],
          totalAmount: 80,
          status: "PRET",
          deliveryAddress: "789 Boulevard Zerktouni, Casablanca",
          orderDate: "2024-01-17",
          deliveryDate: "2024-01-20",
          notes: "Client VIP",
          createdAt: "2024-01-17",
        },
        {
          id: 4,
          orderNumber: "POP-2024-004",
          clientName: "Youssef Idrissi",
          clientEmail: "youssef.idrissi@email.com",
          clientPhone: "+33 6 45 67 89 01",
          items: [
            { name: "Salade Quinoa", quantity: 1, price: 40 }
          ],
          totalAmount: 40,
          status: "LIVREE",
          deliveryAddress: "321 Rue de la République, Rabat",
          orderDate: "2024-01-18",
          deliveryDate: "2024-01-21",
          notes: "Livrée avec succès",
          createdAt: "2024-01-18",
        },
        {
          id: 5,
          orderNumber: "POP-2024-005",
          clientName: "Aicha Mansouri",
          clientEmail: "aicha.mansouri@email.com",
          clientPhone: "+33 6 56 78 90 12",
          items: [
            { name: "Smoothie Bowl", quantity: 2, price: 30 }
          ],
          totalAmount: 60,
          status: "ANNULEE",
          deliveryAddress: "654 Avenue Mohammed VI, Marrakech",
          orderDate: "2024-01-19",
          deliveryDate: null,
          notes: "Annulé par le client",
          createdAt: "2024-01-19",
        },
      ];
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleViewOrder = (order) => {
    navigate(`/populo/orders/${order.id}`);
  };

  const handleChangeStatus = (order) => {
    setSelectedOrder(order);
    setShowStatusModal(true);
  };

  const handleStatusSuccess = () => {
    setShowStatusModal(false);
    setSelectedOrder(null);
    loadOrders();
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      dateRange: { start: "", end: "" },
      amountRange: { min: "", max: "" },
    });
  };

  // Filtrer les commandes
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
                         order.clientName.toLowerCase().includes(search.toLowerCase()) ||
                         order.clientEmail.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = !filters.status || order.status === filters.status;
    
    const matchesDate = (!filters.dateRange.start || order.orderDate >= filters.dateRange.start) &&
                       (!filters.dateRange.end || order.orderDate <= filters.dateRange.end);
    
    const matchesAmount = (!filters.amountRange.min || order.totalAmount >= parseFloat(filters.amountRange.min)) &&
                         (!filters.amountRange.max || order.totalAmount <= parseFloat(filters.amountRange.max));

    return matchesSearch && matchesStatus && matchesDate && matchesAmount;
  });

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Commandes Populo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez les commandes et livraisons du restaurant
          </p>
        </div>
          <div className="flex items-center gap-3">
            {/* Boutons de basculement d'affichage */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'cards' 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Vue en cartes"
              >
                <Squares2X2Icon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                title="Vue en tableau"
              >
                <TableCellsIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Recherche */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une commande..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Bouton filtres */}
          <button
            onClick={() => setShowFilters(true)}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FunnelIcon className="h-5 w-5" />
            Filtres
          </button>
        </div>

        {/* Filtres actifs */}
        {(filters.status || filters.dateRange.start || filters.dateRange.end || filters.amountRange.min || filters.amountRange.max) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Filtres actifs:</span>
            {filters.status && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Statut: {getStatusText(filters.status)}
              </span>
            )}
            {(filters.dateRange.start || filters.dateRange.end) && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Date: {filters.dateRange.start || "∞"} - {filters.dateRange.end || "∞"}
              </span>
            )}
            {(filters.amountRange.min || filters.amountRange.max) && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Montant: {filters.amountRange.min || "0"}€ - {filters.amountRange.max || "∞"}€
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-red-600 hover:text-red-800 text-sm underline"
            >
              Effacer tous les filtres
            </button>
          </div>
        )}
      </div>

      {/* Affichage des commandes */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {order.orderNumber}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.clientName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="h-4 w-4" />
                    <span>Commande: {formatDate(order.orderDate)}</span>
                  </div>
                  {order.deliveryDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <TruckIcon className="h-4 w-4" />
                      <span>Livraison: {formatDate(order.deliveryDate)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <UserIcon className="h-4 w-4" />
                    <span>{order.clientEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <PhoneIcon className="h-4 w-4" />
                    <span>{order.clientPhone}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {order.totalAmount}€
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {order.items.length} article{order.items.length > 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <EyeIcon className="h-4 w-4" />
                    Voir
                  </button>
                  <button
                    onClick={() => handleChangeStatus(order)}
                    className="flex-1 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Statut
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Vue tableau */
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Montant
                  </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-600 flex items-center justify-center">
                            <span className="text-green-400 dark:text-green-300 text-sm">🍽️</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{order.orderNumber}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{order.items.length} article{order.items.length > 1 ? 's' : ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{order.clientName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{order.clientEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{formatDate(order.orderDate)}</div>
                      {order.deliveryDate && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">Liv: {formatDate(order.deliveryDate)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {order.totalAmount}€
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300 transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleChangeStatus(order)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            {search || Object.values(filters).some(f => f !== "" && typeof f !== 'object')
              ? "Aucune commande ne correspond à vos critères" 
              : "Aucune commande disponible"}
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            {search || Object.values(filters).some(f => f !== "" && typeof f !== 'object')
              ? "Essayez de modifier vos filtres ou votre recherche"
              : "Commencez par créer votre première commande"}
          </p>
        </div>
      )}

      {/* Modales */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Changer le statut
              </h2>
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedOrder(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <PopuloOrderStatusChanger
              order={selectedOrder}
              onSuccess={handleStatusSuccess}
              onCancel={() => {
                setShowStatusModal(false);
                setSelectedOrder(null);
              }}
            />
          </div>
        </div>
      )}


      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Filtres
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <PopuloOrderFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClose={() => setShowFilters(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
