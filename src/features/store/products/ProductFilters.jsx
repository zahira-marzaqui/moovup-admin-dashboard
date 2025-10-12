import React, { useState } from 'react'
import { XMarkIcon } from '../../../components/Icons'

export default function ProductFilters({ 
  brand = 'anais', 
  filters, 
  onFiltersChange, 
  onClose 
}) {
  const [localFilters, setLocalFilters] = useState(filters)

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

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
  }

  const handleApplyFilters = () => {
    onFiltersChange(localFilters)
    onClose()
  }

  const handleResetFilters = () => {
    const resetFilters = {
      category: '',
      status: '',
      priceMin: '',
      priceMax: '',
      stockMin: '',
      stockMax: ''
    }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Filtres avancés
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 space-y-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <select
              value={localFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${colors.focus} border-gray-300`}
            >
              <option value="">Toutes les catégories</option>
              {getBrandCategories().map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              value={localFilters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg ${colors.focus} border-gray-300`}
            >
              <option value="">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix (MAD)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={localFilters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                className={`px-3 py-2 border rounded-lg ${colors.focus} border-gray-300`}
              />
              <input
                type="number"
                placeholder="Max"
                value={localFilters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                className={`px-3 py-2 border rounded-lg ${colors.focus} border-gray-300`}
              />
            </div>
          </div>

          {/* Stock Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={localFilters.stockMin}
                onChange={(e) => handleFilterChange('stockMin', e.target.value)}
                className={`px-3 py-2 border rounded-lg ${colors.focus} border-gray-300`}
              />
              <input
                type="number"
                placeholder="Max"
                value={localFilters.stockMax}
                onChange={(e) => handleFilterChange('stockMax', e.target.value)}
                className={`px-3 py-2 border rounded-lg ${colors.focus} border-gray-300`}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between p-6 border-t border-gray-200">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Réinitialiser
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleApplyFilters}
              className={`px-4 py-2 border border-transparent text-white rounded-lg ${colors.button} transition-colors`}
            >
              Appliquer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
