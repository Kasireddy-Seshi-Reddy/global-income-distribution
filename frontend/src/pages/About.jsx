import { useState, useMemo, useEffect } from 'react';
import { HelpCircle, PieChart, TrendingUp, TrendingDown, Scale, BarChart2, Globe, Activity, Zap, CheckCircle2 } from 'lucide-react';
import './About.css';

const About = () => {
    const [activeCard, setActiveCard] = useState(0);
    const [compareSelections, setCompareSelections] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
            id: 'gdp',
            title: "GDP Per Capita ($)",
            icon: <Globe size={32} />,
            insight: "Economic strength does not always mean equal prosperity.",
            coreExpl: "GDP per capita reflects the average income generated per person in a country. It is a benchmark for economic performance but doesn't show wealth distribution.",
            whatItReveals: [
                "Overall economic power",
                "Standard of living (approximate)",
                "Development level"
            ],
            realityCheck: "A country can have high GDP per capita but still suffer from high inequality.",
            interpretation: { high: "Strong economy", low: "Limited economic output" },
            visualValue: 75,
            color: "green"
        },
        {
            id: 'gini',
            title: "Gini Index (0–100)",
            icon: <Scale size={32} />,
            insight: "This is the true face of inequality.",
            coreExpl: "The Gini Index measures how unevenly income is distributed across a population, compressing disparity into a single number.",
            whatItReveals: [
                "Wealth distribution fairness",
                "Economic imbalance",
                "Social disparity"
            ],
            realityCheck: "Even economically strong nations can have high inequality.",
            interpretation: { high: "Extreme inequality", low: "Perfect equality" },
            visualValue: 45,
            color: "red"
        },
        {
            id: 'lowest20',
            title: "Income Share: Lowest 20%",
            icon: <TrendingUp size={32} />,
            insight: "How much does the poorest population actually receive?",
            coreExpl: "This shows the portion of national income earned by the bottom 20% of the population.",
            whatItReveals: [
                "Inclusiveness of growth",
                "Poverty-level income participation"
            ],
            realityCheck: "A low share here often correlates with slow social mobility.",
            interpretation: { high: "More inclusive economy", low: "Marginalized population" },
            visualValue: 8,
            color: "yellow"
        },
        {
            id: 'highest20',
            title: "Income Share: Highest 20%",
            icon: <TrendingDown size={32} />,
            insight: "Where most of the wealth accumulates.",
            coreExpl: "Represents how much income is concentrated among the richest population segment.",
            whatItReveals: [
                "Wealth concentration",
                "Economic dominance"
            ],
            realityCheck: "Excessive concentration can stifle overall consumer demand.",
            interpretation: { high: "Wealth concentration", low: "Balanced economy" },
            visualValue: 52,
            color: "red"
        },
        {
            id: 'second20',
            title: "Income Share: Second 20%",
            icon: <Activity size={32} />,
            insight: "The stepping stone out of poverty.",
            coreExpl: "Represents the lower-middle class just above the poorest group.",
            whatItReveals: [
                "Early-stage economic mobility",
                "Transition from poverty"
            ],
            realityCheck: "Growth here is critical for reducing extreme poverty.",
            interpretation: { high: "Emerging middle class", low: "Stagnant mobility" },
            visualValue: 12,
            color: "yellow"
        },
        {
            id: 'third20',
            title: "Income Share: Third 20%",
            icon: <PieChart size={32} />,
            insight: "The backbone of the middle class.",
            coreExpl: "Captures the economic condition of the core middle segments of the population.",
            whatItReveals: [
                "Stability of the middle class",
                "Economic balance"
            ],
            realityCheck: "A shrinking middle share is an early warning sign of economic polarization.",
            interpretation: { high: "Stable middle class", low: "Economic hollowing" },
            visualValue: 15,
            color: "yellow"
        },
        {
            id: 'fourth20',
            title: "Income Share: Fourth 20%",
            icon: <BarChart2 size={32} />,
            insight: "The bridge between middle class and wealth.",
            coreExpl: "Represents the upper-middle income segment, reflecting near-affluent trends.",
            whatItReveals: [
                "Income progression",
                "Near-affluent population trends"
            ],
            realityCheck: "High values here indicate wealth shifting toward the top quintile.",
            interpretation: { high: "Near-affluent growth", low: "Broad wealth distribution" },
            visualValue: 20,
            color: "yellow"
        },
        {
            id: 'unemployment',
            title: "Unemployment Rate (%)",
            icon: <HelpCircle size={32} />,
            insight: "A direct signal of economic stress.",
            coreExpl: "Measures the percentage of people actively seeking jobs but unable to find work.",
            whatItReveals: [
                "Job market health",
                "Economic stability",
                "Social risk factors"
            ],
            realityCheck: "Low unemployment doesn't guarantee high wages if inequality is high.",
            interpretation: { high: "Economic pressure", low: "Strong economy" },
            visualValue: 10,
            color: "red"
        }
    ];

    const toggleCompare = (id) => {
        setCompareSelections(prev => {
            if (prev.includes(id)) return prev.filter(i => i !== id);
            if (prev.length >= 2) return [prev[1], id];
            return [...prev, id];
        });
    };

    const relationshipMsg = useMemo(() => {
        if (compareSelections.length < 2) return null;
        const [id1, id2] = compareSelections;
        
        if ((id1 === 'gdp' && id2 === 'gini') || (id1 === 'gini' && id2 === 'gdp')) {
            return "High GDP + High Gini = Unequal Growth. Economic expansion is concentrated at the top.";
        }
        if ((id1 === 'gini' && id2 === 'lowest20') || (id1 === 'lowest20' && id2 === 'gini')) {
            return "Inequality vs Inclusion: A high Gini indicates the bottom 20% are receiving significantly less growth share.";
        }
        if ((id1 === 'highest20' && id2 === 'unemployment') || (id1 === 'unemployment' && id2 === 'highest20')) {
            return "Economic Pressure: When unemployment rises while top share stays high, social disparity deepens.";
        }
        return "Analyzing the Interplay: These two indicators define different facets of national economic health.";
    }, [compareSelections]);

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

                <div className="indicator-storytelling-container">
                    <div className="storytelling-header">
                        <h2 className="section-title">
                            Indicator <span className="gradient-text">Insights</span>
                        </h2>
                        <h3 className="storytelling-tagline">Understanding the Building Blocks of Inequality</h3>
                        <p className="section-subtitle">
                            Learn by interacting. Select indicators to compare their impact on national prosperity.
                        </p>
                    </div>

                    <div className={`insight-highlight-bar ${relationshipMsg ? 'active' : ''}`}>
                        <div className="highlight-content">
                            <Zap className="highlight-icon" size={20} />
                            <span>{relationshipMsg || "Select two indicators below to analyze their relationship"}</span>
                        </div>
                    </div>

                    <div className="story-stack">
                        {indicators.map((item, idx) => (
                            <div 
                                key={idx}
                                className={`story-block glass-panel ${item.color} ${compareSelections.includes(item.id) ? 'selected' : ''}`}
                                onClick={() => toggleCompare(item.id)}
                            >
                                <div className="story-block-inner">
                                    <div className="story-header-col">
                                        <div className="story-icon-wrapper">{item.icon}</div>
                                        <div className="story-id-badge">
                                            {compareSelections.includes(item.id) ? "Selected for Comparison" : "Click to Compare"}
                                        </div>
                                        <h4>{item.title}</h4>
                                        <p className="insight-line-v2">“{item.insight}”</p>
                                        
                                        <div className="visual-indicator">
                                            <div className="visual-bar-bg-v2">
                                                <div 
                                                    className="visual-bar-fill-v2"
                                                    style={{ width: `${item.visualValue}%` }}
                                                ></div>
                                            </div>
                                            <span className="visual-label">Critical Priority Multiplier</span>
                                        </div>
                                    </div>

                                    <div className="story-content-col">
                                        <div className="content-segment">
                                            <h5>Research Context</h5>
                                            <p>{item.coreExpl}</p>
                                        </div>

                                        <div className="content-segment-grid">
                                            <div className="reveals-box">
                                                <h5>Key Revelations</h5>
                                                <ul>
                                                    {item.whatItReveals.map((point, i) => (
                                                        <li key={i}><CheckCircle2 size={14} className="list-icon" /> {point}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="reality-check-v2">
                                                <h5>Reality Check</h5>
                                                <div className="reality-bubble">
                                                    <Zap size={18} />
                                                    <p>{item.realityCheck}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="interpretation-bar-v2">
                                            <div className="interpret-point">
                                                <strong>Low Factor:</strong> <span>{item.interpretation.low}</span>
                                            </div>
                                            <div className="interpret-point">
                                                <strong>High Factor:</strong> <span>{item.interpretation.high}</span>
                                            </div>
                                        </div>
                                    </div>
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
