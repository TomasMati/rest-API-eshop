import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Trash2, Plus, ChevronRight, ChevronDown } from 'lucide-react';

const CategoryManager = () => {
    const { categories, addCategory, deleteCategory, addSubcategory, deleteSubcategory } = useData();
    const [newCatName, setNewCatName] = useState('');
    const [newSubName, setNewSubName] = useState('');
    const [activeCatForSub, setActiveCatForSub] = useState(null); // ID of category adding sub to

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCatName.trim()) {
            addCategory(newCatName);
            setNewCatName('');
        }
    };

    const handleAddSubcategory = (e, catId) => {
        e.preventDefault();
        if (newSubName.trim()) {
            addSubcategory(catId, newSubName);
            setNewSubName('');
            setActiveCatForSub(null);
        }
    };

    return (
        <div>
            <h1>Kategórie</h1>

            <form onSubmit={handleAddCategory} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <input
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="Názov novej hlavnéj kategórie"
                    style={{ flex: 1, padding: '0.5rem' }}
                />
                <button type="submit" className="btn-add">Pridať kategóriu</button>
            </form>

            <div className="category-tree">
                {categories.map(cat => (
                    <div key={cat.id} className="admin-cat-item">
                        <div className="cat-header">
                            <span style={{ fontWeight: 'bold' }}>{cat.name}</span>
                            <div className="actions">
                                <button
                                    className="action-btn"
                                    onClick={() => setActiveCatForSub(activeCatForSub === cat.id ? null : cat.id)}
                                    title="Pridať podkategóriu"
                                >
                                    <Plus size={16} />
                                </button>
                                <button
                                    className="action-btn delete"
                                    onClick={() => { if (window.confirm('Vymazať kategóriu?')) deleteCategory(cat.id); }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Add Sub Form */}
                        {activeCatForSub === cat.id && (
                            <form onSubmit={(e) => handleAddSubcategory(e, cat.id)} style={{ padding: '0.5rem 0 0.5rem 2rem', display: 'flex', gap: '0.5rem' }}>
                                <input
                                    value={newSubName}
                                    onChange={(e) => setNewSubName(e.target.value)}
                                    placeholder="Názov podkategórie"
                                    autoFocus
                                    style={{ padding: '0.25rem' }}
                                />
                                <button type="submit" className="btn-add" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Pridať</button>
                            </form>
                        )}

                        {cat.subcategories && cat.subcategories.length > 0 && (
                            <ul className="admin-sub-list">
                                {cat.subcategories.map(sub => (
                                    <li key={sub.id} className="admin-sub-item">
                                        <span>{sub.name}</span>
                                        <button
                                            className="action-btn delete"
                                            onClick={() => deleteSubcategory(cat.id, sub.id)}
                                            style={{ padding: 0 }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryManager;
