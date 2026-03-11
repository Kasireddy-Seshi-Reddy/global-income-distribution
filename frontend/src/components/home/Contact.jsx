import { useState } from 'react';
import { Send, MapPin, Mail, Linkedin, Github } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('global_ineq_token');
            const headers = { 'Content-Type': 'application/json' };
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const response = await fetch(`${API_URL}/queries`, {
                method: 'POST',
                headers,
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setIsSuccess(false), 5000);
            }
        } catch (error) {
            console.error('Feedback submission failed', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">
                        <span className="gradient-text">Contact</span> the Analyst
                    </h2>
                    <p className="section-subtitle">
                        Have questions regarding the socioeconomic models, power BI implementation, or
                        dataset calculations? Reach out for detailed inquiries.
                    </p>
                </div>

                <div className="contact-grid">
                    <div className="contact-info glass-panel">
                        <h3>Project Details</h3>
                        <p className="contact-desc">
                            This interactive dashboard was designed to provide scalable, responsive socioeconomic insights for researchers and policy makers.
                        </p>

                        <div className="info-list">
                            <div className="info-item">
                                <MapPin className="info-icon" />
                                <div>
                                    <strong>Infosys Springboard</strong>
                                    <span>Project Framework</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <Mail className="info-icon" />
                                <div>
                                    <strong>Kasireddy Seshi Reddy</strong>
                                    <span>Project Lead / Data Analyst</span>
                                </div>
                            </div>
                        </div>

                        <div className="contact-socials">
                            <a href="https://www.linkedin.com/in/seshi-reddy/" target="_blank" rel="noopener noreferrer" className="social-pill">
                                <Linkedin size={18} /> LinkedIn Profile
                            </a>
                            <a href="#" className="social-pill">
                                <Github size={18} /> GitHub Repository
                            </a>
                        </div>
                    </div>

                    <div className="contact-form-container glass-panel">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    placeholder="you@university.edu"
                                />
                            </div>

                            <div className="form-group">
                                <label>Message / Inquiry</label>
                                <textarea
                                    rows="4"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    placeholder="How can we collaborate or discuss the methodology?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`btn ${isSuccess ? 'btn-success' : 'btn-primary'} submit-btn`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="loader">Sending...</span>
                                ) : isSuccess ? (
                                    <>Message Sent!</>
                                ) : (
                                    <>Send Feedback <Send size={18} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
