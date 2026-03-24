import { FileText, ChevronRight, CheckCircle } from 'lucide-react';
import './Report.css';

const Report = () => {
    return (
        <section id="report" className="report-section section">
            <div className="container">
                <div className="report-grid">
                    <div className="report-content">
                        <h2 className="section-title text-left">
                            Research <span className="gradient-text">Report</span>
                        </h2>
                        <p className="section-subtitle text-left">
                            A comprehensive breakdown of data engineering,
                            analytical modeling, and policy interpretations.
                        </p>

                        <div className="report-toc">
                            <div className="toc-item">
                                <CheckCircle size={18} className="text-secondary" />
                                <span>Executive Summary</span>
                            </div>
                            <div className="toc-item">
                                <CheckCircle size={18} className="text-secondary" />
                                <span>Data Preparation & Structuring</span>
                            </div>
                            <div className="toc-item">
                                <CheckCircle size={18} className="text-secondary" />
                                <span>Analytical Modeling (DAX Logic)</span>
                            </div>
                            <div className="toc-item">
                                <CheckCircle size={18} className="text-secondary" />
                                <span>Dashboard Layout Design</span>
                            </div>
                            <div className="toc-item">
                                <CheckCircle size={18} className="text-secondary" />
                                <span>Key Findings & Policy Implications</span>
                            </div>
                        </div>

                        <div className="report-actions">
                            <a href="#downloads" className="btn btn-primary">
                                Download Full Report <FileText size={18} />
                            </a>
                            <a href="#contact" className="btn btn-outline">
                                Discuss Findings <ChevronRight size={18} />
                            </a>
                        </div>
                    </div>

                    <div className="report-preview glass-panel">
                        <div className="report-page">
                            <h3 className="doc-title">Project Documentation: Interactive Analytics Dashboard</h3>
                            <div className="doc-author">Author: Infosys Intern Team | Infosys Springboard</div>
                            <p className="doc-text">
                                The objective of this project is to create an interactive analytics dashboard for exploring global income distribution patterns. Using Power BI, we implement a robust data engineering framework derived from Merged_sheet.xlsx spanning multiple socioeconomic indicators.
                            </p>
                            <h4 className="doc-subtitle">1. Introduction</h4>
                            <p className="doc-text">
                                Inequality is a structural limitation to human capital development. By overlaying GDP figures against Median Income thresholds and Gini coefficients, this project highlights...
                            </p>
                            <div className="read-more-fade"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Report;
