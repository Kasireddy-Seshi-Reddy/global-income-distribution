import { useState, useContext, useEffect } from 'react';
import { X, User, Save, RotateCcw, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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
    const [formData, setFormData] = useState({ ...user });

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

                    {!isEditing && (
                        <button
                            className="btn btn-outline"
                            style={{ width: '100%', borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}
                            onClick={() => {
                                logout();
                                onClose();
                                navigate('/');
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
