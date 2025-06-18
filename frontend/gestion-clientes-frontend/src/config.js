// frontend/gestion-clientes-frontend/src/config.js
const config = {
  // Usa import.meta.env en lugar de process.env para Vite
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
};

export default config;