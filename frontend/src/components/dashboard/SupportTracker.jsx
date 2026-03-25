import { useState, useEffect, useContext } from 'react';
import { MessageSquare, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../../config';
import './SupportTracker.css';

const SupportTracker = () => {
    const { token } = useContext(AuthContext);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyQueries = async () => {
            if (!token) return;
            try {
                const res = await fetch(`${API_URL}/queries/my-queries`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    setQueries(data.data);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                console.error('Failed to fetch support history', err);
                setError('Could not load your support history.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyQueries();
    }, [token]);

    if (!token) return null;

    if (loading) return (
        <div className="support-tracker-container text-center">
            <div className="loading-spinner" style={{ margin: '2rem auto' }}></div>
            <p>Loading your support history...</p>
        </div>
    );

    return (
        <div className="support-tracker-container">
            <div className="support-tracker-header">
                <span className="gradient-text"><MessageSquare size={28} /></span>
                <h2>Support & <span className="gradient-text">Feedback History</span></h2>
            </div>

            {error && (
                <div className="error-message" style={{ padding: '1rem', background: 'rgba(255, 107, 107, 0.1)', color: '#FF6B6B', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertCircle size={18} /> {error}
                </div>
            )}

            <div className="query-list">
                {queries.length === 0 ? (
                    <div className="no-queries">
                        <p>You haven't submitted any research queries yet.</p>
                        <p style={{ fontSize: '0.85rem' }}>Use the Contact section if you have questions about the data.</p>
                    </div>
                ) : (
                    queries.map((query) => (
                        <div key={query.QueryID} className="query-card">
                            <div className="query-card-header">
                                <div>
                                    <div className="query-subject">{query.Subject}</div>
                                    <div className="query-date">Submitted on {new Date(query.SubmittedDate).toLocaleDateString()}</div>
                                </div>
                                <div className={`status-indicator status-${query.ResponseStatus === 'Responded' ? 'responded' : 'pending'}`}>
                                    {query.ResponseStatus === 'Responded' ? (
                                        <><CheckCircle2 size={12} /> Responded</>
                                    ) : (
                                        <><Clock size={12} /> Pending</>
                                    )}
                                </div>
                            </div>
                            
                            <div className="query-body">
                                {query.Message}
                            </div>

                            {query.AdminResponse && (
                                <div className="admin-response-box">
                                    <span className="admin-response-label">Response from Intelligence Team</span>
                                    <div className="admin-response-text">
                                        {query.AdminResponse}
                                    </div>
                                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'rgba(56, 217, 169, 0.7)' }}>
                                        Answered on {new Date(query.ResponseDate).toLocaleString()}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SupportTracker;
