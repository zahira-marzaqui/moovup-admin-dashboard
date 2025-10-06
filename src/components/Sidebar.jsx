import React, { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  BeakerIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
} from "./Icons";
import IconBox from "./IconBox";

export default function Sidebar({ adminProfile }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  // Configuration des menus selon le rôle
  const getMenuItems = () => {
    const role = adminProfile?.role;

    switch (role) {
      case "SUPER_ADMIN":
        return [
          {
            icon: HomeIcon,
            label: "Super Admin",
            path: "/super-admin",
            brand: "super",
          },
          {
            icon: ShoppingBagIcon,
            label: "Anais Store",
            path: "/anais",
            brand: "anais",
          },
          {
            icon: ShoppingBagIcon,
            label: "Evolve Store",
            path: "/evolve",
            brand: "evolve",
          },
          {
            icon: ClipboardDocumentListIcon,
            label: "Populo Restaurant",
            path: "/populo",
            brand: "populo",
          },
        ];

      case "MANAGER_ANAIS":
        return [
          {
            icon: HomeIcon,
            label: "Dashboard",
            path: "/anais",
            brand: "anais",
          },
          {
            icon: ShoppingBagIcon,
            label: "Produits",
            path: "/anais/products",
            brand: "anais",
          },
          {
            icon: BeakerIcon,
            label: "Services",
            path: "/anais/services",
            brand: "anais",
          },
          {
            icon: CalendarIcon,
            label: "Réservations",
            path: "/anais/bookings",
            brand: "anais",
          },
          {
            icon: ClipboardDocumentListIcon,
            label: "Commandes",
            path: "/anais/orders",
            brand: "anais",
          },
          {
            icon: ChartBarIcon,
            label: "Statistiques",
            path: "/anais/stats",
            brand: "anais",
          },
        ];

      case "MANAGER_EVOLVE":
        return [
          {
            icon: HomeIcon,
            label: "Dashboard",
            path: "/evolve",
            brand: "evolve",
          },
          {
            icon: ShoppingBagIcon,
            label: "Produits",
            path: "/evolve/products",
            brand: "evolve",
          },
          {
            icon: BeakerIcon,
            label: "Services",
            path: "/evolve/services",
            brand: "evolve",
          },
          {
            icon: CalendarIcon,
            label: "Réservations",
            path: "/evolve/bookings",
            brand: "evolve",
          },
          {
            icon: ClipboardDocumentListIcon,
            label: "Commandes",
            path: "/evolve/orders",
            brand: "evolve",
          },
          {
            icon: ChartBarIcon,
            label: "Statistiques",
            path: "/evolve/stats",
            brand: "evolve",
          },
        ];

      case "MANAGER_POPULO":
        return [
          {
            icon: HomeIcon,
            label: "Dashboard",
            path: "/populo",
            brand: "populo",
          },
          {
            icon: ClipboardDocumentListIcon,
            label: "Menu Items",
            path: "/populo/menu",
            brand: "populo",
          },
          {
            icon: ClipboardDocumentListIcon,
            label: "Commandes",
            path: "/populo/orders",
            brand: "populo",
          },
          {
            icon: ChartBarIcon,
            label: "Statistiques",
            path: "/populo/stats",
            brand: "populo",
          },
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  // Couleurs par marque
  const getBrandColors = (brand) => {
    switch (brand) {
      case "anais":
        return {
          primary: "bg-pink-600",
          secondary: "bg-pink-50",
          text: "text-pink-600",
          hover: "hover:bg-pink-50",
        };
      case "evolve":
        return {
          primary: "bg-blue-600",
          secondary: "bg-blue-50",
          text: "text-blue-600",
          hover: "hover:bg-blue-50",
        };
      case "populo":
        return {
          primary: "bg-green-600",
          secondary: "bg-green-50",
          text: "text-green-600",
          hover: "hover:bg-green-50",
        };
      case "super":
        return {
          primary: "bg-purple-600",
          secondary: "bg-purple-50",
          text: "text-purple-600",
          hover: "hover:bg-purple-50",
        };
      default:
        return {
          primary: "bg-gray-600",
          secondary: "bg-gray-50",
          text: "text-gray-600",
          hover: "hover:bg-gray-50",
        };
    }
  };

  const primaryBrand = menuItems[0]?.brand || "super";
  const colors = getBrandColors(primaryBrand);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-30 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-lg ${colors.primary} flex items-center justify-center`}
              >
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div>
                <h1 className="font-semibold text-gray-900">MoovUp</h1>
                <p className="text-xs text-gray-500 capitalize">
                  {adminProfile?.role?.replace("_", " ")?.toLowerCase()}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? (
              <Bars3Icon className="w-5 h-5 text-gray-600" />
            ) : (
              <XMarkIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          const itemColors = getBrandColors(item.brand);

          return (
            <Link
              key={index}
              to={item.path}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors sidebar-item-hoverable ${
                isActive
                  ? `${itemColors.secondary} ${itemColors.text}`
                  : `text-gray-600 ${itemColors.hover}`
              }`}
            >
              <IconBox
                variant={
                  item.brand === "anais"
                    ? "pink"
                    : item.brand === "evolve"
                    ? "blue"
                    : item.brand === "populo"
                    ? "green"
                    : item.brand === "super"
                    ? "purple"
                    : "gray"
                }
                size="w-8 h-8"
                rounded="rounded-md"
                className="flex-shrink-0"
              >
                <Icon className="w-5 h-5" />
              </IconBox>
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4 space-y-3">
          <div className="flex items-center justify-center">
            <DarkModeToggle />
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {adminProfile?.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {adminProfile?.name || "Utilisateur"}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {adminProfile?.role?.replace("MANAGER_", "")?.toLowerCase() ||
                    "Admin"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
