import React from "react";

export default function ServiceFilters({ filters, onFiltersChange, onClose, brand = "anais" }) {
  const handleChange = (field, value) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const handleRangeChange = (field, rangeField, value) => {
    onFiltersChange({
      ...filters,
      [field]: {
        ...filters[field],
        [rangeField]: value
      }
    });
  };

  const categories = [
    "Beauté",
    "Bien-être",
    "Massage",
    "Soins du visage",
    "Manucure",
    "Pédicure",
    "Épilations",
    "Maquillage",
    "Autres"
  ];

  const statuses = [
    { value: "active", label: "Actif" },
    { value: "inactive", label: "Inactif" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Catégorie */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Catégorie
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Toutes les catégories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Statut */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Statut
        </label>
        <select
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Tous les statuts</option>
          {statuses.map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {/* Prix */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Prix (€)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Min
            </label>
            <input
              type="number"
              value={filters.priceRange.min}
              onChange={(e) => handleRangeChange("priceRange", "min", e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Max
            </label>
            <input
              type="number"
              value={filters.priceRange.max}
              onChange={(e) => handleRangeChange("priceRange", "max", e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              placeholder="∞"
            />
          </div>
        </div>
      </div>

      {/* Durée */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Durée (minutes)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Min
            </label>
            <input
              type="number"
              value={filters.durationRange.min}
              onChange={(e) => handleRangeChange("durationRange", "min", e.target.value)}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Max
            </label>
            <input
              type="number"
              value={filters.durationRange.max}
              onChange={(e) => handleRangeChange("durationRange", "max", e.target.value)}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
              placeholder="∞"
            />
          </div>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            onFiltersChange({
              category: "",
              status: "",
              priceRange: { min: "", max: "" },
              durationRange: { min: "", max: "" },
            });
          }}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          Effacer
        </button>
        <button
          onClick={onClose}
          className={`px-4 py-2 text-white rounded-lg transition-colors ${
            brand === 'anais' 
              ? 'bg-anais-900 hover:bg-anais-800'
              : brand === 'evolve'
              ? 'bg-evolve-900 hover:bg-evolve-800'
              : 'bg-populo-900 hover:bg-populo-800'
          }`}
        >
          Appliquer
        </button>
      </div>
    </div>
  );
}
