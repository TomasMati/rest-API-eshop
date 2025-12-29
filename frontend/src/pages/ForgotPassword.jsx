import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const API_URL = `http://${window.location.hostname}:8081/api/auth/forgot-password`;
            await axios.post(API_URL, { email });
            setMessage({ type: 'success', text: 'Ak účet existuje, poslali sme vám resetovací link (skontrolujte konzolu backendu).' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Nastala chyba. Skúste to znova.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Obnova hesla</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Zadajte váš email a my vám pošleme inštrukcie na obnovenie hesla.
                </p>

                {message && (
                    <div className={`auth-error`} style={{
                        backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                        color: message.type === 'success' ? '#065f46' : '#991b1b',
                        borderColor: message.type === 'success' ? '#a7f3d0' : '#fecaca'
                    }}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="vas@email.com"
                        />
                    </div>
                    <button type="submit" className="btn-auth" disabled={loading}>
                        {loading ? 'Odosiela sa...' : 'Odoslať'}
                    </button>
                </form>

                <div className="auth-link" style={{ marginTop: '1.5rem' }}>
                    <Link to="/login">Späť na prihlásenie</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
