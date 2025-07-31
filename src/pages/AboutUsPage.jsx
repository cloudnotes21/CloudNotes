import React from 'react';

const AboutUsPage = () => {
    return (
        <div className="page-container">
            <div className="page-header" data-aos="fade-up">
                <h1>About CloudNotes</h1>
                <p>The Story Behind the Solution</p>
            </div>

            <div className="content-section" data-aos="fade-up" data-aos-delay="100">
                <h2>My Mission</h2>
                <p>
                    As a student myself, I always found it challenging to find all the necessary academic resources in one organized place. Scrambling for notes before exams, missing important college announcements, and searching for tools to manage my assignments was a constant struggle. CloudNotes was born out of this personal challenge. My mission is to create a single, reliable, and easy-to-use platform that simplifies the academic life of every student in our college.
                </p>

                <h2>My Vision for CloudNotes</h2>
                <p>
                    My vision is for CloudNotes to become the go-to digital companion for every student. I aim to build a collaborative community where knowledge is shared freely, and everyone has the tools and resources they need to not just pass their exams, but to truly excel in their studies. This platform is built by a student, for students.
                </p>
            </div>

            <div className="founder-section" data-aos="fade-up" data-aos-delay="200">
                <h2>Meet the Founder</h2>
                <div className="founder-card">
                    <img 
                        // =========================================================
                        // !! सबसे ज़रूरी: यहाँ अपनी फोटो का असली नाम डालें !!
                        // !! जैसे: src="/assets/mahi.jpg" या src="/assets/photo.png" !!
                        // =========================================================
                        src="/assets/my-photo.jpg" 
                        alt="Founder Photo" 
                        className="founder-photo" 
                    />
                    <div className="founder-details">
                        <h3>Mahendra </h3>
                        <h4>Founder & Developer of CloudNotes</h4>
                        <p className="founder-bio">
                            I am a passionate developer and a student, just like you. I built CloudNotes in my spare time with the goal of solving a real-world problem I faced every day. I believe technology can make our student life much easier, and this is my first step in that direction.
                        </p>
                        <div className="founder-socials">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutUsPage;