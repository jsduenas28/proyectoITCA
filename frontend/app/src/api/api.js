// api.js
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000'; // Reemplaza con la URL de tu API
axios.defaults.withCredentials = true; // Configura las credenciales

export default axios;
