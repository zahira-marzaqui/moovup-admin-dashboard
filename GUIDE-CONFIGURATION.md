# Guide de Configuration - MoovUp Admin

## Problème de Login avec Supabase

Si le login ne fonctionne pas avec vos comptes Supabase, voici comment résoudre le problème :

### 1. Vérifier la Configuration Supabase

**Étape 1 : Créer le fichier .env**
Créez un fichier `.env` à la racine du projet avec :

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_URL=http://localhost:5000
```

**Étape 2 : Récupérer vos clés Supabase**
1. Allez sur [supabase.com](https://supabase.com)
2. Ouvrez votre projet
3. Allez dans Settings > API
4. Copiez :
   - `Project URL` → `REACT_APP_SUPABASE_URL`
   - `anon public` → `REACT_APP_SUPABASE_ANON_KEY`

### 2. Vérifier les Comptes Utilisateurs

**Dans Supabase Dashboard :**
1. Allez dans Authentication > Users
2. Vérifiez que vos comptes existent :
   - `admin@moovup.com`
   - `manager.anais@gmail.com`
   - `manager.evolve@gmail.com`
   - `manager.populo@gmail.com`

**Si les comptes n'existent pas :**
1. Allez dans Authentication > Users
2. Cliquez sur "Add user"
3. Créez les comptes avec les emails et mots de passe

### 3. Vérifier la Table Admins

**Créer la table admins si elle n'existe pas :**

```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  auth_user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  role_code TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insérer les admins
INSERT INTO admins (auth_user_id, full_name, role_code) VALUES
((SELECT id FROM auth.users WHERE email = 'admin@moovup.com'), 'Super Admin', 'SUPER_ADMIN'),
((SELECT id FROM auth.users WHERE email = 'manager.anais@gmail.com'), 'Manager Anais', 'MANAGER_ANAIS'),
((SELECT id FROM auth.users WHERE email = 'manager.evolve@gmail.com'), 'Manager Evolve', 'MANAGER_EVOLVE'),
((SELECT id FROM auth.users WHERE email = 'manager.populo@gmail.com'), 'Manager Populo', 'MANAGER_POPULO');
```

### 4. Mode Test (Sans Supabase)

Si vous ne voulez pas configurer Supabase maintenant, l'application fonctionne en mode test avec ces comptes :

- **Super Admin** : `admin@moovup.com` / `admin123`
- **Manager Anais** : `manager.anais@gmail.com` / `manager.anais@gmail.com`
- **Manager Evolve** : `manager.evolve@gmail.com` / `manager.evolve@gmail.com`
- **Manager Populo** : `manager.populo@gmail.com` / `manager.populo@gmail.com`

### 5. Débogage

**Ouvrez la console du navigateur (F12) pour voir :**
- Les logs de configuration Supabase
- Les erreurs d'authentification
- Les détails de connexion

**Logs attendus :**
```
=== Configuration Supabase ===
URL: Configurée
Anon Key: Configurée
```

**Si vous voyez "MANQUANTE" :**
- Vérifiez que le fichier `.env` existe
- Redémarrez l'application (`npm start`)
- Vérifiez l'orthographe des variables

### 6. Redémarrage

Après avoir créé/modifié le fichier `.env` :
```bash
# Arrêter l'application (Ctrl+C)
# Puis redémarrer
npm start
```

## Résolution des Erreurs Courantes

### "Variables d'environnement Supabase manquantes"
- Créez le fichier `.env` avec les bonnes variables
- Redémarrez l'application

### "Email ou mot de passe incorrect"
- Vérifiez que le compte existe dans Supabase
- Vérifiez le mot de passe
- Essayez de réinitialiser le mot de passe dans Supabase

### "Not an admin"
- Créez la table `admins` avec les données utilisateur
- Ou utilisez le mode test (sans fichier `.env`)

### "404 Not Found" sur les APIs
- Vérifiez que le serveur backend est démarré (`cd server && npm start`)
- Vérifiez que `REACT_APP_API_URL=http://localhost:5000`
