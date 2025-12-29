import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import '../components/checkout/Checkout.css';
import '../components/checkout/CheckoutSummary.css';

const CheckoutSummary = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const { addOrder } = useData();
    const navigate = useNavigate();
    const location = useLocation();

    const checkoutData = location.state?.checkoutData;

    useEffect(() => {
        if (!checkoutData) {
            // Redirect if accessed directly without data
            navigate('/cart');
        }
    }, [checkoutData, navigate]);

    if (!checkoutData) return null;

    const { shippingInfo, shippingMethod, paymentMethod, totalPrice } = checkoutData;

    const handleConfirmOrder = async () => {
        try {
            // Create order object matching Backend Entity
            const newOrder = {
                userId: user?.id || null, // Can be null for guest
                customerName: shippingInfo.name,
                email: shippingInfo.email, // Required
                phone: shippingInfo.phone,
                address: `${shippingInfo.street}, ${shippingInfo.zip} ${shippingInfo.city}, ${shippingInfo.country}`,
                street: shippingInfo.street,
                city: shippingInfo.city,
                zip: shippingInfo.zip,
                country: shippingInfo.country,
                shippingMethod: shippingMethod.name,
                shippingCost: shippingMethod.price,
                paymentMethod: paymentMethod.name,
                paymentCost: paymentMethod.price,
                total: totalPrice,
                status: 'PENDING',
                // Backend expects list of OrderItem entities
                items: cartItems.map(item => ({
                    productId: item.id,
                    productName: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    image: getDisplayImage(item) // Send resolved image URL
                }))
            };

            const createdOrder = await addOrder(newOrder);
            clearCart();
            navigate('/checkout/success', { state: { order: createdOrder } }); // Pass full order object
        } catch (error) {
            console.error("Order failed", error);
            alert("Nepodarilo sa vytvoriť objednávku. Skúste znova.");
        }
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const getDisplayImage = (item) => {
        let imageUrl = null;
        if (item.images) {
            try {
                const parsed = typeof item.images === 'string' ? JSON.parse(item.images) : item.images;
                if (Array.isArray(parsed) && parsed.length > 0) imageUrl = parsed[0];
            } catch (e) {
                console.error("Failed to parse images", e);
            }
        }
        if (!imageUrl && item.image) imageUrl = item.image;
        if (!imageUrl) return 'https://via.placeholder.com/100';

        if (imageUrl.startsWith('http')) return imageUrl;
        return `http://${window.location.hostname}:8081${imageUrl}`;
    };

    return (
        <div className="checkout-container">
            <CheckoutSteps currentStep={4} />

            <div className="summary-layout">
                {/* Order Items */}
                <div className="summary-section">
                    <h2 className="section-title">
                        <Package size={20} style={{ marginRight: '0.5rem' }} />
                        Vaše produkty
                    </h2>
                    <div className="order-items-list">
                        {cartItems.map(item => (
                            <div key={item.id} className="summary-item">
                                <img src={getDisplayImage(item)} alt={item.name} className="summary-item-image" referrerPolicy="no-referrer" />
                                <div className="summary-item-details">
                                    <span className="summary-item-name">{item.name}</span>
                                    <span className="summary-item-quantity">Množstvo: {item.quantity}</span>
                                </div>
                                <span className="summary-item-price">{(item.price * item.quantity).toFixed(2)} €</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Delivery Info */}
                <div className="summary-section">
                    <h2 className="section-title">
                        <Truck size={20} style={{ marginRight: '0.5rem' }} />
                        Dodacie údaje
                    </h2>
                    <div className="info-box">
                        <p><strong>{shippingInfo.name}</strong></p>
                        <p>{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                        <p style={{ marginTop: '1rem' }}>
                            {shippingInfo.street}<br />
                            {shippingInfo.zip} {shippingInfo.city}<br />
                            {shippingInfo.country}
                        </p>
                    </div>
                </div>

                {/* Shipping & Payment */}
                <div className="summary-section">
                    <h2 className="section-title">
                        <CreditCard size={20} style={{ marginRight: '0.5rem' }} />
                        Doprava a platba
                    </h2>
                    <div className="info-box">
                        <div className="summary-row">
                            <span>Doprava:</span>
                            <span><strong>{shippingMethod.name}</strong> ({shippingMethod.price === 0 ? 'Zadarmo' : `${shippingMethod.price.toFixed(2)} €`})</span>
                        </div>
                        <div className="summary-row" style={{ marginTop: '0.5rem' }}>
                            <span>Platba:</span>
                            <span><strong>{paymentMethod.name}</strong> ({paymentMethod.price === 0 ? 'Zadarmo' : `${paymentMethod.price.toFixed(2)} €`})</span>
                        </div>
                    </div>
                </div>

                {/* Final Total */}
                <div className="order-summary-box">
                    <h3>Celková suma</h3>
                    <div className="summary-row">
                        <span>Produkty</span>
                        <span>{cartTotal.toFixed(2)} €</span>
                    </div>
                    <div className="summary-row">
                        <span>Doprava</span>
                        <span>{shippingMethod.price === 0 ? 'Zadarmo' : `${shippingMethod.price.toFixed(2)} €`}</span>
                    </div>
                    <div className="summary-row">
                        <span>Platba</span>
                        <span>{paymentMethod.price === 0 ? 'Zadarmo' : `${paymentMethod.price.toFixed(2)} €`}</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                        <span>Spolu k úhrade</span>
                        <span>{totalPrice.toFixed(2)} €</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="checkout-actions">
                    <button type="button" className="btn-back" onClick={() => navigate('/checkout/shipping', {
                        state: {
                            shippingInfo,
                            initialShipping: shippingMethod.id,
                            initialPayment: paymentMethod.id
                        }
                    })}>
                        <ArrowLeft size={18} /> Späť na dopravu
                    </button>
                    <button type="button" className="btn-confirm" onClick={handleConfirmOrder}>
                        <CheckCircle size={18} /> Potvrdiť objednávku
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSummary;
