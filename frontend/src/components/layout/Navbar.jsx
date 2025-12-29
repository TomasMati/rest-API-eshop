import { ShoppingCart, LogIn, User, LogOut, Search, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import './Layout.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const { searchProducts } = useData();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        searchProducts({ search: query });
        navigate('/');
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                placeholder="Hľadať produkt..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
                <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => {
                        setQuery('');
                        searchProducts({}); // Reset search
                    }}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '5px' }}
                >
                    <X size={16} color="#666" />
                </button>
            )}
            <button type="submit">
                <Search size={18} />
            </button>
        </form>
    );
};

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo" onClick={() => {
                // Reset search when clicking logo
                const { resetSearch } = useData();
                // Note: We can't use hook inside callback, need to pull it up
            }}>
                ReactShop
            </Link>

            <SearchBar />

            <div className="navbar-actions">
                {user ? (
                    <div
                        className="user-info user-dropdown"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <span className="user-name">
                            <User size={18} /> {user.name}
                        </span>

                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-content">
                                    {(user.role === 'admin' || user.role === 'ADMIN') && (
                                        <>
                                            <Link to="/admin" className="dropdown-item">
                                                <span>Admin Panel</span>
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                        </>
                                    )}
                                    <Link to="/profile/orders" className="dropdown-item">
                                        <span>Moje objednávky</span>
                                    </Link>
                                    <Link to="/profile/settings" className="dropdown-item">
                                        <span>Nastavenia</span>
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item" onClick={logout} style={{ color: '#c53030' }}>
                                        <LogOut size={16} /> Odhlásiť sa
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button className="btn-login" onClick={handleLoginClick}>
                        <LogIn size={20} />
                        <span>Login</span>
                    </button>
                )}

                <Link to="/cart" className="cart-icon">
                    <ShoppingCart size={24} />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
