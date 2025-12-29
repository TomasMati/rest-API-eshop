import api from './api';

export const userService = {
    // Get all users (admin)
    getAllUsers: async () => {
        const response = await api.get('/users');
        return response.data;
    },

    // Get user by ID
    getUserById: async (id) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    // Update user
    updateUser: async (id, userData) => {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    },

    // Delete user (admin)
    deleteUser: async (id) => {
        await api.delete(`/users/${id}`);
    },

    getWishlist: async (id) => {
        const response = await api.get(`/users/${id}/wishlist`);
        return response.data;
    },

    addToWishlist: async (id, productId) => {
        await api.post(`/users/${id}/wishlist/${productId}`);
    },

    removeFromWishlist: async (id, productId) => {
        await api.delete(`/users/${id}/wishlist/${productId}`);
    }
};
