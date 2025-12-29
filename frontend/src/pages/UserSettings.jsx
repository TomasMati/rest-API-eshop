import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Save, UserX } from 'lucide-react';
import '../components/product/Product.css';

const UserSettings = () => {
    const { user, logout, setUser } = useAuth();
    const { updateUser, deleteUser } = useData();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        street: user?.street || '',
        city: user?.city || '',
        zip: user?.zip || '',
        country: user?.country || '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState(null);

    if (!user) {
        return null;
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        setMessage(null);

        // Password validation
        if (formData.password || formData.confirmPassword) {
            if (formData.password !== formData.confirmPassword) {
                setMessage({ type: 'error', text: 'Heslá sa nezhodujú.' });
                return;
            }
        }

        const updates = {
            name: formData.name,
            email: formData.email,
            street: formData.street,
            city: formData.city,
            zip: formData.zip,
            country: formData.country,
        };

        // Only update password if provided
        if (formData.password) {
            updates.password = formData.password;
        }

        updateUser(user.id, updates);

        // Update local auth state - maintain data consistency
        // If password was updated, we update it in auth too, otherwise keep old
        const updatedUser = { ...user, ...updates };
        // We know what the old password was in 'user.password', but if we didn't change it, we rely on ...user

        setUser(updatedUser);

        // Clear password fields for security
        setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
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
            <h1>Nastavenia Profilu</h1>

            <div className="settings-form" style={{ marginTop: '2rem' }}>
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
                        <label>Ulica a číslo</label>
                        <input
                            type="text"
                            value={formData.street}
                            onChange={e => setFormData({ ...formData, street: e.target.value })}
                            placeholder="Napr. Hlavná 123"
                            style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label>Mesto</label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label>PSČ</label>
                            <input
                                type="text"
                                value={formData.zip}
                                onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                        </div>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Krajina</label>
                        <input
                            type="text"
                            value={formData.country}
                            onChange={e => setFormData({ ...formData, country: e.target.value })}
                            style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Heslo (vyplňte iba ak chcete zmeniť)</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Nové heslo"
                            style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px' }}
                        />
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label>Zopakujte heslo</label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Potvrdenie nového hesla"
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
                            fontWeight: '600',
                            width: '100%',
                            justifyContent: 'center'
                        }}
                    >
                        <UserX size={18} /> Zrušiť účet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserSettings;
