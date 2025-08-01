import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SubjectPage = () => {
    const { subjectId } = useParams();
    const [subject, setSubject] = useState(null);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubjectDetails = async () => {
            try {
                // Fetch subject name
                const { data: subjectData, error: subjectError } = await supabase
                    .from('subjects')
                    .select('*')
                    .eq('id', subjectId)
                    .single();
                if (subjectError) throw subjectError;
                setSubject(subjectData);

                // Fetch all notes/chapters for this subject
                const { data: notesData, error: notesError } = await supabase
                    .from('notes')
                    .select('*')
                    .eq('subject_id', subjectId)
                    .order('chapter_number', { ascending: true });
                if (notesError) throw notesError;
                setNotes(notesData);
            } catch (error) {
                console.error("Error fetching subject details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjectDetails();
    }, [subjectId]);
    
    const handleDownloadPDF = () => {
        const input = document.getElementById('notes-content');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();

        html2canvas(input, { scale: 2, useCORS: true }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            let heightLeft = pdfHeight;
            let position = 0;
            const pageHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${subject.name}_notes.pdf`);
        });
    };

    if (loading) {
        return <div className="page-container"><h2>Loading Subject Material...</h2></div>;
    }

    if (!subject) {
        return <div className="page-container"><h2>Subject not found.</h2><Link to="/notes">Go Back</Link></div>;
    }

    return (
        <div className="page-container">
            <div className="subject-header">
                <div>
                    <h1>{subject.name}</h1>
                    <p>{subject.branch} - {subject.year} - {subject.semester}</p>
                </div>
                <button onClick={handleDownloadPDF} className="download-pdf-button">
                    <i className="fas fa-download"></i> Download as PDF
                </button>
            </div>
            
            <div id="notes-content" className="notes-content-area">
                {notes.length > 0 ? (
                    notes.map(note => (
                        <div key={note.id} className="chapter-container">
                            <h2>{note.chapter_title}</h2>
                            {/* This will render the HTML content from your database */}
                            <div dangerouslySetInnerHTML={{ __html: note.content }} />
                        </div>
                    ))
                ) : (
                    <p>No material has been added for this subject yet.</p>
                )}
            </div>
            
            <div className="subject-footer">
                <button onClick={handleDownloadPDF} className="download-pdf-button">
                    <i className="fas fa-download"></i> Download as PDF
                </button>
            </div>
        </div>
    );
};

export default SubjectPage;