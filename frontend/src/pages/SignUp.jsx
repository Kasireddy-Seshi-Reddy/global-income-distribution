import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, ArrowRight, Github, Linkedin, Globe } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const SignUp = () => {
    const { register } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Student'
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = "Full Name is required";

        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            document.querySelector('.auth-form').classList.add('error-shake');
            setTimeout(() => document.querySelector('.auth-form').classList.remove('error-shake'), 500);
        } else {
            setErrors({});
            setIsSubmitting(true);

            const submitData = async () => {
                const response = await register(formData);
                setIsSubmitting(false);

                if (response.success) {
                    navigate('/login');
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
                <div className="auth-glow area-3"></div>
                <div className="auth-glow area-4"></div>
            </div>

            <div className="container auth-container">
                <div className="auth-card glass-panel fade-in-up signup-card">
                    <div className="auth-header text-center">
                        <span className="gradient-text auth-logo-icon"><Globe size={32} /></span>
                        <h2>Create an Account</h2>
                        <p>Join the Global Inequality Intelligence platform.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-row">
                            <div className={`form-control ${errors.fullName ? 'has-error' : ''}`}>
                                <label>Full Name</label>
                                <div className="input-with-icon">
                                    <User className="input-icon" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Jane Doe"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className={errors.fullName ? 'input-error' : ''}
                                    />
                                </div>
                                {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
                            </div>

                            <div className="form-control">
                                <label>Primary Role</label>
                                <div className="input-with-icon select-wrapper">
                                    <Briefcase className="input-icon" size={18} />
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    >
                                        <option value="Student">Student Explorer</option>
                                        <option value="Researcher">Academic Researcher</option>
                                        <option value="Analyst">Data Analyst</option>
                                        <option value="Public">Public User</option>
                                    </select>
                                </div>
                            </div>
                        </div>

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

                        <div className="form-row">
                            <div className={`form-control ${errors.password ? 'has-error' : ''}`}>
                                <label>Password</label>
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

                            <div className={`form-control ${errors.confirmPassword ? 'has-error' : ''}`}>
                                <label>Confirm Password</label>
                                <div className="input-with-icon">
                                    <Lock className="input-icon" size={18} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className={errors.confirmPassword ? 'input-error' : ''}
                                    />
                                </div>
                                {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary auth-submit-btn mt-3" disabled={isSubmitting}>
                            {isSubmitting ? 'Creating Account...' : <>Sign Up Now <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>Or register with</span>
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
                        Already have an account? <Link to="/login" className="gradient-text">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
