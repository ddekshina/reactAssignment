import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <div style={{ fontSize: '120px', marginBottom: '1rem' }}>
                🔍
            </div>
            <h1 style={{ 
                fontSize: '3rem',
                color: '#333',
                marginBottom: '1rem'
            }}>
                404
            </h1>
            <h2 style={{
                fontSize: '1.5rem',
                color: '#666',
                marginBottom: '2rem',
                fontWeight: 'normal'
            }}>
                Oops! Page Not Found
            </h2>
            <p style={{
                color: '#666',
                fontSize: '18px',
                marginBottom: '2rem',
                maxWidth: '500px'
            }}>
                The page you're looking for doesn't exist or has been moved. 
                Let's get you back on track!
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link
                    to="/"
                    style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    📊 Go to Dashboard
                </Link>
                <Link
                    to="/products"
                    style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        textDecoration: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.2s ease'
                    }}
                >
                    📦 View Products
                </Link>
            </div>
        </div>
    );
}