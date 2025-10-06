import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './config/supabaseClient'
import { apiGet } from './api/http'

// Auth
import Login from './auth/LoginPage'

// Layout Components
import Layout from './components/Layout'

// Dashboard Pages
import SuperDashboard from './pages/SuperAdmin/SuperDashboard'
import AnaisDashboard from './pages/Anais/AnaisDashboard'
import EvolveDashboard from './pages/Evolve/EvolveDashboard'
import PopuloDashboard from './pages/Populo/PopuloDashboard'

// Loading Component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Chargement...</p>
    </div>
  </div>
)

export default function App() {
  const [user, setUser] = useState(null)
  const [adminProfile, setAdminProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // Récupérer la session au chargement
  useEffect(() => {
    let ignore = false
    
    const initializeAuth = async () => {
      try {
        // Vérifier si un utilisateur est déjà connecté (mode démo)
        const savedUser = localStorage.getItem('demoUser')
        if (savedUser && !ignore) {
          const userData = JSON.parse(savedUser)
          setUser(userData.user)
          setAdminProfile(userData.profile)
          setLoading(false)
          return
        }

        // Essayer Supabase si configuré
        if (process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
          const { data } = await supabase.auth.getSession()
          const session = data?.session
          
          if (!ignore) {
            if (session?.user) {
              setUser(session.user)
              localStorage.setItem('token', session.access_token)
              
              // Récupérer le profil admin
              try {
                const profile = await apiGet('/api/auth/profile')
                setAdminProfile(profile)
              } catch (error) {
                console.error('Erreur récupération profil:', error)
                // Si erreur, déconnecter
                await supabase.auth.signOut()
                localStorage.removeItem('token')
                setUser(null)
              }
            }
            setLoading(false)
          }
        } else {
          // Mode démo sans Supabase
          if (!ignore) setLoading(false)
        }
      } catch (error) {
        console.error('Erreur initialisation auth:', error)
        if (!ignore) setLoading(false)
      }
    }

    initializeAuth()

    // Écouter les changements d'auth seulement si Supabase est configuré
    let subscription = null
    if (process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setUser(null)
          setAdminProfile(null)
          localStorage.removeItem('token')
          localStorage.removeItem('demoUser')
        } else if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user)
          localStorage.setItem('token', session.access_token)
          
          try {
            const profile = await apiGet('/api/auth/profile')
            setAdminProfile(profile)
          } catch (error) {
            console.error('Erreur récupération profil:', error)
          }
        }
      })
      subscription = data
    }

    return () => {
      ignore = true
      subscription?.subscription?.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    // Nettoyer les données de session
    localStorage.removeItem('demoUser')
    localStorage.removeItem('token')
    
    // Essayer Supabase si configuré
    if (process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
      await supabase.auth.signOut()
    }
    
    // Reset des états
    setUser(null)
    setAdminProfile(null)
  }

  if (loading) {
    return <LoadingScreen />
  }

  if (!user || !adminProfile) {
    return <Login />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} adminProfile={adminProfile} onLogout={handleLogout} />}>
          {/* Routes basées sur le rôle */}
          <Route index element={<DashboardRedirect role={adminProfile.role} />} />
          
          {/* Super Admin - accès à tout */}
          <Route path="super-admin" element={<SuperDashboard />} />
          <Route path="anais" element={<AnaisDashboard />} />
          <Route path="evolve" element={<EvolveDashboard />} />
          <Route path="populo" element={<PopuloDashboard />} />
          
          {/* Redirections par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

// Composant pour rediriger vers le bon dashboard selon le rôle
const DashboardRedirect = ({ role }) => {
  switch (role) {
    case 'SUPER_ADMIN':
      return <Navigate to="/super-admin" replace />
    case 'MANAGER_ANAIS':
      return <Navigate to="/anais" replace />
    case 'MANAGER_EVOLVE':
      return <Navigate to="/evolve" replace />
    case 'MANAGER_POPULO':
      return <Navigate to="/populo" replace />
    default:
      return <Navigate to="/anais" replace />
  }
}



// ====================================================================================================================
// src/App.js
// import React, { useEffect, useState } from 'react'
// import { supabase } from './config/supabaseClient'

// import Login from './auth/LoginPage'
// import Sidebar from './components1/Sidebar'
// import Navbar from './components1/Navbar'

// // === Exemple de page de contenu après login ===
// import OrdersTable from './features/store/orders/OrdersTable'

// export default function App() {
//   const [loggedIn, setLoggedIn] = useState(false)
//   const [darkMode, setDarkMode] = useState(false)
//   const [user, setUser] = useState(null)

//   // Récupérer la session au chargement (persistance reload)
//   useEffect(() => {
//     let ignore = false
//     ;(async () => {
//       const { data } = await supabase.auth.getSession()
//       const session = data?.session
//       if (!ignore) {
//         setLoggedIn(!!session)
//         setUser(session?.user ?? null)
//         // (optionnel) stocker le token si tu utilises fetch custom côté front
//         if (session?.access_token) {
//           localStorage.setItem('token', session.access_token)
//         }
//       }
//     })()
//     // écoute les changements (login/logout dans un autre onglet, etc.)
//     const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
//       setLoggedIn(!!session)
//       setUser(session?.user ?? null)
//       if (session?.access_token) localStorage.setItem('token', session.access_token)
//       else localStorage.removeItem('token')
//     })
//     return () => {
//       ignore = true
//       sub.subscription?.unsubscribe?.()
//     }
//   }, [])

//   const handleLogin = () => setLoggedIn(true)

//   const handleLogout = async () => {
//     await supabase.auth.signOut()
//     localStorage.removeItem('token')
//     setLoggedIn(false)
//     setUser(null)
//   }

//   if (!loggedIn) {
//     return <Login onLogin={handleLogin} />
//   }

//   return (
//     <div className={`App ${darkMode ? 'dark' : ''}`}>
//       {/* Sidebar partagée (produits, services, réservations, logout en bas) */}
//       <Sidebar
//         onDarkModeChange={setDarkMode}
//         onLogout={handleLogout}
//       />

