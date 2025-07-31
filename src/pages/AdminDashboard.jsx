import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [subjectName, setSubjectName] = useState('');
    const [branch, setBranch] = useState('');
    // const [year, setYear] = useState(''); // REMOVED
    const [semester, setSemester] = useState('');
    const [pdfUrl, setPdfUrl] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const showMessage = (text, isErr = false) => {
        setMessage(text);
        setIsError(isErr);
        setTimeout(() => setMessage(''), 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error: insertError } = await supabase.from('subjects').insert([{
                name: subjectName,
                branch,
                // year, // REMOVED
                semester,
                pdfUrl: pdfUrl
            }]);

            if (insertError) throw insertError;

            showMessage('Subject with PDF link added successfully!');
            setSubjectName('');
            setBranch('');
            // setYear(''); // REMOVED
            setSemester('');
            setPdfUrl('');

        } catch (error) {
            console.error('Error adding subject:', error);
            showMessage(`Error: ${error.message}`, true);
        } finally {
            setLoading(false);
        }
    };
    
    const handleAdminLogout = () => {
        sessionStorage.removeItem('isAdminLoggedIn');
        navigate('/');
    };

    return (
        <div className="page-container admin-dashboard-container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleAdminLogout} className="admin-logout-button">
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
             <div className="admin-grid" style={{gridTemplateColumns: '1fr'}}>
                <div className="admin-card">
                    <h2><i className="fas fa-plus-circle"></i> Add New Subject</h2>
                    <form onSubmit={handleSubmit} className="admin-form">
                        <input type="text" placeholder="Subject Name (e.g., Physics)" value={subjectName} onChange={e => setSubjectName(e.target.value)} required />
                        <input type="text" placeholder="Branch (e.g., CSE)" value={branch} onChange={e => setBranch(e.target.value)} required />
                        {/* <input type="text" placeholder="Year (e.g., 1st Year)" value={year} onChange={e => setYear(e.target.value)} required /> REMOVED */}
                        <input type="text" placeholder="Semester (e.g., 1st Sem)" value={semester} onChange={e => setSemester(e.target.value)} required />
                        <input 
                            type="url" 
                            placeholder="Paste Public PDF URL here" 
                            value={pdfUrl} 
                            onChange={e => setPdfUrl(e.target.value)} 
                            required 
                        />
                        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Subject'}</button>
                    </form>
                </div>
            </div>
            {message && <div className={`admin-message ${isError ? 'error' : 'success'}`}>{message}</div>}
        </div>
    );
};

export default AdminDashboard;