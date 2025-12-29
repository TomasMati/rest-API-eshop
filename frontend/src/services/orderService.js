import api from './api';

export const orderService = {
    // Get all orders (admin)
    getAllOrders: async () => {
        const response = await api.get('/orders');
        return response.data;
    },

    // Get order by ID
    getOrderById: async (id) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },

    // Get orders by user ID
    getOrdersByUserId: async (userId) => {
        const response = await api.get(`/orders/user/${userId}`);
        return response.data;
    },

    // Create order
    createOrder: async (orderData) => {
        const response = await api.post('/orders', orderData);
        return response.data;
    },

    // Update order status (admin)
    updateOrderStatus: async (id, status) => {
        const response = await api.put(`/orders/${id}/status`, { status });
        return response.data;
    }
};
