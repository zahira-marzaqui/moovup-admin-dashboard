import 'dotenv/config'
import express from 'express'
import { createClient } from '@supabase/supabase-js'
import cors from 'cors'
import productsRouter from './routes/products.routes.js'
// import bookingsRouter from './routes/bookings.routes.js'
// import restaurantRouter from './routes/restaurant.routes.js'

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
// app.use('/api/services', servicesRouter)
// app.use('/api/bookings', bookingsRouter)
// app.use('/api/restaurant', restaurantRouter)


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
  email: 'manager.anais@gmail.com',
  password: 'manager.anais@gmail.com'
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
