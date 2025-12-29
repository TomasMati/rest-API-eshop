import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const success = await login(email, password);
            if (success) {
                navigate('/');
            } else {
                setError('Neplatný email alebo heslo');
            }
        } catch (err) {
            console.error("Login handling error", err);
            setError('Chyba prihlásenia');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Prihlásenie</h2>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Heslo</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div style={{ textAlign: 'right', marginTop: '0.25rem' }}>
                            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: '#666' }}>Zabudli ste heslo?</Link>
                        </div>
                    </div>
                    <button type="submit" className="btn-auth">Prihlásiť sa</button>
                </form>
                <p className="auth-link">
                    Nemáte účet? <Link to="/register">Zaregistrovať sa</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
