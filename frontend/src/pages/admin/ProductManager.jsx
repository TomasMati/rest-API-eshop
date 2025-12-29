import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductManager = () => {
    const { products, deleteProduct } = useData();
    const navigate = useNavigate();

    return (
        <div>
            <div className="admin-header">
                <h1>Produkty</h1>
                <button className="btn-add" onClick={() => navigate('/admin/products/new')}>
                    <Plus size={16} /> Pridať produkt
                </button>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Názov</th>
                        <th>Kategória</th>
                        <th>Cena</th>
                        <th>Akcie</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>
                                <button
                                    className="action-btn edit"
                                    title="Upraviť"
                                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    className="action-btn delete"
                                    title="Vymazať"
                                    onClick={() => {
                                        if (window.confirm('Naozaj chcete vymazať?')) deleteProduct(product.id);
                                    }}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductManager;
