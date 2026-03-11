import { useEffect, useRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config';


export const useAnalytics = () => {
    const location = useLocation();
    const { isAuthenticated, token } = useContext(AuthContext);
    const pagesVisited = useRef(0);
    const currentSessionId = useRef(localStorage.getItem('global_ineq_session_id'));
    const lastPageEnterTime = useRef(Date.now());
    const lastPageUrl = useRef(location.pathname);

    // End previous page visit
    const logPageExit = async (url, enterTime) => {
        if (!isAuthenticated || !token) return;
        const duration = Math.floor((Date.now() - enterTime) / 1000);

        try {
            await fetch(`${API_URL}/track/page`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    pageName: url === '/' ? 'Home' : url.substring(1).split('/')[0] || 'Unknown',
                    pageUrl: url,
                    durationSpent: duration
                })
            });
        } catch (e) { console.error('Failed to log page tracking', e); }
    };

    // Track Route Changes
    useEffect(() => {
        if (!isAuthenticated) return;

        // Log the exit for the PREVIOUS page
        logPageExit(lastPageUrl.current, lastPageEnterTime.current);

        // Setup the NEW page
        pagesVisited.current += 1;
        lastPageUrl.current = location.pathname;
        lastPageEnterTime.current = Date.now();

    }, [location.pathname, isAuthenticated, token]);

    // Cleanup when component unmounts or browser closes
    useEffect(() => {
        const handleBeforeUnload = () => {
            // We can't easily wait for promises here, but we can do a quick beacon or simple fetch
            if (isAuthenticated && currentSessionId.current) {
                const duration = Math.floor((Date.now() - lastPageEnterTime.current) / 1000);
                const data = JSON.stringify({
                    pageName: lastPageUrl.current === '/' ? 'Home' : lastPageUrl.current.substring(1),
                    pageUrl: lastPageUrl.current,
                    durationSpent: duration
                });
                navigator.sendBeacon(`${API_URL}/track/page`, data);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isAuthenticated]);

    const startSession = async (userToken) => {
        try {
            const res = await fetch(`${API_URL}/track/session/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken || token}`
                },
                body: JSON.stringify({
                    deviceType: navigator.userAgent.substring(0, 100),
                    ipAddress: 'Client',
                    location: 'Unknown'
                })
            });
            const data = await res.json();
            if (data.success) {
                currentSessionId.current = data.sessionId;
                localStorage.setItem('global_ineq_session_id', data.sessionId);
                pagesVisited.current = 1;
            }
        } catch (e) {
            console.error('Failed to start session', e);
        }
    };

    const endSession = async () => {
        if (!currentSessionId.current || !token) return;

        // Ensure final page is logged before ending session
        await logPageExit(lastPageUrl.current, lastPageEnterTime.current);

        try {
            await fetch(`${API_URL}/track/session/end`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    sessionId: currentSessionId.current,
                    pagesVisited: pagesVisited.current
                })
            });
            currentSessionId.current = null;
            localStorage.removeItem('global_ineq_session_id');
        } catch (e) {
            console.error('Failed to end session', e);
        }
    };

    return { startSession, endSession };
};
