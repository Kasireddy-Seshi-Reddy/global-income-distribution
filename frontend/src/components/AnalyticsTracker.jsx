import { useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config';

export default function AnalyticsTracker() {
    const location = useLocation();
    const { isAuthenticated, token } = useContext(AuthContext);
    const lastUrl = useRef(location.pathname);
    const enterTime = useRef(Date.now());

    useEffect(() => {
        if (!isAuthenticated || !token) return;

        // When the URL changes, this cleanup function runs, logging the exit time of the previous page
        return () => {
            const duration = Math.floor((Date.now() - enterTime.current) / 1000);
            const pageName = lastUrl.current === '/' ? 'Home' : lastUrl.current.substring(1).split('/')[0];
            const sessionId = localStorage.getItem('global_ineq_session_id');

            fetch(`${API_URL}/track/page`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    pageName,
                    pageUrl: lastUrl.current,
                    durationSpent: duration,
                    sessionId: sessionId ? parseInt(sessionId) : null
                })
            }).catch(e => console.error('Failed to log page view:', e));
        };
    }, [location.pathname, isAuthenticated, token]);

    useEffect(() => {
        // After cleanup logs the old page, set up timers for the new page
        lastUrl.current = location.pathname;
        enterTime.current = Date.now();
    }, [location.pathname]);

    return null;
}
