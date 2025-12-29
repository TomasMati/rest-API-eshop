import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../components/product/Product.css';
import ReviewList from '../components/reviews/ReviewList';
import ReviewForm from '../components/reviews/ReviewForm';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { products, getReviews, addReview } = useData();
    const { user } = useAuth(); // Get logged in user

    const product = products.find(p => p.id === parseInt(id));
    const [selectedImage, setSelectedImage] = useState(null);
    const [reviews, setReviews] = useState([]);

    // Fetch reviews when product loads
    useEffect(() => {
        const loadReviews = async () => {
            if (id) {
                try {
                    const data = await getReviews(id);
                    setReviews(data);
                } catch (e) {
                    console.error("Failed to load reviews", e);
                }
            }
        };
        loadReviews();
    }, [id, getReviews]);

    if (!product) {
        return <div className="p-8">Product not found</div>;
    }

    // Determine images to show
    let images = [];
    let parsedImages = product.images;
    if (typeof product.images === 'string') {
        try {
            parsedImages = JSON.parse(product.images);
        } catch (e) {
            parsedImages = [];
        }
    }

    if (parsedImages && Array.isArray(parsedImages) && parsedImages.length > 0) {
        images = parsedImages;
    } else if (product.image) {
        images = [product.image];
    }

    const getImageUrl = (url) => {
        if (!url) return 'https://via.placeholder.com/400';
        if (url.startsWith('http')) return url;
        return `http://${window.location.hostname}:8081${url}`;
    };

    const currentImage = selectedImage || images[0];

    const handleBreadcrumbClick = (type, value) => {
        navigate('/', { state: { category: { type, value } } });
    };

    const handleAddReview = async (reviewData) => {
        if (!user) {
            alert("Na pridanie recenzie musíte byť prihlásený.");
            navigate('/login');
            return;
        }
        try {
            // reviewData is { text, rating }
            const newReview = await addReview(id, user.id, reviewData.text, reviewData.rating);
            setReviews([...reviews, newReview]);
        } catch (e) {
            console.error("Failed to add review", e);
            alert("Nepodarilo sa pridať recenziu.");
        }
    };

    return (
        <div className="product-detail-container">
            <nav className="breadcrumbs" style={{ padding: '1rem 0', marginBottom: '1rem', color: '#666' }}>
                <span
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer', hover: { textDecoration: 'underline' } }}
                >
                    Home
                </span>
                {' / '}
                <span
                    onClick={() => handleBreadcrumbClick('main', product.category)}
                    style={{ cursor: 'pointer', fontWeight: 500 }}
                >
                    {product.category}
                </span>
                {' / '}
                <span
                    onClick={() => handleBreadcrumbClick('sub', product.subcategory)}
                    style={{ cursor: 'pointer', color: '#000' }}
                >
                    {product.subcategory}
                </span>
            </nav>

            <div className="product-detail-grid">
                <div className="product-images">
                    <div className="main-image">
                        <img src={getImageUrl(currentImage)} alt={product.name} referrerPolicy="no-referrer" />
                    </div>
                    {images.length > 1 && (
                        <div className="image-thumbnails">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={getImageUrl(img)}
                                    alt={`Thumbnail ${index}`}
                                    className={`thumbnail ${currentImage === img ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="product-info">
                    <h1>{product.name}</h1>
                    <div className="product-meta">
                        <span className="category-tag">{product.category} / {product.subcategory}</span>
                        {product.catalogNumber && (
                            <span style={{ marginLeft: '1rem', color: '#666' }}>Kat. č.: {product.catalogNumber}</span>
                        )}
                    </div>

                    {product.availability && (
                        <div style={{
                            display: 'inline-block',
                            marginTop: '0.5rem',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            background: product.availability === 'Skladom' ? '#e8f5e9' : '#fff3e0',
                            color: product.availability === 'Skladom' ? '#2e7d32' : '#e65100',
                            fontWeight: 'bold',
                            fontSize: '0.9rem'
                        }}>
                            {product.availability}
                            {product.availability === 'Na objednávku' && <span style={{ fontWeight: 'normal', marginLeft: '5px' }}>(Dodanie do 10 dní)</span>}
                        </div>
                    )}

                    {/* Display Average Rating */}
                    <div className="product-rating-large" style={{ marginTop: '0.5rem', marginBottom: '1rem', fontSize: '1.2rem', color: '#f39c12' }}>
                        {'⭐'.repeat(Math.round(product.rating || 0))} <span style={{ color: '#666', fontSize: '0.9rem' }}>({product.reviewCount || 0} hodnotení)</span>
                    </div>

                    <p className="price">${product.price.toFixed(2)}</p>
                    <p className="description">
                        {product.description || 'No description available.'}
                    </p>

                    <button className="btn-add-cart-large" onClick={() => addToCart(product)}>
                        <ShoppingCart size={24} /> Pridať do košíka
                    </button>
                </div>
            </div>

            <div className="reviews-section" style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid #eee' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                    <div>
                        <ReviewList reviews={reviews} />
                    </div>
                    <div>
                        <ReviewForm onSubmit={handleAddReview} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
