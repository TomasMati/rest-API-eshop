import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (register(name, email, password, phone)) {
            navigate('/');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Registrácia</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Meno</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Telefón (voliteľné)</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+421900000000"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Zadajte platný email (napr. meno@domena.sk)"
                        />
                    </div>
                    <div className="form-group">
                        <label>Heslo</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={4}
                            title="Heslo musí mať aspoň 4 znaky"
                        />
                    </div>
                    <button type="submit" className="btn-auth">Zaregistrovať sa</button>
                </form>
                <p className="auth-link">
                    Už máte účet? <Link to="/login">Prihlásiť sa</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
