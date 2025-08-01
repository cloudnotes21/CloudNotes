import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    // =================================================================
    // !! सबसे ज़रूरी: यहाँ अपना असली एडमिन ईमेल डालें !!
    // =================================================================
    const adminEmail = "info.cloudnotes@gmail.com"; 

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    // चेक करें: क्या यूज़र लॉग-इन है और क्या वह एडमिन है?
    // अगर हाँ, तो डैशबोर्ड दिखाओ।
    // वरना, उसे होम पेज पर वापस भेज दो।
    return user && user.email === adminEmail ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;