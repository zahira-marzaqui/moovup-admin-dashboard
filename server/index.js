import 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'
import cors from 'cors'
import productsRouter from './routes/products.routes.js'
import servicesRouter from './routes/services.routes.js'
import bookingsAdminRouter from './routes/bookings.routes.js'
import menuItemsRouter from './routes/menu_items.routes.js'
import ordersAdminRouter from './routes/orders.routes.js'
import authRouter from './routes/auth.routes.js'

// Middleware CORS


const app = express()
app.use(express.json())
app.use(cors())

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
app.use('/api/auth', authRouter)

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
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'manager.evolve@gmail.com',
  password: 'manager.evolve@gmail.com'
})

if (error) {
  console.error('❌ Erreur login:', error.message)
} else {
  console.log('✅ Access token:', data.session.access_token)
}

// Lancer le serveur
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`🚀 Serveur Express lancé sur http://localhost:${port}`)
})
