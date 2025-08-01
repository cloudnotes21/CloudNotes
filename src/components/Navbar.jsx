import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // NEW: State for mobile menu
    const navigate = useNavigate();
    
    // ... (rest of the component logic remains the same)
    const adminEmail = "your-admin-email@example.com";
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => { setUser(session?.user ?? null); });
        const checkUser = async () => { const { data: { user } } = await supabase.auth.getUser(); setUser(user); };
        checkUser();
        return () => subscription.unsubscribe();
    }, []);
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
        setIsMenuOpen(false); // Close mobile menu on click
    };

    return (
        <header>
            <nav className="container">
                <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>CloudNotes</Link>

                {/* Desktop Menu */}
                <div className="nav-menu-desktop">
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/notes">Notes</Link></li>
                        <li><a href="/#tools" onClick={(e) => handleNavClick(e, 'tools')}>Tools</a></li>
                        {user && user.email === adminEmail && (<li><Link to="/admin">Admin</Link></li>)}
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

                {/* Mobile Menu Icon (Hamburger) */}
                <button className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </button>
            </nav>
            
            {/* Mobile Menu Dropdown */}
            <div className={`nav-menu-mobile ${isMenuOpen ? 'active' : ''}`}>
                <ul className="nav-links-mobile">
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/notes" onClick={() => setIsMenuOpen(false)}>Notes</Link></li>
                    <li><a href="/#tools" onClick={(e) => handleNavClick(e, 'tools')}>Tools</a></li>
                    {user && user.email === adminEmail && (<li><Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link></li>)}
                </ul>
                <div className="nav-actions-mobile">
                    {user ? (
                        <>
                            <Link to="/profile" className="nav-profile-link" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                            <button onClick={handleLogout} className="nav-action-button">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="nav-signup-button" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                            <Link to="/login" className="nav-action-button" onClick={() => setIsMenuOpen(false)}>Login</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;