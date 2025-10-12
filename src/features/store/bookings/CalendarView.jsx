import React, { useState, useMemo } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
} from "../../../components/Icons";

export default function CalendarView({ bookings, onBookingClick, brand }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Générer les jours du mois
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    // Générer 42 jours (6 semaines)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }, [currentDate]);

  // Filtrer les réservations par date
  const getBookingsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return bookings.filter(booking => booking.date === dateStr);
  };

  // Navigation du calendrier
  const goToPreviousMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed": return "bg-green-100 text-green-800 border-green-200";
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Obtenir le texte du statut
  const getStatusText = (status) => {
    switch (status) {
      case "pending": return "En attente";
      case "confirmed": return "Confirmée";
      case "completed": return "Terminée";
      case "cancelled": return "Annulée";
      default: return "Inconnu";
    }
  };

  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  const today = new Date();
  const isToday = (date) => {
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* En-tête du calendrier */}
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={goToToday}
              className={`text-sm font-medium ${
                brand === 'anais' 
                  ? 'text-anais-600 hover:text-anais-700 dark:text-anais-400 dark:hover:text-anais-300'
                  : brand === 'evolve'
                  ? 'text-evolve-600 hover:text-evolve-700 dark:text-evolve-400 dark:hover:text-evolve-300'
                  : 'text-populo-600 hover:text-populo-700 dark:text-populo-400 dark:hover:text-populo-300'
              }`}
            >
              Aujourd'hui
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-600">
        {dayNames.map(day => (
          <div key={day} className="px-3 py-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Grille du calendrier */}
      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => {
          const dayBookings = getBookingsForDate(date);
          const isCurrentMonthDay = isCurrentMonth(date);
          const isTodayDate = isToday(date);

          return (
            <div
              key={index}
              className={`min-h-[120px] border-r border-b border-gray-200 dark:border-gray-600 p-2 ${
                isCurrentMonthDay 
                  ? 'bg-white dark:bg-gray-800' 
                  : 'bg-gray-50 dark:bg-gray-700'
              }`}
            >
              {/* Numéro du jour */}
              <div className={`text-sm font-medium mb-1 ${
                isTodayDate 
                  ? `${
                      brand === 'anais' 
                        ? 'text-anais-600 dark:text-anais-400'
                        : brand === 'evolve'
                        ? 'text-evolve-600 dark:text-evolve-400'
                        : 'text-populo-600 dark:text-populo-400'
                    } font-bold` 
                  : isCurrentMonthDay 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-gray-400 dark:text-gray-500'
              }`}>
                {date.getDate()}
              </div>

              {/* Réservations du jour */}
              <div className="space-y-1">
                {dayBookings.slice(0, 3).map((booking, bookingIndex) => (
                  <div
                    key={bookingIndex}
                    onClick={() => onBookingClick(booking)}
                    className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity border ${getStatusColor(booking.status)}`}
                    title={`${booking.clientName} - ${booking.serviceName} à ${booking.time}`}
                  >
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" />
                      <span className="font-medium">{booking.time}</span>
                    </div>
                    <div className="truncate">{booking.clientName}</div>
                    <div className="truncate text-xs opacity-75">{booking.serviceName}</div>
                  </div>
                ))}
                
                {/* Indicateur s'il y a plus de réservations */}
                {dayBookings.length > 3 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-1">
                    +{dayBookings.length - 3} autres
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Légende */}
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Légende:</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-yellow-100 border border-yellow-200"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">En attente</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-green-100 border border-green-200"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Confirmée</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Terminée</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-red-100 border border-red-200"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Annulée</span>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {bookings.length} réservation{bookings.length > 1 ? 's' : ''} ce mois
          </div>
        </div>
      </div>
    </div>
  );
}
