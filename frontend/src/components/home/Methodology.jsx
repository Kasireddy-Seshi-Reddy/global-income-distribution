import { CheckCircle, Database, Calculator } from 'lucide-react';
import './Methodology.css';

const Methodology = () => {
    return (
        <section id="methodology" className="methodology-section">
            <div className="container">
                <h2 className="section-title">
                    <span className="gradient-text">Analytical</span> Modeling
                </h2>
                <p className="section-subtitle">
                    Discover the custom DAX measures and calculated columns engineered to transform raw economic data into actionable global inequality metrics.
                </p>
                    <div className="glass-panel method-panel" style={{ width: '100%' }}>
                        <div className="measures-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            <div className="measure-card">
                                <div className="measure-header">
                                    <span className="measure-number">1</span>
                                    <h5>Inequality Severity Index</h5>
                                </div>
                                <p>Composite index blending Gini rating with structural wealth concentration (Top 10% vs Bottom 10% gap).</p>
                            </div>

                            <div className="measure-card">
                                <div className="measure-header">
                                    <span className="measure-number">2</span>
                                    <h5>Income Concentration Ratio</h5>
                                </div>
                                <p>Calculates exact multiplier showing how much structural wealth the richest decile hoards relative to the poorest decile.</p>
                            </div>

                            <div className="measure-card">
                                <div className="measure-header">
                                    <span className="measure-number">3</span>
                                    <h5>Inclusive Dev Momentum</h5>
                                </div>
                                <p>Advanced tracking of how Median Income growth performs relative to GDP growth & prevailing inequality severity.</p>
                            </div>

                            <div className="measure-card">
                                <div className="measure-header">
                                    <span className="measure-number">4</span>
                                    <h5>GDP vs Median Gap</h5>
                                </div>
                                <p>Measures absolute disparity between macro-economic wealth accumulation and citizen purchasing power.</p>
                            </div>
                        </div>

                        <div className="calcs-summary">
                            <ul>
                                <li><CheckCircle size={16} className="check-icon" /> Also includes: Gini YoY Change, Country GDP Rank, Inequality Rank</li>
                                <li><CheckCircle size={16} className="check-icon" /> Calculated Columns: Inequality Level Classification, Economic Performance Category</li>
                            </ul>
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default Methodology;
