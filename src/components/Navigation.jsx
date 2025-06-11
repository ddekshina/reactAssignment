import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

export default function Navigation() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    const isActive = (path) => location.pathname === path;

    const navLinkStyle = (path) => ({
        textDecoration: 'none',
        padding: '0.75rem 1rem',
        borderRadius: '4px',
        color: isActive(path) ? 'white' : '#333',
        backgroundColor: isActive(path) ? '#007bff' : 'transparent',
        fontWeight: isActive(path) ? 'bold' : 'normal',
        transition: 'all 0.2s ease'
    });

    return (
        <nav style={{
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '1rem 2rem',
            marginBottom: '0'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <h2 style={{ margin: 0, color: '#007bff' }}>CRM Dashboard</h2>
                    <ul style={{ 
                        display: "flex", 
                        listStyle: "none", 
                        gap: '1rem',
                        margin: 0,
                        padding: 0
                    }}>
                        <li>
                            <Link to="/" style={navLinkStyle('/')}>
                                📊 Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" style={navLinkStyle('/products')}>
                                📦 Products
                            </Link>
                        </li>
                    </ul>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {user && (
                        <span style={{ 
                            color: '#666',
                            fontSize: '14px'
                        }}>
                            Welcome, {user.firstName} {user.lastName}
                        </span>
                    )}
                    <button
                        onClick={handleLogout}
                        style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}