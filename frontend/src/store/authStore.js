import { create } from 'zustand';
import axios from 'axios';

// Set the base URL for my Spring Boot backend
const API = axios.create({
    baseURL: 'http://localhost:8080/api/auth'
});

API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
})

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,

    register: async (userData) => {
        set({ loading: true});
        try {
            const response = await API.post('/register', userData);

            set({ user: response.data, loading: false });
            localStorage.setItem('user', JSON.stringify(response.data));

            return { success: true };
        }
        catch (error) {
            set({ loading: false });
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        };
    },

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await API.post('/login', { email, password });
            const { user, token } = response.data;

            const userData = { ...user, token };
            set({ user: userData, loading: false});
            localStorage.setItem('user', JSON.stringify(userData));

            return { success: true };
        } 
        catch (error) {
            const errorMessage = error.response?.data || "Invalid Credentials";
            set({ loading: false, error: errorMessage });
            return { success: false, error: errorMessage };
        }
    },

    logout: () => {
        set({ user: null });
        localStorage.removeItem('user');
    }
}));