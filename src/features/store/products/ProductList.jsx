import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiGet, apiDelete } from '../../../api/http'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  Squares2X2Icon,
  TableCellsIcon,
} from '../../../components/Icons'
import ProductForm from './ProductForm'
import ProductFilters from './ProductFilters'

export default function ProductList({ brand = 'anais' }) {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priceMin: '',
    priceMax: '',
    stockMin: '',
    stockMax: ''
  })
  const [viewMode, setViewMode] = useState('cards') // 'cards' ou 'table'

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await apiGet(`/api/products?brand=${brand}`)
      setProducts(response.data || [])
    } catch (error) {
      console.error('Erreur chargement produits:', error)
      // Fallback avec des données mockées si l'API échoue
      setProducts([
        {
          id: 1,
          name: brand === 'anais' ? 'Crème hydratante visage' : brand === 'evolve' ? 'Gel douche énergisant' : 'Smoothie Detox',
          description: 'Description du produit...',
          price: brand === 'populo' ? 45 : 120,
          stock: 25,
          category: brand === 'anais' ? 'Soins visage' : brand === 'evolve' ? 'Soins corps' : 'Boissons',
          is_active: true,
          image_url: null
        },
        {
          id: 2,
          name: brand === 'anais' ? 'Sérum anti-âge' : brand === 'evolve' ? 'Crème à raser' : 'Salade Buddha Bowl',
          description: 'Description du produit...',
          price: brand === 'populo' ? 65 : 180,
          stock: 15,
          category: brand === 'anais' ? 'Soins visage' : brand === 'evolve' ? 'Rasage' : 'Plats principaux',
          is_active: true,
          image_url: null
        }
      ])
    } finally {
      setLoading(false)
    }
  }, [brand])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return
    
    try {
      await apiDelete(`/api/products/${id}`)
      setProducts(products.filter(p => p.id !== id))
      setSelectedProduct(null)
    } catch (error) {
      console.error('Erreur suppression:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleViewProduct = (product) => {
    navigate(`/${brand}/products/${product.id}`)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
  }

  const handleProductSuccess = (productData) => {
    if (editingProduct) {
      // Mode édition
      setProducts(products.map(p => p.id === productData.id ? productData : p))
    } else {
      // Mode création
      setProducts([productData, ...products])
    }
    setShowAddModal(false)
    setEditingProduct(null)
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      status: '',
      priceMin: '',
      priceMax: '',
      stockMin: '',
      stockMax: ''
    })
  }

  const getBrandColors = () => {
    switch (brand) {
      case 'anais':
        return {
          primary: 'text-pink-600',
          bg: 'bg-pink-50',
          border: 'border-pink-200',
          button: 'bg-pink-600 hover:bg-pink-700'
        }
      case 'evolve':
        return {
          primary: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          button: 'bg-blue-600 hover:bg-blue-700'
        }
      case 'populo':
        return {
          primary: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          button: 'bg-green-600 hover:bg-green-700'
        }
      default:
        return {
          primary: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          button: 'bg-gray-600 hover:bg-gray-700'
        }
    }
  }

  const colors = getBrandColors()
  const filteredProducts = products.filter(product => {
    // Filtre par recherche textuelle
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (!matchesSearch) return false

    // Filtre par catégorie
    if (filters.category && product.category !== filters.category) return false

    // Filtre par statut
    if (filters.status) {
      if (filters.status === 'active' && !product.is_active) return false
      if (filters.status === 'inactive' && product.is_active) return false
    }

    // Filtre par prix
    if (filters.priceMin && product.price < parseFloat(filters.priceMin)) return false
    if (filters.priceMax && product.price > parseFloat(filters.priceMax)) return false

    // Filtre par stock
    if (filters.stockMin && product.stock < parseInt(filters.stockMin)) return false
    if (filters.stockMax && product.stock > parseInt(filters.stockMax)) return false

    return true
  })

  const getBrandTitle = () => {
    switch (brand) {
      case 'anais': return 'Produits Anais'
      case 'evolve': return 'Produits Evolve'
      case 'populo': return 'Menu Items Populo'
      default: return 'Produits'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getBrandTitle()}</h1>
          <p className="text-gray-600 mt-1">Gérez vos {brand === 'populo' ? 'plats' : 'produits'} et leur stock</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Boutons de basculement d'affichage */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'cards' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Vue en cartes"
            >
              <Squares2X2Icon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Vue en tableau"
            >
              <TableCellsIcon className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white ${colors.button} transition-colors`}
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Ajouter {brand === 'populo' ? 'un plat' : 'un produit'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowFilters(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filtres
            </button>
            {(filters.category || filters.status || filters.priceMin || filters.priceMax || filters.stockMin || filters.stockMax) && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-red-700 bg-red-50 hover:bg-red-100"
              >
                <XMarkIcon className="w-4 h-4 mr-1" />
                Effacer
              </button>
            )}
          </div>
        </div>
        
        {/* Active Filters Display */}
        {(filters.category || filters.status || filters.priceMin || filters.priceMax || filters.stockMin || filters.stockMax) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Catégorie: {filters.category}
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Statut: {filters.status === 'active' ? 'Actif' : 'Inactif'}
              </span>
            )}
            {(filters.priceMin || filters.priceMax) && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                Prix: {filters.priceMin || '0'} - {filters.priceMax || '∞'} MAD
              </span>
            )}
            {(filters.stockMin || filters.stockMax) && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                Stock: {filters.stockMin || '0'} - {filters.stockMax || '∞'}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Product Image */}
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-16 h-16 rounded-lg ${colors.bg} flex items-center justify-center`}>
                  <span className={`text-2xl font-bold ${colors.primary}`}>
                    {product.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.is_active ? 'Actif' : 'Inactif'}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-gray-900">{product.price} MAD</span>
                <div className="text-right">
                  <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                  <div className={`text-xs font-medium ${
                    product.stock === 0 ? 'text-red-600' : 
                    product.stock <= 5 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {product.stock === 0 ? 'Rupture' : 
                     product.stock <= 5 ? 'Stock faible' : 'En stock'}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.primary}`}>
                  {product.category}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <button 
                  onClick={() => handleViewProduct(product)}
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <EyeIcon className="w-4 h-4 mr-1" />
                  Voir
                </button>
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <PencilIcon className="w-4 h-4 mr-1" />
                  Modifier
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="inline-flex items-center text-red-600 hover:text-red-700 transition-colors"
                >
                  <TrashIcon className="w-4 h-4 mr-1" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      ) : (
        /* Vue tableau */
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {brand === 'populo' ? 'Plat' : 'Produit'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            {product.image_url ? (
                              <img src={product.image_url} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                            ) : (
                              <span className="text-gray-400 text-sm">📦</span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price} MAD
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock === 0 
                          ? 'bg-red-100 text-red-800' 
                          : product.stock < 10 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-green-100 text-green-800'
                      }`}>
                        {product.stock === 0 ? 'Rupture' : product.stock < 10 ? 'Stock faible' : 'En stock'} ({product.stock})
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewProduct(product)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
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

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className={`w-16 h-16 mx-auto rounded-lg ${colors.bg} flex items-center justify-center mb-4`}>
            <span className={`text-2xl ${colors.primary}`}>📦</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun {brand === 'populo' ? 'plat' : 'produit'} trouvé
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Essayez un autre terme de recherche' : `Commencez par ajouter votre premier ${brand === 'populo' ? 'plat' : 'produit'}`}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setShowAddModal(true)}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white ${colors.button} transition-colors`}
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Ajouter {brand === 'populo' ? 'un plat' : 'un produit'}
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <ProductForm
          brand={brand}
          onClose={() => setShowAddModal(false)}
          onSuccess={handleProductSuccess}
        />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          brand={brand}
          onClose={() => setEditingProduct(null)}
          onSuccess={handleProductSuccess}
        />
      )}


      {showFilters && (
        <ProductFilters
          brand={brand}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  )
}
