import React, { useState, useEffect } from "react";
import { apiPost, apiPatch } from "../../../api/http";

export default function BookingForm({ booking, brand, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceId: "",
    serviceName: "",
    date: "",
    time: "",
    duration: "",
    price: "",
    status: "pending",
    notes: "",
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

  // Services disponibles (en réalité, cela viendrait d'un appel API)
  const availableServices = [
    { id: 1, name: "Soin Visage Hydratant", duration: 60, price: 45 },
    { id: 2, name: "Massage Relaxant", duration: 90, price: 80 },
    { id: 3, name: "Manucure Française", duration: 45, price: 25 },
    { id: 4, name: "Soin Anti-âge", duration: 120, price: 120 },
    { id: 5, name: "Massage Sportif", duration: 75, price: 100 },
  ];

  useEffect(() => {
    if (booking) {
      setFormData({
        clientName: booking.clientName || "",
        clientEmail: booking.clientEmail || "",
        clientPhone: booking.clientPhone || "",
        serviceId: booking.serviceId || "",
        serviceName: booking.serviceName || "",
        date: booking.date || "",
        time: booking.time || "",
        duration: booking.duration || "",
        price: booking.price || "",
        status: booking.status || "pending",
        notes: booking.notes || "",
      });
    } else {
      // Valeurs par défaut pour une nouvelle réservation
      const today = new Date().toISOString().split('T')[0];
      setFormData(prev => ({
        ...prev,
        date: today,
        time: "10:00",
      }));
    }
  }, [booking]);

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

  const handleServiceChange = (e) => {
    const serviceId = e.target.value;
    const selectedService = availableServices.find(s => s.id === parseInt(serviceId));
    
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        serviceId: serviceId,
        serviceName: selectedService.name,
        duration: selectedService.duration,
        price: selectedService.price,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = "Le nom du client est requis";
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = "L'email du client est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = "L'email n'est pas valide";
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = "Le téléphone du client est requis";
    }

    if (!formData.serviceId) {
      newErrors.serviceId = "Le service est requis";
    }

    if (!formData.date) {
      newErrors.date = "La date est requise";
    }

    if (!formData.time) {
      newErrors.time = "L'heure est requise";
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
      const bookingData = {
        ...formData,
        brand,
        serviceId: parseInt(formData.serviceId),
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price),
      };

      if (booking) {
        // Modification
        await apiPatch(`/bookings/${booking.id}`, bookingData);
      } else {
        // Création
        await apiPost("/bookings", bookingData);
      }

      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la réservation:", error);
      setErrors({ submit: "Erreur lors de la sauvegarde de la réservation" });
    } finally {
      setLoading(false);
    }
  };

  const statuses = [
    { value: "pending", label: "En attente" },
    { value: "confirmed", label: "Confirmée" },
    { value: "completed", label: "Terminée" },
    { value: "cancelled", label: "Annulée" }
  ];

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informations client */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Informations client
          </h3>
        </div>

        {/* Nom du client */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nom complet *
          </label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.clientName ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Ex: Marie Dubois"
          />
          {errors.clientName && (
            <p className="mt-1 text-sm text-red-600">{errors.clientName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.clientEmail ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="marie.dubois@email.com"
          />
          {errors.clientEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.clientEmail}</p>
          )}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Téléphone *
          </label>
          <input
            type="tel"
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.clientPhone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="+33 6 12 34 56 78"
          />
          {errors.clientPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.clientPhone}</p>
          )}
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Service *
          </label>
          <select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleServiceChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.serviceId ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <option value="">Sélectionner un service</option>
            {availableServices.map(service => (
              <option key={service.id} value={service.id}>
                {service.name} - {service.duration}min - {service.price}€
              </option>
            ))}
          </select>
          {errors.serviceId && (
            <p className="mt-1 text-sm text-red-600">{errors.serviceId}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.date ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>

        {/* Heure */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Heure *
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.time ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.time && (
            <p className="mt-1 text-sm text-red-600">{errors.time}</p>
          )}
        </div>

        {/* Durée */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Durée (minutes)
          </label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white"
            readOnly
          />
        </div>

        {/* Prix */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Prix (€)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white"
            readOnly
          />
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {statuses.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 ${getFocusClasses()} focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Notes supplémentaires..."
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
          {booking ? "Modifier" : "Créer"}
        </button>
      </div>
    </form>
  );
}
