import { useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin, // Redirects back to your app after password reset
            });
            if (error) throw error;
            setMessage('Password reset link sent! Please check your email.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Reset Your Password</h2>
                {message && <p className="success-message">{message}</p>}
                {error && <p className="error">{error}</p>}
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your registered email" required />
                <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            <div className="form-footer-link">
                <Link to="/login">Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;