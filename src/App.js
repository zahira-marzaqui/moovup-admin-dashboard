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

  // Timeout de sécurité pour éviter le loading infini
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('⚠️ [App] Timeout - Arrêt du loading après 10 secondes')
        setLoading(false)
      }
    }, 10000)

    return () => clearTimeout(timeout)
  }, [loading])

  // Récupérer la session au chargement
  useEffect(() => {
    let ignore = false
    
    const initializeAuth = async () => {
      try {
        console.log('🔍 [App] Initialisation auth...')
        console.log('🔍 [App] Variables env:', {
          SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL ? 'Configurée' : 'MANQUANTE',
          SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY ? 'Configurée' : 'MANQUANTE',
          API_URL: process.env.REACT_APP_API_URL
        })
        
        // Vérifier si un utilisateur est déjà connecté
        const savedUser = localStorage.getItem('user')
        console.log('🔍 [App] Utilisateur localStorage:', savedUser ? 'Trouvé' : 'Aucun')
        
        if (savedUser && !ignore) {
          const userData = JSON.parse(savedUser)
          console.log('✅ [App] Utilisateur trouvé dans localStorage:', userData)
          setUser(userData.user)
          setAdminProfile(userData.profile)
          setLoading(false)
          return
        }

        // Essayer Supabase si configuré
        if (process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
          console.log('🔍 [App] Tentative session Supabase...')
          const { data } = await supabase.auth.getSession()
          const session = data?.session
          console.log('🔍 [App] Session Supabase:', session ? 'Trouvée' : 'Aucune')
          
          if (!ignore) {
            if (session?.user) {
              console.log('✅ [App] Session Supabase valide')
              setUser(session.user)
              localStorage.setItem('token', session.access_token)
              
              // Récupérer le profil admin
              try {
                console.log('🔍 [App] Récupération profil admin...')
                const profile = await apiGet('/api/auth/profile')
                console.log('✅ [App] Profil récupéré:', profile)
                setAdminProfile(profile.data)
              } catch (error) {
                console.error('❌ [App] Erreur récupération profil:', error)
                // Si erreur, déconnecter
                await supabase.auth.signOut()
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                setUser(null)
              }
            }
            setLoading(false)
          }
        } else {
          console.log('⚠️ [App] Supabase non configuré - mode démo')
          // Mode démo sans Supabase
          if (!ignore) setLoading(false)
        }
      } catch (error) {
        console.error('❌ [App] Erreur initialisation auth:', error)
        if (!ignore) setLoading(false)
      }
    }

    initializeAuth()

    // Écouter les changements d'auth seulement si Supabase est configuré
    let subscription = null
    if (process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('🔄 [App] Auth state change:', event)
        
        // Ignorer INITIAL_SESSION pour éviter les appels API redondants
        if (event === 'INITIAL_SESSION') {
          console.log('🔄 [App] INITIAL_SESSION ignoré')
          return
        }
        
        if (event === 'SIGNED_OUT' || !session) {
          console.log('🔄 [App] Déconnexion détectée')
          setUser(null)
          setAdminProfile(null)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        } else if (event === 'SIGNED_IN' && session?.user) {
          console.log('🔄 [App] Connexion détectée:', session.user.email)
          setUser(session.user)
          localStorage.setItem('token', session.access_token)
          
          try {
            console.log('🔍 [App] Récupération profil après SIGNED_IN...')
            const profile = await apiGet('/api/auth/profile')
            console.log('✅ [App] Profil récupéré après SIGNED_IN:', profile)
            console.log('🔍 [App] profile.data:', profile.data)
            console.log('🔍 [App] profile:', profile)
            
            // Essayer profile.data d'abord, puis profile directement
            const profileData = profile.data || profile
            console.log('🔍 [App] profileData final:', profileData)
            setAdminProfile(profileData)
            
            // Mettre à jour localStorage aussi
            const userData = {
              user: session.user,
              session: session,
              profile: profileData
            }
            localStorage.setItem('user', JSON.stringify(userData))
            console.log('✅ [App] localStorage mis à jour avec le profil')
          } catch (error) {
            console.error('❌ [App] Erreur récupération profil après SIGNED_IN:', error)
            // Ne pas déconnecter automatiquement en cas d'erreur
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
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    
    // Essayer Supabase si configuré
    if (process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY) {
      await supabase.auth.signOut()
    }
    
    // Reset des états
    setUser(null)
    setAdminProfile(null)
    
    // Forcer le rechargement pour nettoyer l'URL
    window.location.href = '/'
  }

  if (loading) {
    console.log('🔄 [App] Loading...')
    return <LoadingScreen />
  }

  console.log('🔍 [App] État actuel:', {
    user: user ? `${user.email} (${user.id})` : 'null',
    adminProfile: adminProfile ? `${adminProfile.name} (${adminProfile.role})` : 'null',
    loading: loading
  })

  if (!user || !adminProfile) {
    console.log('❌ [App] Redirection vers login - user ou adminProfile manquant')
    return <Login />
  }

  console.log('✅ [App] Affichage du dashboard')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} adminProfile={adminProfile} onLogout={handleLogout} />}>
          {/* Routes basées sur le rôle */}
          <Route index element={<DashboardRedirect role={adminProfile.role} />} />
          
          {/* Super Admin - accès à tout */}
          <Route path="super-admin/*" element={<SuperDashboard />} />
          <Route path="anais/*" element={<AnaisDashboard />} />
          <Route path="evolve/*" element={<EvolveDashboard />} />
          <Route path="populo/*" element={<PopuloDashboard />} />
          
          {/* Redirections par défaut */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

// Composant pour rediriger vers le bon dashboard selon le rôle
const DashboardRedirect = ({ role }) => {
  console.log('🔄 [App] DashboardRedirect - Rôle:', role)
  
  switch (role) {
    case 'SUPER_ADMIN':
      console.log('🔄 [App] Redirection vers /super-admin')
      return <Navigate to="/super-admin" replace />
    case 'MANAGER_ANAIS':
      console.log('🔄 [App] Redirection vers /anais')
      return <Navigate to="/anais" replace />
    case 'MANAGER_EVOLVE':
      console.log('🔄 [App] Redirection vers /evolve')
      return <Navigate to="/evolve" replace />
    case 'MANAGER_POPULO':
      console.log('🔄 [App] Redirection vers /populo')
      return <Navigate to="/populo" replace />
    default:
      console.log('🔄 [App] Redirection par défaut vers /anais')
      return <Navigate to="/anais" replace />
  }
}
