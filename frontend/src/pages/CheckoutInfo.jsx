import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, LogIn } from 'lucide-react';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import '../components/checkout/Checkout.css';

const CheckoutInfo = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        zip: '',
        country: 'Slovensko'
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                street: user.street || '',
                city: user.city || '',
                zip: user.zip || '',
                country: user.country || 'Slovensko'
            }));
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we could also save to local storage or context if we wanted persistence on refresh
        navigate('/checkout/shipping', { state: { shippingInfo: formData } });
    };

    return (
        <div className="checkout-container">
            <CheckoutSteps currentStep={2} />

            {!user && (
                <div className="guest-option-card">
                    <div>
                        <h3 style={{ margin: 0, marginBottom: '0.25rem' }}>Už u nás máte účet?</h3>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Prihláste sa pre rýchlejší nákup a sledovanie objednávky.</p>
                    </div>
                    <Link to="/login" className="btn-login" style={{ textDecoration: 'none', height: 'fit-content' }}>
                        <LogIn size={18} /> Prihlásiť sa
                    </Link>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="checkout-grid">
                    <div className="form-section">
                        <h2 className="section-title">Kontaktné údaje</h2>
                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Meno a Priezvisko *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <input
                                    type="email"
                                    required
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                    title="Zadajte platný email (napr. meno@domena.sk)"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Telefónne číslo *</label>
                                <input
                                    type="tel"
                                    required
                                    pattern="[\+]?[0-9]{9,13}"
                                    title="Zadajte telefónne číslo (9-13 číslic, môže začínať +)"
                                    placeholder="+421900000000"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-section">
                        <h2 className="section-title">Adresa doručenia</h2>
                        <div className="form-group" style={{ marginBottom: '1rem' }}>
                            <label>Ulica a číslo *</label>
                            <input
                                type="text"
                                required
                                value={formData.street}
                                onChange={e => setFormData({ ...formData, street: e.target.value })}
                                placeholder="Napr. Hlavná 123"
                                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
                            />
                        </div>
                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Mesto *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
                                />
                            </div>
                            <div className="form-group">
                                <label>PSČ *</label>
                                <input
                                    type="text"
                                    required
                                    pattern="\d{3}\s?\d{2}"
                                    title="PSČ musí mať 5 číslic (napr. 04001)"
                                    placeholder="040 01"
                                    value={formData.zip}
                                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                    style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%' }}
                                />
                            </div>
                        </div>
                        <div className="form-group" style={{ marginTop: '1rem' }}>
                            <label>Krajina</label>
                            <input
                                type="text"
                                value={formData.country}
                                readOnly
                                style={{ padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', width: '100%', backgroundColor: '#f9f9f9' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="checkout-actions">
                    <button type="button" className="btn-back" onClick={() => navigate('/cart')}>
                        <ArrowLeft size={18} /> Späť do košíka
                    </button>
                    <button type="submit" className="btn-next">
                        Pokračovať na dopravu <ArrowRight size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutInfo;
