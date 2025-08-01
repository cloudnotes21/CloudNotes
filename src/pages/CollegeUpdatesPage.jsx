import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const CollegeUpdatesPage = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const { data, error } = await supabase
                    .from('updates')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (error) throw error;
                setUpdates(data);
            } catch (error) {
                console.error("Error fetching updates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUpdates();
    }, []);

    return (
        <div className="page-container">
            <div className="page-header" data-aos="fade-up">
                <h1>College Updates</h1>
                <p>Stay informed with the latest news and announcements.</p>
            </div>
            <div className="updates-list">
                {loading ? <p>Loading updates...</p> :
                    updates.length > 0 ? updates.map(update => (
                        <div key={update.id} className="update-card" data-aos="fade-up">
                            <h2>{update.title}</h2>
                            <p>{update.content}</p>
                            <span className="update-date">Posted on: {new Date(update.created_at).toLocaleDateString()}</span>
                        </div>
                    )) : <p>No updates available at the moment.</p>
                }
            </div>
        </div>
    );
};

export default CollegeUpdatesPage;