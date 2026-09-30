# SecureShare - Frontend

Frontend React de SecureShare.

## Technologies

- React
- React Router
- Zustand
- Tailwind CSS
- Vite

## Fonctionnalités

- inscription et connexion ;
- gestion de session avec JWT dans le `localStorage` ;
- routes protégées ;
- redirection vers `/login` puis retour vers `/publish` après connexion ;
- formulaire de publication ;
- aperçu d'image avant envoi ;
- ajout d'une description ;
- affichage des images publiées ;
- gestion du loading et des erreurs.

## Installation

```bash
npm install
npm run dev
```

## Configuration

Créer un fichier `.env` :

```env
VITE_API_URL=http://localhost:3000
```

## XSS : démonstration et correction

### Version vulnérable

```jsx
<div
  dangerouslySetInnerHTML={{
    __html: image.description
  }}
/>
```

### Version corrigée

```jsx
<p>{image.description}</p>
```

Le rendu JSX standard empêche le navigateur d'interpréter la description comme du HTML exécutable.

## Test E2E

Le test E2E couvre le parcours suivant :

- accès à `/publish` sans connexion ;
- redirection vers `/login` ;
- saisie des identifiants ;
- connexion ;
- redirection finale vers `/publish`.

Lancement :

```bash
node --test
```
