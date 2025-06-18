// frontend/config.js (o frontend/src/config.js)
const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? '/api'  // En Railway, las rutas son relativas
    : 'http://localhost:8000/api', // En desarrollo local
};

export default config;