//       {/* Contenu principal */}
//       <div
//         style={{
//           marginLeft: 270, // largeur de la sidebar
//           padding: 0,
//           position: 'relative',
//           minHeight: '100vh',
//           background: darkMode ? '#0b1020' : '#f6f7fb'
//         }}
//       >
//         {/* Navbar partagée (profil, notifications, switch light/dark) */}
//         <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
//           <Navbar
//             darkMode={darkMode}
//             onToggleDarkMode={() => setDarkMode((v) => !v)}
//             user={user}                 // pour afficher le manager connecté
//             onLogout={handleLogout}     // bouton logout dans le menu profil si besoin
//           />
//         </div>

//         {/* === ICI tes pages (produits / services / réservations) ===
//             Tu peux plus tard remplacer par un Router */}
//         <main style={{ padding: 24 }}>
//           <OrdersTable />
//           {/* ex: <ProductsPage /> / <ServicesPage /> / <BookingsPage /> */}
//         </main>
//       </div>
//     </div>
//   )
// }



// import React, { useState } from "react";
// import "./App.css";
// import "./styles.css";
// import Sidebar from "./components/Sidebar";
// import Topbar from "./components/Topbar";
// import Card from "./components/Card";
// import KPI from "./components/KPI";
// import Table from "./components/Table";
// import {
//   BarChart,
//   LineChart,
//   DonutChart,
//   Histogram,
//   StackedAreaChart,
//   GroupedBarChart,
//   RadialGauge,
//   Heatmap,
// } from "./components/Charts";
// import PasswordForm from "./components/PasswordForm";
// import Button from "./components/Button";
// import Tabs from "./components/Tabs";
// import Modal from "./components/Modal";
// import Progress from "./components/Progress";
// import Toggle from "./components/Toggle";
// import Pagination from "./components/Pagination";
// import Breadcrumbs from "./components/Breadcrumbs";
// import Tag from "./components/Tag";
// import Accordion from "./components/Accordion";
// import Legend from "./components/Legend";
// import Tasks from "./components/Tasks";

