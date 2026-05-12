import { create } from 'zustand';
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8080/api'
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Unauthorized! Logging out...');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,

    /* User - Buyers */
    // ================= REGISTER =================
    register: async (userData) => {
        set({ loading: true, error: null });

        try {
            await API.post('/auth/register', userData);

            set({ loading: false });

            return { success: true };

        } catch (err) {
            set({ loading: false });

            return {
                success: false,
                error: err.response?.data || 'Registration failed'
            };
        }
    },

    // ================= LOGIN =================
    login: async (email, password) => {
        set({ loading: true, error: null });

        try {
            const res = await API.post('/auth/login', { email, password });

            const { user, token } = res.data;
            const userData = { ...user, token };

            set({ user: userData, loading: false });
            localStorage.setItem('user', JSON.stringify(userData));

            return { success: true, user: userData };

        } catch (err) {
            set({
                loading: false,
                error: err.response?.data || 'Login failed'
            });

            return { success: false };
        }
    },

    // ================= LOGOUT =================
    logout: () => {
        set({ user: null });
        localStorage.removeItem('user');
    },

    // ================= SELLER REQUEST =================
    requestSellerAccess: async (payload) => {
        const { user } = useAuthStore.getState();

        try {
            const res = await API.put(
                `/user/${user.id}/become-seller`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            console.log("Response:", res.data);

            const updatedUser = { ...user, ...res.data };

            set({ user: updatedUser });
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return { success: true };

        } catch (err) {
            console.error("Seller request error:", err);
            console.error("Response:", err.response);

            return {
                success: false,
                error: err.response?.data || 'Seller request failed'
            };
        }
    },

    /* User - Admin */
    // ================= GET ALL SELLER REQUEST =================
    getAllSellerRequests: async () => {
        set({ loading: true });

        const { user } = useAuthStore.getState();
        
        try {
            const res = await API.get('/admin/seller-requests',
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );

            set({ loading: false });

            return {
                success: true,
                requests: res.data
            }
        }
        catch (err) {
            console.error(err);
            set({ loading: false });

            return {
                success: false,
                error: err.response?.data || 'Failed to fetch seller requests'
            }
        }
    },

    // ================= APPROVE SELLER REQUEST =================
    approveSeller: async (userId) => {
        const { user } = useAuthStore.getState();

        try {
           const res = await API.patch(`/admin/approve-seller/${userId}`,
            {},
            {
                headers: { Authorization: `Bearer ${user.token}` }
            }
           );
            return {
                success: true,
                user: res.data
            };
        }
        catch (err) {
            return {
                success: false,
                error: err.response?.data || 'Failed to approve seller'
            };
        }
    },

    // ================= REJECT SELLER REQUEST =================
    rejectSeller: async (userId) => {
        const { user } = useAuthStore.getState();

        try {
            const res = await API.patch(`/admin/reject-seller/${userId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${user.token}` }
                }
            );
            return {
                success: true,
                user: res.data
            };
        }
        catch (err) {
            return {
                success: false,
                error: err.response?.data || 'Failed to reject seller'
            }
        }
    }
}));