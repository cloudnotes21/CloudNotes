import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';

const SmartPrepZonePage = () => {
    const { subjectId } = useParams();
    const [subject, setSubject] = useState(null);
    const [prepContent, setPrepContent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data: subjectData, error: subjectError } = await supabase.from('subjects').select('*').eq('id', subjectId).single();
                if (subjectError) throw subjectError;
                setSubject(subjectData);

                const { data: prepData, error: prepError } = await supabase.from('smartprep_content').select('*').eq('subject_id', subjectId);
                if (prepError) throw prepError;
                
                const groupedContent = prepData.reduce((acc, item) => {
                    (acc[item.type] = acc[item.type] || []).push(item);
                    return acc;
                }, {});
                setPrepContent(groupedContent);
            } catch (error) {
                console.error("Error fetching content:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, [subjectId]);

    if (loading) return <div className="page-container"><h2>Loading SmartPrep Zone...</h2></div>;
    if (!subject) return <div className="page-container"><h2>Subject not found.</h2></div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>SmartPrep Zone: {subject.name}</h1>
                <p>{subject.branch} - {subject.year}</p>
            </div>
            <div className="prep-content-area">
                {Object.keys(prepContent).length > 0 ? (
                    Object.entries(prepContent).map(([type, items]) => (
                        <div key={type} className="prep-section">
                            <h2>{type}</h2>
                            {items.map(item => (
                                <div key={item.id} className="chapter-container" dangerouslySetInnerHTML={{ __html: item.content }} />
                            ))}
                        </div>
                    ))
                ) : (
                    <p>No SmartPrep content has been added for this subject yet.</p>
                )}
            </div>
        </div>
    );
};

export default SmartPrepZonePage;