// function App() {
//   const tableColumns = [
//     { header: "Utilisateur", accessor: "user" },
//     { header: "Rôle", accessor: "role" },
//     {
//       header: "Statut",
//       accessor: "status",
//       cell: (r) => <span className="pill">{r.status}</span>,
//     },
//     { header: "Dernière activité", accessor: "last" },
//   ];
//   const tableData = [
//     { user: "Marie", role: "Admin", status: "Actif", last: "il y a 5 min" },
//     {
//       user: "Yassine",
//       role: "Éditeur",
//       status: "En révision",
//       last: "il y a 1 h",
//     },
//     { user: "Sofia", role: "Viewer", status: "Actif", last: "hier" },
//     { user: "Leo", role: "Éditeur", status: "Suspendu", last: "il y a 2 j" },
//   ];

//   return (
//     <div className="dashboard">
//       <Sidebar />
//       <Topbar />
//       <main className="main">
//         <div
//           className="row"
//           style={{ justifyContent: "space-between", marginBottom: 12 }}
//         >
//           <Breadcrumbs
//             items={[{ label: "Accueil" }, { label: "Tableau de bord" }]}
//           />
//           <div className="row" style={{ gap: 10 }}>
//             <Toggle />
//             <div className="avatar">ME</div>
//           </div>
//         </div>

//         <div className="grid" style={{ marginBottom: 18 }}>
//           <div className="col-3">
//             <KPI label="Revenus" value="$42,300" trend={12.4} />
//           </div>
//           <div className="col-3">
//             <KPI label="Utilisateurs" value="12,540" trend={-2.3} />
//           </div>
//           <div className="col-3">
//             <KPI label="Conversions" value="4.2%" trend={0.6} />
//           </div>
//           <div className="col-3">
//             <KPI label="Tickets" value="89" trend={3.1} />
//           </div>
//         </div>

//         {/* Analytique */}
//         <div
//           className="row"
//           style={{ justifyContent: "space-between", marginBottom: 8 }}
//         >
//           <strong>Analytique</strong>
//           <Button className="ghost">Exporter</Button>
//         </div>
//         <div className="grid" style={{ marginBottom: 18 }}>
//           <div className="col-6">
//             <StackedAreaChart
//               height={260}
//               series={[
//                 [5, 8, 7, 10, 12, 15, 14, 18, 16, 19, 18, 22],
//                 [3, 4, 5, 6, 6, 7, 8, 9, 10, 10, 11, 12],
//                 [2, 3, 2, 4, 3, 4, 5, 4, 5, 6, 5, 6],
//               ]}
//             />
//             <Legend
//               items={[
//                 { label: "Série A", color: "#60a5fa" },
//                 { label: "Série B", color: "#34d399" },
//                 { label: "Série C", color: "#f59e0b" },
//               ]}
//             />
//           </div>
//           <div className="col-6">
//             <GroupedBarChart
//               height={260}
//               groups={[
//                 { a: 12, b: 6 },
//                 { a: 18, b: 9 },
//                 { a: 10, b: 5 },
//                 { a: 22, b: 12 },
//                 { a: 30, b: 15 },
//                 { a: 16, b: 8 },
//               ]}
//             />
//             <Legend
//               items={[
//                 { label: "Canal A", color: "#4b52ff" },
//                 { label: "Canal B", color: "#22c55e" },
//               ]}
//             />
//           </div>
//           <div className="col-6">
//             <DonutChart
//               size={220}
//               segments={[
//                 { label: "A", value: 45 },
//                 { label: "B", value: 30 },
//                 { label: "C", value: 15 },
//                 { label: "D", value: 10 },
//               ]}
//             />
//             <Legend
//               items={[
//                 { label: "A", color: "#6366f1" },
//                 { label: "B", color: "#22c55e" },
//                 { label: "C", color: "#f59e0b" },
//                 { label: "D", color: "#ef4444" },
//               ]}
//             />
//           </div>
//           <div className="col-6">
//             <Heatmap
//               height={260}
//               matrix={[
//                 [2, 3, 4, 6, 8, 6, 5, 4, 3, 2, 1, 2],
//                 [1, 2, 3, 5, 7, 9, 8, 6, 4, 3, 2, 1],
//                 [0, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5],
//               ]}
//             />
//             <div className="muted" style={{ marginTop: 8, fontSize: 12 }}>
//               Intensité: faible → forte
//             </div>
//           </div>
//         </div>

