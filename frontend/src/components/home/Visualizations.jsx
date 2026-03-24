import { useState } from 'react';
import { 
    Activity, Globe, PieChart, BarChart2, TrendingUp, ScatterChart, 
    ChevronDown, Eye, Layers, Percent, Crosshair, Zap 
} from 'lucide-react';
import './Visualizations.css';

const Visualizations = () => {
    const [expandedSection, setExpandedSection] = useState("sec1"); // First panel open by default

    const toggleSection = (id) => {
        setExpandedSection(expandedSection === id ? null : id);
    };

    const visualSections = [
        {
            id: "sec1",
            title: "SECTION 1: KPI SUMMARY VISUALS",
            icon: <Activity />,
            items: [
                {
                    name: "📌 KPI Cards (Executive Indicators)",
                    shows: "Total Countries, Total Gini Index, Total GDP Per Capita, Total Unemployment Rate, Country Strength Score, and Gini Inequality Severity Score.",
                    importance: "These KPI cards provide a high-level snapshot of global economic and inequality conditions.",
                    interpretation: "Higher Gini values indicate higher inequality. Higher Country Strength Score reflects stronger combined economic and social performance.",
                    insight: "Summarizes the dataset into key measurable indicators, allowing users to quickly understand the overall state before diving deeper."
                }
            ]
        },
        {
            id: "sec2",
            title: "SECTION 2: GLOBAL OVERVIEW VISUALS",
            icon: <Globe />,
            items: [
                {
                    name: "📊 Top 10 Countries by Gini Index (Bar Chart)",
                    shows: "Displays the countries with the highest income inequality based on the Gini Index.",
                    importance: "Helps identify extreme inequality cases globally.",
                    interpretation: "Higher bars represent higher inequality levels.",
                    insight: "This visualization highlights countries where income distribution is most uneven, helping policymakers and analysts focus on critical regions."
                },
                {
                    name: "🗺️ Income Inequality Distribution Map",
                    shows: "A world map visualizing inequality levels across countries.",
                    importance: "Provides a geographical perspective of inequality.",
                    interpretation: "Darker or intense colors represent higher inequality.",
                    insight: "Allows users to quickly identify regional inequality clusters and global disparity patterns."
                },
                {
                    name: "🍩 Global Income Distribution Structure (Donut Chart)",
                    shows: "Represents how income is distributed among different population groups.",
                    importance: "Simplifies complex income share data into an easily understandable format.",
                    interpretation: "Each segment represents a population group’s share of total income.",
                    insight: "Highlights imbalance between top earners and lower-income groups."
                }
            ]
        },
        {
            id: "sec3",
            title: "SECTION 3: REGIONAL COMPARISON VISUALS",
            icon: <BarChart2 />,
            items: [
                {
                    name: "📊 Regional GDP Per Capita Comparison",
                    shows: "Comparison of economic output across regions.",
                    importance: "Indicates regional economic strength.",
                    interpretation: "Higher values indicate stronger economies.",
                    insight: "Helps compare developed vs developing regions."
                },
                {
                    name: "📊 Regional Inequality Levels (Gini Index)",
                    shows: "Average inequality across different regions.",
                    importance: "Shows which regions are more unequal.",
                    interpretation: "Higher values = higher inequality.",
                    insight: "Reveals structural inequality differences between continents."
                },
                {
                    name: "📊 Regional Unemployment Rate Comparison",
                    shows: "Average unemployment rates by region.",
                    importance: "Connects inequality with labor market conditions.",
                    interpretation: "Higher unemployment often correlates with economic imbalance.",
                    insight: "Helps identify economically vulnerable regions."
                }
            ]
        },
        {
            id: "sec4",
            title: "SECTION 4: TREND ANALYSIS VISUALS",
            icon: <TrendingUp />,
            items: [
                {
                    name: "📉 GDP Per Capita Growth Trend (Line Chart)",
                    shows: "Changes in GDP per capita over time.",
                    importance: "Tracks economic growth trends.",
                    interpretation: "Upward trend = economic growth. Downward trend = slowdown.",
                    insight: "Shows whether countries are improving economically."
                },
                {
                    name: "📉 Income Inequality Change Trend (Gini YoY)",
                    shows: "Year-over-year changes in inequality.",
                    importance: "Tracks whether inequality is increasing or decreasing.",
                    interpretation: "Positive change = rising inequality. Negative change = improving equality.",
                    insight: "Useful for historical socio-economic policy evaluation."
                },
                {
                    name: "📉 Unemployment Rate Change Trend",
                    shows: "Changes in unemployment over time.",
                    importance: "Indicates labor market health.",
                    interpretation: "Higher trajectory indicates an expanding labor crisis.",
                    insight: "Helps understand economic stability and job availability."
                }
            ]
        },
        {
            id: "sec5",
            title: "SECTION 5: INDICATOR RELATIONSHIP VISUAL",
            icon: <ScatterChart />,
            items: [
                {
                    name: "⚖️ Economic Growth vs Income Inequality (Scatter Plot)",
                    shows: "Relationship between GDP per capita and Gini Index with an interactive Play Axis.",
                    importance: "Analyzes whether economic growth leads to equality.",
                    interpretation: "Each point represents a country. X-axis = GDP. Y-axis = Gini Index.",
                    insight: "Helps identify growth with equality versus skewed non-inclusive growth. This is a key visualization for understanding inclusive development."
                }
            ]
        },
        {
            id: "sec6",
            title: "SECTION 6: ADVANCED ANALYTICAL MEASURES",
            icon: <Layers />,
            items: [
                {
                    name: "📌 Inequality Severity Index",
                    shows: "Composite indicator combining Gini + income shares.",
                    importance: "Provides deeper contextual awareness than any single metric.",
                    interpretation: "A multifaceted score representing actual economic reality for average citizens.",
                    insight: "More powerful and representative than single isolated metrics."
                },
                {
                    name: "📌 Income Concentration Ratio",
                    shows: "Top 10% Income ÷ Bottom 10% Income.",
                    importance: "Explicitly identifies the extreme poles of the wealth spectrum.",
                    interpretation: "Higher multiplier means the top tier extracts vastly more capital.",
                    insight: "Direct measure of wealth gap intensity and hoarding severity."
                },
                {
                    name: "📌 GDP vs Median Income Gap",
                    shows: "Highlights the divergence between national gross product and actual citizen median take-home pay.",
                    importance: "Exposes hollow GDP numbers.",
                    interpretation: "A wide gap indicates the majority of the population isn't benefiting from national wealth.",
                    insight: "Shows whether macroeconomic growth effectively benefits everyday citizens."
                },
                {
                    name: "📌 Inclusive Development Momentum Score",
                    shows: "An aggregated timeline velocity index.",
                    importance: "Measures trajectory of equality.",
                    interpretation: "Higher score indicates a society rapidly moving towards equality.",
                    insight: "Measures balanced economic + social development over the period."
                }
            ]
        }
    ];

    return (
        <section id="visualizations" className="visuals-section">
            <div className="container">
                <div className="text-center visuals-header">
                    <h2 className="section-title">
                        Understanding the <span className="gradient-text">Dashboard Visualizations</span>
                    </h2>
                    <p className="section-subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Explore the project’s analytical structure and learn how to interpret every visualization presented in the interactive Power BI dashboard.
                    </p>
                </div>

                <div className="visuals-interactive-layout shadow-glow">
                    <div className="accordion-container">
                        {visualSections.map((section) => (
                            <div 
                                key={section.id} 
                                className={`accordion-item glass-panel ${expandedSection === section.id ? 'expanded' : ''}`}
                            >
                                <button 
                                    className="accordion-header" 
                                    onClick={() => toggleSection(section.id)}
                                    aria-expanded={expandedSection === section.id}
                                >
                                    <div className="accordion-title-wrapper">
                                        <div className="accordion-icon">{section.icon}</div>
                                        <h3 className="accordion-title">{section.title}</h3>
                                    </div>
                                    <ChevronDown className={`accordion-chevron ${expandedSection === section.id ? 'rotated' : ''}`} size={24} />
                                </button>
                                
                                <div className="accordion-content-wrapper">
                                    <div className="accordion-content">
                                        {section.items.map((item, idx) => (
                                            <div key={idx} className="viz-card">
                                                <h4 className="viz-card-title gradient-text">{item.name}</h4>
                                                <div className="viz-details-grid">
                                                    <div className="viz-detail pointer-hover">
                                                        <span className="vd-label"><Eye size={16}/> What it shows</span>
                                                        <p className="vd-text">{item.shows}</p>
                                                    </div>
                                                    <div className="viz-detail pointer-hover">
                                                        <span className="vd-label"><Crosshair size={16}/> Why it matters</span>
                                                        <p className="vd-text">{item.importance}</p>
                                                    </div>
                                                    <div className="viz-detail pointer-hover">
                                                        <span className="vd-label"><Percent size={16}/> How to interpret</span>
                                                        <p className="vd-text">{item.interpretation}</p>
                                                    </div>
                                                    <div className="viz-detail pointer-hover highlight-box">
                                                        <span className="vd-label"><Zap size={16} className="text-warning"/> Key Insight</span>
                                                        <p className="vd-text text-bright">{item.insight}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-5 mb-3">
                        <button className="btn btn-primary btn-glow" onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}>
                            <Eye size={18} /> View in Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Visualizations;
