import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        // If no user, redirect to login
        navigate('/login');
      }
      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <div className="page-container"><h2>Loading Profile...</h2></div>;
  }
  
  return (
    <div className="page-container">
      <h1>Your Profile</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user.id}</p>
      <p><strong>Last Signed In:</strong> {new Date(user.last_sign_in_at).toLocaleString()}</p>
    </div>
  );
};

export default ProfilePage;