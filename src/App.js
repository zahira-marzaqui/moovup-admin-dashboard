import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperDashboard from "./pages/SuperAdmin/SuperDashboard";
import EvolveDashboard from "./pages/Evolve/EvolveDashboard";
import AnaisDashboard from "./pages/Anais/AnaisDashboard";
import PopuloDashboard from "./pages/Populo/PopuloDashboard";
import React, { useEffect } from 'react'
import { supabase } from './config/supabaseClient'

function App() {
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase.from('products').select('*')
  //     if (error) console.error(error)
  //     else console.log(data)
  //   }
  //   fetchData()
  // }, [])

  
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(5)

      if (error) {
        console.error("❌ Erreur Supabase:", error.message)
      } else {
        console.log("✅ Connexion OK, produits:", data)
      }
    }

    testConnection()
  }, [])

  const insertProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          brand: "ANAIS",              // doit exister dans ta table brands
          name: "Crème cours test",
          description: "Un produit cosmétique pour test",
          price: 120,
          category: "cosmetics",
          stock_quantity: 50,
          image_url: "https://via.placeholder.com/150",
          is_active: true
        }
      ])

    if (error) {
      console.error("❌ Erreur insertion:", error.message)
    } else {
      console.log("✅ Produit inséré:", data)
    }
  }
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*')
      if (error) {
        console.error("❌ Erreur récupération produits:", error.message)
      } else {
        console.log("✅ Produits récupérés:", data)
      }
    }

    fetchProducts()
  }, []) // [] = exécute seulement au montage du composant
  console.log(supabase)


  return (
    <div>
      <h1>Test Connexion Supabase</h1>
      <button onClick={insertProduct}>Ajouter produit test</button>
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<SuperDashboard></SuperDashboard>} />
    //     <Route path="/evolve" element={<EvolveDashboard />} />
    //     <Route path="/anais" element={<AnaisDashboard />} />
    //     <Route path="/populo" element={<PopuloDashboard />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
