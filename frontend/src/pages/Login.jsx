import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Linkedin, Globe } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

        if (!formData.password) newErrors.password = "Password is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            // Trigger error shake animation
            document.querySelector('.auth-form').classList.add('error-shake');
            setTimeout(() => document.querySelector('.auth-form').classList.remove('error-shake'), 500);
        } else {
            setErrors({});
            setIsSubmitting(true);

            const submitData = async () => {
                const response = await login(formData.email, formData.password);
                setIsSubmitting(false);

                if (response.success) {
                    navigate('/'); // Reverted dashboard routing to send users back to Home
                } else {
                    setErrors({ email: response.message });
                    document.querySelector('.auth-form').classList.add('error-shake');
                    setTimeout(() => document.querySelector('.auth-form').classList.remove('error-shake'), 500);
                }
            };
            submitData();
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-background">
                <div className="auth-glow area-1"></div>
                <div className="auth-glow area-2"></div>
            </div>

            <div className="container auth-container">
                <div className="auth-card glass-panel fade-in-up">
                    <div className="auth-header text-center">
                        <span className="gradient-text auth-logo-icon"><Globe size={32} /></span>
                        <h2>Welcome Back</h2>
                        <p>Sign in to access advanced analytical features and restricted data portals.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className={`form-control ${errors.email ? 'has-error' : ''}`}>
                            <label>Email Address</label>
                            <div className="input-with-icon">
                                <Mail className="input-icon" size={18} />
                                <input
                                    type="email"
                                    placeholder="name@university.edu"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={errors.email ? 'input-error' : ''}
                                />
                            </div>
                            {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>

                        <div className={`form-control ${errors.password ? 'has-error' : ''}`}>
                            <div className="label-row">
                                <label>Password</label>
                                <a href="#" className="forgot-link">Forgot Password?</a>
                            </div>
                            <div className="input-with-icon">
                                <Lock className="input-icon" size={18} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={errors.password ? 'input-error' : ''}
                                />
                            </div>
                            {errors.password && <span className="error-msg">{errors.password}</span>}
                        </div>

                        <div className="remember-row">
                            <label className="checkbox-container">
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                Remember me for 30 days
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary auth-submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Authenticating...' : <>Log In <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-auth-row">
                        <button className="btn btn-outline social-auth-btn">
                            <Github size={18} /> GitHub
                        </button>
                        <button className="btn btn-outline social-auth-btn">
                            <Linkedin size={18} /> LinkedIn
                        </button>
                    </div>

                    <div className="auth-footer">
                        Don't have an account? <Link to="/signup" className="gradient-text">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
