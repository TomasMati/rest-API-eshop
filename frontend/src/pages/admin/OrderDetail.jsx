import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, User, MapPin, Package } from 'lucide-react';
import { useState, useEffect } from 'react';

const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { orders, users, products, updateOrder } = useData();
    const [status, setStatus] = useState('');

    const order = orders.find(o => o.id === parseInt(id));

    useEffect(() => {
        if (order) setStatus(order.status);
    }, [order]);

    if (!order) return <div>Objednávka nenájdená</div>;

    const user = users.find(u => u.id === order.userId) || { name: 'Neznámy používateľ', email: 'N/A' };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        updateOrder(order.id, { status: newStatus });
    };

    const getProductDetails = (itemId) => {
        return products.find(p => p.id === itemId) || { name: 'Neznámy produkt', image: null };
    };

    return (
        <div>
            <button onClick={() => navigate('/admin/orders')} className="action-btn" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', color: '#666' }}>
                <ArrowLeft size={16} /> Späť na objednávky
            </button>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Objednávka #{order.id}</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ fontWeight: 500 }}>Stav:</span>
                    <select
                        value={status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="sort-select"
                        style={{ padding: '0.5rem' }}
                    >
                        <option value="Processing">Spracúva sa</option>
                        <option value="Shipped">Odoslané</option>
                        <option value="Delivered">Doručené</option>
                        <option value="Cancelled">Zrušené</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div className="stat-card">
                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                        <User size={16} style={{ marginBottom: '-2px' }} /> Údaje zákazníka
                    </h3>
                    <p style={{ fontSize: '1rem', fontWeight: 'normal' }}>
                        <strong>Meno:</strong> {user.name}<br />
                        <strong>Email:</strong> {user.email}
                    </p>
                </div>
                <div className="stat-card">
                    <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                        <MapPin size={16} style={{ marginBottom: '-2px' }} /> Doručovacia adresa
                    </h3>
                    <p style={{ fontSize: '1rem', fontWeight: 'normal' }}>
                        {order.address || 'Žiadna adresa'}
                    </p>
                </div>
            </div>

            <div className="admin-table" style={{ marginTop: 0 }}>
                <h3 style={{ padding: '1rem', margin: 0, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Package size={18} /> Položky objednávky
                </h3>
                <table style={{ width: '100%' }}>
                    <thead style={{ background: '#f8f9fa' }}>
                        <tr>
                            <th style={{ padding: '1rem', textAlign: 'left' }}>Produkt</th>
                            <th style={{ padding: '1rem', textAlign: 'center' }}>Množstvo</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Cena</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Spolu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items && order.items.map((item, idx) => {
                            const product = getProductDetails(item.productId);
                            return (
                                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1rem' }}>
                                        {product.name}
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'center' }}>{item.quantity}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>${(item.quantity * item.price).toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold' }}>Celková suma:</td>
                            <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold', fontSize: '1.1rem' }}>${order.total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
