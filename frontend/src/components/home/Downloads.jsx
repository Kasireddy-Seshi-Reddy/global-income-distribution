import { Download, FileDown, FileSpreadsheet, Lock } from 'lucide-react';
import './Downloads.css';

const Downloads = () => {
    return (
        <section id="downloads" className="downloads-section section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">
                        <span className="gradient-text">Download</span> Assets
                    </h2>
                    <p className="section-subtitle">
                        Access the raw data, documentation, and visualization files behind the Global Income Inequality Intelligence Portal.
                    </p>
                </div>

                <div className="downloads-grid">
                    <div className="download-card glass-panel">
                        <div className="card-icon excel-icon">
                            <FileSpreadsheet size={32} />
                        </div>
                        <h3 className="card-title">Merged Dataset</h3>
                        <p className="card-desc">
                            The cleaned, structured dataset used for all analytical models. Includes Gini, Medians, and GDP arrays.
                        </p>
                        <div className="card-meta">
                            <span>Merged_sheet.xlsx</span>
                            <span>2.4 MB</span>
                        </div>
                        <a href="https://1drv.ms/x/c/597d31b69ede844f/IQAm0F9UjuCnSqq743_RiSckAWlXnwb64_XarWFJPtHdbzs?e=si0fH7" target="_blank" rel="noopener noreferrer" className="btn btn-outline full-width" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                            <Download size={18} /> Download Dataset
                        </a>
                    </div>

                    <div className="download-card glass-panel">
                        <div className="card-icon pbi-icon">
                            <FileDown size={32} />
                        </div>
                        <h3 className="card-title">Power BI Dashboard</h3>
                        <p className="card-desc">
                            The fully interactive .pbix file containing the dataset logic, DAX measures, and dashboard layouts.
                        </p>
                        <div className="card-meta">
                            <span>InfosysProjectDashboard.pbix</span>
                            <span>Protected</span>
                        </div>
                        <button className="btn btn-outline full-width" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                            <Lock size={18} /> Request Access
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Downloads;
