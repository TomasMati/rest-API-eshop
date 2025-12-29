import { createContext, useState, useContext, useEffect } from 'react';
import { PRODUCTS, CATEGORIES } from '../mock/mockData';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [products] = useState(PRODUCTS);
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState(1000); // Max price
    const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
    const [searchQuery, setSearchQuery] = useState('');

    // Cart Logic
    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Filter Logic
    useEffect(() => {
        let result = products;

        if (selectedCategory !== 'all') {
            result = result.filter((p) => p.category === selectedCategory);
        }

        result = result.filter((p) => p.price <= priceRange);

        // Add simple mock search if needed
        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setFilteredProducts(result);
    }, [selectedCategory, priceRange, searchQuery, products]);

    return (
        <ShopContext.Provider
            value={{
                products: filteredProducts,
                allProducts: PRODUCTS, // for reference if needed
                categories: CATEGORIES,
                cart,
                addToCart,
                removeFromCart,
                cartCount,
                selectedCategory,
                setSelectedCategory,
                priceRange,
                setPriceRange,
                searchQuery,
                setSearchQuery
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const useShop = () => useContext(ShopContext);
