import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { formatDate } from '../utils/formatDate';

const UserOrders = () => {
    const { user } = useAuth();
    const { orders } = useData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    const userOrders = orders.filter(o => o.userId === user.id);

    return (
        <div className="profile-container" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
            <h1>Moje Objednávky</h1>
            <div className="orders-list" style={{ marginTop: '2rem' }}>
                {userOrders.length === 0 ? (
                    <p>Zatiaľ nemáte žiadne objednávky.</p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {userOrders.map(order => (
                            <div key={order.id} style={{ border: '1px solid #eee', padding: '1.5rem', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <span style={{ fontWeight: '600' }}>Objednávka #{order.id}</span>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.85rem',
                                        backgroundColor: order.status === 'Completed' ? '#d1fae5' : '#fff3cd',
                                        color: order.status === 'Completed' ? '#065f46' : '#856404'
                                    }}>
                                        {order.status}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                                    Dátum: {formatDate(order.date)}
                                </div>
                                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                                    Adresa: {order.address}
                                </div>
                                <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                                    Suma: ${order.total.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserOrders;
