import { Globe, TrendingDown, TrendingUp, Compass, AlertTriangle, Shield } from 'lucide-react';
import './Insights.css';

const Insights = () => {
    const insightsData = [
        {
            icon: <Globe size={24} />,
            title: "Most Unequal Regions",
            content: "Sub-Saharan Africa and parts of Latin America continue to display the highest Inequality Severity Indexes, driven by historical structural wealth concentration.",
            color: "danger"
        },
        {
            icon: <TrendingDown size={24} />,
            title: "Improving Gini Scores",
            content: "Certain emerging markets in Southeast Asia show consecutive YoY improvements in Gini ratings, indicating successful poverty alleviation programs.",
            color: "success"
        },
        {
            icon: <AlertTriangle size={24} />,
            title: "Growth-Skewed Economies",
            content: "Several high-GDP nations exhibit significant Median Income gaps, proving that macroeconomic wealth is not trickling down to the average citizen.",
            color: "warning"
        },
        {
            icon: <Compass size={24} />,
            title: "Inclusive Growth Leaders",
            content: "Nordic countries maintain the highest Inclusive Development Momentum scores, balancing robust economic expansion with high social equity.",
            color: "primary"
        },
        {
            icon: <TrendingUp size={24} />,
            title: "Wealth Concentration Shift",
            content: "Analyzing wealth distribution over the last decade shows a progressive shift of capital towards the top decile, exacerbating structural income concentration ratios globally.",
            color: "warning"
        },
        {
            icon: <Shield size={24} />,
            title: "Policy Interventions",
            content: "Nations with strong social safety nets and progressive taxation policies consistently manifest lower Gini scores and higher median human development indices.",
            color: "success"
        }
    ];

    return (
        <section id="insights" className="insights-section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">
                        Global <span className="gradient-text">Insights</span>
                    </h2>
                    <p className="section-subtitle">
                        Key macroeconomic and social findings extracted directly from the dataset.
                    </p>
                </div>

                <div className="insights-grid">
                    {insightsData.map((insight, idx) => (
                        <div key={idx} className={`insight-card card-${insight.color}`}>
                            <div className={`insight-icon-bg icon-${insight.color}`}>
                                {insight.icon}
                            </div>
                            <h3 className="insight-title">{insight.title}</h3>
                            <p className="insight-content">{insight.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Insights;
