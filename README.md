# SecureShare

SecureShare est un MVP de plateforme de partage d'images réalisé en binôme.

L'application permet à un utilisateur de :
- créer un compte et se connecter ;
- accéder à des routes protégées ;
- publier une image avec une légende ;
- afficher ses publications ;
- conserver sa session avec un JWT stocké dans le `localStorage`.

## Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Zustand

### Backend
- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT
- bcrypt
- Multer
- Sharp

## Lancement

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Si aucun script `dev` n'est défini :

```bash
nodemon app.js
```

## Fonctionnalités principales

- inscription / connexion ;
- redirection vers `/login` si `/publish` est inaccessible sans authentification ;
- retour vers `/publish` après connexion ;
- upload d'image avec aperçu ;
- traitement serveur des images avec Multer + Sharp ;
- conversion en WebP ;
- description associée à chaque image ;
- gestion du chargement et des erreurs.

## Rapport de sécurité

### Injection SQL

Une route volontairement vulnérable a été créée avec une requête SQL construite par concaténation.

**Avant correction :**

```js
`SELECT * FROM users WHERE email = '${email}'`
```

Cette approche permet à une entrée utilisateur de modifier la requête SQL.

**Correction :**

La requête est remplacée par une requête paramétrée ou une méthode Sequelize :

```js
const user = await User.findOne({
  where: { email }
})
```

### XSS stockée

Une description d'image a été volontairement affichée avec :

```jsx
<div
  dangerouslySetInnerHTML={{
    __html: image.description
  }}
/>
```

Cela permettait à du HTML injecté dans une description d'être interprété par le navigateur.

**Correction :**

```jsx
<p>{image.description}</p>
```

React échappe alors automatiquement le contenu.

## Tests

### Tests unitaires

```bash
npm test
```

### Tests E2E

```bash
npm run test:e2e
```

Le scénario E2E vérifie notamment :
1. l'accès à `/publish` sans connexion ;
2. la redirection vers `/login` ;
3. la connexion ;
4. le retour vers `/publish`.

> Les vulnérabilités SQLi et XSS sont uniquement utilisées dans un environnement local de démonstration avant correction.
