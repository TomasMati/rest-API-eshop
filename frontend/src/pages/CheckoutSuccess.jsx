import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Home, Package } from 'lucide-react';
import '../components/checkout/Checkout.css';
import '../components/checkout/CheckoutSummary.css';

const CheckoutSuccess = () => {
    const location = useLocation();
    // Retrieve full order object if passed, or just ID fallback
    const order = location.state?.order;
    const orderId = order?.id || location.state?.orderId;
    const email = order?.email || "váš email";
    const name = order?.customerName || "";

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="checkout-container">
            <div className="success-page">
                <div className="success-icon">
                    <CheckCircle size={80} color="#059669" />
                </div>
                <h1 className="success-title">Ďakujeme za objednávku, {name}!</h1>
                <p className="success-message">
                    Vaša objednávka bola úspešne prijatá a spracováva sa.
                </p>
                {orderId && (
                    <div className="order-number">
                        <span>Číslo objednávky: <strong>#{orderId}</strong></span>
                    </div>
                )}
                <p className="success-info">
                    Potvrdenie objednávky sme odoslali na <strong>{email}</strong>.<br />
                    Budeme vás informovať o stave vašej objednávky.
                </p>

                <div className="success-actions">
                    <Link to="/" className="btn-home">
                        <Home size={18} /> Späť na hlavnú stránku
                    </Link>
                    <Link to="/profile/orders" className="btn-orders">
                        <Package size={18} /> Moje objednávky
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
