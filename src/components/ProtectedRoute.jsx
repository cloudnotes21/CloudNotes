import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        fetchUser();
    }, []);

    if (loading) {
        return <div className="page-container"><h2>Loading...</h2></div>;
    }

    // If a user is logged in, show the requested page (Outlet).
    // Otherwise, redirect them to the login page.
    return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;