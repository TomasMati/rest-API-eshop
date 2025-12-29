import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty-container">
                <h2>Váš košík je prázdny</h2>
                <p>Zatiaľ ste nepridali žiadne produkty do košíka.</p>
                <Link to="/" className="btn-continue">
                    <ArrowLeft size={18} /> Pokračovať v nákupe
                </Link>
            </div>
        );
    }

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
        <div className="cart-container">
            <h1>Nákupný košík</h1>

            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-item">
                            <div className="cart-item-image">
                                <img src={getDisplayImage(item)} alt={item.name} referrerPolicy="no-referrer" />
                            </div>

                            <div className="cart-item-details">
                                <h3>{item.name}</h3>
                                <span className="cart-item-category">{item.category}</span>
                                <span className="cart-item-price">${item.price.toFixed(2)}</span>
                            </div>

                            <div className="cart-item-actions">
                                <div className="quantity-controls">
                                    <button
                                        className="btn-qty"
                                        onClick={() => decreaseQuantity(item.id)}
                                        disabled={item.quantity <= 1}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="qty-value">{item.quantity}</span>
                                    <button
                                        className="btn-qty"
                                        onClick={() => addToCart(item)}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    className="btn-remove"
                                    onClick={() => removeFromCart(item.id)}
                                    title="Remove item"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h2>Zhrnutie objednávky</h2>
                    <div className="summary-row">
                        <span>Medzisúčet</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                        <span>Doprava</span>
                        <span>Zadarmo</span>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total">
                        <span>Spolu</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>

                    <Link to="/checkout/info" className="btn-checkout" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                        Prejsť k pokladni
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
