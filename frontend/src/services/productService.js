import api from './api';

export const productService = {
    // Get all products
    // Get all products (with optional search)
    getAllProducts: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

        const response = await api.get(`/products?${params.toString()}`);
        if (response.data && response.data.content) {
            return response.data.content;
        }
        return response.data || [];
    },

    getProductReviews: async (id) => {
        const response = await api.get(`/products/${id}/reviews`);
        return response.data;
    },

    addReview: async (id, userId, text, rating) => {
        const response = await api.post(`/products/${id}/reviews`, { userId, text, rating });
        return response.data;
    },

    // Get product by ID
    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    // Create product (with images)
    createProduct: async (productData, images) => {
        const formData = new FormData();
        formData.append('product', JSON.stringify(productData));

        if (images && images.length > 0) {
            images.forEach((image) => {
                formData.append('images', image);
            });
        }

        const response = await api.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Update product
    updateProduct: async (id, productData, images) => {
        const formData = new FormData();
        formData.append('product', JSON.stringify(productData));

        if (images && images.length > 0) {
            images.forEach((image) => {
                formData.append('images', image);
            });
        }

        const response = await api.put(`/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Delete product
    deleteProduct: async (id) => {
        await api.delete(`/products/${id}`);
    }
};
