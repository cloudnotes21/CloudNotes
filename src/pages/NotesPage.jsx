import { useState } from 'react';
import { supabase } from '../supabase';
import { Link } from 'react-router-dom';

const NotesPage = () => {
    // const [year, setYear] = useState(''); // REMOVED
    const [branch, setBranch] = useState('');
    const [semester, setSemester] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialMessage, setInitialMessage] = useState('Select options above to find subjects.');
    
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
    
    const handleFindSubjects = async () => {
        if (!branch || !semester) { // UPDATED: Removed year check
            alert('Please select both branch and semester.');
            return;
        }
        setLoading(true); setSubjects([]);
        try {
            const { data, error } = await supabase
                .from('subjects')
                .select('*')
                // .eq('year', year) // REMOVED
                .eq('branch', branch)
                .eq('semester', semester);
            
            if (error) throw error;
            if (data.length === 0) setInitialMessage('No subjects found for this selection.');
            setSubjects(data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
            alert("An error occurred while fetching subjects.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header" data-aos="fade-up">
                <h1>Find Your Subjects</h1>
                <p>Select your branch and semester to find all related subjects.</p>
            </div>

            <div className="filters-container" data-aos="fade-up">
                {/* Year dropdown is now removed */}
                <select className="filter-select" value={branch} onChange={e => setBranch(e.target.value)}>
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="ME">ME</option>
                    <option value="ECE">ECE</option>
                    <option value="Civil">Civil</option>
                </select>
                <select className="filter-select" value={semester} onChange={e => setSemester(e.target.value)}>
                    <option value="">Select Semester</option>
                    <option value="1st Sem">1st Sem</option>
                    <option value="2nd Sem">2nd Sem</option>
                    <option value="3rd Sem">3rd Sem</option>
                    <option value="4th Sem">4th Sem</option>
                    <option value="5th Sem">5th Sem</option>
                    <option value="6th Sem">6th Sem</option>
                    <option value="7th Sem">7th Sem</option>
                    <option value="8th Sem">8th Sem</option>
                </select>
                <button className="find-notes-button" onClick={handleFindSubjects} disabled={loading}>{loading ? 'Finding...' : 'Find Notes'}</button>
            </div>

            <div className="subjects-grid" data-aos="fade-up">
                {subjects.length > 0 ? (
                    subjects.map(subject => (
                        <div key={subject.id} className="subject-card">
                            <h3>{subject.name}</h3>
                            <p>{subject.branch} - {subject.semester}</p>
                            <div className="subject-card-actions">
                                <a href={createDirectDownloadLink(subject.pdfUrl)} download className="button-primary-sm">Download PDF</a>
                                <Link to={`/smart-prep/${subject.id}`} className="button-secondary-sm">SmartPrep Zone</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && <p style={{textAlign: 'center', gridColumn: '1 / -1'}}>{initialMessage}</p>
                )}
            </div>
        </div>
    );
};

export default NotesPage;