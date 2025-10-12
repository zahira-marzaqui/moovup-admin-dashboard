# Configuration MoovUp Admin

## Variables d'environnement requises

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Configuration Supabase
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

# Configuration API Backend
REACT_APP_API_URL=http://localhost:5000

# Configuration pour le développement
REACT_APP_ENV=development
```

## Configuration Supabase

1. Créez un projet Supabase
2. Récupérez l'URL du projet et la clé anonyme
3. Configurez l'authentification avec les comptes managers

## Configuration Backend

Le serveur backend doit être configuré avec les variables d'environnement suivantes :

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE=your_supabase_service_role_key
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

## Comptes de test

Les comptes suivants sont configurés pour les tests :

- **Super Admin** : `admin@moovup.com` / `admin123`
- **Manager Anais** : `manager.anais@gmail.com` / `manager.anais@gmail.com`
- **Manager Evolve** : `manager.evolve@gmail.com` / `manager.evolve@gmail.com`
- **Manager Populo** : `manager.populo@gmail.com` / `manager.populo@gmail.com`

## Démarrage

1. **Backend** :
   ```bash
   cd server
   npm install
   npm start
   ```

2. **Frontend** :
   ```bash
   npm install
   npm start
   ```

L'application sera accessible sur http://localhost:3000
