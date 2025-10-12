import React, { useState, useEffect } from "react";
import { apiPost, apiPatch } from "../../../api/http";

export default function ServiceForm({ service, brand, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    duration: "",
    status: "active",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fonction pour obtenir les classes de focus selon la marque
  const getFocusClasses = () => {
    switch (brand) {
      case 'anais': return 'focus:ring-anais-500';
      case 'evolve': return 'focus:ring-evolve-500';
      case 'populo': return 'focus:ring-populo-500';
      default: return 'focus:ring-anais-500';
    }
  };

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        description: service.description || "",
        category: service.category || "",
        price: service.price || "",
        duration: service.duration || "",
        status: service.status || "active",
        image: service.image || "",
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom du service est requis";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
    }

    if (!formData.category.trim()) {
      newErrors.category = "La catégorie est requise";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Le prix doit être supérieur à 0";
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = "La durée doit être supérieure à 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const serviceData = {
        ...formData,
        brand,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
      };

      if (service) {
        // Modification
        await apiPatch(`/services/${service.id}`, serviceData);
      } else {
        // Création
        await apiPost("/services", serviceData);
      }

      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du service:", error);
      setErrors({ submit: "Erreur lors de la sauvegarde du service" });
    } finally {
      setLoading(false);
    }
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

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom du service */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nom du service *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Ex: Soin Visage Hydratant"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Décrivez le service en détail..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Catégorie *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.category ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        {/* Statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Statut
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white`}
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>

        {/* Prix */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prix (€) *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.price ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="0.00"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        {/* Durée */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Durée (minutes) *
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.duration ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="60"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
          )}
        </div>

        {/* Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL de l'image
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white`}
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* Boutons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 ${
            brand === 'anais' 
              ? 'bg-anais-900 hover:bg-anais-800 disabled:bg-anais-400'
              : brand === 'evolve'
              ? 'bg-evolve-900 hover:bg-evolve-800 disabled:bg-evolve-400'
              : 'bg-populo-900 hover:bg-populo-800 disabled:bg-populo-400'
          }`}
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          {service ? "Modifier" : "Créer"}
        </button>
      </div>
    </form>
  );
}
