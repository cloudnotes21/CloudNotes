import { useState } from 'react';
import { supabase } from '../supabase';

const ContactUsPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        setFormMessage('');

        try {
            const { error: insertError } = await supabase
                .from('contacts')
                .insert([{ name, email, message }]);

            if (insertError) throw insertError;

            setFormMessage('Thank you for your message! We will get back to you soon.');
            setName('');
            setEmail('');
            setMessage('');

        } catch (err) {
            console.error("Contact form error:", err);
            setError('Sorry, something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header" data-aos="fade-up">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you!</p>
            </div>

            <div className="form-container" data-aos="fade-up" data-aos-delay="100">
                <form onSubmit={handleSubmit}>
                    {formMessage && <p className="success-message">{formMessage}</p>}
                    {error && <p className="error">{error}</p>}
                    
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" required />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" required />
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your Message" rows="6" required></textarea>
                    
                    <button type="submit" disabled={submitting}>
                        {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUsPage;