import React, { useEffect } from 'react';
import { BarChart2 } from 'lucide-react';
import DashboardEmbed from '../components/home/DashboardEmbed';
import Visualizations from '../components/home/Visualizations';
import ComparisonTool from '../components/home/ComparisonTool';
import SupportTracker from '../components/dashboard/SupportTracker';
import './Dashboard.css';

const Dashboard = () => {
    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="dashboard-page fade-in">
            <div className="dashboard-page-header glass-panel">
                <div className="container text-center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <span className="gradient-text auth-logo-icon" style={{ margin: 0 }}><BarChart2 size={40} /></span>
                        <h1 style={{ margin: 0 }}>Inequality Intelligence <span className="gradient-text">Dashboard</span></h1>
                    </div>
                </div>
            </div>

            <div className="dashboard-page-content">
                <DashboardEmbed />
                <Visualizations />
                <ComparisonTool />
                <SupportTracker />
            </div>
        </div>
    );
};

export default Dashboard;
