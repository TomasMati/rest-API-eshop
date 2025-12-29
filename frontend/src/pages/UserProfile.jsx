import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Package, Settings, UserX, Save, LogOut } from 'lucide-react';
import '../components/product/Product.css'; // Reusing some button styles for consistency

const UserProfile = () => {
    const { user, logout, setUser } = useAuth();
    const { orders, updateUser, deleteUser } = useData();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Determine active tab from URL or default to 'orders'
    const activeTab = searchParams.get('tab') || 'orders';

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: user?.address || '',
        password: user?.password || ''
    });

    const [message, setMessage] = useState(null);

    if (!user) {
        navigate('/login');
        return null; // Or return loading
    }

    const userOrders = orders.filter(o => o.userId === user.id);

    const handleTabChange = (tab) => {
        setSearchParams({ tab });
        setMessage(null);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateUser(user.id, formData);
        // Update local auth state too so UI reflects changes immediately
        setUser({ ...user, ...formData });
        setMessage({ type: 'success', text: 'Údaje boli úspešne uložené.' });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleDeleteAccount = () => {
        if (window.confirm('Naozaj chcete natrvalo zrušiť svoj účet? Táto akcia je nevratná!')) {
            deleteUser(user.id);
            logout();
            navigate('/');
        }
    };

    return (
        <div className="profile-container" style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
            <h1>Môj Profil</h1>

            <div className="profile-tabs" style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #ddd', marginBottom: '2rem' }}>
                <button
                    className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                    onClick={() => handleTabChange('orders')}
                    style={{
                        padding: '1rem',
                        border: 'none',
                        background: 'none',
                        borderBottom: activeTab === 'orders' ? '2px solid #222' : 'none',
                        fontWeight: activeTab === 'orders' ? '600' : '400',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Package size={20} /> Objednávky
                </button>
                <button
                    className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => handleTabChange('settings')}
                    style={{
                        padding: '1rem',
                        border: 'none',
                        background: 'none',
                        borderBottom: activeTab === 'settings' ? '2px solid #222' : 'none',
                        fontWeight: activeTab === 'settings' ? '600' : '400',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <Settings size={20} /> Nastavenia
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'orders' && (
                    <div className="orders-list">
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
                                            Dátum: {order.date}
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
                )}

                {activeTab === 'settings' && (
                    <div className="settings-form">
                        {message && (
                            <div style={{
                                padding: '1rem',
                                backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                                color: message.type === 'success' ? '#065f46' : '#991b1b',
                                marginBottom: '1rem',
                                borderRadius: '6px'
                            }}>
                                {message.text}
                            </div>
                        )}
                        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label>Meno</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label>Adresa</label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Zadajte vašu adresu"
                                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label>Heslo</label>
                                <input
                                    type="text"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>

                            <button type="submit" className="btn-add-cart-large" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Save size={20} /> Uložiť zmeny
                            </button>
                        </form>

                        <div style={{ marginTop: '4rem', padding: '2rem', border: '1px solid #fee2e2', borderRadius: '8px', backgroundColor: '#fff5f5' }}>
                            <h3 style={{ color: '#991b1b', marginTop: 0 }}>Nebezpečná zóna</h3>
                            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                                Ak zrušíte svoj účet, všetky vaše údaje a história objednávok budú natrvalo vymazané.
                            </p>
                            <button
                                onClick={handleDeleteAccount}
                                style={{
                                    backgroundColor: '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontWeight: '600'
                                }}
                            >
                                <UserX size={18} /> Zrušiť účet
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
