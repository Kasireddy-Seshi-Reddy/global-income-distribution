import { ArrowRight, Download, FileText } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    const parallaxRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!parallaxRef.current) return;

            const x = (window.innerWidth - e.pageX * 2) / 90;
            const y = (window.innerHeight - e.pageY * 2) / 90;

            parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="hero-section">
            <div className="hero-background" ref={parallaxRef}>
                <div className="world-map-overlay"></div>
                <div className="glowing-node node-1"></div>
                <div className="glowing-node node-2"></div>
                <div className="glowing-node node-3"></div>
                <div className="economic-lines"></div>
            </div>

            <div className="container hero-container">
                <div className="hero-content">
                    <div className="hero-badge glass-panel">
                        <span className="pulse-dot"></span>
                        LIVE INTELLIGENCE PORTAL
                    </div>

                    <h1 className="hero-title">
                        Understanding Global <br />
                        <span className="gradient-text">Income Inequality</span> <br />
                        Through Interactive Intelligence
                    </h1>

                    <p className="hero-subtitle">
                        Explore inequality severity, income concentration, GDP gaps, and inclusive
                        development momentum using real-world global data and advanced analytics.
                    </p>

                    <div className="hero-actions">
                        <Link to="/dashboard" className="btn btn-primary hero-btn">
                            Explore Dashboard <ArrowRight size={18} />
                        </Link>
                        <a href="https://1drv.ms/x/c/597d31b69ede844f/IQBy0XiR5t8KSYZooAXtE24sAbdazsL4mar7uHo_1tSTHV8?download=1" target="_blank" rel="noopener noreferrer" className="btn btn-outline hero-btn">
                            <Download size={18} /> Download Dataset
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item glass-panel">
                            <h3 className="stat-value">20</h3>
                            <p className="stat-label">Countries Analyzed</p>
                        </div>
                        <div className="stat-item glass-panel">
                            <h3 className="stat-value">11</h3>
                            <p className="stat-label">Calculated Measures</p>
                        </div>
                        <div className="stat-item glass-panel">
                            <h3 className="stat-value">Rank 1</h3>
                            <p className="stat-label">Infosys Springboard Project</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
