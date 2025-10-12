import 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'
import cors from 'cors'
import productsRouter from './routes/products.routes.js'
import servicesRouter from './routes/services.routes.js'
import bookingsAdminRouter from './routes/bookings.routes.js'
import menuItemsRouter from './routes/menu_items.routes.js'
import ordersAdminRouter from './routes/orders.routes.js'
import populoOrdersRouter from './routes/populo_orders.routes.js'
import authRouter from './routes/auth.routes.js'

// Middleware CORS


const app = express()
app.use(express.json())
app.use(cors())
// Empêcher les 304/ETag automatiques
app.set('etag', false)

// Désactiver le cache sur toutes les routes API
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  next()
})


// Connexion Supabase (mode admin)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
)
app.get('/health', (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }))

app.use('/api/products', productsRouter)
app.use('/api/services', servicesRouter)
app.use('/api/admin/bookings', bookingsAdminRouter)
app.use('/api/menu-items', menuItemsRouter)
app.use('/api/admin/orders', ordersAdminRouter)
app.use('/api/admin/populo-orders', populoOrdersRouter)
app.use('/api/auth', authRouter)

// Routes de statistiques pour les dashboards
app.get('/api/stats/anais', async (req, res) => {
  try {
    const [productsResult, servicesResult, bookingsResult, ordersResult] = await Promise.allSettled([
      supabase.from('products').select('*', { count: 'exact' }).eq('brand', 'ANAIS'),
      supabase.from('services').select('*', { count: 'exact' }).eq('brand', 'ANAIS'),
      supabase.from('bookings').select('*', { count: 'exact' }).eq('brand', 'ANAIS'),
      supabase.from('orders').select('*', { count: 'exact' }).eq('brand', 'ANAIS')
    ])

    const products = productsResult.status === 'fulfilled' ? productsResult.value.count || 0 : 0
    const services = servicesResult.status === 'fulfilled' ? servicesResult.value.count || 0 : 0
    const bookings = bookingsResult.status === 'fulfilled' ? bookingsResult.value.count || 0 : 0
    const orders = ordersResult.status === 'fulfilled' ? ordersResult.value.count || 0 : 0

    // Calculer le revenu (mock pour l'instant)
    const revenue = orders * 150 // Prix moyen estimé

    res.json({
      products,
      services,
      bookings,
      orders,
      revenue,
      recentBookings: Math.floor(bookings * 0.1),
      recentOrders: Math.floor(orders * 0.15)
    })
  } catch (err) {
    console.error('Erreur stats Anais:', err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/stats/evolve', async (req, res) => {
  try {
    const [productsResult, servicesResult, bookingsResult, ordersResult] = await Promise.allSettled([
      supabase.from('products').select('*', { count: 'exact' }).eq('brand', 'EVOLVE'),
      supabase.from('services').select('*', { count: 'exact' }).eq('brand', 'EVOLVE'),
      supabase.from('bookings').select('*', { count: 'exact' }).eq('brand', 'EVOLVE'),
      supabase.from('orders').select('*', { count: 'exact' }).eq('brand', 'EVOLVE')
    ])

    const products = productsResult.status === 'fulfilled' ? productsResult.value.count || 0 : 0
    const services = servicesResult.status === 'fulfilled' ? servicesResult.value.count || 0 : 0
    const bookings = bookingsResult.status === 'fulfilled' ? bookingsResult.value.count || 0 : 0
    const orders = ordersResult.status === 'fulfilled' ? ordersResult.value.count || 0 : 0

    // Calculer le revenu (mock pour l'instant)
    const revenue = orders * 200 // Prix moyen estimé

    res.json({
      products,
      services,
      bookings,
      orders,
      revenue,
      recentBookings: Math.floor(bookings * 0.1),
      recentOrders: Math.floor(orders * 0.15)
    })
  } catch (err) {
    console.error('Erreur stats Evolve:', err)
    res.status(500).json({ error: err.message })
  }
})

app.get('/api/stats/populo', async (req, res) => {
  try {
    const [menuItemsResult, ordersResult] = await Promise.allSettled([
      supabase.from('menu_items').select('*', { count: 'exact' }),
      supabase.from('populo_orders').select('*', { count: 'exact' })
    ])

    const menuItems = menuItemsResult.status === 'fulfilled' ? menuItemsResult.value.count || 0 : 0
    const orders = ordersResult.status === 'fulfilled' ? ordersResult.value.count || 0 : 0

    // Calculer le revenu (mock pour l'instant)
    const revenue = orders * 80 // Prix moyen estimé

    res.json({
      menuItems,
      orders,
      revenue,
      recentOrders: Math.floor(orders * 0.15),
      popularItems: [
        { name: "Salade Buddha Bowl", orders: Math.floor(orders * 0.3) },
        { name: "Smoothie Detox", orders: Math.floor(orders * 0.25) },
        { name: "Wrap Avocat", orders: Math.floor(orders * 0.2) }
      ]
    })
  } catch (err) {
    console.error('Erreur stats Populo:', err)
    res.status(500).json({ error: err.message })
  }
})

// Route de test
app.get('/api/test-products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(5)

    if (error) {
      return res.status(400).json({ error: error.message })
    }
    res.json({ message: 'Connexion OK ✅', products: data })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

//login test
// const { data, error } = await supabase.auth.signInWithPassword({
//   email: 'manager.evolve@gmail.com',
//   password: 'manager.evolve@gmail.com'
// })

// if (error) {
//   console.error('❌ Erreur login:', error.message)
// } else {
//   console.log('✅ Access token:', data.session.access_token)
// }

// Lancer le serveur
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`🚀 Serveur Express lancé sur http://localhost:${port}`)
})
