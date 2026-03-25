import { useState } from 'react';
import { HelpCircle, PieChart, TrendingUp, TrendingDown, Scale, BarChart2, Globe, Activity } from 'lucide-react';
import './About.css';

const About = () => {
    const [activeCard, setActiveCard] = useState(0);
    const [expandedIndicator, setExpandedIndicator] = useState(null);

    const concepts = [
        // ... (existing concepts)
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

                {/* Indicator Insights Section */}
                <div className="indicator-insights-container">
                    <div className="text-center">
                        <h2 className="section-title">
                            📊 Indicator <span className="gradient-text">Insights</span>
                        </h2>
                        <p className="section-subtitle">
                            A simple, interactive guide to the core economic indicators used in our global research.
                        </p>
                    </div>

                    <div className="indicators-grid">
                        {indicators.map((item, idx) => (
                            <div
                                key={idx}
                                className={`indicator-card glass-panel ${item.color} ${expandedIndicator === idx ? 'expanded' : ''}`}
                                onClick={() => setExpandedIndicator(expandedIndicator === idx ? null : idx)}
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

                                <div className="indicator-expand-content">
                                    <div className="expl-section">
                                        <h5>Details</h5>
                                        <p>{item.detailedExpl}</p>
                                    </div>

                                    <div className="expl-grid">
                                        <div className="expl-col">
                                            <h5>Why It Matters</h5>
                                            <ul>
                                                {item.whyItMatters.map((note, i) => <li key={i}>{note}</li>)}
                                            </ul>
                                        </div>
                                        <div className="expl-col">
                                            <h5>How to Interpret</h5>
                                            <p className="interpret-text">{item.howToInterpret}</p>
                                        </div>
                                    </div>

                                    <div className="real-world-insight">
                                        <span className="insight-label">Real-World Insight:</span> {item.insight}
                                    </div>
                                </div>

                                <div className="indicator-footer">
                                    <span className="learn-more-btn">
                                        {expandedIndicator === idx ? 'Show Less ─' : 'Learn More +'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
