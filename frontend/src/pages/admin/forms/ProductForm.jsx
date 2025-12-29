import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '../../../context/DataContext';
import { X } from 'lucide-react';

const ProductForm = () => {
    const { products, categories, addProduct, updateProduct } = useData();
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        catalogNumber: '',
        availability: '',
        category: '',
        subcategory: '',
        description: ''
    });

    const [mediaItems, setMediaItems] = useState([]);

    useEffect(() => {
        if (isEdit) {
            const product = products.find(p => p.id === parseInt(id));
            if (product) {
                // Handle legacy single image vs new array
                let existingImages = [];
                if (product.images && Array.isArray(product.images)) {
                    existingImages = product.images;
                } else if (product.image) {
                    existingImages = [product.image];
                }

                setFormData({
                    name: product.name,
                    price: product.price,
                    catalogNumber: product.catalogNumber || '',
                    availability: product.availability || '',
                    category: product.category,
                    subcategory: product.subcategory || '',
                    description: product.description || ''
                });

                setMediaItems(existingImages.map(url => ({ url, file: null })));
            }
        }
    }, [isEdit, id, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'subcategory') {
            // Find which main category this sub belongs to
            let foundMainCategory = '';
            for (const cat of categories) {
                if (cat.subcategories && cat.subcategories.find(sub => sub.name === value)) {
                    foundMainCategory = cat.name;
                    break;
                }
            }
            setFormData(prev => ({
                ...prev,
                subcategory: value,
                category: foundMainCategory
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const newItems = files.map(file => ({
                url: URL.createObjectURL(file),
                file: file
            }));
            setMediaItems(prev => [...prev, ...newItems]);
        }
    };

    const removeImage = (indexToRemove) => {
        setMediaItems(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Strict Validation
        if (!formData.name || !formData.price || !formData.category || !formData.subcategory || !formData.description || !formData.catalogNumber || !formData.availability) {
            setError('Prosím vyplňte všetky polia.');
            return;
        }

        if (mediaItems.length === 0) {
            setError('Prosím nahrajte aspoň jeden obrázok.');
            return;
        }

        const finalImages = mediaItems.filter(item => !item.file).map(item => item.url);
        const filesToSend = mediaItems.filter(item => item.file).map(item => item.file);

        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            images: finalImages // Send as array, backend DTO expects List<String>
        };

        try {
            if (isEdit) {
                await updateProduct(parseInt(id), productData, filesToSend);
            } else {
                await addProduct(productData, filesToSend);
            }
            navigate('/admin/products');
        } catch (err) {
            setError('Nastala chyba pri ukladaní produktu.');
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>{isEdit ? 'Upraviť produkt' : 'Nový produkt'}</h1>
            {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Názov produktu <span style={{ color: 'red' }}>*</span></label>
                    <input name="name" value={formData.name} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Cena <span style={{ color: 'red' }}>*</span></label>
                    <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Katalógové číslo <span style={{ color: 'red' }}>*</span></label>
                    <input
                        name="catalogNumber"
                        value={formData.catalogNumber}
                        onChange={handleChange}
                        onBlur={async (e) => {
                            if (e.target.value) {
                                try {
                                    const response = await fetch(`http://localhost:8081/api/products/check-catalog-number?value=${e.target.value}${isEdit ? `&id=${id}` : ''}`);
                                    const exists = await response.json();
                                    if (exists) {
                                        setError('Toto katalógové číslo už existuje.');
                                    } else {
                                        if (error === 'Toto katalógové číslo už existuje.') setError('');
                                    }
                                } catch (err) {
                                    console.error("Validation failed", err);
                                }
                            }
                        }}
                    />
                </div>

                <div className="form-group">
                    <label>Dostupnosť <span style={{ color: 'red' }}>*</span></label>
                    <select name="availability" value={formData.availability} onChange={handleChange}>
                        <option value="">Vyberte dostupnosť</option>
                        <option value="Skladom">Skladom</option>
                        <option value="Na objednávku">Na objednávku</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Podkategória <span style={{ color: 'red' }}>*</span></label>
                    <select name="subcategory" value={formData.subcategory} onChange={handleChange}>
                        <option value="">Vyberte podkategóriu</option>
                        {categories.map(cat => (
                            cat.subcategories && cat.subcategories.length > 0 && (
                                <optgroup key={cat.id} label={cat.name}>
                                    {cat.subcategories.map(sub => (
                                        <option key={sub.id} value={sub.name}>{sub.name}</option>
                                    ))}
                                </optgroup>
                            )
                        ))}
                    </select>
                    {formData.category && <small style={{ color: '#666', display: 'block', marginTop: '0.25rem' }}>Hlavná kategória: {formData.category}</small>}
                </div>

                <div className="form-group">
                    <label>Obrázky (Nahrajte jeden alebo viac) <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        style={{ border: '1px dashed #ccc', padding: '2rem', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}
                    />

                    {mediaItems.length > 0 && (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                            {mediaItems.map((item, idx) => (
                                <div key={idx} style={{ position: 'relative' }}>
                                    <img src={item.url} alt={`Preview ${idx}`} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        style={{
                                            position: 'absolute', top: -5, right: -5,
                                            background: 'red', color: 'white', border: 'none',
                                            borderRadius: '50%', width: '20px', height: '20px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                        }}
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label>Popis <span style={{ color: 'red' }}>*</span></label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="4" />
                </div>

                <button type="submit" className="btn-add">Uložiť produkt</button>
            </form>
        </div>
    );
};

export default ProductForm;
