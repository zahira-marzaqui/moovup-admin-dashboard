import React, { useState, useEffect } from 'react'
import { apiPost, apiPatch } from '../../../api/http'
import { XMarkIcon } from '../../../components/Icons'

export default function ProductForm({ 
  product = null, 
  brand = 'anais', 
  onClose, 
  onSuccess 
}) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    is_active: true,
    image_url: '',
    brand: brand
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  // Initialiser le formulaire avec les données du produit si en mode édition
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        category: product.category || '',
        is_active: product.is_active !== undefined ? product.is_active : true,
        image_url: product.image_url || '',
        brand: product.brand || brand
      })
    }
  }, [product, brand])

  const getBrandCategories = () => {
    switch (brand) {
      case 'anais':
        return [
          'Soins visage',
          'Soins corps',
          'Maquillage',
          'Parfums',
          'Accessoires',
          'Spa & Bien-être'
        ]
      case 'evolve':
        return [
          'Soins visage',
          'Soins corps',
          'Rasage',
          'Parfums',
          'Accessoires',
          'Spa & Bien-être'
        ]
      case 'populo':
        return [
          'Plats principaux',
          'Boissons',
          'Desserts',
          'Salades',
          'Smoothies',
          'Snacks'
        ]
      default:
        return ['Général']
    }
  }

  const getBrandColors = () => {
    switch (brand) {
      case 'anais':
        return {
          primary: 'text-pink-600',
          bg: 'bg-pink-50',
          border: 'border-pink-200',
          button: 'bg-pink-600 hover:bg-pink-700',
          focus: 'focus:ring-pink-500 focus:border-pink-500'
        }
      case 'evolve':
        return {
          primary: 'text-blue-600',
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          button: 'bg-blue-600 hover:bg-blue-700',
          focus: 'focus:ring-blue-500 focus:border-blue-500'
        }
      case 'populo':
        return {
          primary: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
          button: 'bg-green-600 hover:bg-green-700',
          focus: 'focus:ring-green-500 focus:border-green-500'
        }
      default:
        return {
          primary: 'text-gray-600',
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          button: 'bg-gray-600 hover:bg-gray-700',
          focus: 'focus:ring-gray-500 focus:border-gray-500'
        }
    }
  }

  const colors = getBrandColors()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise'
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Le prix doit être supérieur à 0'
    }
    
    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = 'Le stock doit être positif'
    }
    
    if (!formData.category) {
      newErrors.category = 'La catégorie est requise'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      }

      let response
      if (product) {
        // Mode édition
        response = await apiPatch(`/api/products/${product.id}`, productData)
      } else {
        // Mode création
        response = await apiPost('/api/products', productData)
      }

      onSuccess(response.data)
      onClose()
    } catch (error) {
      console.error('Erreur sauvegarde produit:', error)
      setErrors({ submit: 'Erreur lors de la sauvegarde' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const getBrandTitle = () => {
    switch (brand) {
      case 'anais': return 'Produit Anais'
      case 'evolve': return 'Produit Evolve'
      case 'populo': return 'Plat Populo'
      default: return 'Produit'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            {product ? `Modifier ${getBrandTitle()}` : `Ajouter ${getBrandTitle()}`}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image du produit
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => handleChange('image_url', e.target.value)}
                  placeholder="https://exemple.com/image.jpg"
                  className={`w-full px-3 py-2 border rounded-lg ${colors.focus} ${
                    errors.image_url ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                {errors.image_url && (
                  <p className="text-red-600 text-sm mt-1">{errors.image_url}</p>
                )}
              </div>
              {formData.image_url && (
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du {brand === 'populo' ? 'plat' : 'produit'} *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${colors.focus} ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder={`Nom du ${brand === 'populo' ? 'plat' : 'produit'}`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg ${colors.focus} ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Description détaillée du produit"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Prix et Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix (MAD) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${colors.focus} ${
                  errors.price ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleChange('stock', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg ${colors.focus} ${
                  errors.stock ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.stock && (
                <p className="text-red-600 text-sm mt-1">{errors.stock}</p>
              )}
            </div>
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${colors.focus} ${
                errors.category ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Sélectionner une catégorie</option>
              {getBrandCategories().map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Statut */}
          <div>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) => handleChange('is_active', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Produit actif
              </span>
            </label>
            <p className="text-xs text-gray-500 mt-1">
              Les produits inactifs ne sont pas visibles par les clients
            </p>
          </div>

          {/* Erreur générale */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 border border-transparent text-white rounded-lg ${colors.button} transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? 'Sauvegarde...' : (product ? 'Modifier' : 'Ajouter')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
