import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  PencilIcon,
  TrashIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  CalendarIcon,
  XMarkIcon,
} from "../../../components/Icons";
import { apiGet, apiDelete } from "../../../api/http";

export default function ProductDetailPage({ brand = "anais" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      // Pour l'instant, on utilise des données mockées
      // En production, ce serait : const data = await apiGet(`/api/products/${id}`);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockProducts = [
        {
          id: 1,
          name: brand === 'anais' ? 'Crème hydratante visage' : brand === 'evolve' ? 'Gel douche énergisant' : 'Smoothie Detox',
          description: brand === 'anais' ? 'Crème hydratante enrichie en acide hyaluronique pour une peau douce et hydratée' : 
                       brand === 'evolve' ? 'Gel douche aux extraits naturels pour réveiller vos sens' : 
                       'Smoothie détox aux fruits frais et superaliments',
          price: brand === 'populo' ? 45 : 120,
          category: brand === 'anais' ? 'Soins visage' : brand === 'evolve' ? 'Hygiène' : 'Boissons',
          stock: brand === 'populo' ? 25 : 15,
          sku: brand === 'anais' ? 'ANA-CREME-001' : brand === 'evolve' ? 'EVO-GEL-001' : 'POP-SMO-001',
          brand: brand,
          status: 'active',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-20',
          images: brand === 'anais' ? ['/creme-hydratante-byphasse-3494730337.jpg'] : 
                   brand === 'evolve' ? ['https://via.placeholder.com/300x300'] :
                   ['https://via.placeholder.com/300x300'],
          ingredients: brand === 'anais' ? ['Acide hyaluronique', 'Vitamine E', 'Aloe vera'] : 
                       brand === 'evolve' ? ['Eucalyptus', 'Menthe', 'Extraits naturels'] :
                       ['Banane', 'Épinards', 'Spiruline', 'Gingembre'],
          benefits: brand === 'anais' ? ['Hydratation intense', 'Anti-âge', 'Apaisant'] :
                    brand === 'evolve' ? ['Énergisant', 'Rafraîchissant', 'Purifiant'] :
                    ['Détox', 'Énergisant', 'Riche en vitamines'],
          usage: brand === 'anais' ? 'Appliquer matin et soir sur le visage propre' :
                 brand === 'evolve' ? 'Utiliser quotidiennement sous la douche' :
                 'Consommer le matin à jeun pour un effet optimal',
        },
        {
          id: 2,
          name: brand === 'anais' ? 'Sérum anti-âge' : brand === 'evolve' ? 'Shampooing fortifiant' : 'Salade Buddha Bowl',
          description: brand === 'anais' ? 'Sérum concentré en peptides pour réduire les signes de l\'âge' : 
                       brand === 'evolve' ? 'Shampooing aux protéines pour renforcer les cheveux' : 
                       'Salade complète aux légumes frais et graines',
          price: brand === 'populo' ? 35 : 85,
          category: brand === 'anais' ? 'Soins visage' : brand === 'evolve' ? 'Cheveux' : 'Salades',
          stock: brand === 'populo' ? 30 : 8,
          sku: brand === 'anais' ? 'ANA-SERUM-002' : brand === 'evolve' ? 'EVO-SHAM-002' : 'POP-SAL-002',
          brand: brand,
          status: 'active',
          createdAt: '2024-01-16',
          updatedAt: '2024-01-21',
          images: brand === 'anais' ? ['/creme-hydratante-byphasse-3494730337.jpg'] : 
                   brand === 'evolve' ? ['https://via.placeholder.com/300x300'] :
                   ['https://via.placeholder.com/300x300'],
          ingredients: brand === 'anais' ? ['Peptides', 'Rétinol', 'Vitamine C'] : 
                       brand === 'evolve' ? ['Protéines', 'Biotine', 'Keratin'] :
                       ['Quinoa', 'Avocat', 'Chou kale', 'Graines de chia'],
          benefits: brand === 'anais' ? ['Anti-âge', 'Fermeté', 'Éclat'] :
                    brand === 'evolve' ? ['Fortifiant', 'Brillance', 'Volume'] :
                    ['Équilibré', 'Riche en fibres', 'Protéines végétales'],
          usage: brand === 'anais' ? 'Appliquer le soir sur le visage propre' :
                 brand === 'evolve' ? 'Masser le cuir chevelu et laisser poser 2 minutes' :
                 'Servir frais, mélanger avant de déguster',
        },
        {
          id: 3,
          name: brand === 'anais' ? 'Masque purifiant' : brand === 'evolve' ? 'Crème hydratante corps' : 'Wrap Avocat',
          description: brand === 'anais' ? 'Masque aux argiles pour purifier et détoxifier la peau' : 
                       brand === 'evolve' ? 'Crème hydratante pour tout le corps' : 
                       'Wrap healthy à l\'avocat et légumes frais',
          price: brand === 'populo' ? 25 : 65,
          category: brand === 'anais' ? 'Soins visage' : brand === 'evolve' ? 'Corps' : 'Wraps',
          stock: brand === 'populo' ? 20 : 12,
          sku: brand === 'anais' ? 'ANA-MASK-003' : brand === 'evolve' ? 'EVO-CREM-003' : 'POP-WRAP-003',
          brand: brand,
          status: 'active',
          createdAt: '2024-01-17',
          updatedAt: '2024-01-22',
          images: brand === 'anais' ? ['/creme-hydratante-byphasse-3494730337.jpg'] : 
                   brand === 'evolve' ? ['https://via.placeholder.com/300x300'] :
                   ['https://via.placeholder.com/300x300'],
          ingredients: brand === 'anais' ? ['Argile verte', 'Charbon actif', 'Tea tree'] : 
                       brand === 'evolve' ? ['Beurre de karité', 'Vitamine E', 'Huile d\'argan'] :
                       ['Avocat', 'Tomates', 'Laitue', 'Tortilla complète'],
          benefits: brand === 'anais' ? ['Purifiant', 'Détoxifiant', 'Apaisant'] :
                    brand === 'evolve' ? ['Hydratant', 'Nourrissant', 'Protecteur'] :
                    ['Équilibré', 'Riche en bonnes graisses', 'Satiétant'],
          usage: brand === 'anais' ? 'Appliquer 1-2 fois par semaine, laisser poser 15 min' :
                 brand === 'evolve' ? 'Appliquer après la douche sur peau humide' :
                 'Servir immédiatement, consommer frais',
        },
      ];

      const foundProduct = mockProducts.find(p => p.id === parseInt(id) && p.brand === brand);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError("Produit non trouvé");
      }
    } catch (error) {
      console.error("Erreur lors du chargement du produit:", error);
      setError("Erreur lors du chargement du produit");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/${brand}/products/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      // En production : await apiDelete(`/api/products/${id}`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(`/${brand}/products`);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Non définie";
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getBrandColor = () => {
    switch (brand) {
      case "anais": return "pink";
      case "evolve": return "blue";
      case "populo": return "green";
      default: return "gray";
    }
  };

  const getBrandName = () => {
    switch (brand) {
      case "anais": return "Anais";
      case "evolve": return "Evolve";
      case "populo": return "Populo";
      default: return "Unknown";
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Rupture de stock', color: 'text-red-600 bg-red-100' };
    if (stock <= 5) return { text: 'Stock faible', color: 'text-orange-600 bg-orange-100' };
    return { text: 'En stock', color: 'text-green-600 bg-green-100' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 border-${getBrandColor()}-600`}></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg mb-4">
          {error || "Produit non trouvé"}
        </div>
        <button
          onClick={() => navigate(`/${brand}/products`)}
          className={`bg-${getBrandColor()}-600 hover:bg-${getBrandColor()}-700 text-white px-4 py-2 rounded-lg transition-colors`}
        >
          Retour aux produits
        </button>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="space-y-6">
      {/* Header avec navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/${brand}/products`)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Retour aux produits
          </button>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Détails du produit {getBrandName()}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {product.name} 
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
          <button
            onClick={handleEdit}
            className={`bg-${getBrandColor()}-100 hover:bg-${getBrandColor()}-200 dark:bg-${getBrandColor()}-900 dark:hover:bg-${getBrandColor()}-800 text-${getBrandColor()}-700 dark:text-${getBrandColor()}-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2`}
          >
            <PencilIcon className="h-4 w-4" />
            Modifier
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <TrashIcon className="h-4 w-4" />
            Supprimer
          </button>
        </div>
      </div>

      {/* En-tête du produit */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
          {/* Colonne gauche - Image */}
          <div className="flex justify-center lg:justify-center mt-4">
            {product.images && product.images.length > 0 ? (
              <div className="w-full max-w-md gap-4">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 dark:text-gray-500">Aucune image</span>
              </div>
            )}
          </div>

          {/* Colonne droite - Informations */}
          <div className="space-y-6">
            {/* Nom et description */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {product.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Prix et stock */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {product.price}MAD
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Prix de vente</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {product.stock}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">unités disponibles</p>
                  
                </div>
              </div>
              <br></br>

              {/* informations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informations générales */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <ShoppingBagIcon className="h-5 w-5" />
                    Informations générales
                </h3>
                
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Catégorie
                    </label>
                    <p className="text-gray-900 dark:text-white">{product.category}</p>
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Statut
                    </label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                        {product.status === 'active' ? 'Actif' : 'Inactif'}
                    </span>
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Stock disponible
                    </label>
                    <p className="text-gray-900 dark:text-white">{product.stock} unités</p>
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Prix de vente
                    </label>
                    <p className="text-gray-900 dark:text-white font-semibold">{product.price}€</p>
                    </div>
                </div>
                </div>

                {/* Dates et historique */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Historique
                </h3>
                
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Date de création
                    </label>
                    <p className="text-gray-900 dark:text-white">{formatDate(product.createdAt)}</p>
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Dernière modification
                    </label>
                    <p className="text-gray-900 dark:text-white">{formatDate(product.updatedAt)}</p>
                    </div>
                    
                    <div>
                    <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                        Marque
                    </label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getBrandColor()}-100 text-${getBrandColor()}-800`}>
                        {getBrandName()}
                    </span>
                    </div>
                </div>
                </div>
            </div>
            </div>

            </div>
        </div>
      </div>

      

      


      {/* Modal de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Supprimer le produit
              </h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Êtes-vous sûr de vouloir supprimer le produit "{product.name}" ? Cette action est irréversible.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  {deleting && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
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



