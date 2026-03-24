import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Github, ArrowUpRight, Globe } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    if (!isAuthenticated) return null;

    return (
        <footer className={`footer section ${isAdmin ? 'footer-admin' : ''}`}>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="nav-logo">
                            <span className="gradient-text logo-icon"><Globe size={24} /></span>
                            <span className="logo-text">Global Inequality Portal</span>
                        </Link>
                        <p className="footer-desc">
                            Research-grade interactive intelligence platform for understanding
                            global income concentration and inclusive development momentum.
                        </p>
                        <div className="social-links">

                            <a href="https://github.com/Springboard-Internship-2025/Interactive-Analytics-Dashboard-for-Global-Income-Distribution_Feb_Batch-8_2026/tree/Kasireddy-Seshi-Reddy" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-link"><Github size={20} /></a>

                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <Link to="/#about">About Inequality</Link>
                        <Link to="/dashboard">Interactive Dashboard</Link>
                        <Link to="/#methodology">Data & Methodology</Link>
                    </div>

                    <div className="footer-links">
                        <h4>Resources</h4>
                        <Link to="/#downloads">Download Dataset</Link>
                        <Link to="/#faq">FAQ</Link>
                        <Link to="/#insights">Global Insights</Link>
                        <Link to="/login">Analyst Login <ArrowUpRight size={14} /></Link>
                    </div>

                    <div className="footer-project">
                        <h4>Infosys Springboard</h4>
                        <p><strong>Project by:</strong> Infosys Intern Team</p>
                        <p><strong>Project Title:</strong> Interactive Analytics Dashboard for Global Income Distribution</p>
                        <div className="footer-glass-badge">
                            Research Project 2026
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Global Income Inequality Intelligence Portal. All rights reserved.</p>
                    <div className="footer-legal">
                        <Link to="#">Privacy Policy</Link>
                        <Link to="#">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
