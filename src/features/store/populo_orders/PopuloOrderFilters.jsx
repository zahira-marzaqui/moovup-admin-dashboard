import React, { useState } from "react";
import { XMarkIcon } from "../../../components/Icons";

export default function PopuloOrderFilters({ filters, onFiltersChange, onClose }) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleChange = (field, value) => {
    const newFilters = { ...localFilters };
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      newFilters[parent] = { ...newFilters[parent], [child]: value };
    } else {
      newFilters[field] = value;
    }
    
    setLocalFilters(newFilters);
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      status: "",
      dateRange: { start: "", end: "" },
      amountRange: { min: "", max: "" },
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const statusOptions = [
    { value: "", label: "Tous les statuts" },
    { value: "EN_ATTENTE", label: "En attente" },
    { value: "EN_COURS", label: "En cours" },
    { value: "PRET", label: "Prêt" },
    { value: "LIVREE", label: "Livrée" },
    { value: "ANNULEE", label: "Annulée" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filtres avancés
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Statut de la commande */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Statut de la commande
          </label>
          <select
            value={localFilters.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Plage de dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Plage de dates
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Date de début
              </label>
              <input
                type="date"
                value={localFilters.dateRange.start}
                onChange={(e) => handleChange('dateRange.start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Date de fin
              </label>
              <input
                type="date"
                value={localFilters.dateRange.end}
                onChange={(e) => handleChange('dateRange.end', e.target.value)}
                min={localFilters.dateRange.start}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Plage de montants */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Plage de montants (€)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Montant minimum
              </label>
              <input
                type="number"
                value={localFilters.amountRange.min}
                onChange={(e) => handleChange('amountRange.min', e.target.value)}
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                Montant maximum
              </label>
              <input
                type="number"
                value={localFilters.amountRange.max}
                onChange={(e) => handleChange('amountRange.max', e.target.value)}
                min={localFilters.amountRange.min || "0"}
                step="0.01"
                placeholder="∞"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleClear}
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          Effacer tous les filtres
        </button>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            Appliquer les filtres
          </button>
        </div>
      </div>
    </div>
  );
}



