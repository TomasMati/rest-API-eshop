import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Truck, CreditCard, Banknote, Package } from 'lucide-react';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import '../components/checkout/Checkout.css';

const CheckoutShipping = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve shipping info from previous step
    const shippingInfo = location.state?.shippingInfo;

    const [shippingMethod, setShippingMethod] = useState(location.state?.initialShipping || 'courier');
    const [paymentMethod, setPaymentMethod] = useState(location.state?.initialPayment || 'card');

    const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const shippingOptions = {
        courier: { id: 'courier', name: 'Kuriér na adresu', price: 5.00, icon: <Truck size={24} /> },
        packeta: { id: 'packeta', name: 'Packeta / Zásielkovňa', price: 3.50, icon: <Package size={24} /> },
        pickup: { id: 'pickup', name: 'Osobný odber (Bratislava)', price: 0.00, icon: <Truck size={24} /> } // Reused truck or store icon
    };

    const paymentOptions = {
        card: { id: 'card', name: 'Platba kartou online', price: 0.00, icon: <CreditCard size={24} /> },
        transfer: { id: 'transfer', name: 'Bankový prevod', price: 0.00, icon: <Banknote size={24} /> },
        cod: { id: 'cod', name: 'Dobierka', price: 1.00, icon: <Banknote size={24} /> }
    };

    const shippingPrice = shippingOptions[shippingMethod].price;
    const paymentPrice = paymentOptions[paymentMethod].price;
    const finalTotal = cartTotal + shippingPrice + paymentPrice;

    useEffect(() => {
        if (!shippingInfo) {
            // Redirect back if accessed directly without info
            // navigate('/checkout/info'); 
            // Commented out during dev to avoid annoyance, usually uncomment for prod
        }
    }, [shippingInfo, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Submit clicked!');
        console.log('shippingInfo:', shippingInfo);
        console.log('cartItems:', cartItems);

        // If no shipping info (page refresh), redirect back
        if (!shippingInfo) {
            alert('Chýbajú dodacie údaje. Presmerujem vás späť.');
            navigate('/checkout/info');
            return;
        }

        const checkoutData = {
            shippingInfo,
            shippingMethod: {
                id: shippingOptions[shippingMethod].id,
                name: shippingOptions[shippingMethod].name,
                price: shippingOptions[shippingMethod].price
            },
            paymentMethod: {
                id: paymentOptions[paymentMethod].id,
                name: paymentOptions[paymentMethod].name,
                price: paymentOptions[paymentMethod].price
            },
            totalPrice: finalTotal
        };

        console.log('Navigating to summary with:', checkoutData);
        navigate('/checkout/summary', { state: { checkoutData } });
    };

    return (
        <div className="checkout-container">
            <CheckoutSteps currentStep={3} />

            <div className="checkout-grid" style={{ gridTemplateColumns: '1fr' }}> {/* Keeping it simple for now, can be 2 cols later */}
                <form onSubmit={handleSubmit}>

                    {/* Shipping Section */}
                    <div className="form-section">
                        <h2 className="section-title">Spôsob dopravy</h2>
                        <div className="options-grid">
                            {Object.values(shippingOptions).map(option => (
                                <label
                                    key={option.id}
                                    className={`option-card ${shippingMethod === option.id ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value={option.id}
                                        checked={shippingMethod === option.id}
                                        onChange={() => setShippingMethod(option.id)}
                                        className="option-radio"
                                    />
                                    <div className="option-icon">{option.icon}</div>
                                    <div className="option-details">
                                        <span className="option-name">{option.name}</span>
                                        <span className="option-price">
                                            {option.price === 0 ? 'Zadarmo' : `+${option.price.toFixed(2)} €`}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="form-section">
                        <h2 className="section-title">Spôsob platby</h2>
                        <div className="options-grid">
                            {Object.values(paymentOptions).map(option => (
                                <label
                                    key={option.id}
                                    className={`option-card ${paymentMethod === option.id ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={option.id}
                                        checked={paymentMethod === option.id}
                                        onChange={() => setPaymentMethod(option.id)}
                                        className="option-radio"
                                    />
                                    <div className="option-icon">{option.icon}</div>
                                    <div className="option-details">
                                        <span className="option-name">{option.name}</span>
                                        <span className="option-price">
                                            {option.price === 0 ? 'Zadarmo' : `+${option.price.toFixed(2)} €`}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Live Summary */}
                    <div className="order-summary-box">
                        <h3>Zhrnutie objednávky</h3>
                        <div className="summary-row">
                            <span>Tovar</span>
                            <span>{cartTotal.toFixed(2)} €</span>
                        </div>
                        <div className="summary-row">
                            <span>Doprava: {shippingOptions[shippingMethod].name}</span>
                            <span>{shippingPrice === 0 ? 'Zadarmo' : `${shippingPrice.toFixed(2)} €`}</span>
                        </div>
                        <div className="summary-row">
                            <span>Platba: {paymentOptions[paymentMethod].name}</span>
                            <span>{paymentPrice === 0 ? 'Zadarmo' : `${paymentPrice.toFixed(2)} €`}</span>
                        </div>
                        <div className="summary-divider"></div>
                        <div className="summary-row total">
                            <span>Spolu k úhrade</span>
                            <span>{finalTotal.toFixed(2)} €</span>
                        </div>
                    </div>

                    <div className="checkout-actions">
                        <button type="button" className="btn-back" onClick={() => navigate('/checkout/info')}>
                            <ArrowLeft size={18} /> Späť na údaje
                        </button>
                        <button type="submit" className="btn-next">
                            Skontrolovať údaje <ArrowRight size={18} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutShipping;
