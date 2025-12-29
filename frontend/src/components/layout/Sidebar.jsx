import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ChevronDown, ChevronRight } from 'lucide-react';
import './Layout.css';

const Sidebar = ({ selectedCategory, onSelectCategory }) => {
    const { categories } = useData();
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategory = (categoryId, event) => {
        event.stopPropagation();
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const handleMainCategoryClick = (categoryName) => {
        // If clicking the text, we select the main category
        onSelectCategory({ type: 'main', value: categoryName });
    };

    const handleSubCategoryClick = (subCategoryName) => {
        onSelectCategory({ type: 'sub', value: subCategoryName });
    };

    return (
        <aside className="sidebar">
            <h3>Kategórie</h3>
            <ul className="category-list">
                <li
                    className={!selectedCategory ? 'active' : ''}
                    onClick={() => onSelectCategory(null)}
                >
                    Všetky produkty
                </li>
                {categories.map(cat => (
                    <li key={cat.id} className="category-item-container">
                        <div
                            className={`category-main ${selectedCategory?.value === cat.name ? 'active' : ''}`}
                            onClick={() => handleMainCategoryClick(cat.name)}
                        >
                            <span className="category-name">{cat.name}</span>
                            {cat.subcategories && (
                                <span
                                    className="toggle-icon"
                                    onClick={(e) => toggleCategory(cat.id, e)}
                                >
                                    {expandedCategories[cat.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </span>
                            )}
                        </div>

                        {cat.subcategories && expandedCategories[cat.id] && (
                            <ul className="subcategory-list">
                                {cat.subcategories.map(sub => (
                                    <li
                                        key={sub.id}
                                        className={selectedCategory?.value === sub.name ? 'active-sub' : ''}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSubCategoryClick(sub.name);
                                        }}
                                    >
                                        {sub.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
