import React from "react";
import { 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  PhoneIcon, 
  CurrencyDollarIcon,
  PencilIcon 
} from "../../../components/Icons";

export default function BookingDetail({ booking }) {
  if (!booking) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        Aucune réservation sélectionnée
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "completed": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed": return "Confirmée";
      case "pending": return "En attente";
      case "completed": return "Terminée";
      case "cancelled": return "Annulée";
      default: return "Inconnu";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}h${minutes}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header avec statut */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {booking.clientName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Réservation #{booking.id}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
          {getStatusText(booking.status)}
        </span>
      </div>

      {/* Informations principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Service */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
              <PencilIcon className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Service</p>
              <p className="font-medium text-gray-900 dark:text-white">{booking.serviceName}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatDate(booking.date)}
              </p>
            </div>
          </div>

          {/* Heure */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <ClockIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Heure</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {formatTime(booking.time)} ({booking.duration}min)
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Client */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
              <p className="font-medium text-gray-900 dark:text-white">{booking.clientName}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">{booking.clientEmail}</p>
            </div>
          </div>

          {/* Téléphone */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <PhoneIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Téléphone</p>
              <p className="font-medium text-gray-900 dark:text-white">{booking.clientPhone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prix */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Prix total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{booking.price}€</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {booking.notes && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Notes
          </h3>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {booking.notes}
          </p>
        </div>
      )}

      {/* Informations supplémentaires */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Informations supplémentaires
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">ID de la réservation:</span>
            <span className="ml-2 font-mono text-gray-900 dark:text-white">#{booking.id}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Marque:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">
              {booking.brand}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Service ID:</span>
            <span className="ml-2 font-mono text-gray-900 dark:text-white">#{booking.serviceId}</span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Créée le:</span>
            <span className="ml-2 font-medium text-gray-900 dark:text-white">
              {new Date(booking.createdAt).toLocaleDateString("fr-FR")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
