import { useState, useMemo, useEffect } from 'react';
import Sidebar from '../components/layout/Sidebar';
import ProductList from '../components/product/ProductList';
import Navbar from '../components/layout/Navbar';
import { useData } from '../context/DataContext';
import { useLocation } from 'react-router-dom';
import '../components/layout/Layout.css';

const Home = () => {
    const { products, resetSearch } = useData(); // Use context data
    // selectedCategory is now null or object: { type: 'main' | 'sub', value: string }
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortBy, setSortBy] = useState('price-asc'); // Changed initial sort state
    const location = useLocation(); // Hook

    // Handle initial navigation state
    useEffect(() => {
        if (location.state && location.state.category) {
            setSelectedCategory(location.state.category);
            // Clear state so it doesn't persist weirdly if we just refresh (optional, but good practice)
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleCategorySelect = (category) => {
        resetSearch(); // Ensure we have all products when switching categories
        setSelectedCategory(category);
    };

    const filteredAndSortedProducts = useMemo(() => {
        let result = products;

        // Filter logic
        if (selectedCategory) {
            if (selectedCategory.type === 'main') {
                result = result.filter(p => p.category === selectedCategory.value);
            } else if (selectedCategory.type === 'sub') {
                result = result.filter(p => p.subcategory === selectedCategory.value);
            }
        }

        // Sort logic
        result = [...result];
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
                result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            default:
        }

        return result;
    }, [products, selectedCategory, sortBy]);

    const getHeaderTitle = () => {
        if (!selectedCategory) return 'Všetky produkty';
        if (selectedCategory.type === 'sub') {
            // Find the main category for this subcategory for better context if needed, 
            // or just show subcategory name.
            return selectedCategory.value;
        }
        return selectedCategory.value;
    };

    return (
        <div className="home-container">
            <Sidebar
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <div className="home-content">
                <div className="products-header">
                    <div>
                        <h2>{getHeaderTitle()}</h2>
                        <p>{filteredAndSortedProducts.length} Najdených poloziek</p>
                    </div>

                    <select
                        className="sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="popular">Najlepšie hodnotené</option>
                        <option value="price-asc">Najlacnejšie</option>
                        <option value="price-desc">Najdrahšie</option>
                    </select>
                </div>
                <ProductList products={filteredAndSortedProducts} />
            </div>
        </div>
    );
};

export default Home;
