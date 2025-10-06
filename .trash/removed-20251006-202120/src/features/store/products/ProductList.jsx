import React, { useState, useEffect } from 'react'
import { apiGet, apiPost, apiPatch, apiDelete } from '../../../api/http'
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '../../../components/Icons'

export default function ProductList({ brand = 'anais' }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [brand])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const response = await apiGet(`/api/products?brand=${brand}`)
      setProducts(response.data || [])
    } catch (error) {
      console.error('Erreur chargement produits:', error)
      // Mock data pour la démo
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
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return
    
    try {
      await apiDelete(`/api/products/${id}`)
      setProducts(products.filter(p => p.id !== id))
    } catch (error) {
      console.error('Erreur suppression:', error)
      alert('Erreur lors de la suppression')
    }
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
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
        <button
          onClick={() => setShowAddModal(true)}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white ${colors.button} transition-colors`}
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Ajouter {brand === 'populo' ? 'un plat' : 'un produit'}
        </button>
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
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50">
            <FunnelIcon className="w-5 h-5 mr-2" />
            Filtres
          </button>
        </div>
      </div>

      {/* Products Grid */}
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
                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
              </div>

              <div className="mb-4">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.primary}`}>
                  {product.category}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <button className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <EyeIcon className="w-4 h-4 mr-1" />
                  Voir
                </button>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
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

      {/* Add Product Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ajouter {brand === 'populo' ? 'un plat' : 'un produit'}
            </h3>
            <p className="text-gray-600 mb-4">Modal d'ajout à implémenter avec formulaire complet.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                className={`px-4 py-2 border border-transparent text-white rounded-lg ${colors.button}`}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
