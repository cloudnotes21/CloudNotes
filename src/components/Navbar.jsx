import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navigate = useNavigate();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        checkUser();
        return () => subscription.unsubscribe();
    }, []);
    
    // ... (rest of the component logic remains the same as previous full version)
    useEffect(() => {
        document.body.className = theme === 'dark' ? 'dark-mode' : '';
        localStorage.setItem('theme', theme);
    }, [theme]);
    const handleLogout = async () => { await supabase.auth.signOut(); navigate('/login'); };
    const toggleTheme = () => { setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light'); };
    const handleNavClick = (e, targetId) => {
        if (window.location.pathname === '/') {
            e.preventDefault();
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => { document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }); }, 100);
        }
    };

    return (
        <header>
            <nav className="container">
                <Link to="/" className="logo">CloudNotes</Link>
                <div className="nav-menu">
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/notes">Notes</Link></li>
                        <li><a href="/#tools" onClick={(e) => handleNavClick(e, 'tools')}>Tools</a></li>
                        {/* The conditional Admin link is now removed */}
                    </ul>
                    <div className="nav-actions">
                        {user ? (
                            <>
                                <Link to="/profile" className="nav-profile-link">Profile</Link>
                                <button onClick={handleLogout} className="nav-action-button">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/signup" className="nav-signup-button">Sign Up</Link>
                                <Link to="/login" className="nav-action-button">Login</Link>
                            </>
                        )}
                        <button id="theme-toggle-btn" onClick={toggleTheme}><i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i></button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;