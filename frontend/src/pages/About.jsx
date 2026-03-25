import { useState } from 'react';
import { HelpCircle, PieChart, TrendingUp, TrendingDown, Scale, BarChart2, Globe, Activity, X } from 'lucide-react';
import './About.css';

const About = () => {
    const [activeCard, setActiveCard] = useState(0);
    const [selectedIndicator, setSelectedIndicator] = useState(null);

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

    const indicators = [
        {
            title: "GDP Per Capita ($)",
            icon: <Globe size={24} />,
            shortDesc: "Represents the average economic output per person in a country.",
            detailedExpl: "GDP per capita is calculated by dividing the total Gross Domestic Product by the population. It is commonly used as an indicator of a country's economic performance and standard of living.",
            whyItMatters: ["Helps compare economic strength across countries", "Indicates overall prosperity", "Used in development classification"],
            howToInterpret: "Higher values → stronger economy; Lower values → weaker economic output per person.",
            insight: "Economic strength doesn't always mean low inequality.",
            color: "green"
        },
        {
            title: "Gini Index (0–100)",
            icon: <Scale size={24} />,
            shortDesc: "Measures income inequality within a country.",
            detailedExpl: "The Gini Index ranges from 0 to 100, where 0 represents perfect equality (everyone earns the same) and 100 represents maximum inequality (one person earns everything).",
            whyItMatters: ["Core indicator of income inequality", "Widely used in economic research", "Helps identify disparity in wealth distribution"],
            howToInterpret: "0–30 → Low inequality; 30–50 → Moderate inequality; 50+ → High inequality.",
            insight: "A Gini increase of 1% can significantly impact long-term social mobility.",
            color: "red"
        },
        {
            title: "Income Share: Lowest 20%",
            icon: <TrendingUp size={24} />,
            shortDesc: "Percentage of total income earned by the poorest 20% of the population.",
            detailedExpl: "This indicator reflects how much of the total national income is received by the bottom fifth of the population.",
            whyItMatters: ["Indicates inclusiveness of economic growth", "Shows whether lower-income groups benefit from the economy"],
            howToInterpret: "Higher percentage → better income distribution; Lower percentage → greater inequality.",
            insight: "A strong base leads to more resilient national economies.",
            color: "yellow"
        },
        {
            title: "Income Share: Highest 20%",
            icon: <TrendingDown size={24} />,
            shortDesc: "Percentage of total income earned by the richest 20% of the population.",
            detailedExpl: "This shows how concentrated income is among the wealthiest population group.",
            whyItMatters: ["Indicates wealth concentration", "Helps measure economic imbalance"],
            howToInterpret: "Higher percentage → more income concentration; Lower percentage → more balanced distribution.",
            insight: "Excessive concentration can stifle overall consumer demand.",
            color: "red"
        },
        {
            title: "Income Share: Second 20%",
            icon: <Activity size={24} />,
            shortDesc: "Income share of the population just above the lowest 20%.",
            detailedExpl: "Represents the lower-middle income group and provides insight into income distribution beyond extreme poverty.",
            whyItMatters: ["Shows depth of middle-class formation", "Helps analyze gradual income progression"],
            howToInterpret: "Stable or increasing share → improving income distribution.",
            insight: "This group is often the engine of small-scale entrepreneurship.",
            color: "yellow"
        },
        {
            title: "Income Share: Third 20%",
            icon: <PieChart size={24} />,
            shortDesc: "Represents the middle segment of the population.",
            detailedExpl: "This group typically reflects the economic condition of the core middle class.",
            whyItMatters: ["Indicates strength of middle-income population", "Important for economic stability"],
            howToInterpret: "Balanced share → strong middle class.",
            insight: "The resilience of this group defines national social security stability.",
            color: "yellow"
        },
        {
            title: "Income Share: Fourth 20%",
            icon: <BarChart2 size={24} />,
            shortDesc: "Represents the upper-middle income group.",
            detailedExpl: "This segment lies just below the top 20% and reflects near-affluent population income distribution.",
            whyItMatters: ["Shows transition from middle to high-income group", "Helps analyze income layering"],
            howToInterpret: "Higher share → concentration shifting upward.",
            insight: "Growth here often indicates a high-skilled labor force expansion.",
            color: "yellow"
        },
        {
            title: "Unemployment Rate (%)",
            icon: <HelpCircle size={24} />,
            shortDesc: "Percentage of the labor force that is unemployed.",
            detailedExpl: "This indicator measures the proportion of people actively seeking jobs but unable to find employment.",
            whyItMatters: ["Reflects economic health", "Indicates job availability", "Linked to poverty and inequality"],
            howToInterpret: "Low rate → strong labor market; High rate → economic distress.",
            insight: "Structural unemployment is a leading precursor to long-term inequality.",
            color: "red"
        }
    ];

    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">
                        Understanding <span className="gradient-text">Inequality</span>
                    </h2>
                    <p className="section-subtitle">
                        Income inequality is not just a statistical artifact; it represents structural
                        barriers to human capital development and inclusive growth.
                    </p>
                </div>

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

                {/* Indicator Insights Section */}
                <div className="indicator-insights-container">
                    <div className="text-center">
                        <h2 className="section-title">
                            Indicator <span className="gradient-text">Insights</span>
                        </h2>
                        <p className="section-subtitle">
                            A simple, interactive guide to the core economic indicators used in our global research.
                        </p>
                    </div>

                    <div className="indicators-grid">
                        {indicators.map((item, idx) => (
                            <div
                                key={idx}
                                className={`indicator-card glass-panel ${item.color}`}
                                onClick={() => setSelectedIndicator(item)}
                            >
                                <div className="indicator-header">
                                    <div className="indicator-icon-wrapper">
                                        {item.icon}
                                    </div>
                                    <div className="indicator-header-text">
                                        <h4>{item.title}</h4>
                                        <p className="short-desc">{item.shortDesc}</p>
                                    </div>
                                </div>

                                <div className="indicator-footer">
                                    <span className="learn-more-btn">Learn More +</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium Indicator Modal */}
            {selectedIndicator && (
                <div className="indicator-modal-overlay fade-in" onClick={() => setSelectedIndicator(null)}>
                    <div className="indicator-modal-content glass-panel bounce-in" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedIndicator(null)}>
                            <X size={24} />
                        </button>
                        
                        <div className="modal-header">
                            <div className={`modal-icon-wrapper ${selectedIndicator.color}`}>
                                {selectedIndicator.icon}
                            </div>
                            <div className="modal-title-area">
                                <h3>{selectedIndicator.title}</h3>
                                <div className={`status-pill ${selectedIndicator.color}`}>
                                    {selectedIndicator.color === 'green' ? 'Positive growth' : selectedIndicator.color === 'red' ? 'High risk' : 'Neutral factor'}
                                </div>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="modal-description">
                                <h5>What is it?</h5>
                                <p>{selectedIndicator.detailedExpl}</p>
                            </div>

                            <div className="modal-info-grid">
                                <div className="info-section">
                                    <h5>Why It Matters</h5>
                                    <ul>
                                        {selectedIndicator.whyItMatters.map((note, i) => <li key={i}>{note}</li>)}
                                    </ul>
                                </div>
                                <div className="info-section">
                                    <h5>How to Interpret</h5>
                                    <div className="interpret-box">
                                        <p>{selectedIndicator.howToInterpret}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer-insight">
                                <strong>Real-World Insight:</strong> {selectedIndicator.insight}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default About;
