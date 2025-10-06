import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { apiGet } from "../../api/http";
import {
  ShoppingBagIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusIcon,
} from "../../components/Icons";

import IconBox from "../../components/IconBox";
import {
  OutlineCalendarIcon,
  OutlineBeakerIcon,
} from "../../components/OutlineIcons";

// Import des composants de gestion
import ProductList from "../../features/store/products/ProductList";

export default function EvolveDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    services: 0,
    bookings: 0,
    orders: 0,
    revenue: 0,
    recentBookings: 0,
    recentOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await apiGet("/api/stats/evolve").catch(() => ({
        products: 38,
        services: 15,
        bookings: 95,
        orders: 67,
        revenue: 32400,
        recentBookings: 5,
        recentOrders: 8,
      }));
      setStats(data);
    } catch (error) {
      console.error("Erreur chargement statistiques:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Produits",
      value: stats.products.toLocaleString(),
      icon: ShoppingBagIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+3.8%",
      trendUp: true,
      description: "Produits pour hommes",
    },
    {
      title: "Services",
      value: stats.services.toLocaleString(),
      icon: OutlineBeakerIcon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      trend: "+4.2%",
      trendUp: true,
      description: "Services spa & soins",
    },
    {
      title: "Réservations",
      value: stats.bookings.toLocaleString(),
      icon: OutlineCalendarIcon,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      trend: "+9.1%",
      trendUp: true,
      description: "Ce mois",
    },
    {
      title: "Commandes",
      value: stats.orders.toLocaleString(),
      icon: ClipboardDocumentListIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+6.7%",
      trendUp: true,
      description: "Ce mois",
    },
  ];

  const quickActions = [
    {
      title: "Ajouter un produit",
      description: "Nouveau produit pour hommes",
      icon: PlusIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: () => console.log("Add product"),
    },
    {
      title: "Nouveau service",
      description: "Ajouter un service spa",
      icon: PlusIcon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      action: () => console.log("Add service"),
    },
    {
      title: "Voir réservations",
      description: `${stats.recentBookings} nouvelles`,
      icon: CalendarIcon,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      action: () => console.log("View bookings"),
    },
    {
      title: "Gérer commandes",
      description: `${stats.recentOrders} en attente`,
      icon: ClipboardDocumentListIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: () => console.log("Manage orders"),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        index
        element={
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Dashboard Evolve</h1>
                  <p className="text-blue-100 mt-2">Store & spa pour hommes</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {stats.revenue.toLocaleString()} MAD
                  </p>
                  <p className="text-blue-100 text-sm">
                    Chiffre d'affaires ce mois
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <IconBox
                      variant={
                        stat.bgColor.includes("pink")
                          ? "pink"
                          : stat.bgColor.includes("purple")
                          ? "purple"
                          : stat.bgColor.includes("blue")
                          ? "blue"
                          : stat.bgColor.includes("green")
                          ? "green"
                          : "gray"
                      }
                      size="w-10 h-10"
                      rounded="rounded-lg"
                    >
                      <stat.icon className="w-6 h-6" />
                    </IconBox>
                    <div
                      className={`flex items-center space-x-1 text-sm ${
                        stat.trendUp ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.trendUp ? (
                        <ArrowTrendingUpIcon className="w-4 h-4" />
                      ) : (
                        <ArrowTrendingDownIcon className="w-4 h-4" />
                      )}
                      <span>{stat.trend}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
                    <p className="text-gray-500 text-xs">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Actions rapides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left group"
                  >
                    <IconBox
                      variant={
                        action.bgColor.includes("pink")
                          ? "pink"
                          : action.bgColor.includes("purple")
                          ? "purple"
                          : action.bgColor.includes("blue")
                          ? "blue"
                          : action.bgColor.includes("green")
                          ? "green"
                          : "gray"
                      }
                      size="w-10 h-10"
                      rounded="rounded-md"
                      className="mb-4 inline-block"
                    >
                      <action.icon className="w-6 h-6" />
                    </IconBox>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {action.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Réservations récentes
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <CalendarIcon className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Coupe & barbe
                          </p>
                          <p className="text-xs text-gray-500">
                            Client #{item}456
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">Aujourd'hui</p>
                        <p className="text-xs text-gray-500">16:00</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Commandes récentes
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <ShoppingBagIcon className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Commande #{item}789
                          </p>
                          <p className="text-xs text-gray-500">2 produits</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          320 MAD
                        </p>
                        <p className="text-xs text-green-600">Confirmée</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* Routes pour les sous-pages */}
      <Route path="products" element={<ProductList brand="evolve" />} />
      <Route
        path="services"
        element={<div>Services Evolve - À implémenter</div>}
      />
      <Route
        path="bookings"
        element={<div>Réservations Evolve - À implémenter</div>}
      />
      <Route
        path="orders"
        element={<div>Commandes Evolve - À implémenter</div>}
      />
      <Route
        path="stats"
        element={<div>Statistiques Evolve - À implémenter</div>}
      />
    </Routes>
  );
}
