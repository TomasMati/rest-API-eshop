import { createContext, useState, useContext, useEffect } from 'react';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import { orderService } from '../services/orderService';
import { userService } from '../services/userService';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsData, categoriesData] = await Promise.all([
                    productService.getAllProducts(),
                    categoryService.getAllCategories()
                ]);
                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Products CRUD
    const addProduct = async (product, images) => {
        try {
            // Remove 'imageFiles' if it exists in the product object to avoid circular references or errors
            const { imageFiles, ...productData } = product;
            const newProduct = await productService.createProduct(productData, images);
            setProducts(prev => [...prev, newProduct]);
            return newProduct;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    };

    const updateProduct = async (id, updatedProduct, images) => {
        try {
            const { imageFiles, ...productData } = updatedProduct;
            const updated = await productService.updateProduct(id, productData, images);
            setProducts(prev => prev.map(p => p.id === id ? updated : p));
            return updated;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        try {
            await productService.deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    };

    // Categories CRUD
    const addCategory = async (name) => {
        try {
            const newCategory = await categoryService.createCategory(name);
            setCategories(prev => [...prev, newCategory]);
            return newCategory;
        } catch (error) {
            console.error('Error adding category:', error);
            throw error;
        }
    };

    const deleteCategory = async (id) => {
        try {
            await categoryService.deleteCategory(id);
            setCategories(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    };

    const addSubcategory = async (categoryId, name) => {
        try {
            const newSubcategory = await categoryService.addSubcategory(categoryId, name);
            setCategories(prev => prev.map(cat => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        subcategories: [...(cat.subcategories || []), newSubcategory]
                    };
                }
                return cat;
            }));
            return newSubcategory;
        } catch (error) {
            console.error('Error adding subcategory:', error);
            throw error;
        }
    };

    const deleteSubcategory = async (categoryId, subcategoryId) => {
        try {
            await categoryService.deleteSubcategory(subcategoryId);
            setCategories(prev => prev.map(cat => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        subcategories: cat.subcategories.filter(sub => sub.id !== subcategoryId)
                    };
                }
                return cat;
            }));
        } catch (error) {
            console.error('Error deleting subcategory:', error);
            throw error;
        }
    };

    // Orders CRUD
    const addOrder = async (order) => {
        try {
            const newOrder = await orderService.createOrder(order);
            setOrders(prev => [...prev, newOrder]);
            return newOrder;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    };

    const updateOrder = async (id, updates) => {
        try {
            const updated = await orderService.updateOrderStatus(id, updates.status);
            setOrders(prev => prev.map(o => o.id === id ? updated : o));
            return updated;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    };

    // Users CRUD
    const updateUser = async (id, userData) => {
        try {
            const updated = await userService.updateUser(id, userData);
            setUsers(prev => prev.map(u => u.id === id ? updated : u));
            return updated;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    };

    const deleteUser = async (id) => {
        try {
            await userService.deleteUser(id);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    };

    // Fetch users (admin only)
    const fetchUsers = async () => {
        try {
            const usersData = await userService.getAllUsers();
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Fetch orders (admin only)
    const fetchOrders = async () => {
        try {
            const ordersData = await orderService.getAllOrders();
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DataContext.Provider value={{
            products,
            categories,
            users,
            orders,
            addProduct,
            updateProduct,
            deleteProduct,
            addCategory,
            deleteCategory,
            addSubcategory,
            deleteSubcategory,
            addOrder,
            updateOrder,
            updateUser,
            deleteUser,
            fetchUsers,
            fetchOrders,
            // New methods
            searchProducts: async (filters) => {
                setLoading(true);
                try {
                    const data = await productService.getAllProducts(filters);
                    setProducts(data);
                } catch (error) {
                    console.error("Search failed", error);
                } finally {
                    setLoading(false);
                }
            },
            resetSearch: async () => {
                setLoading(true);
                try {
                    const data = await productService.getAllProducts({});
                    setProducts(data);
                } catch (error) {
                    console.error("Reset search failed", error);
                } finally {
                    setLoading(false);
                }
            },
            getReviews: productService.getProductReviews,
            addReview: async (productId, userId, text, rating) => {
                const review = await productService.addReview(productId, userId, text, rating);
                // Fetch only the updated product to get new rating and reviewCount
                const updatedProduct = await productService.getProductById(productId);

                setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));

                return review;
            },
            wishlistActions: userService
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
