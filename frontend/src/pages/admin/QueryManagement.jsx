import { useState, useEffect, useContext } from 'react';
import { Check, Mail, MessageSquare } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

const QueryManagement = () => {
    const { token } = useContext(AuthContext);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQueries = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/queries`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) setQueries(data.data);
        } catch (error) {
            console.error('Failed to fetch queries', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, [token]);

    const handleResolve = async (queryId) => {
        const responseText = window.prompt("Enter your response/resolution notes for this query:");
        if (responseText === null) return; // User cancelled

        try {
            const response = await fetch(`${API_URL}/admin/queries/${queryId}/resolve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ adminResponse: responseText || 'Handled manually.' })
            });

            if (response.ok) {
                fetchQueries(); // Refresh list
            }
        } catch (error) {
            console.error(`Failed to resolve query`, error);
        }
    };

    if (loading) return <div>Loading Queries...</div>;

    return (
        <div className="admin-page fade-in-up">
            <h2 style={{ marginBottom: '2rem' }}>User <span className="gradient-text">Queries</span></h2>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sender</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No queries found in the database.</td></tr>
                        ) : queries.map(query => (
                            <tr key={query.QueryID}>
                                <td>#{query.QueryID}</td>
                                <td>
                                    <strong>{query.UserName}</strong><br />
                                    <small style={{ color: 'var(--color-text-muted)' }}>{query.UserEmail}</small>
                                </td>
                                <td>{query.Subject}</td>
                                <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {query.Message}
                                </td>
                                <td>
                                    <span className={`status-badge status-${query.ResponseStatus === 'Responded' ? 'active' : 'suspended'}`}>
                                        {query.ResponseStatus}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-group">
                                        <button
                                            className="action-btn"
                                            title="Mark as Resolved"
                                            onClick={() => handleResolve(query.QueryID)}
                                            disabled={query.ResponseStatus === 'Responded'}
                                        >
                                            {query.ResponseStatus === 'Responded' ? <Check size={16} color="#38D9A9" /> : <Mail size={16} />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QueryManagement;
