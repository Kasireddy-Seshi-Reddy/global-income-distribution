import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Sun, Moon, Menu, X, User, Globe } from 'lucide-react';
import ProfileModal from './ProfileModal';
import './Navbar.css';

const Navbar = ({ isInitialLoad }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { isAuthenticated, user } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    // Animation specific
    const logoRef = useRef(null);
    const [offsetReady, setOffsetReady] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);

        if (isInitialLoad && logoRef.current) {
            const rect = logoRef.current.getBoundingClientRect();
            setOffset({
                x: (window.innerWidth / 2) - (rect.left + rect.width / 2),
                y: (window.innerHeight / 2) - (rect.top + rect.height / 2)
            });
            setOffsetReady(true);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isInitialLoad]);

    const closeMenu = () => setMobileMenuOpen(false);

    const handleHomeClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        closeMenu();
    };

    return (
        <nav className={`navbar ${scrolled ? 'glass-panel scrolled' : ''} ${isInitialLoad ? 'initial-load' : ''}`}>
            <div className="container nav-container">
                <Link
                    ref={logoRef}
                    to="/"
                    className={`nav-logo ${(isInitialLoad && offsetReady) ? 'logo-entrance' : ''}`}
                    onClick={closeMenu}
                    style={isInitialLoad ? {
                        '--move-x': `${offset.x}px`,
                        '--move-y': `${offset.y}px`,
                        visibility: offsetReady ? 'visible' : 'hidden'
                    } : {}}
                >
                    <span className="gradient-text logo-icon"><Globe size={28} /></span>
                    <span className="logo-text">Global Inequality Portal</span>
                </Link>

                {/* Desktop Menu */}
                {!isAuthPage && (
                    <div className="nav-links desktop-only">
                        <Link to="/" onClick={handleHomeClick} className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                        <Link to="/#about">About</Link>
                        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
                        {isAuthenticated && user?.role === 'Admin' && (
                            <Link to="/admin" className={location.pathname.startsWith('/admin') ? 'active gradient-text' : 'gradient-text'}>Admin Portal</Link>
                        )}
                    </div>
                )}

                <div className="nav-actions desktop-only">
                    <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {isAuthenticated ? (
                        <button
                            className="user-avatar-btn"
                            onClick={() => setShowProfile(true)}
                            aria-label="View Account"
                        >
                            <User size={20} />
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline nav-btn">Log In</Link>
                            <Link to="/signup" className="btn btn-primary nav-btn">Sign Up</Link>
                        </>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="mobile-toggle mobile-only"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`mobile-menu glass-panel ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-links">
                    {!isAuthPage && (
                        <>
                            <Link to="/" onClick={handleHomeClick}>Home</Link>
                            <Link to="/#about" onClick={closeMenu}>About</Link>
                            <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
                            {isAuthenticated && user?.role === 'Admin' && (
                                <Link to="/admin" onClick={closeMenu} className="gradient-text">Admin Portal</Link>
                            )}
                            <hr />
                        </>
                    )}
                    <div className="mobile-actions">
                        <button onClick={toggleTheme} className="theme-toggle-mobile">
                            {theme === 'dark' ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
                        </button>
                        {isAuthenticated ? (
                            <button className="btn btn-outline" onClick={() => { setShowProfile(true); closeMenu(); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                <User size={18} /> View Account
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline" onClick={closeMenu}>Log In</Link>
                                <Link to="/signup" className="btn btn-primary" onClick={closeMenu}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <ProfileModal
                isOpen={showProfile}
                onClose={() => setShowProfile(false)}
            />
        </nav>
    );
};

export default Navbar;
