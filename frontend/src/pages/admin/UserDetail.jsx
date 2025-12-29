import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ArrowLeft, User, Mail, Shield, Lock, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

const UserDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { users, updateUser } = useData();
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const foundUser = users.find(u => u.id === parseInt(id));
        if (foundUser) {
            setUser(foundUser);
            setRole(foundUser.role);
        }
    }, [id, users]);

    const handleSave = () => {
        setIsSaving(true);
        updateUser(user.id, { role });
        // Simulate API delay
        setTimeout(() => {
            setIsSaving(false);
            navigate('/admin/users');
        }, 500);
    };

    if (!user) {
        return <div className="p-8">Používateľ nenájdený</div>;
    }

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#666', textDecoration: 'none' }}>
                        <ArrowLeft size={16} /> Späť na používateľov
                    </Link>
                    <h1>Detail používateľa</h1>
                </div>
            </div>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', maxWidth: '600px' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#888', fontSize: '0.9rem' }}>ID používateľa</label>
                        <div style={{ fontWeight: '500' }}>#{user.id}</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#888', fontSize: '0.9rem' }}>Meno</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                            <User size={20} color="#555" />
                            {user.name}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#888', fontSize: '0.9rem' }}>Email</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                            <Mail size={20} color="#555" />
                            {user.email}
                        </div>
                    </div>



                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ color: '#888', fontSize: '0.9rem' }}>Rola</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Shield size={20} color="#555" />
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    fontSize: '1rem',
                                    width: '100%'
                                }}
                            >
                                <option value="user">Používateľ</option>
                                <option value="admin">Administrátor</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: '#222',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 1.5rem',
                                borderRadius: '4px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                opacity: isSaving ? 0.7 : 1
                            }}
                        >
                            <Save size={18} />
                            {isSaving ? 'Ukladá sa...' : 'Uložiť zmeny'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
