import { useState } from 'react';
import { HelpCircle, PieChart, TrendingUp, TrendingDown, Scale, BarChart2, Globe, Activity } from 'lucide-react';
import './About.css';

const About = () => {
    const [activeCard, setActiveCard] = useState(0);

    const concepts = [
        {
            title: "What is Income Inequality?",
            icon: <HelpCircle size={28} />,
            content: "Income inequality refers to how unevenly income is distributed throughout a population. The less equal the distribution, the greater the income disparity.",
            stat: "10% of people",
            statLabel: "hold 52% of global income"
        },
        {
            title: "What is Gini Index?",
            icon: <Scale size={28} />,
            content: "A statistical measure of economic inequality ranging from 0 (perfect equality) to 100 (perfect inequality). A higher Gini index indicates greater inequality.",
            stat: "0 - 100",
            statLabel: "Measurement Scale"
        },
        {
            title: "Income Share: Top vs Bottom",
            icon: <PieChart size={28} />,
            content: "By comparing the income share held by the richest 10% against the poorest 10%, we uncover the real concentration of wealth and social polarity in nations.",
            stat: "Top 10%",
            statLabel: "vs Bottom 10%"
        },
        {
            title: "GDP vs Median Income Gap",
            icon: <TrendingUp size={28} />,
            content: "A country can have high GDP per capita but stagnating median incomes, meaning economic growth only benefits a fraction of the population.",
            stat: "Growth Skew",
            statLabel: "Structural Imbalance Indicator"
        },
        {
            title: "Inequality Severity Index",
            icon: <Activity size={28} />,
            content: "A custom metric blending baseline Gini coefficients with structural wealth concentration factors to identify extreme disparity zones.",
            stat: "Severity",
            statLabel: "Composite Risk Score"
        },
        {
            title: "Inclusive Development",
            icon: <BarChart2 size={28} />,
            content: "Measures whether the financial growth of the middle class is keeping pace with national macroeconomic expansion metrics.",
            stat: "Parity",
            statLabel: "Growth Distribution Track"
        },
        {
            title: "Global Disparity",
            icon: <Globe size={28} />,
            content: "Analyzing income inequality on a worldwide scale, contrasting the wealth of developed nations against emerging economies.",
            stat: "World Map",
            statLabel: "Cross-Border Economic Divides"
        }
    ];

    return (
        <section id="about" className="about-section">
            <div className="container">
                <h2 className="section-title">
                    Understanding <span className="gradient-text">Inequality</span>
                </h2>
                <p className="section-subtitle">
                    Income inequality is not just a statistical artifact; it represents structural
                    barriers to human capital development and inclusive growth.
                </p>

                <div className="about-grid">
                    <div className="about-cards-nav">
                        {concepts.map((concept, idx) => (
                            <button
                                key={idx}
                                className={`concept-tab glass-panel ${activeCard === idx ? 'active' : ''}`}
                                onClick={() => setActiveCard(idx)}
                            >
                                <div className="concept-icon">{concept.icon}</div>
                                <div className="concept-title">{concept.title}</div>
                            </button>
                        ))}
                    </div>

                    <div className="about-card-display glass-panel">
                        <div className="display-content fade-in">
                            <div className="display-icon">
                                {concepts[activeCard].icon}
                            </div>
                            <h3>{concepts[activeCard].title}</h3>
                            <p>{concepts[activeCard].content}</p>

                            <div className="highlight-metric">
                                <span className="metric-primary">{concepts[activeCard].stat}</span>
                                <span className="metric-secondary">{concepts[activeCard].statLabel}</span>
                            </div>

                            <div className="policy-note">
                                <strong>Why it matters for policy:</strong> Understanding this metric helps governments
                                design better taxation and wealth redistribution structures.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
