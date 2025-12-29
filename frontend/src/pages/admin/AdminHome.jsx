import { useEffect } from 'react';
import { useData } from '../../context/DataContext';

const AdminHome = () => {
    const { products, orders, users, fetchUsers, fetchOrders } = useData();

    useEffect(() => {
        fetchUsers();
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Prehľad</h1>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Celkom produktov</h3>
                    <p>{products.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Celkom objednávok</h3>
                    <p>{orders.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Celkom používateľov</h3>
                    <p>{users.length}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
