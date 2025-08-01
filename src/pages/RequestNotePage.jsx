import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const RequestNotePage = () => {
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setSubmitting(true);
        setError('');

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('You must be logged in to request notes.');
            
            const { error: insertError } = await supabase
                .from('requests')
                .insert([{
                    subject: subject,
                    topic: topic,
                    requesterEmail: user.email
                }]);

            if (insertError) throw insertError;

            alert('Your request has been submitted successfully!');
            navigate('/');

        } catch (err) {
            console.error("Request Error:", err);
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Request a Missing Note</h2>
                {error && <p className="error">{error}</p>}
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" required />
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic or Chapter Name" required />
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default RequestNotePage;