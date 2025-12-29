import api from './api';

export const categoryService = {
    // Get all categories
    getAllCategories: async () => {
        const response = await api.get('/categories');
        return response.data;
    },

    // Create category
    createCategory: async (name) => {
        const response = await api.post('/categories', { name });
        return response.data;
    },

    // Delete category
    deleteCategory: async (id) => {
        await api.delete(`/categories/${id}`);
    },

    // Add subcategory
    addSubcategory: async (categoryId, name) => {
        const response = await api.post(`/categories/${categoryId}/subcategories`, { name });
        return response.data;
    },

    // Delete subcategory
    deleteSubcategory: async (subcategoryId) => {
        await api.delete(`/categories/subcategories/${subcategoryId}`);
    }
};
