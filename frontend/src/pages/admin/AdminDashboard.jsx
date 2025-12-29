import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Package, Users, ShoppingBag, LayoutGrid, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import './Admin.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'ADMIN') {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || user.role !== 'ADMIN') return null; // Or loading spinner

    return (
        <div className="admin-container">
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    <Link to="/admin"><LayoutGrid size={20} /> Prehľad</Link>
                    <Link to="/admin/products"><Package size={20} /> Produkty</Link>
                    <Link to="/admin/categories"><LayoutGrid size={20} /> Kategórie</Link>
                    <Link to="/admin/orders"><ShoppingBag size={20} /> Objednávky</Link>
                    <Link to="/admin/users"><Users size={20} /> Používatelia</Link>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <Link to="/" style={{ color: '#bdc3c7', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem' }}>
                            <ArrowLeft size={20} /> Späť do obchodu
                        </Link>
                        <button
                            onClick={logout}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#e74c3c',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                width: '100%',
                                textAlign: 'left'
                            }}
                        >
                            <LogOut size={20} /> Odhlásiť sa
                        </button>
                    </div>
                </nav>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;
