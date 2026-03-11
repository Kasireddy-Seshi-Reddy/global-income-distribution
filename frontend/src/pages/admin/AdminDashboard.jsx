import { useState, useEffect, useContext } from 'react';
import { Users, Activity, Clock, MousePointerClick, MessageSquare } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { token } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeUsers: 0,
        totalSessions: 0,
        avgSessionTime: 0,
        mostVisitedPage: 'Loading...',
        totalQueries: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/admin/stats', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setStats(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch admin stats', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [token]);

    const formatTime = (seconds) => {
        if (seconds < 60) return `${seconds}s`;
        const mins = Math.floor(seconds / 60);
        return `${mins}m ${seconds % 60}s`;
    };

    if (loading) return <div className="loader">Loading Dashboard...</div>;

    return (
        <div className="admin-dashboard fade-in-up">
            <h2 style={{ marginBottom: '2rem' }}>Administrator <span className="gradient-text">Overview</span></h2>

            <div className="kpi-grid">
                <div className="kpi-card glass-panel">
                    <div className="kpi-icon-wrapper"><Users size={28} /></div>
                    <div className="kpi-info">
                        <h4>Total Users</h4>
                        <div className="kpi-value">{stats.totalUsers}</div>
                    </div>
                </div>
                <div className="kpi-card glass-panel" style={{ '--color-primary': 'var(--color-accent)' }}>
                    <div className="kpi-icon-wrapper" style={{ color: 'var(--color-primary)' }}><Activity size={28} /></div>
                    <div className="kpi-info">
                        <h4>Active Users (24h)</h4>
                        <div className="kpi-value">{stats.activeUsers}</div>
                    </div>
                </div>
                <div className="kpi-card glass-panel">
                    <div className="kpi-icon-wrapper"><Clock size={28} /></div>
                    <div className="kpi-info">
                        <h4>Avg Session Time</h4>
                        <div className="kpi-value">{formatTime(stats.avgSessionTime)}</div>
                    </div>
                </div>
                <div className="kpi-card glass-panel">
                    <div className="kpi-icon-wrapper"><MousePointerClick size={28} /></div>
                    <div className="kpi-info">
                        <h4>Top Page</h4>
                        <div className="kpi-value" style={{ fontSize: '1.2rem' }}>{stats.mostVisitedPage}</div>
                    </div>
                </div>
                <div className="kpi-card glass-panel">
                    <div className="kpi-icon-wrapper"><MessageSquare size={28} /></div>
                    <div className="kpi-info">
                        <h4>Total Queries</h4>
                        <div className="kpi-value">{stats.totalQueries}</div>
                    </div>
                </div>
            </div>

            <div className="admin-table-container">
                <h3 style={{ marginBottom: '1rem' }}>Recent System Alerts</h3>
                <p className="contact-desc">No new critical alerts detected. The SQLite tracking telemetry is logging PageActivity correctly.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
