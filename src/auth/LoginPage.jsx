import { useState } from 'react'
import { supabase } from '../config/supabaseClient'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      return
    }

    // ✅ Stocker le token pour les futures requêtes API
    localStorage.setItem('token', data.session.access_token)

    if (onLogin) onLogin(data)
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Connexion</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Se connecter</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
