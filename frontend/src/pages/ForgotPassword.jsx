import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send, Globe, Lock, ShieldCheck } from 'lucide-react';
import { API_URL } from '../config';
import './Auth.css';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Request, 2: Reset
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [demoCode, setDemoCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRequestCode = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        
        try {
            const res = await fetch(`${API_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (data.success) {
                setDemoCode(data.demoCode);
                setStep(2);
                setSuccess('Verification code generated successfully.');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Server connection error.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const res = await fetch(`${API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, resetCode, newPassword })
            });
            const data = await res.json();
            if (data.success) {
                setSuccess('Password reset successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Server connection error.');
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
                        <h2>{step === 1 ? 'Reset Access' : 'Set New Password'}</h2>
                        <p>{step === 1 
                            ? 'Enter your email to receive a secure recovery code.' 
                            : 'Enter the 6-digit code and your new password.'}
                        </p>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleRequestCode} className="auth-form">
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
                                {isSubmitting ? 'Generating Code...' : <>Request Reset <Send size={18} /></>}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="auth-form">
                            {demoCode && (
                                <div className="success-banner" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(56, 217, 169, 0.1)', border: '1px solid var(--color-primary)', borderRadius: '8px' }}>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                                        <strong>[DEMO] Verification Code:</strong> {demoCode}
                                    </p>
                                </div>
                            )}

                            <div className="form-control">
                                <label>Verification Code</label>
                                <div className="input-with-icon">
                                    <ShieldCheck className="input-icon" size={18} />
                                    <input
                                        type="text"
                                        placeholder="6-digit code"
                                        value={resetCode}
                                        onChange={(e) => setResetCode(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-control">
                                    <label>New Password</label>
                                    <div className="input-with-icon">
                                        <Lock className="input-icon" size={18} />
                                        <input
                                            type="password"
                                            placeholder="Min. 6 chars"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-control">
                                    <label>Confirm Password</label>
                                    <div className="input-with-icon">
                                        <Lock className="input-icon" size={18} />
                                        <input
                                            type="password"
                                            placeholder="Match password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {error && <span className="error-msg" style={{ marginBottom: '1rem', display: 'block' }}>{error}</span>}
                            {success && <span className="success-msg" style={{ marginBottom: '1rem', display: 'block', color: 'var(--color-primary)' }}>{success}</span>}

                            <button type="submit" className="btn btn-primary auth-submit-btn" disabled={isSubmitting || success}>
                                {isSubmitting ? 'Updating Password...' : <>Update Password <Lock size={18} /></>}
                            </button>
                        </form>
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
