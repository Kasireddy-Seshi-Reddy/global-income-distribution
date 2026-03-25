import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Globe } from 'lucide-react';
import { API_URL } from '../config';
import './Auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // We reuse the Query system to send a high-priority reset request to admins
            const res = await fetch(`${API_URL}/queries`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Password Recovery System',
                    email: email,
                    subject: 'URGENT: Password Reset Request',
                    message: `USER REQUESTING PASSWORD RESET: ${email}. Please use the Admin User Management panel to reset this researcher's credentials.`
                })
            });

            const data = await res.json();
            if (data.success) {
                setSubmitted(true);
            } else {
                setError(data.message || 'Failed to submit request.');
            }
        } catch (err) {
            setError('Server connection error. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-glow area-1"></div>
            </div>

            <div className="container auth-container">
                <div className="auth-card glass-panel fade-in-up">
                    <div className="auth-header text-center">
                        <span className="gradient-text auth-logo-icon"><Globe size={32} /></span>
                        <h2>Reset Access</h2>
                        <p>Lost your credentials? Submit your email and an administrator will reset your access within 24 hours.</p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className={`form-control ${error ? 'has-error' : ''}`}>
                                <label>Registered Email</label>
                                <div className="input-with-icon">
                                    <Mail className="input-icon" size={18} />
                                    <input
                                        type="email"
                                        placeholder="your.email@university.edu"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {error && <span className="error-msg">{error}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary auth-submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting Request...' : <>Request Reset <Send size={18} /></>}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center fade-in" style={{ padding: '2rem 0' }}>
                            <div style={{ color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                                <Send size={60} style={{ margin: '0 auto' }} />
                            </div>
                            <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Request Received</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                                Your password reset request has been logged. Our administrative team will verify your credentials and update your password shortly.
                            </p>
                        </div>
                    )}

                    <div className="auth-footer">
                        <Link to="/login" className="back-to-login">
                            <ArrowLeft size={16} /> Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
