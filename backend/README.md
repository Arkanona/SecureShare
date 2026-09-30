# SecureShare - Backend

API Node.js / Express de SecureShare.

## Technologies

- Node.js
- Express
- Sequelize
- PostgreSQL
- JWT
- bcrypt
- Multer
- Sharp

## Fonctionnalités

- inscription et connexion ;
- authentification JWT ;
- routes protégées ;
- upload d'images ;
- réception des fichiers avec Multer en mémoire ;
- validation du type et de la taille des fichiers ;
- traitement des images avec Sharp ;
- redimensionnement ;
- conversion en WebP ;
- stockage des images ;
- gestion des descriptions.

## Installation

```bash
npm install
npm run dev
```

Si aucun script `dev` n'est défini :

```bash
nodemon app.js
```

## Sécurité

### Injection SQL

Une version volontairement vulnérable utilise une concaténation directe :

```js
`SELECT * FROM users WHERE email = '${email}'`
```

### Correction

Utiliser une requête paramétrée ou Sequelize :

```js
const user = await User.findOne({
  where: { email }
})
```

### XSS

La description peut être stockée côté backend, mais elle ne doit pas être interprétée directement comme HTML côté frontend sans nettoyage.

## Traitement des images

Le pipeline attendu utilise :

- `multer.memoryStorage()` ;
- types MIME autorisés : JPEG, PNG, WebP ;
- taille maximale : 5 Mo ;
- redimensionnement avec Sharp ;
- conversion en `.webp` ;
- nom de fichier unique.

## Tests unitaires

Au moins une fonction critique du serveur doit être testée.

Lancement :

```bash
npm test
```

Exemples de fonctions à tester :
- validation d'image ;
- traitement Sharp ;
- validation d'un mot de passe ;
- validation d'un token.
