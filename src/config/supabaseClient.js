import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Logs de débogage pour vérifier la configuration
console.log('=== Configuration Supabase ===')
console.log('URL:', supabaseUrl ? 'Configurée' : 'MANQUANTE')
console.log('Anon Key:', supabaseAnonKey ? 'Configurée' : 'MANQUANTE')

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variables d\'environnement Supabase manquantes!')
  console.warn('Créez un fichier .env avec:')
  console.warn('REACT_APP_SUPABASE_URL=https://your-project.supabase.co')
  console.warn('REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
   