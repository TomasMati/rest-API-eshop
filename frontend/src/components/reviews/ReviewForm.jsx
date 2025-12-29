import { useState } from 'react';
import { Star } from 'lucide-react';

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(5);
    const [text, setText] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ rating, text });
        setText('');
        setRating(5);
    };

    return (
        <div className="review-form" style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Pridať recenziu</h3>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Vaše hodnotenie</label>
                    <div style={{ display: 'flex', gap: '0.25rem', cursor: 'pointer' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={24}
                                fill={(hoverRating || rating) >= star ? '#f39c12' : 'none'}
                                color={(hoverRating || rating) >= star ? '#f39c12' : '#ccc'}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Váš komentár</label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                        placeholder="Napíšte nám, ako ste boli spokojní s produktom..."
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: '#222',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 500
                    }}
                >
                    Odoslať recenziu
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
