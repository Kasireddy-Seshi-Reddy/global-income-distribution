import { useState, useContext, useEffect } from 'react';
import { X, User, Save, RotateCcw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '../config';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose }) => {
    const { logout, user: authUser } = useContext(AuthContext);
    
    // Local user state derived from context
    const [user, setUser] = useState({
        name: authUser?.FullName || 'User',
        email: authUser?.Email || '',
        role: authUser?.Role || 'User',
        organization: 'Infosys Springboard'
    });

    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);
    const [formData, setFormData] = useState({ ...user });
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [passError, setPassError] = useState('');
    const [passSuccess, setPassSuccess] = useState('');
    const [isUpdatingPass, setIsUpdatingPass] = useState(false);

    // Update local state when auth data loads
    useEffect(() => {
        if (authUser) {
            const authData = {
                name: authUser.FullName || 'User',
                email: authUser.Email || '',
                role: authUser.Role || 'User',
                organization: 'Infosys Springboard'
            };
            setUser(authData);
            setFormData(authData);
        }
    }, [authUser]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        setUser({ ...formData });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({ ...user });
        setIsEditing(false);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            setPassError('New passwords do not match');
            return;
        }
        if (passwords.new.length < 6) {
            setPassError('New password must be at least 6 characters');
            return;
        }

        setIsUpdatingPass(true);
        setPassError('');
        setPassSuccess('');

        try {
            const token = localStorage.getItem('global_ineq_token');
            const res = await fetch(`${API_URL}/auth/change-password`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: passwords.current,
                    newPassword: passwords.new
                })
            });
            const data = await res.json();
            if (data.success) {
                setPassSuccess('Password updated successfully!');
                setPasswords({ current: '', new: '', confirm: '' });
                setTimeout(() => {
                    setPassSuccess('');
                    setShowSecurity(false);
                }, 2000);
            } else {
                setPassError(data.message);
            }
        } catch (err) {
            setPassError('Server connection error');
        } finally {
            setIsUpdatingPass(false);
        }
    };

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={e => e.stopPropagation()}>
                <div className="profile-header">
                    <h3><User size={24} className="gradient-text" /> Account Details</h3>
                    <button className="close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <div className="profile-avatar-section">
                    <div className="avatar-large">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=16c79a&color=fff&size=128`} alt="User Avatar" />
                    </div>
                    {isEditing ? (
                        <p className="gradient-text">Editing Profile...</p>
                    ) : (
                        <h4>{user.name}</h4>
                    )}
                </div>

                <div className="profile-form">
                    <div className="profile-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <button 
                            className={`tab-btn ${!showSecurity ? 'active' : ''}`} 
                            onClick={() => setShowSecurity(false)}
                            style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', color: !showSecurity ? 'var(--color-primary)' : '#fff', borderBottom: !showSecurity ? '2px solid var(--color-primary)' : 'none', cursor: 'pointer' }}
                        >
                            Profile
                        </button>
                        <button 
                            className={`tab-btn ${showSecurity ? 'active' : ''}`} 
                            onClick={() => setShowSecurity(true)}
                            style={{ padding: '0.5rem 1rem', background: 'none', border: 'none', color: showSecurity ? 'var(--color-primary)' : '#fff', borderBottom: showSecurity ? '2px solid var(--color-primary)' : 'none', cursor: 'pointer' }}
                        >
                            Security
                        </button>
                    </div>

                    {!showSecurity ? (
                        <>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="form-group">
                                <label>Organization</label>
                                <input
                                    type="text"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="form-group">
                                <label>Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div className="profile-actions">
                                {isEditing ? (
                                    <>
                                        <button className="btn btn-outline" onClick={handleCancel}>
                                            <RotateCcw size={18} /> Cancel
                                        </button>
                                        <button className="btn btn-primary" onClick={handleSave}>
                                            <Save size={18} /> Save Changes
                                        </button>
                                    </>
                                ) : (
                                    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handlePasswordChange} className="security-form">
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({...passwords, current: e.target.value})}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    value={passwords.new}
                                    onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwords.confirm}
                                    onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            
                            {passError && <p className="error-msg" style={{ color: '#FF6B6B', fontSize: '0.85rem', marginTop: '0.5rem' }}>{passError}</p>}
                            {passSuccess && <p className="success-msg" style={{ color: 'var(--color-primary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{passSuccess}</p>}

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isUpdatingPass}>
                                {isUpdatingPass ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    )}

                    {!isEditing && (
                        <button
                            className="btn btn-outline"
                            style={{ width: '100%', borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}
                            onClick={() => {
                                logout();
                                onClose();
                                navigate('/login');
                            }}
                        >
                            <LogOut size={18} /> Log Out
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
