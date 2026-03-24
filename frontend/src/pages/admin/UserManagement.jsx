import { useState, useEffect, useContext } from 'react';
import { ShieldAlert, Ban, Lock, RefreshCw } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../../config';

const UserManagement = () => {
    const { token } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) setUsers(data.data);
        } catch (error) {
            console.error('Failed to fetch users', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [token]);

    const handleAction = async (userId, actionName) => {
        if (!window.confirm(`Are you sure you want to ${actionName} this user?`)) return;

        try {
            const response = await fetch(`${API_URL}/admin/users/${userId}/moderate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ action: actionName, reason: `Admin triggered ${actionName}` })
            });

            if (response.ok) {
                fetchUsers(); // Refresh list after action
            }
        } catch (error) {
            console.error(`Failed to ${actionName} user`, error);
        }
    };

    if (loading) return <div>Loading Users...</div>;

    return (
        <div className="admin-page fade-in-up">
            <h2 style={{ marginBottom: '2rem' }}>User <span className="gradient-text">Management</span></h2>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Time Spent</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.UserID}>
                                <td>#{user.UserID}</td>
                                <td>{user.FullName}</td>
                                <td>{user.Email}</td>
                                <td>{user.Role}</td>
                                <td>
                                    <span className={`status-badge status-${(user.AccountStatus || 'active').toLowerCase()}`}>
                                        {user.AccountStatus || 'Active'}
                                    </span>
                                </td>
                                <td>{Math.floor((user.TotalTimeSpentOnWebsite || 0) / 60)} mins</td>
                                <td>
                                    <div className="action-group">
                                        <button
                                            className="action-btn"
                                            title="Suspend User"
                                            onClick={() => handleAction(user.UserID, 'Suspend')}
                                            disabled={user.Role === 'Admin'}
                                        ><Lock size={16} /></button>
                                        <button
                                            className="action-btn"
                                            title="Ban User"
                                            onClick={() => handleAction(user.UserID, 'Ban')}
                                            disabled={user.Role === 'Admin'}
                                        ><Ban size={16} /></button>
                                        <button
                                            className="action-btn"
                                            title="Restore User"
                                            onClick={() => handleAction(user.UserID, 'Restore')}
                                            disabled={user.Role === 'Admin'}
                                        ><RefreshCw size={16} /></button>
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

export default UserManagement;
