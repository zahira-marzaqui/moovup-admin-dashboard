# MoovUp Admin Dashboard

Dashboard d'administration pour les trois marques du club MoovUp :
- **Anais** : Store cosmétique & spa pour femmes
- **Evolve** : Store & spa pour hommes  
- **Populo** : Restaurant repas healthy

## Architecture du projet

### Frontend (React)
- **React 19** avec React Router pour la navigation
- **Tailwind CSS** pour le styling
- **Heroicons** pour les icônes
- **Supabase** pour l'authentification
- **@nivo** pour les graphiques (à implémenter)

### Backend (Node.js/Express)
- **Express** avec middleware d'authentification
- **Supabase** pour la base de données et l'auth
- **CORS** configuré pour le frontend
- Routes API pour produits, services, réservations, commandes

## Rôles et permissions

1. **SUPER_ADMIN** : Accès à tous les dashboards + gestion des utilisateurs
2. **MANAGER_ANAIS** : Accès uniquement au dashboard Anais
3. **MANAGER_EVOLVE** : Accès uniquement au dashboard Evolve
4. **MANAGER_POPULO** : Accès uniquement au dashboard Populo

## Installation et démarrage

### 1. Installation des dépendances

```bash
# Frontend
npm install

# Backend
cd server
npm install
```

### 2. Configuration

Configurez votre fichier `.env` à la racine :

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Démarrage

```bash
# Backend (Terminal 1)
cd server
npm start

# Frontend (Terminal 2)
npm start
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## Comptes de démonstration

- **Super Admin** : `admin@moovup.com` / `admin123`
- **Manager Anais** : `manager.anais@gmail.com` / `manager.anais@gmail.com`
- **Manager Evolve** : `manager.evolve@gmail.com` / `manager.evolve@gmail.com`
- **Manager Populo** : `manager.populo@gmail.com` / `manager.populo@gmail.com`

## Fonctionnalités implémentées

### ✅ Complétées
- [x] Système d'authentification avec rôles
- [x] Navigation adaptive selon le rôle
- [x] Dashboard SuperAdmin avec vue d'ensemble
- [x] Dashboards spécifiques par marque (Anais, Evolve, Populo)
- [x] Interface de gestion des produits/menu items
- [x] Design responsive avec Tailwind CSS
- [x] Sidebar avec navigation par rôle
- [x] Navbar avec profil utilisateur et notifications

### 🚧 À implémenter
- [ ] Graphiques et statistiques avec @nivo
- [ ] Gestion complète des services
- [ ] Gestion des réservations
- [ ] Gestion des commandes
- [ ] Gestion des utilisateurs (SuperAdmin)
- [ ] Upload d'images pour les produits
- [ ] Système de notifications en temps réel
- [ ] Export de données (Excel/PDF)

## Structure des composants

```
src/
├── components/          # Composants réutilisables
│   ├── Layout.jsx      # Layout principal
│   ├── Sidebar.jsx     # Navigation latérale
│   └── Navbar.jsx      # Barre de navigation
├── pages/              # Pages principales
│   ├── SuperAdmin/     # Dashboard SuperAdmin
│   ├── Anais/          # Dashboard Anais
│   ├── Evolve/         # Dashboard Evolve
│   └── Populo/         # Dashboard Populo
├── features/           # Fonctionnalités métier
│   └── store/          # Gestion des produits
├── auth/               # Authentification
├── api/                # Services API
└── config/             # Configuration
```

## API Routes

### Authentification
- `GET /api/auth/profile` - Profil utilisateur

### Produits
- `GET /api/products?brand=anais` - Liste des produits
- `POST /api/products` - Créer un produit
- `PATCH /api/products/:id` - Modifier un produit
- `DELETE /api/products/:id` - Supprimer un produit

### Services
- `GET /api/services?brand=anais` - Liste des services
- `POST /api/services` - Créer un service
- `PATCH /api/services/:id` - Modifier un service
- `DELETE /api/services/:id` - Supprimer un service

### Menu Items (Populo)
- `GET /api/menu-items` - Liste des plats
- `POST /api/menu-items` - Créer un plat
- `PATCH /api/menu-items/:id` - Modifier un plat
- `DELETE /api/menu-items/:id` - Supprimer un plat

### Réservations
- `GET /api/admin/bookings?brand=anais` - Liste des réservations
- `PATCH /api/admin/bookings/:id` - Modifier une réservation

### Commandes
- `GET /api/admin/orders?brand=anais` - Liste des commandes
- `PATCH /api/admin/orders/:id` - Modifier une commande

## Scripts disponibles

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
