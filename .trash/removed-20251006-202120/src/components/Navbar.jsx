import React, { useState } from "react";
import {
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
} from "./Icons";
import IconButton from "./IconButton";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ user, adminProfile, onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Couleurs selon le rôle
  const getBrandColor = () => {
    const role = adminProfile?.role;
    switch (role) {
      case "MANAGER_ANAIS":
        return "text-pink-600";
      case "MANAGER_EVOLVE":
        return "text-blue-600";
      case "MANAGER_POPULO":
        return "text-green-600";
      case "SUPER_ADMIN":
      default:
        return "text-gray-600";
    }
  };

  const mockNotifications = [
    {
      id: 1,
      title: "Nouvelle commande",
      message: "Commande #1234 reçue",
      time: "2 min",
    },
    {
      id: 2,
      title: "Réservation annulée",
      message: "Client a annulé sa réservation",
      time: "1h",
    },
    {
      id: 3,
      title: "Stock faible",
      message: "Produit XYZ bientôt en rupture",
      time: "3h",
    },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <ThemeToggle compact />

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-1 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <IconButton
                Icon={BellIcon}
                size="sm"
                className="bg-transparent text-green-600 icon-btn icon-glow-green"
                ariaLabel="Notifications"
              />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Dropdown Notifications */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {mockNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 hover:bg-gray-50 border-b border-gray-100"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">
                            {notif.title}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            {notif.message}
                          </p>
                        </div>
                        <span className="text-xs text-gray-400">
                          {notif.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-200">
                  <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Voir toutes les notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <IconButton
                Icon={UserCircleIcon}
                size="sm"
                className="bg-transparent text-gray-600 icon-btn"
                ariaLabel="Profile"
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {adminProfile?.name ||
                    user?.email?.split("@")[0] ||
                    "Utilisateur"}
                </p>
                <p className={`text-xs ${getBrandColor()} capitalize`}>
                  {adminProfile?.role?.replace("MANAGER_", "")?.toLowerCase() ||
                    "Admin"}
                </p>
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>

            {/* Dropdown Profile */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {adminProfile?.name?.charAt(0)?.toUpperCase() ||
                          user?.email?.charAt(0)?.toUpperCase() ||
                          "U"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {adminProfile?.name ||
                          user?.email?.split("@")[0] ||
                          "Utilisateur"}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user?.email}
                      </p>
                      <p className={`text-xs ${getBrandColor()} capitalize`}>
                        {adminProfile?.role
                          ?.replace("MANAGER_", "")
                          ?.toLowerCase() || "Admin"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <CogIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">Paramètres</span>
                  </button>

                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 text-red-600" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showProfileMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowProfileMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
}
