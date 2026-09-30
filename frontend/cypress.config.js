import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // 👈 L'URL dev de ton serveur Vite React
    setupNodeEvents(on, config) {
      // écouteurs d'événements si besoin
    },
  },
});