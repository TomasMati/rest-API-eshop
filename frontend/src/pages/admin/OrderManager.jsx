import { useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

const OrderManager = () => {
    const { orders, fetchOrders } = useData();
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h1>Objednávky</h1>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Číslo objednávky</th>
                        <th>ID používateľa</th>
                        <th>Dátum</th>
                        <th>Spolu</th>
                        <th>Stav</th>
                        <th>Akcie</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.userId}</td>
                            <td>{formatDate(order.date)}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                                <span style={{
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '4px',
                                    background: order.status === 'Completed' || order.status === 'Delivered' ? '#c8f7c5' :
                                        order.status === 'Processing' ? '#ffeaa7' : '#eee',
                                    fontSize: '0.85rem'
                                }}>
                                    {order.status}
                                </span>
                            </td>
                            <td>
                                <button className="action-btn edit" onClick={() => navigate(`/admin/orders/${order.id}`)}>
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

export default OrderManager;
