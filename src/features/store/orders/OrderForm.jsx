import React, { useState, useEffect } from "react";
import { apiPost, apiPatch } from "../../../api/http";

export default function OrderForm({ order, brand, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    items: [{ name: "", quantity: 1, price: 0 }],
    totalAmount: 0,
    status: "pending",
    shippingAddress: "",
    orderDate: "",
    deliveryDate: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Produits disponibles (en réalité, cela viendrait d'un appel API)
  const availableProducts = [
    { name: "Crème Hydratante", price: 25 },
    { name: "Sérum Anti-âge", price: 45 },
    { name: "Masque Purifiant", price: 30 },
    { name: "Tonique", price: 20 },
    { name: "Kit Complet", price: 120 },
    { name: "Produit Test", price: 15 },
    { name: "Complément Alimentaire", price: 35 },
  ];

  useEffect(() => {
    if (order) {
      setFormData({
        clientName: order.clientName || "",
        clientEmail: order.clientEmail || "",
        clientPhone: order.clientPhone || "",
        items: order.items || [{ name: "", quantity: 1, price: 0 }],
        totalAmount: order.totalAmount || 0,
        status: order.status || "pending",
        shippingAddress: order.shippingAddress || "",
        orderDate: order.orderDate || "",
        deliveryDate: order.deliveryDate || "",
        notes: order.notes || "",
      });
    } else {
      // Valeurs par défaut pour une nouvelle commande
      const today = new Date().toISOString().split('T')[0];
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 3);
      
      setFormData(prev => ({
        ...prev,
        orderDate: today,
        deliveryDate: deliveryDate.toISOString().split('T')[0],
      }));
    }
  }, [order]);

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

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'quantity' || field === 'price' ? parseFloat(value) || 0 : value
    };
    
    // Recalculer le total
    const total = newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    
    setFormData(prev => ({
      ...prev,
      items: newItems,
      totalAmount: total
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      const total = newItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      
      setFormData(prev => ({
        ...prev,
        items: newItems,
        totalAmount: total
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

    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = "L'adresse de livraison est requise";
    }

    if (!formData.orderDate) {
      newErrors.orderDate = "La date de commande est requise";
    }

    if (formData.items.some(item => !item.name.trim())) {
      newErrors.items = "Tous les articles doivent avoir un nom";
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
      const orderData = {
        ...formData,
        brand,
        totalAmount: parseFloat(formData.totalAmount),
      };

      if (order) {
        // Modification
        await apiPatch(`/orders/${order.id}`, orderData);
      } else {
        // Création
        await apiPost("/orders", orderData);
      }

      onSuccess();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la commande:", error);
      setErrors({ submit: "Erreur lors de la sauvegarde de la commande" });
    } finally {
      setLoading(false);
    }
  };

  const statuses = [
    { value: "pending", label: "En attente" },
    { value: "processing", label: "En cours" },
    { value: "shipped", label: "Expédiée" },
    { value: "delivered", label: "Livrée" },
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
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
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
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
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
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.clientPhone ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="+33 6 12 34 56 78"
          />
          {errors.clientPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.clientPhone}</p>
          )}
        </div>

        {/* Adresse de livraison */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Adresse de livraison *
          </label>
          <textarea
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleChange}
            rows={2}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.shippingAddress ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="123 Rue de la Paix, 75001 Paris"
          />
          {errors.shippingAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.shippingAddress}</p>
          )}
        </div>

        {/* Articles */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Articles
            </h3>
            <button
              type="button"
              onClick={addItem}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
            >
              + Ajouter un article
            </button>
          </div>

          {formData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Produit
                </label>
                <select
                  value={item.name}
                  onChange={(e) => {
                    const selectedProduct = availableProducts.find(p => p.name === e.target.value);
                    handleItemChange(index, 'name', e.target.value);
                    if (selectedProduct) {
                      handleItemChange(index, 'price', selectedProduct.price);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Sélectionner un produit</option>
                  {availableProducts.map(product => (
                    <option key={product.name} value={product.name}>
                      {product.name} - {product.price}€
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Quantité
                </label>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prix unitaire
                  </label>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-lg text-sm transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}

          {errors.items && (
            <p className="mt-1 text-sm text-red-600">{errors.items}</p>
          )}
        </div>

        {/* Total */}
        <div className="md:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                Total de la commande
              </span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {formData.totalAmount.toFixed(2)}€
              </span>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date de commande *
          </label>
          <input
            type="date"
            name="orderDate"
            value={formData.orderDate}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white ${
              errors.orderDate ? "border-red-500" : "border-gray-300 dark:border-gray-600"
            }`}
          />
          {errors.orderDate && (
            <p className="mt-1 text-sm text-red-600">{errors.orderDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date de livraison prévue
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            min={formData.orderDate}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Statuts */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Statut de la commande
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          {loading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          {order ? "Modifier" : "Créer"}
        </button>
      </div>
    </form>
  );
}
