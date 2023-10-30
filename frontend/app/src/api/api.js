// api.js
import axios from 'axios';

// axios.defaults.baseURL = 'https://api-laravel-production-9dcf.up.railway.app';
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.withCredentials = true; // Configura las credenciales

export default axios;
