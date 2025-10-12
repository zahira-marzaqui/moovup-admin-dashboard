import React from "react";

export default function BookingFilters({ filters, onFiltersChange, onClose, brand = "anais" }) {
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

  const services = [
    "Soin Visage Hydratant",
    "Massage Relaxant",
    "Manucure Française",
    "Soin Anti-âge",
    "Massage Sportif"
  ];

  const statuses = [
    { value: "pending", label: "En attente" },
    { value: "confirmed", label: "Confirmée" },
    { value: "completed", label: "Terminée" },
    { value: "cancelled", label: "Annulée" }
  ];

  return (
    <div className="p-6 space-y-6">
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

      {/* Service */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Service
        </label>
        <select
          value={filters.service}
          onChange={(e) => handleChange("service", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
        >
          <option value="">Tous les services</option>
          {services.map(service => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Plage de dates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Plage de dates
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Date de début
            </label>
            <input
              type="date"
              value={filters.dateRange.start}
              onChange={(e) => handleRangeChange("dateRange", "start", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Date de fin
            </label>
            <input
              type="date"
              value={filters.dateRange.end}
              onChange={(e) => handleRangeChange("dateRange", "end", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            />
          </div>
        </div>
      </div>

      {/* Plage d'heures */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Plage d'heures
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Heure de début
            </label>
            <input
              type="time"
              value={filters.timeRange.start}
              onChange={(e) => handleRangeChange("timeRange", "start", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              Heure de fin
            </label>
            <input
              type="time"
              value={filters.timeRange.end}
              onChange={(e) => handleRangeChange("timeRange", "end", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
            />
          </div>
        </div>
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => {
            onFiltersChange({
              status: "",
              service: "",
              dateRange: { start: "", end: "" },
              timeRange: { start: "", end: "" },
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
