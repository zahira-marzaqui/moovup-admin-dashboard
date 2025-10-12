import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { apiGet } from "../../api/http";
import {
  ClipboardDocumentListIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusIcon,
  CakeIcon,
  CurrencyDollarIcon,
} from "../../components/Icons";

import IconBox from "../../components/IconBox";
import {
  OutlineCakeIcon,
  OutlineClipboardIcon,
} from "../../components/OutlineIcons";
import ChartPlaceholder from "../../components/ChartPlaceholder";
import ProductList from "../../features/store/products/ProductList";
import { PopuloOrderList } from "../../features/store/populo_orders";
import PopuloOrderDetailPage from "../../features/store/populo_orders/PopuloOrderDetailPage";

export default function PopuloDashboard() {
  const [stats, setStats] = useState({
    menuItems: 0,
    orders: 0,
    revenue: 0,
    recentOrders: 0,
    popularItems: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Charger les statistiques depuis les APIs
      const [menuItemsResponse, ordersResponse] = await Promise.allSettled([
        apiGet("/api/menu-items"),
        apiGet("/api/admin/populo-orders")
      ]);
      
      const menuItems = menuItemsResponse.status === 'fulfilled' ? menuItemsResponse.value.data : [];
      const orders = ordersResponse.status === 'fulfilled' ? ordersResponse.value.data : [];
      
      // Calculer les statistiques
      const revenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
      const recentOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate || order.createdAt);
        const today = new Date();
        const diffTime = Math.abs(today - orderDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 1;
      }).length;
      
      // Calculer les plats populaires (mock pour l'instant)
      const popularItems = [
        { name: "Salade Buddha Bowl", orders: 45 },
        { name: "Smoothie Detox", orders: 38 },
        { name: "Wrap Avocat", orders: 32 },
      ];
      
      setStats({
        menuItems: menuItems.length,
        orders: orders.length,
        revenue,
        recentOrders,
        popularItems
      });
    } catch (error) {
      console.error("Erreur chargement statistiques:", error);
      // Fallback avec des données mockées
      setStats({
        menuItems: 28,
        orders: 156,
        revenue: 18900,
        recentOrders: 12,
        popularItems: [
          { name: "Salade Buddha Bowl", orders: 45 },
          { name: "Smoothie Detox", orders: 38 },
          { name: "Wrap Avocat", orders: 32 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Menu Items",
      value: stats.menuItems.toLocaleString(),
      icon: OutlineCakeIcon,
      color: "text-populo-900",
      bgColor: "bg-populo-50",
      trend: "+2.4%",
      trendUp: true,
      description: "Plats disponibles",
    },
    {
      title: "Commandes",
      value: stats.orders.toLocaleString(),
      icon: OutlineClipboardIcon,
      color: "text-populo-800",
      bgColor: "bg-populo-100",
      trend: "+15.3%",
      trendUp: true,
      description: "Ce mois",
    },
    {
      title: "Chiffre d'affaires",
      value: `${stats.revenue.toLocaleString()} MAD`,
      icon: CurrencyDollarIcon,
      color: "text-populo-700",
      bgColor: "bg-populo-200",
      trend: "+18.7%",
      trendUp: true,
      description: "Ce mois",
    },
    {
      title: "Commandes récentes",
      value: stats.recentOrders.toLocaleString(),
      icon: ChartBarIcon,
      color: "text-populo-600",
      bgColor: "bg-populo-300",
      trend: "+5.1%",
      trendUp: true,
      description: "Aujourd'hui",
    },
  ];

  const quickActions = [
    {
      title: "Ajouter un plat",
      description: "Nouveau menu item",
      icon: PlusIcon,
      color: "text-populo-900",
      bgColor: "bg-populo-50",
      action: () => console.log("Add menu item"),
    },
    {
      title: "Gérer le menu",
      description: "Modifier les plats",
      icon: CakeIcon,
      color: "text-populo-800",
      bgColor: "bg-populo-100",
      action: () => console.log("Manage menu"),
    },
    {
      title: "Voir commandes",
      description: `${stats.recentOrders} nouvelles`,
      icon: ClipboardDocumentListIcon,
      color: "text-populo-700",
      bgColor: "bg-populo-200",
      action: () => console.log("View orders"),
    },
    {
      title: "Statistiques",
      description: "Analytics détaillées",
      icon: ChartBarIcon,
      color: "text-populo-600",
      bgColor: "bg-populo-300",
      action: () => console.log("View stats"),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-populo-900"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="space-y-8">
            {/* Header */}
            <div className="bg-populo-900 rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Dashboard Populo</h1>
                  <p className="text-populo-100 mt-2">
                    Restaurant repas healthy
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">
                    {stats.revenue.toLocaleString()} MAD
                  </p>
                  <p className="text-populo-100 text-sm">
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
                      variant="populo"
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
                      variant="populo"
                      size="w-10 h-10"
                      rounded="rounded-md"
                      className="mb-4 inline-block"
                    >
                      <action.icon className="w-6 h-6" />
                    </IconBox>
                    <h3 className="font-semibold text-gray-900 group-hover:text-populo-900 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {action.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Popular Items */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Plats populaires
                </h3>
                <div className="space-y-3">
                  {stats.popularItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-populo-100 rounded-full flex items-center justify-center">
                          <CakeIcon className="w-4 h-4 text-populo-900" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Plat principal
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {item.orders}
                        </p>
                        <p className="text-xs text-gray-500">commandes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders */}
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
                        <div className="w-8 h-8 bg-populo-100 rounded-full flex items-center justify-center">
                          <ClipboardDocumentListIcon className="w-4 h-4 text-populo-900" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Commande #{item}234
                          </p>
                          <p className="text-xs text-gray-500">2 plats</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          180 MAD
                        </p>
                        <p className="text-xs text-green-600">Livrée</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance des ventes
              </h3>
              <ChartPlaceholder />
            </div>
          </div>
        }
      />

      {/* Routes pour les sous-pages */}
      <Route
        path="menu"
        element={<ProductList brand="populo" />}
      />
      <Route
        path="orders"
        element={<PopuloOrderList />}
      />
      <Route
        path="orders/:id"
        element={<PopuloOrderDetailPage />}
      />
      <Route
        path="stats"
        element={<div>Statistiques Populo - À implémenter</div>}
      />
    </Routes>
  );
}
