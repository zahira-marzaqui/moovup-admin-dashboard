import React from 'react'
import { XMarkIcon, PencilIcon, TrashIcon } from '../../../components/Icons'

export default function ProductDetail({ 
  product, 
  brand = 'anais', 
  onClose, 
  onEdit, 
  onDelete 
}) {
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

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Rupture de stock', color: 'text-red-600 bg-red-100' }
    if (stock <= 5) return { text: 'Stock faible', color: 'text-orange-600 bg-orange-100' }
    return { text: 'En stock', color: 'text-green-600 bg-green-100' }
  }

  const stockStatus = getStockStatus(product.stock)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Détails du {brand === 'populo' ? 'plat' : 'produit'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="mb-6">
            <div className="h-64 bg-gray-100 rounded-lg overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full ${colors.bg} flex items-center justify-center`}>
                  <span className={`text-6xl font-bold ${colors.primary}`}>
                    {product.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Name and Status */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.is_active ? 'Actif' : 'Inactif'}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                    {stockStatus.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div className={`${colors.bg} ${colors.border} border rounded-lg p-4`}>
                <h4 className="font-semibold text-gray-900 mb-2">Prix</h4>
                <p className={`text-2xl font-bold ${colors.primary}`}>
                  {product.price} MAD
                </p>
              </div>

              {/* Stock */}
              <div className={`${colors.bg} ${colors.border} border rounded-lg p-4`}>
                <h4 className="font-semibold text-gray-900 mb-2">Stock</h4>
                <p className={`text-2xl font-bold ${colors.primary}`}>
                  {product.stock} {brand === 'populo' ? 'portions' : 'unités'}
                </p>
              </div>

              {/* Category */}
              <div className={`${colors.bg} ${colors.border} border rounded-lg p-4`}>
                <h4 className="font-semibold text-gray-900 mb-2">Catégorie</h4>
                <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${colors.bg} ${colors.primary}`}>
                  {product.category}
                </span>
              </div>

              {/* Brand */}
              <div className={`${colors.bg} ${colors.border} border rounded-lg p-4`}>
                <h4 className="font-semibold text-gray-900 mb-2">Marque</h4>
                <p className={`text-lg font-semibold ${colors.primary} capitalize`}>
                  {brand}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Informations supplémentaires</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>ID:</strong> #{product.id}</p>
                <p><strong>Créé le:</strong> {product.created_at ? new Date(product.created_at).toLocaleDateString('fr-FR') : 'Non disponible'}</p>
                <p><strong>Modifié le:</strong> {product.updated_at ? new Date(product.updated_at).toLocaleDateString('fr-FR') : 'Non disponible'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Fermer
          </button>
          <button
            onClick={onEdit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-white rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <PencilIcon className="w-4 h-4 mr-2" />
            Modifier
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center px-4 py-2 border border-transparent text-white rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
