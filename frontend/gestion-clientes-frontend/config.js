// src/config.js
const config = {
  // En desarrollo usa localhost, en producción usa la URL actual
  API_BASE_URL: import.meta.env.PROD 
    ? window.location.origin + '/api'  // En producción: https://tu-app.railway.app/api
    : 'http://localhost:8000/api',     // En desarrollo: localhost

  // O puedes usar variables de entorno
  // API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
};

export default config;