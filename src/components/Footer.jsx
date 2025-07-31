import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer id="contact-footer">
            <div className="container">
                {/* UPDATED: Heading changed */}
                <h3>CloudNotes</h3>
                <p className="footer-text">Your one-stop solution for academic success.</p>
                
                <div className="footer-links">
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                </div>

                <div className="social-links">
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                </div>
                {/* UPDATED: Copyright text changed */}
                <p className="copyright">&copy; 2025 CloudNotes. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;