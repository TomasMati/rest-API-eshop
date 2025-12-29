import { useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserManager = () => {
    const { users, fetchUsers } = useData();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Používatelia</h1>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Meno</th>
                        <th>Email</th>
                        <th>Rola</th>
                        <th>Akcie</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Mail size={14} /> {user.email}
                                </div>
                            </td>
                            <td>
                                <span style={{
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '12px',
                                    background: user.role === 'admin' ? '#ffeaa7' : '#dfe6e9',
                                    fontSize: '0.85rem'
                                }}>
                                    {user.role}
                                </span>
                            </td>
                            <td>
                                <button
                                    className="action-btn edit"
                                    onClick={() => navigate(`/admin/users/${user.id}`)}
                                >
                                    Zobraziť detail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManager;
