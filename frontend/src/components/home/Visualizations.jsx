import { useState } from 'react';
import { BarChart, Activity, ScatterChart } from 'lucide-react';
import './Visualizations.css';

const Visualizations = () => {
    const [activeTab, setActiveTab] = useState('executive');

    const content = {
        executive: {
            title: "Executive KPI Summary",
            icon: <Activity />,
            items: [
                { name: "Inequality Severity Index", desc: "A robust composite measure highlighting zones of extreme wealth disparity." },
                { name: "Income Concentration Ratio", desc: "Demonstrates the power imbalance between top percentiles and the bottom mass." },
                { name: "Inclusive Development Momentum", desc: "Tracks velocity of equitable growth relative to historical trends." },
                { name: "GDP vs Median Income Gap", desc: "Reveals absolute macro-disconnect, highlighting structural limits of pure GDP metrics." }
            ],
            insight: "Provides a helicopter view for policy-makers, isolating systemic risk vectors affecting socioeconomic stability.",
            policy: "Use these KPIs as early warning systems prior to structural societal distress."
        },
        deepAnalysis: {
            title: "Inequality Deep Analysis",
            icon: <BarChart />,
            items: [
                { name: "Top 10 Most Unequal Countries (Bar Chart)", desc: "Quickly isolated cohorts exhibiting extreme Gini coefficients.", chartType: "Bar" },
                { name: "GDP vs Median Income Dist (Scatter Plot)", desc: "A clustered visualization showing exact positions of countries on an imbalance spectrum.", chartType: "Scatter" },
                { name: "Inclusive Development Strength (Treemap)", desc: "Quick visual comparison of performance strength representing countries proportionally based on their Inclusive Development Score.", chartType: "Treemap" }
            ],
            insight: "Allows granular benchmarking of underperforming economies relative to global averages.",
            policy: "Targeted localized welfare injections should aim to pull clustered nations out of high-inequality density zones."
        },
        socioEconomic: {
            title: "Economic vs Social Balance",
            icon: <ScatterChart />,
            items: [
                { name: "Gini Trend & YoY Change (Line)", desc: "Moving average and year-on-year volatility of income structure.", chartType: "Line" },
                { name: "Economic Growth Skewness (Column)", desc: "Contrasts growth percentiles to expose hollow gross national enhancements.", chartType: "Column" },
                { name: "Combo Chart Overlay", desc: "Combines GDP axis, Median Income bars, and Gini line trajectory for structural clarity.", chartType: "Combo" }
            ],
            insight: "This visualization exposes whether economic growth is inclusive or strictly top-heavy.",
            policy: "Economic expansion policies must be audited against these overlays to avoid funding structural disparity."
        }
    };

    return (
        <section id="visualizations" className="visuals-section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">Visualizations <span className="gradient-text">Explained</span></h2>
                    <p className="section-subtitle">
                        Every chart and KPI is engineered to translate raw inequality metrics into
                        actionable socio-economic insights.
                    </p>
                </div>

                <div className="visuals-layout">
                    <div className="visuals-tabs">
                        <button
                            className={`visual-tab ${activeTab === 'executive' ? 'active' : ''}`}
                            onClick={() => setActiveTab('executive')}
                        >
                            <Activity size={20} /> Executive KPI
                        </button>
                        <button
                            className={`visual-tab ${activeTab === 'deepAnalysis' ? 'active' : ''}`}
                            onClick={() => setActiveTab('deepAnalysis')}
                        >
                            <BarChart size={20} /> Deep Analysis
                        </button>
                        <button
                            className={`visual-tab ${activeTab === 'socioEconomic' ? 'active' : ''}`}
                            onClick={() => setActiveTab('socioEconomic')}
                        >
                            <ScatterChart size={20} /> Social Balance
                        </button>
                    </div>

                    <div className="visuals-content glass-panel">
                        <div className="fade-in">
                            <h3 className="content-title">
                                {content[activeTab].icon} {content[activeTab].title}
                            </h3>

                            <div className="visual-items-grid">
                                {content[activeTab].items.map((item, i) => (
                                    <div key={i} className="visual-item border-l-color">
                                        <h4>{item.name}</h4>
                                        <p>{item.desc}</p>
                                        {item.chartType && <span className="chart-badge">{item.chartType} Layout</span>}
                                    </div>
                                ))}
                            </div>

                            <div className="interpretation-box">
                                <div className="insight-block">
                                    <strong><Activity size={16} /> Key Insight:</strong>
                                    <p>{content[activeTab].insight}</p>
                                </div>
                                <div className="policy-block">
                                    <strong>Policy Implication:</strong>
                                    <p>{content[activeTab].policy}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Visualizations;
