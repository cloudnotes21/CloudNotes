import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';

const AdminLoginPage = () => {
    // ==================================================
    // !! अपना एडमिन ईमेल यहाँ भी डालें !!
    // ==================================================
    const adminEmail = "info.cloudnotes@gmail.com";

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Step 1: Try to log in with Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            // Step 2: Check if the logged-in user is the admin
            if (data.user && data.user.email === adminEmail) {
                // If yes, redirect to the dashboard
                navigate('/admin/dashboard');
            } else {
                // If it's a normal user, log them out for security and show an error
                // Or redirect them to their profile. Let's redirect to profile.
                navigate('/profile'); 
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            <div className="form-container admin-login-container">
                <Link to="/" className="logo admin-logo">CloudNotes</Link>
                <form onSubmit={handleLogin}>
                    <h2>Admin Portal Login</h2>
                    {error && <p className="error">{error}</p>}
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Admin Email" 
                        required 
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        required 
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging In...' : 'Login as Admin'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;