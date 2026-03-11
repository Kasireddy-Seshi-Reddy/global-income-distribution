import { useState, useEffect, useContext } from 'react';
import { ShieldAlert } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const ModerationLogs = () => {
    const { token } = useContext(AuthContext);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch(`${API_URL}/admin/moderation-logs`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) setLogs(data.data);
            } catch (error) {
                console.error('Failed to fetch moderation logs', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, [token]);

    if (loading) return <div>Loading Audit Logs...</div>;

    return (
        <div className="admin-page fade-in-up">
            <h2 style={{ marginBottom: '2rem' }}>Moderation <span className="gradient-text">Audit Logs</span></h2>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Log ID</th>
                            <th>Action Date</th>
                            <th>Target User</th>
                            <th>Action Taken</th>
                            <th>Reason Given</th>
                            <th>Admin Executing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center' }}>No moderation actions have been recorded yet.</td></tr>
                        ) : logs.map(log => (
                            <tr key={log.LogID}>
                                <td>#{log.LogID}</td>
                                <td>{new Date(log.ActionDate).toLocaleString()}</td>
                                <td>
                                    {log.FullName}<br />
                                    <small style={{ color: 'var(--color-text-muted)' }}>{log.UserEmail}</small>
                                </td>
                                <td>
                                    <span className={`status-badge status-${log.ActionTaken.toLowerCase()}`}>
                                        <ShieldAlert size={12} style={{ display: 'inline', marginRight: '4px' }} />
                                        {log.ActionTaken}
                                    </span>
                                </td>
                                <td>{log.Reason}</td>
                                <td><small style={{ color: 'var(--color-text-muted)' }}>{log.AdminEmail}</small></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModerationLogs;
