import { createContext, useState, useEffect } from 'react';
import { API_URL } from '../config';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('global_ineq_token');
        const storedUser = localStorage.getItem('global_ineq_user');

        if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem('global_ineq_token', data.token);
                localStorage.setItem('global_ineq_user', JSON.stringify(data.user));
                setIsAuthenticated(true);
                setUser(data.user);

                // Start Session Tracking
                fetch(`${API_URL}/track/session/start`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.token}` },
                    body: JSON.stringify({ deviceType: navigator.userAgent.substring(0, 100), ipAddress: 'Client', location: 'Unknown' })
                })
                    .then(res => res.json())
                    .then(sessionData => {
                        if (sessionData.success) localStorage.setItem('global_ineq_session_id', sessionData.sessionId);
                    }).catch(e => console.error(e));

                return { success: true };
            }
            return { success: false, message: data.message || 'Login failed' };
        } catch (error) {
            return { success: false, message: 'Server connection error' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await response.json();

            if (response.ok && data.success) {
                return { success: true };
            }
            return { success: false, message: data.message || 'Registration failed' };
        } catch (error) {
            return { success: false, message: 'Server connection error' };
        }
    };

    const logout = () => {
        const token = localStorage.getItem('global_ineq_token');
        const sessionId = localStorage.getItem('global_ineq_session_id');

        if (token && sessionId) {
            fetch(`${API_URL}/track/session/end`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ sessionId, pagesVisited: 1 })
            }).catch(e => console.error(e));
        }

        localStorage.removeItem('global_ineq_session_id');
        localStorage.removeItem('global_ineq_token');
        localStorage.removeItem('global_ineq_user');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, register, token: localStorage.getItem('global_ineq_token') }}>
            {children}
        </AuthContext.Provider>
    );
};
