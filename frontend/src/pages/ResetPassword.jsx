import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Auth.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Heslá sa nezhodujú.' });
            return;
        }

        if (!token) {
            setMessage({ type: 'error', text: 'Chýbajúci token. Použite prosím link z emailu.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const API_URL = `http://${window.location.hostname}:8081/api/auth/reset-password`;
            await axios.post(API_URL, { token, password });
            setMessage({ type: 'success', text: 'Heslo bolo úspešne zmenené. Presmerovávam...' });
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Nastala chyba. Token môže byť neplatný alebo exspirovaný.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Nové heslo</h2>

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
                        <label>Nové heslo</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={4}
                        />
                    </div>
                    <div className="form-group">
                        <label>Potvrďte heslo</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={4}
                        />
                    </div>
                    <button type="submit" className="btn-auth" disabled={loading}>
                        {loading ? 'Ukladá sa...' : 'Zmeniť heslo'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
