import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import './ComparisonTool.css';
import countryData from '../../assets/countryData.json';

const countryKeys = Object.keys(countryData).sort((a, b) => countryData[a].name.localeCompare(countryData[b].name));

const ComparisonTool = () => {
    // Attempt to keep old defaults but fallback to alphabetic first ones
    const defaultC1 = countryKeys.includes('united-states') ? 'united-states' : countryKeys[0];
    const defaultC2 = countryKeys.includes('denmark') ? 'denmark' : (countryKeys[1] || countryKeys[0]);

    const [country1, setCountry1] = useState(defaultC1);
    const [country2, setCountry2] = useState(defaultC2);

    const c1Data = countryData[country1];
    const c2Data = countryData[country2];

    const calculateWidth = (val1, val2, reverse = false) => {
        const max = Math.max(val1, val2);
        // If reverse is true (like Gini where lower is better contextually for full bars)
        // Actually, simple percentage relative to max works visually
        return {
            w1: `${(val1 / max) * 100}%`,
            w2: `${(val2 / max) * 100}%`
        };
    };

    return (
        <section id="compare" className="compare-section section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">
                        Country <span className="gradient-text">Comparison</span> Tool
                    </h2>
                    <p className="section-subtitle">
                        Select two countries to run a side-by-side analysis of their structural inequality metrics and inclusive development patterns.
                    </p>
                </div>

                <div className="compare-container glass-panel">
                    <div className="compare-selectors">
                        <select
                            value={country1}
                            onChange={(e) => setCountry1(e.target.value)}
                            className="country-select"
                        >
                            {countryKeys.map(key => (
                                <option key={key} value={key}>{countryData[key].name}</option>
                            ))}
                        </select>

                        <div className="compare-icon">
                            <ArrowRightLeft size={24} />
                        </div>

                        <select
                            value={country2}
                            onChange={(e) => setCountry2(e.target.value)}
                            className="country-select"
                        >
                            {countryKeys.map(key => (
                                <option key={key} value={key}>{countryData[key].name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="compare-metrics">
                        {/* Metric 1: Gini Index */}
                        <div className="metric-row">
                            <div className="metric-label">Gini Index (Lower is More Equal)</div>
                            <div className="bars-container">
                                <div className="bar-wrapper">
                                    <span className="bar-val">{c1Data.gini}</span>
                                    <div className="compare-bar bar-1" style={{ width: calculateWidth(c1Data.gini, c2Data.gini).w1 }}></div>
                                </div>
                                <div className="bar-wrapper reverse">
                                    <div className="compare-bar bar-2" style={{ width: calculateWidth(c1Data.gini, c2Data.gini).w2 }}></div>
                                    <span className="bar-val">{c2Data.gini}</span>
                                </div>
                            </div>
                        </div>

                        {/* Metric 2: Concentration Ratio */}
                        <div className="metric-row">
                            <div className="metric-label">Income Concentration Ratio (Top 10% / Bottom 10%)</div>
                            <div className="bars-container">
                                <div className="bar-wrapper">
                                    <span className="bar-val">{c1Data.concentration}x</span>
                                    <div className="compare-bar bar-1" style={{ width: calculateWidth(c1Data.concentration, c2Data.concentration).w1 }}></div>
                                </div>
                                <div className="bar-wrapper reverse">
                                    <div className="compare-bar bar-2" style={{ width: calculateWidth(c1Data.concentration, c2Data.concentration).w2 }}></div>
                                    <span className="bar-val">{c2Data.concentration}x</span>
                                </div>
                            </div>
                        </div>

                        {/* Metric 3: GDP vs Median */}
                        <div className="metric-row">
                            <div className="metric-label">GDP per Capita vs Median Income ($)</div>
                            <div className="bars-container">
                                <div className="bar-wrapper double-bar">
                                    <div className="stat-group">
                                        <span className="bar-val">${c1Data.gdp.toLocaleString()} (GDP)</span>
                                        <div className="compare-bar bar-gdp" style={{ width: calculateWidth(c1Data.gdp, c2Data.gdp).w1 }}></div>
                                    </div>
                                    <div className="stat-group">
                                        <span className="bar-val">${c1Data.median.toLocaleString()} (Med)</span>
                                        <div className="compare-bar bar-median" style={{ width: calculateWidth(c1Data.median, c2Data.median).w1 }}></div>
                                    </div>
                                </div>
                                <div className="bar-wrapper double-bar reverse">
                                    <div className="stat-group reverse">
                                        <div className="compare-bar bar-gdp" style={{ width: calculateWidth(c1Data.gdp, c2Data.gdp).w2 }}></div>
                                        <span className="bar-val">${c2Data.gdp.toLocaleString()} (GDP)</span>
                                    </div>
                                    <div className="stat-group reverse">
                                        <div className="compare-bar bar-median" style={{ width: calculateWidth(c1Data.median, c2Data.median).w2 }}></div>
                                        <span className="bar-val">${c2Data.median.toLocaleString()} (Med)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Metric 4: Inclusive Score */}
                        <div className="metric-row">
                            <div className="metric-label">Inclusive Development Score (0-100)</div>
                            <div className="bars-container">
                                <div className="bar-wrapper">
                                    <span className="bar-val">{c1Data.inclusiveScore}</span>
                                    <div className="compare-bar bar-score" style={{ width: calculateWidth(c1Data.inclusiveScore, c2Data.inclusiveScore).w1 }}></div>
                                </div>
                                <div className="bar-wrapper reverse">
                                    <div className="compare-bar bar-score" style={{ width: calculateWidth(c1Data.inclusiveScore, c2Data.inclusiveScore).w2 }}></div>
                                    <span className="bar-val">{c2Data.inclusiveScore}</span>
                                </div>
                            </div>
                        </div>

                        {/* Rank display */}
                        <div className="compare-footer mt-4">
                            <div className="rank-box">
                                Inequality Rank: #{c1Data.rank}
                            </div>
                            <div className="rank-box">
                                Inequality Rank: #{c2Data.rank}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTool;
