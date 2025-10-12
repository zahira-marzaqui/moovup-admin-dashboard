import React from "react";
import { PencilIcon, CalendarIcon, CurrencyDollarIcon, ClockIcon } from "../../../components/Icons";

export default function ServiceDetail({ service }) {
  if (!service) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Aucun service sélectionné
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "inactive": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active": return "Actif";
      case "inactive": return "Inactif";
      default: return "Inconnu";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Image du service */}
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
        {service.image ? (
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-500 dark:text-gray-400">
            Aucune image disponible
          </span>
        )}
      </div>

      {/* Informations principales */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {service.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {service.description}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(service.status)}`}>
            {getStatusText(service.status)}
          </span>
        </div>

        {/* Informations détaillées */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Catégorie */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                <PencilIcon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Catégorie</p>
                <p className="font-medium text-gray-900 dark:text-white">{service.category}</p>
              </div>
            </div>

            {/* Prix */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Prix</p>
                <p className="font-medium text-gray-900 dark:text-white">{service.price}€</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Durée */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <ClockIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Durée</p>
                <p className="font-medium text-gray-900 dark:text-white">{service.duration} minutes</p>
              </div>
            </div>

            {/* Date de création */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <CalendarIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Créé le</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {formatDate(service.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Informations supplémentaires
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">ID du service:</span>
              <span className="ml-2 font-mono text-gray-900 dark:text-white">#{service.id}</span>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Marque:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
                {service.brand}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
