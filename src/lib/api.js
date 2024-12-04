import axios from 'axios';

const api = axios.create({
    baseURL: 'http://147.182.197.59/',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Restaurar el token si existe en localStorage
const authData = localStorage.getItem('auth-storage');
if (authData) {
    try {
        const { state } = JSON.parse(authData);
        if (state.token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
        }
    } catch (error) {
        console.error('Error restoring auth token:', error);
    }
}

// Interceptor para manejar errores
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // No redirigir automáticamente, dejar que el componente maneje la redirección
            const authStore = JSON.parse(localStorage.getItem('auth-storage') || '{}');
            if (authStore.state) {
                localStorage.setItem('auth-storage', JSON.stringify({
                    ...authStore,
                    state: { user: null, token: null }
                }));
            }
        }
        return Promise.reject(error);
    }
);

export default api;