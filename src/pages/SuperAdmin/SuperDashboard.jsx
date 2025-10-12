import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../../api/http";
import {
  ShoppingBagIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "../../components/Icons";
import IconBox from "../../components/IconBox";
import {
  OutlineChartIcon,
  OutlineUsersIcon,
  OutlineBeakerIcon,
  OutlineClipboardIcon,
} from "../../components/OutlineIcons";

export default function SuperDashboard() {
  const [stats, setStats] = useState({
    anais: { products: 0, services: 0, bookings: 0, orders: 0, revenue: 0 },
    evolve: { products: 0, services: 0, bookings: 0, orders: 0, revenue: 0 },
    populo: { menuItems: 0, orders: 0, revenue: 0 },
    totalRevenue: 0,
    totalOrders: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      console.log("Chargement des statistiques SuperAdmin...");
      
      // Charger les statistiques pour tous les stores avec timeout
      const [anaisStats, evolveStats, populoStats] = await Promise.all([
        apiGet("/api/stats/anais").catch((error) => {
          console.error("Erreur stats Anais:", error);
          return {
            products: 0,
            services: 0,
            bookings: 0,
            orders: 0,
            revenue: 0,
          };
        }),
        apiGet("/api/stats/evolve").catch((error) => {
          console.error("Erreur stats Evolve:", error);
          return {
            products: 0,
            services: 0,
            bookings: 0,
            orders: 0,
            revenue: 0,
          };
        }),
        apiGet("/api/stats/populo").catch((error) => {
          console.error("Erreur stats Populo:", error);
          return {
            menuItems: 0,
            orders: 0,
            revenue: 0,
          };
        }),
      ]);

      console.log("Statistiques chargées:", { anaisStats, evolveStats, populoStats });

      const totalRevenue =
        anaisStats.revenue + evolveStats.revenue + populoStats.revenue;
      const totalOrders =
        anaisStats.orders + evolveStats.orders + populoStats.orders;
      const totalBookings = anaisStats.bookings + evolveStats.bookings;

      setStats({
        anais: anaisStats,
        evolve: evolveStats,
        populo: populoStats,
        totalRevenue,
        totalOrders,
        totalBookings,
      });
      
      console.log("Statistiques finales:", {
        totalRevenue,
        totalOrders,
        totalBookings,
      });
    } catch (error) {
      console.error("Erreur chargement statistiques:", error);
      // Fallback avec des données par défaut
      setStats({
        anais: { products: 0, services: 0, bookings: 0, orders: 0, revenue: 0 },
        evolve: { products: 0, services: 0, bookings: 0, orders: 0, revenue: 0 },
        populo: { menuItems: 0, orders: 0, revenue: 0 },
        totalRevenue: 0,
        totalOrders: 0,
        totalBookings: 0,
      });
    } finally {
      console.log("Fin du chargement des statistiques");
      setLoading(false);
    }
  };

  const brandCards = [
    {
      name: "Anais",
      brand: "anais",
      path: "/anais",
      color: "bg-gradient-to-br from-anais-900 to-anais-800",
      icon: ShoppingBagIcon,
      stats: stats.anais,
      description: "Store cosmétique & spa pour femmes",
    },
    {
      name: "Evolve",
      brand: "evolve",
      path: "/evolve",
      color: "bg-gradient-to-br from-evolve-900 to-evolve-800",
      icon: ShoppingBagIcon,
      stats: stats.evolve,
      description: "Store & spa pour hommes",
    },
    {
      name: "Populo",
      brand: "populo",
      path: "/populo",
      color: "bg-gradient-to-br from-populo-900 to-populo-800",
      icon: ClipboardDocumentListIcon,
      stats: stats.populo,
      description: "Restaurant repas healthy",
    },
  ];

  const globalStats = [
    {
      title: "Chiffre d'affaires total",
      value: `${stats.totalRevenue.toLocaleString()} MAD`,
      icon: ChartBarIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Total commandes",
      value: stats.totalOrders.toLocaleString(),
      icon: ClipboardDocumentListIcon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Total réservations",
      value: stats.totalBookings.toLocaleString(),
      icon: CalendarIcon,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+15.1%",
      trendUp: true,
    },
    {
      title: "Utilisateurs actifs",
      value: "2,847",
      icon: UserGroupIcon,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "-2.4%",
      trendUp: false,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard Super Admin
        </h1>
        <p className="text-gray-600 mt-2">
          Vue d'ensemble de tous les stores MoovUp
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {globalStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                {/* Use IconBox to render pastel background + icon consistently */}
                {/* eslint-disable-next-line react/jsx-pascal-case */}
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
                      : stat.bgColor.includes("orange")
                      ? "orange"
                      : "gray"
                  }
                  size="w-10 h-10"
                  rounded="rounded-lg"
                >
                  <stat.icon className="w-6 h-6" />
                </IconBox>
              </div>
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
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Brand Cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Gestion des Stores
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {brandCards.map((brand, index) => (
            <Link key={index} to={brand.path} className="group block">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Header coloré */}
                <div className={`${brand.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{brand.name}</h3>
                      <p className="text-white/90 text-sm mt-1">
                        {brand.description}
                      </p>
                    </div>
                    <brand.icon className="w-8 h-8 text-white/90" />
                  </div>
                </div>

                {/* Stats */}
                <div className="p-6">
                  {brand.brand === "populo" ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {brand.stats.menuItems}
                        </p>
                        <p className="text-gray-600 text-sm">Menu Items</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {brand.stats.orders}
                        </p>
                        <p className="text-gray-600 text-sm">Commandes</p>
                      </div>
                      <div className="text-center col-span-2">
                        <p className="text-xl font-bold text-green-600">
                          {brand.stats.revenue.toLocaleString()} MAD
                        </p>
                        <p className="text-gray-600 text-sm">
                          Chiffre d'affaires
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {brand.stats.products}
                        </p>
                        <p className="text-gray-600 text-sm">Produits</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {brand.stats.services}
                        </p>
                        <p className="text-gray-600 text-sm">Services</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {brand.stats.bookings}
                        </p>
                        <p className="text-gray-600 text-sm">Réservations</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">
                          {brand.stats.orders}
                        </p>
                        <p className="text-gray-600 text-sm">Commandes</p>
                      </div>
                      <div className="text-center col-span-2">
                        <p className="text-xl font-bold text-green-600">
                          {brand.stats.revenue.toLocaleString()} MAD
                        </p>
                        <p className="text-gray-600 text-sm">
                          Chiffre d'affaires
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center text-gray-600 group-hover:text-gray-900 transition-colors">
                      <span className="text-sm font-medium">
                        Gérer {brand.name}
                      </span>
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <OutlineUsersIcon className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900">
              Gérer les utilisateurs
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Ajouter/modifier managers
            </p>
          </button>

          <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <OutlineChartIcon className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Rapports globaux</h3>
            <p className="text-gray-600 text-sm mt-1">Analytics détaillées</p>
          </button>

          <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <OutlineBeakerIcon className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Paramètres système</h3>
            <p className="text-gray-600 text-sm mt-1">Configuration générale</p>
          </button>

          <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow text-left">
            <OutlineClipboardIcon className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-gray-900">Logs système</h3>
            <p className="text-gray-600 text-sm mt-1">Activité et erreurs</p>
          </button>
        </div>
      </div>
    </div>
  );
}
