import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import HeroBackground from '../components/HeroBackground';

const HomePage = () => {
    const [latestSubjects, setLatestSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const createDirectDownloadLink = (googleDriveLink) => {
        try {
            if (!googleDriveLink || !googleDriveLink.includes('drive.google.com')) return googleDriveLink;
            const fileId = googleDriveLink.split('/d/')[1].split('/')[0];
            return `https://drive.google.com/uc?export=download&id=${fileId}`;
        } catch (error) {
            console.error("Invalid Google Drive link format:", googleDriveLink);
            return googleDriveLink;
        }
    };

    useEffect(() => {
        const fetchLatestSubjects = async () => {
            try {
                const { data, error } = await supabase.from('subjects').select('*').order('created_at', { ascending: false }).limit(4);
                if (error) throw error;
                setLatestSubjects(data);
            } catch (error) {
                console.error("Error fetching latest subjects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLatestSubjects();
    }, []);

    return (
        <main>
            <section className="hero">
                <HeroBackground />
                <div className="hero-content container" data-aos="fade-up">
                    <h1>Your College Studies, Simplified & Amplified.</h1>
                    <p>All your semester notes, college updates, and powerful tools, meticulously organized in one place.</p>
                    <Link to="/notes" className="cta-button">Explore Notes &rarr;</Link>
                </div>
            </section>
            
            <section id="features" className="features-section">
                <div className="container">
                    <h2 data-aos="fade-up">Core Features</h2>
                    <div className="features-grid">
                        {/* CORRECTED: All cards are now Links pointing to the correct pages */}
                        <Link to="/notes" className="feature-card" data-aos="fade-up" data-aos-delay="200" style={{textDecoration: 'none'}}>
                            <i className="fas fa-star"></i>
                            <h3>SmartPrep Zone</h3>
                            <p>Get IMP Questions and PYQ analysis for exams. (Login Required)</p>
                        </Link>
                        <Link to="/request-note" className="feature-card" data-aos="fade-up" data-aos-delay="200" style={{textDecoration: 'none'}}>
                            <i className="fas fa-question-circle"></i>
                            <h3>Request a Note</h3>
                            <p>If a note is missing, easily submit a request for it. (Login Required)</p>
                        </Link>
                        <Link to="/updates" className="feature-card" data-aos="fade-up" data-aos-delay="300" style={{textDecoration: 'none'}}>
                            <i className="fas fa-bell"></i>
                            <h3>College Updates</h3>
                            <p>Stay informed with official announcements. (Login Required)</p>
                        </Link>
                        <Link to="/reminders" className="feature-card" data-aos="fade-up" data-aos-delay="400" style={{textDecoration: 'none'}}>
                            <i className="fas fa-clock"></i>
                            <h3>Study Reminders</h3>
                            <p>Set browser notifications to stay disciplined. (Login Required)</p>
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* The rest of the page remains the same */}
            <section id="tools" className="tools-section">
                <div className="container">
                    <h2 data-aos="fade-up">Useful Tools for You</h2>
                    <div className="tools-grid">
                        <div className="tool-card" data-aos="fade-up" data-aos-delay="100"><i className="fas fa-file-pdf"></i><div><h4>PDF Toolkit</h4><p>Compress, merge, edit, and create PDFs with ease.</p></div></div>
                        <div className="tool-card" data-aos="fade-up" data-aos-delay="200"><i className="fas fa-image"></i><div><h4>Image Editor</h4><p>Quickly resize images, apply filters, and enhance quality.</p></div></div>
                    </div>
                </div>
            </section>

            <section id="latest-notes" className="latest-notes-section">
                <div className="container">
                    <h2 data-aos="fade-up">Latest Notes</h2>
                    {loading ? (
                        <p style={{textAlign: 'center'}}>Loading latest notes...</p>
                    ) : (
                        <>
                            <div className="notes-grid">
                                {latestSubjects.length > 0 ? (
                                    latestSubjects.map(subject => (
                                        <a href={createDirectDownloadLink(subject.pdfUrl)} download key={subject.id} className="note-card" data-aos="fade-up">
                                            <h3>{subject.name}</h3>
                                            <p>{subject.branch} - {subject.semester}</p>
                                        </a>
                                    ))
                                ) : (
                                    <p style={{textAlign: 'center'}}>No notes available yet. Check back soon!</p>
                                )}
                            </div>
                            <div className="view-all-container">
                                <Link to="/notes" className="view-all-button">View All Notes</Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section id="how-it-works" className="how-it-works-section">
                <div className="container">
                    <h2 data-aos="fade-up">Get Started in 3 Easy Steps</h2>
                    <div className="steps-grid">
                        <div className="step-card" data-aos="fade-up" data-aos-delay="100"><div className="step-number">1</div><i className="fas fa-user-plus"></i><h3>Create Account</h3><p>Sign up for a free account to access all features.</p></div>
                        <div className="step-card" data-aos="fade-up" data-aos-delay="200"><div className="step-number">2</div><i className="fas fa-search"></i><h3>Find Your Notes</h3><p>Easily browse or search for notes by your course and semester.</p></div>
                        <div className="step-card" data-aos="fade-up" data-aos-delay="300"><div className="step-number">3</div><i className="fas fa-download"></i><h3>Download & Request</h3><p>Download PDF notes or request any that are missing.</p></div>
                    </div>
                </div>
            </section>

            <section id="testimonials" className="testimonials-section">
                <div className="container">
                    <h2 data-aos="fade-up">What Our Users Say</h2>
                    <div className="testimonials-grid">
                        <div className="testimonial-card" data-aos="fade-up" data-aos-delay="100"><p>"This website is a lifesaver! Having all notes in one place saved me so much time before exams."</p><div className="testimonial-author"><img src="https://i.pravatar.cc/50?img=1" alt="User 1" /><span>- Priya Sharma, CSE</span></div></div>
                        <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200"><p>"The PDF tools are surprisingly powerful. I compressed all my assignment files right here. Highly recommended!"</p><div className="testimonial-author"><img src="https://i.pravatar.cc/50?img=2" alt="User 2" /><span>- Rohan Gupta, ECE</span></div></div>
                        <div className="testimonial-card" data-aos="fade-up" data-aos-delay="300"><p>"Finally, a platform that understands student needs. The college updates feature is incredibly useful."</p><div className="testimonial-author"><img src="https://i.pravatar.cc/50?img=3" alt="User 3" /><span>- Anjali Verma, ME</span></div></div>
                    </div>
                </div>
            </section>

            <section id="cta" className="cta-section">
                <div className="container" data-aos="fade-up">
                    <h2>Ready to Ace Your Exams?</h2>
                    <p>Join the CloudNotes community today. It's free and always will be.</p>
                    <Link to="/signup" className="cta-button">Sign Up For Free</Link>
                </div>
            </section>
        </main>
    );
};

export default HomePage;