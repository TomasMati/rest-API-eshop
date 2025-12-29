import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Product.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation if clicking the button
        addToCart(product);
    };

    // Helper to extract the first image and resolve URL
    const getDisplayImage = () => {
        let imageUrl = null;

        // Try to parse 'images' JSON string
        if (product.images) {
            try {
                const parsed = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
                if (Array.isArray(parsed) && parsed.length > 0) {
                    imageUrl = parsed[0];
                }
            } catch (e) {
                console.error("Failed to parse product images", e);
            }
        }

        // Fallback to legacy 'image' field
        if (!imageUrl && product.image) {
            imageUrl = product.image;
        }

        // Return placeholder if still null
        if (!imageUrl) {
            return 'https://via.placeholder.com/300';
        }

        // Resolve Path
        if (imageUrl.startsWith('http')) {
            return imageUrl;
        }
        return `http://${window.location.hostname}:8081${imageUrl}`;
    };

    return (
        <Link to={`/product/${product.id}`} className="product-card-link">
            <div className="product-card">
                <div className="product-image-container">
                    <img
                        src={getDisplayImage()}
                        alt={product.name}
                        className="product-image"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <div className="product-info">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span className="product-category">{product.category}</span>
                        {product.availability && (
                            <span style={{
                                fontSize: '0.7rem',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                background: product.availability === 'Skladom' ? '#e8f5e9' : '#fff3e0',
                                color: product.availability === 'Skladom' ? '#2e7d32' : '#e65100',
                                fontWeight: 500
                            }}>
                                {product.availability}
                            </span>
                        )}
                    </div>
                    <h3 className="product-title">{product.name}</h3>
                    {product.catalogNumber && (
                        <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '4px' }}>
                            Kat. č.: {product.catalogNumber}
                        </div>
                    )}
                    <div className="product-rating">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.round(product.rating) ? "#facc15" : "none"}
                                color={i < Math.round(product.rating) ? "#facc15" : "#d1d5db"}
                            />
                        ))}
                        <span className="review-count">({product.reviewCount})</span>
                    </div>
                    <div className="product-bottom">
                        <span className="product-price">${product.price.toFixed(2)}</span>
                        <button className="btn-add-cart" onClick={handleAddToCart}>
                            <ShoppingCart size={18} />
                            Kúpiť
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
