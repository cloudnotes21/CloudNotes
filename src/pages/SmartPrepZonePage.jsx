import React from 'react';
import { Link } from 'react-router-dom';

const SmartPrepZonePage = () => {
    return (
        <div className="page-container">
            <div className="coming-soon-container" data-aos="fade-up">
                <i className="fas fa-rocket fa-3x"></i>
                <h1>SmartPrep Zone is Coming Soon!</h1>
                <p>
                    We are working hard to bring you a dedicated space for exam preparation. Soon, you will find important questions, previous year question analysis, and key topics for all your subjects right here.
                </p>
                <p>Stay tuned!</p>
                <Link to="/" className="button-primary">Go Back to Home</Link>
            </div>
        </div>
    );
};

export default SmartPrepZonePage;