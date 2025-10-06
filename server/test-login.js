import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'manager.anais@moovup.com',
  password: 'manager.anais@moovup.com'
})

if (error) {
  console.error('❌ Erreur login:', error.message)
} else {
  console.log('✅ Access token:', data.session.access_token)
}
