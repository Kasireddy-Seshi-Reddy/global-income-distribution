import { useContext } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, MessageSquare, ShieldAlert, Download } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
    const location = useLocation();
    const { token } = useContext(AuthContext);

    const navItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/users', icon: <Users size={20} />, label: 'User Management' },
        { path: '/admin/session-analytics', icon: <Activity size={20} />, label: 'Session Analytics' },
        { path: '/admin/queries', icon: <MessageSquare size={20} />, label: 'User Queries' },
        { path: '/admin/moderation', icon: <ShieldAlert size={20} />, label: 'Moderation Logs' }
    ];

    const exportData = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success && data.data.length > 0) {
                const headers = Object.keys(data.data[0]).join(',');
                const csvData = data.data.map(row => Object.values(row).join(',')).join('\n');
                const blob = new Blob([`${headers}\n${csvData}`], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `UserAnalytics_${new Date().toISOString().split('T')[0]}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                alert("No data available to export.");
            }
        } catch (e) {
            console.error(e);
            alert("Failed to export data.");
        }
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                {navItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}

                <button
                    className="admin-nav-item"
                    onClick={exportData}
                    style={{ marginTop: 'auto', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                    <Download size={20} />
                    <span>Export Data</span>
                </button>
            </aside>

            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
