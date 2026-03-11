import { useState, useEffect, useContext } from 'react';
import { Activity, Clock } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const SessionAnalytics = () => {
    const { token } = useContext(AuthContext);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const res = await fetch(`${API_URL}/admin/sessions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) setSessions(data.data);
            } catch (error) {
                console.error('Failed to fetch sessions', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, [token]);

    if (loading) return <div>Loading Analytics...</div>;

    return (
        <div className="admin-page fade-in-up">
            <h2 style={{ marginBottom: '2rem' }}>Session <span className="gradient-text">Analytics</span></h2>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Session ID</th>
                            <th>User (ID)</th>
                            <th>Login Time</th>
                            <th>Duration</th>
                            <th>Pages Visited</th>
                            <th>Device / IP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No sessions logged yet.</td></tr>
                        ) : sessions.map(session => (
                            <tr key={session.SessionID}>
                                <td>#{session.SessionID}</td>
                                <td>
                                    {session.FullName || 'Anonymous'}<br />
                                    <small style={{ color: 'var(--color-text-muted)' }}>User ID: {session.UserID}</small>
                                </td>
                                <td>{new Date(session.LoginTime).toLocaleString()}</td>
                                <td>
                                    {session.SessionDuration ? (
                                        <><Clock size={14} style={{ display: 'inline', marginRight: '4px' }} />{Math.floor(session.SessionDuration / 60)}m {session.SessionDuration % 60}s</>
                                    ) : (
                                        <span className="status-badge status-active">Active Now</span>
                                    )}
                                </td>
                                <td><Activity size={14} style={{ display: 'inline', marginRight: '4px' }} /> {session.PagesVisited || 1}</td>
                                <td>
                                    <small style={{ opacity: 0.8 }}>{session.DeviceType ? session.DeviceType.substring(0, 30) + '...' : 'Unknown'}</small><br />
                                    <small style={{ color: 'var(--color-text-muted)' }}>{session.IP_Address}</small>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SessionAnalytics;
