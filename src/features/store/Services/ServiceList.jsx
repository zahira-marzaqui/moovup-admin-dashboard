import React, { useState, useEffect, useCallback } from "react";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
  Squares2X2Icon,
  TableCellsIcon,
  TrashIcon,
} from "../../../components/Icons";
import ServiceForm from "./ServiceForm";
import ServiceDetail from "./ServiceDetail";
import ServiceFilters from "./ServiceFilters";
import { getBrandColors, getBrandName, getBrandButtonClasses, getBrandLoadingClasses } from "../../../utils/brandColors";

export default function ServiceList({ brand = "anais" }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    priceRange: { min: "", max: "" },
    durationRange: { min: "", max: "" },
  });
  const [viewMode, setViewMode] = useState('cards'); // 'cards' ou 'table'

  // Obtenir les couleurs de la marque
  const brandColors = getBrandColors(brand);
  const brandName = getBrandName(brand);

  // Données de démonstration pour les services
  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockServices = [
        {
          id: 1,
          name: "Soin Visage Hydratant",
          description: "Soin complet du visage avec hydratation profonde",
          category: "Beauté",
          price: 45,
          duration: 60,
          status: "active",
          brand: "anais",
          image: "/api/placeholder/300/200",
          createdAt: "2024-01-15",
        },
        {
          id: 2,
          name: "Massage Relaxant",
          description: "Massage corporel complet pour la relaxation",
          category: "Bien-être",
          price: 80,
          duration: 90,
          status: "active",
          brand: "anais",
          image: "/api/placeholder/300/200",
          createdAt: "2024-01-20",
        },
        {
          id: 3,
          name: "Manucure Française",
          description: "Manucure classique avec vernis français",
          category: "Beauté",
          price: 25,
          duration: 45,
          status: "active",
          brand: "anais",
          image: "/api/placeholder/300/200",
          createdAt: "2024-01-25",
        },
        {
          id: 4,
          name: "Soin Anti-âge",
          description: "Traitement anti-âge avec produits premium",
          category: "Beauté",
          price: 120,
          duration: 120,
          status: "inactive",
          brand: "anais",
          image: "/api/placeholder/300/200",
          createdAt: "2024-02-01",
        },
        {
          id: 5,
          name: "Massage Sportif",
          description: "Massage thérapeutique pour sportifs",
          category: "Bien-être",
          price: 100,
          duration: 75,
          status: "active",
          brand: "evolve",
          image: "/api/placeholder/300/200",
          createdAt: "2024-02-05",
        },
      ];

      // Filtrer par marque
      const brandServices = mockServices.filter(service => service.brand === brand);
      setServices(brandServices);
    } catch (error) {
      console.error("Erreur lors du chargement des services:", error);
    } finally {
      setLoading(false);
    }
  }, [brand]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const handleViewService = (service) => {
    setSelectedService(service);
    setShowDetail(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setShowAddModal(true);
  };

  const handleServiceSuccess = () => {
    setShowAddModal(false);
    setEditingService(null);
    setShowDetail(false);
    setSelectedService(null);
    loadServices();
  };

  const handleDeleteService = (service) => {
    setDeletingService(service);
    setShowDeleteModal(true);
  };

  const confirmDeleteService = async () => {
    if (!deletingService) return;
    
    try {
      // Simulation d'un appel API de suppression
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Supprimer le service de la liste
      setServices(prevServices => 
        prevServices.filter(service => service.id !== deletingService.id)
      );
      
      setShowDeleteModal(false);
      setDeletingService(null);
    } catch (error) {
      console.error("Erreur lors de la suppression du service:", error);
    }
  };

  const cancelDeleteService = () => {
    setShowDeleteModal(false);
    setDeletingService(null);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      status: "",
      priceRange: { min: "", max: "" },
      durationRange: { min: "", max: "" },
    });
  };

  // Filtrer les services
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase()) ||
                         service.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = !filters.category || service.category === filters.category;
    const matchesStatus = !filters.status || service.status === filters.status;
    
    const matchesPrice = (!filters.priceRange.min || service.price >= parseFloat(filters.priceRange.min)) &&
                        (!filters.priceRange.max || service.price <= parseFloat(filters.priceRange.max));
    
    const matchesDuration = (!filters.durationRange.min || service.duration >= parseFloat(filters.durationRange.min)) &&
                           (!filters.durationRange.max || service.duration <= parseFloat(filters.durationRange.max));

    return matchesSearch && matchesCategory && matchesStatus && matchesPrice && matchesDuration;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active": return "Actif";
      case "inactive": return "Inactif";
      default: return "Inconnu";
    }
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
            Services {brandName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez vos services et prestations
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
          
          <button
            onClick={() => setShowAddModal(true)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              brand === 'anais' 
                ? 'bg-anais-900 hover:bg-anais-800 text-white'
                : brand === 'evolve'
                ? 'bg-evolve-900 hover:bg-evolve-800 text-white'
                : 'bg-populo-900 hover:bg-populo-800 text-white'
            }`}
          >
            <PlusIcon className="h-5 w-5" />
            Ajouter un service
          </button>
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
                placeholder="Rechercher un service..."
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
        {(filters.category || filters.status || filters.priceRange.min || filters.priceRange.max || filters.durationRange.min || filters.durationRange.max) && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Filtres actifs:</span>
            {filters.category && (
              <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm">
                Catégorie: {filters.category}
              </span>
            )}
            {filters.status && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                Statut: {getStatusText(filters.status)}
              </span>
            )}
            {(filters.priceRange.min || filters.priceRange.max) && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                Prix: {filters.priceRange.min || "0"}€ - {filters.priceRange.max || "∞"}€
              </span>
            )}
            {(filters.durationRange.min || filters.durationRange.max) && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                Durée: {filters.durationRange.min || "0"}min - {filters.durationRange.max || "∞"}min
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

      {/* Services Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Image du service</span>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {service.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                  {getStatusText(service.status)}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {service.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Catégorie:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{service.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Prix:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{service.price}€</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Durée:</span>
                  <span className="text-gray-900 dark:text-white font-medium">{service.duration}min</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewService(service)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <EyeIcon className="h-4 w-4" />
                  Voir
                </button>
                <button
                  onClick={() => handleEditService(service)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                    brand === 'anais' 
                      ? 'bg-anais-100 hover:bg-anais-200 dark:bg-anais-900 dark:hover:bg-anais-800 text-anais-700 dark:text-anais-300'
                      : brand === 'evolve'
                      ? 'bg-evolve-100 hover:bg-evolve-200 dark:bg-evolve-900 dark:hover:bg-evolve-800 text-evolve-700 dark:text-evolve-300'
                      : 'bg-populo-100 hover:bg-populo-200 dark:bg-populo-900 dark:hover:bg-populo-800 text-populo-700 dark:text-populo-300'
                  }`}
                >
                  <PencilIcon className="h-4 w-4" />
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteService(service)}
                  className="flex-1 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <TrashIcon className="h-4 w-4" />
                  Supprimer
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
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Durée
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
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                            <span className="text-gray-400 dark:text-gray-300 text-sm">🔧</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{service.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {service.price}€
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {service.duration}min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {getStatusText(service.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewService(service)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditService(service)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
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

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 text-lg">
            {search || Object.values(filters).some(f => f !== "" && f !== { min: "", max: "" }) 
              ? "Aucun service ne correspond à vos critères" 
              : "Aucun service disponible"}
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            {search || Object.values(filters).some(f => f !== "" && f !== { min: "", max: "" })
              ? "Essayez de modifier vos filtres ou votre recherche"
              : "Commencez par ajouter votre premier service"}
          </p>
        </div>
      )}

      {/* Modales */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingService ? "Modifier le service" : "Ajouter un service"}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingService(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <ServiceForm
              service={editingService}
              brand={brand}
              onSuccess={handleServiceSuccess}
              onCancel={() => {
                setShowAddModal(false);
                setEditingService(null);
              }}
            />
          </div>
        </div>
      )}

      {showDetail && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Détails du service
              </h2>
              <button
                onClick={() => {
                  setShowDetail(false);
                  setSelectedService(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <ServiceDetail service={selectedService} />
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
            <ServiceFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClose={() => setShowFilters(false)}
              brand={brand}
            />
          </div>
        </div>
      )}

      {showDeleteModal && deletingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <TrashIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Supprimer le service
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Cette action est irréversible
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Êtes-vous sûr de vouloir supprimer le service <strong>"{deletingService.name}"</strong> ?
                </p>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDeleteService}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDeleteService}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <TrashIcon className="w-4 h-4" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
