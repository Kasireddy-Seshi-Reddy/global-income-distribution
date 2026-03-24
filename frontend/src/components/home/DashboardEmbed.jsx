import { useRef } from 'react';
import { Maximize, Info, Filter, PieChart } from 'lucide-react';
import './DashboardEmbed.css';

const DashboardEmbed = () => {
    const iframeRef = useRef(null);

    const openFullScreen = () => {
        if (iframeRef.current) {
            if (iframeRef.current.requestFullscreen) {
                iframeRef.current.requestFullscreen();
            } else if (iframeRef.current.webkitRequestFullscreen) { /* Safari */
                iframeRef.current.webkitRequestFullscreen();
            } else if (iframeRef.current.msRequestFullscreen) { /* IE11 */
                iframeRef.current.msRequestFullscreen();
            }
        }
    };
    return (
        <section id="dashboard" className="dashboard-section section">
            <div className="container">
                <div className="dashboard-header text-center">
                    <h2 className="section-title">
                        Interactive <span className="gradient-text">Power BI</span> Dashboard
                    </h2>
                    <p className="section-subtitle">
                        Explore the fully functional analytical report visualizing global inequality severity
                        and inclusive development metrics.
                    </p>
                </div>

                <div className="dashboard-layout">
                    <div className="dashboard-instructions glass-panel">
                        <h3><Info size={20} /> How to Use This Dashboard</h3>
                        <p>This Power BI dashboard is fully interactive. Selecting any data point will cross-filter all other visuals.</p>

                        <ul className="instruction-list">
                            <li>
                                <div className="inst-icon"><Filter size={18} /></div>
                                <div className="inst-text">
                                    <strong>Filter by Year:</strong> Use the timeline slicer at the top right to filter all measures by specific reporting years.
                                </div>
                            </li>
                            <li>
                                <div className="inst-icon"><Maximize size={18} /></div>
                                <div className="inst-text">
                                    <strong>Full Screen:</strong> Click the expand icon in the bottom right corner of the embed window for optimal viewing.
                                </div>
                            </li>
                            <li>
                                <div className="inst-icon"><PieChart size={18} /></div>
                                <div className="inst-text">
                                    <strong>Cross-filtering:</strong> Click on any country in the bar chart to see its specific Gini progression in the trend curves.
                                </div>
                            </li>
                        </ul>



                        <div className="full-screen-btn-wrapper">
                            <button className="btn btn-outline full-width" onClick={openFullScreen}>
                                <Maximize size={18} /> Enter Full Screen
                            </button>
                        </div>
                    </div>

                    <div className="dashboard-embed-container glass-panel">
                        <div className="iframe-container" style={{ width: '100%', height: '100%', minHeight: '400px', flexGrow: 1, borderRadius: '12px', overflow: 'hidden' }}>
                            <iframe 
                                ref={iframeRef}
                                title="Global Income Distribution Dashboard_Infosys" 
                                src="https://app.powerbi.com/view?r=eyJrIjoiODExYTdmYjEtYTU0OS00MDJhLTk0Y2EtODA4OTEwY2RmYzFmIiwidCI6ImUxNGU3M2ViLTUyNTEtNDM4OC04ZDY3LThmOWYyZTJkNWE0NiIsImMiOjEwfQ%3D%3D&pageName=fc57fd5d4d7fe021e329&navContentPaneEnabled=false" 
                                frameBorder="0" 
                                allowFullScreen={true}
                                style={{ width: '100%', height: '100%', border: 'none' }}
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardEmbed;