//         <div className="grid" style={{ marginBottom: 18 }}>
//           <div className="col-6">
//             <Card
//               title="Utilisateurs récents"
//               right={<Pagination page={1} total={5} />}
//             >
//               <Table columns={tableColumns} data={tableData} />
//             </Card>
//           </div>
//           <div className="col-6">
//             <PasswordForm />
//           </div>
//         </div>

//         <div className="grid" style={{ marginBottom: 18 }}>
//           <div className="col-12">
//             <Card title="Tâches">
//               <Tasks
//                 items={[
//                   {
//                     title: "Configurer la facturation",
//                     owner: "Marie",
//                     due: "Aujourd'hui",
//                     status: "doing",
//                   },
//                   {
//                     title: "Importer utilisateurs",
//                     owner: "Yassine",
//                     due: "Demain",
//                     status: "todo",
//                   },
//                   {
//                     title: "Corriger bug paiement",
//                     owner: "Sofia",
//                     due: "Mar",
//                     status: "blocked",
//                   },
//                   {
//                     title: "Ajouter dark mode",
//                     owner: "Leo",
//                     due: "Ven",
//                     status: "done",
//                   },
//                 ]}
//               />
//             </Card>
//           </div>
//         </div>

//         {/* Fin Analytique */}

//         <div className="grid">
//           <div className="col-6">
//             <Tabs
//               items={[
//                 {
//                   label: "Résumé",
//                   content: <div className="muted">Tout va bien ✅</div>,
//                 },
//                 {
//                   label: "Journal",
//                   content: () => (
//                     <ul className="muted">
//                       <li>Build ok</li>
//                       <li>Tests ok</li>
//                     </ul>
//                   ),
//                 },
//                 {
//                   label: "Paramètres",
//                   content: <div className="muted">Bientôt...</div>,
//                 },
//               ]}
//             />
//           </div>
//           <div className="col-6">
//             <ModalDemo />
//             <div style={{ height: 12 }} />
//             <Accordion
//               items={[
//                 { title: "Détails 1", content: "Texte descriptif..." },
//                 {
//                   title: "Détails 2",
//                   content: () => (
//                     <div className="muted">Du contenu dynamique ici.</div>
//                   ),
//                 },
//               ]}
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function ModalDemo() {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="card">
//       <div className="card-header">
//         <strong>Exemple de modal</strong>
//         <Button className="ghost" onClick={() => setOpen(true)}>
//           Ouvrir
//         </Button>
//       </div>
//       <div className="muted">Clique pour voir un dialogue stylé.</div>
//       <Modal
//         open={open}
//         onClose={() => setOpen(false)}
//         title="Confirmer l'action"
//         actions={
//           <div className="row" style={{ gap: 8 }}>
//             <Button className="ghost" onClick={() => setOpen(false)}>
//               Annuler
//             </Button>
//             <Button variant="primary" onClick={() => setOpen(false)}>
//               Confirmer
//             </Button>
//           </div>
//         }
//       >
//         Cette action est irréversible. Continuer ?
//       </Modal>
//     </div>
//   );
// }

// export default App;

