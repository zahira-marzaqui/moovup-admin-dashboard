import React, { useState, useEffect, useCallback } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
  Squares2X2Icon,
  TableCellsIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
} from "../../../components/Icons";
import BookingDetail from "./BookingDetail";
import BookingFilters from "./BookingFilters";
import BookingStatusChanger from "./BookingStatusChanger";
import CalendarView from "./CalendarView";
import { getBrandColors, getBrandName, getBrandLoadingClasses } from "../../../utils/brandColors";

export default function BookingList({ brand = "anais" }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    service: "",
    dateRange: { start: "", end: "" },
    timeRange: { start: "", end: "" },
  });
  const [viewMode, setViewMode] = useState('cards'); // 'cards', 'table', ou 'calendar'

  // Obtenir les couleurs de la marque
  const brandColors = getBrandColors(brand);
  const brandName = getBrandName(brand);

  // Données de démonstration pour les réservations
  const loadBookings = useCallback(async () => {
    setLoading(true);
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockBookings = [
        {
          id: 1,
          clientName: "Marie Dubois",
          clientEmail: "marie.dubois@email.com",
          clientPhone: "+33 6 12 34 56 78",
          serviceName: "Soin Visage Hydratant",
          serviceId: 1,
          date: "2024-01-15",
          time: "14:30",
          duration: 60,
          price: 45,
          status: "confirmed",
          notes: "Première visite, peau sensible",
          brand: "anais",
          createdAt: "2024-01-10",
        },
        {
          id: 2,
          clientName: "Sophie Martin",
          clientEmail: "sophie.martin@email.com",
          clientPhone: "+33 6 23 45 67 89",
          serviceName: "Massage Relaxant",
          serviceId: 2,
          date: "2024-01-16",
          time: "10:00",
          duration: 90,
          price: 80,
          status: "pending",
          notes: "Préfère un massage doux",
          brand: "anais",
          createdAt: "2024-01-12",
        },
        {
          id: 3,
          clientName: "Julie Leroy",
          clientEmail: "julie.leroy@email.com",
          clientPhone: "+33 6 34 56 78 90",
          serviceName: "Manucure Française",
          serviceId: 3,
          date: "2024-01-17",
          time: "16:00",
          duration: 45,
          price: 25,
          status: "completed",
          notes: "Client régulière",
          brand: "anais",
          createdAt: "2024-01-13",
        },
        {
          id: 4,
          clientName: "Claire Moreau",
          clientEmail: "claire.moreau@email.com",
          clientPhone: "+33 6 45 67 89 01",
          serviceName: "Soin Anti-âge",
          serviceId: 4,
          date: "2024-01-18",
          time: "11:30",
          duration: 120,
          price: 120,
          status: "cancelled",
          notes: "Annulé par le client",
          brand: "anais",
          createdAt: "2024-01-14",
        },
        {
          id: 5,
          clientName: "Emma Petit",
          clientEmail: "emma.petit@email.com",
          clientPhone: "+33 6 56 78 90 12",
          serviceName: "Massage Sportif",
          serviceId: 5,
          date: "2024-01-19",
          time: "15:00",
          duration: 75,
          price: 100,
          status: "confirmed",
          notes: "Après entraînement",
          brand: "evolve",
          createdAt: "2024-01-15",
        },
      ];

      // Filtrer par marque
      const brandBookings = mockBookings.filter(booking => booking.brand === brand);
      setBookings(brandBookings);
    } catch (error) {
      console.error("Erreur lors du chargement des réservations:", error);
    } finally {
      setLoading(false);
    }
  }, [brand]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowDetail(true);
  };

  const handleChangeStatus = (booking) => {
    setSelectedBooking(booking);
    setShowStatusModal(true);
  };

  const handleStatusSuccess = () => {
    setShowStatusModal(false);
    setShowDetail(false);
    setSelectedBooking(null);
    loadBookings();
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      service: "",
      dateRange: { start: "", end: "" },
      timeRange: { start: "", end: "" },
    });
  };

  // Filtrer les réservations
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.clientName.toLowerCase().includes(search.toLowerCase()) ||
                         booking.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
                         booking.serviceName.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = !filters.status || booking.status === filters.status;
    const matchesService = !filters.service || booking.serviceName === filters.service;
    
    const matchesDate = (!filters.dateRange.start || booking.date >= filters.dateRange.start) &&
                       (!filters.dateRange.end || booking.date <= filters.dateRange.end);
    
    const matchesTime = (!filters.timeRange.start || booking.time >= filters.timeRange.start) &&
                        (!filters.timeRange.end || booking.time <= filters.timeRange.end);

    return matchesSearch && matchesStatus && matchesService && matchesDate && matchesTime;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "completed": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed": return "Confirmée";
      case "pending": return "En attente";
      case "completed": return "Terminée";
      case "cancelled": return "Annulée";
      default: return "Inconnu";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Réservations {brandName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez les rendez-vous et réservations
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
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              title="Vue calendrier"
            >
              <CalendarIcon className="w-5 h-5" />
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
                placeholder="Rechercher une réservation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 ${
                  brand === 'anais' 
                    ? 'focus:ring-anais-500'
                    : brand === 'evolve'
                    ? 'focus:ring-evolve-500'
                    : 'focus:ring-populo-500'
                } focus:border-transparent dark:bg-gray-700 dark:text-white`}
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
        {(filters.status || filters.service || filters.dateRange.start || filters.dateRange.end || filters.timeRange.start || filters.timeRange.end) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Filtres actifs:</span>
            {filters.status && (
              <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm">
                Statut: {getStatusText(filters.status)}
              </span>
            )}
            {filters.service && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                Service: {filters.service}
              </span>
            )}
            {(filters.dateRange.start || filters.dateRange.end) && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Date: {filters.dateRange.start || "∞"} - {filters.dateRange.end || "∞"}
              </span>
            )}
            {(filters.timeRange.start || filters.timeRange.end) && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                Heure: {filters.timeRange.start || "∞"} - {filters.timeRange.end || "∞"}
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

      {/* Affichage des réservations */}
      {viewMode === 'calendar' ? (
        <CalendarView
          bookings={filteredBookings}
          onBookingClick={handleViewBooking}
          brand={brand}
        />
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {booking.clientName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.serviceName}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{formatDate(booking.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <ClockIcon className="h-4 w-4" />
                    <span>{booking.time} ({booking.duration}min)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <UserIcon className="h-4 w-4" />
                    <span>{booking.clientEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <PhoneIcon className="h-4 w-4" />
                    <span>{booking.clientPhone}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.price}€
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewBooking(booking)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                  >
                    <EyeIcon className="h-4 w-4" />
                    Voir
                  </button>
                  <button
                    onClick={() => handleChangeStatus(booking)}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
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
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date & Heure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Prix
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
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-gray-400 dark:text-gray-300" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.clientName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{booking.clientEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{booking.serviceName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{booking.duration}min</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{formatDate(booking.date)}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{booking.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {booking.price}€
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewBooking(booking)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                          <button
                            onClick={() => handleChangeStatus(booking)}
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

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            {search || Object.values(filters).some(f => f !== "" && typeof f !== 'object')
              ? "Aucune réservation ne correspond à vos critères" 
              : "Aucune réservation disponible"}
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            {search || Object.values(filters).some(f => f !== "" && typeof f !== 'object')
              ? "Essayez de modifier vos filtres ou votre recherche"
              : "Commencez par créer votre première réservation"}
          </p>
        </div>
      )}

      {/* Modales */}
      {showStatusModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Changer le statut
              </h2>
              <button
                onClick={() => {
                  setShowStatusModal(false);
                  setSelectedBooking(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <BookingStatusChanger
              booking={selectedBooking}
              onSuccess={handleStatusSuccess}
              onCancel={() => {
                setShowStatusModal(false);
                setSelectedBooking(null);
              }}
              brand={brand}
            />
          </div>
        </div>
      )}

      {showDetail && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Détails de la réservation
              </h2>
              <button
                onClick={() => {
                  setShowDetail(false);
                  setSelectedBooking(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <BookingDetail booking={selectedBooking} />
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
            <BookingFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClose={() => setShowFilters(false)}
              brand={brand}
            />
          </div>
        </div>
      )}
    </div>
  );
}
