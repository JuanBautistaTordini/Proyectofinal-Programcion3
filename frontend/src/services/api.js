import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'
console.log('[API] Base URL:', API_BASE_URL)

const api = axios.create({
    baseURL: API_BASE_URL
});

// Interceptor para JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        console.log('[API] Interceptando request a:', config.url);
        if (token) {
            console.log('[API] Token JWT encontrado, agregando al header');
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.log('[API] No se encontró token, enviando sin Authorization');
        }
        return config;
    },
    (error) => {
        console.error('[API] Error en interceptor de request:', error);
        return Promise.reject(error);
    }
);

export default api
