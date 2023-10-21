// api.js
import axios from 'axios';

axios.defaults.baseURL = 'https://api-laravel-production-9dcf.up.railway.app'; // Reemplaza con la URL de tu API
axios.defaults.withCredentials = true; // Configura las credenciales

export default axios;
