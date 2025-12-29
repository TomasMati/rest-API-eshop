import { Star, User } from 'lucide-react';
import React from 'react';

const ReviewList = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return <p style={{ color: '#666' }}>Tento produkt zatiaľ nemá žiadne recenzie.</p>;
    }

    return (
        <div className="review-list">
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recenzie zákazníkov</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {reviews.map((review) => (
                    <div key={review.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                                <div style={{ background: '#eee', padding: '0.2rem', borderRadius: '50%' }}>
                                    <User size={16} />
                                </div>
                                {review.user?.name || review.userName || 'Anonym'}
                            </div>
                            <span style={{ fontSize: '0.85rem', color: '#999' }}>
                                {new Date(review.date).toLocaleDateString()}
                            </span>
                        </div>
                        <div style={{ color: '#f39c12', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            {'⭐'.repeat(review.rating)}
                        </div>
                        <p style={{ color: '#555', lineHeight: '1.5' }}>{review.text || review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewList;
