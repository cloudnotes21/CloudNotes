import React, { useState } from 'react';

const StudyRemindersPage = () => {
    const [reminderTime, setReminderTime] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const showMessage = (text, isErr = false) => {
        setMessage(text);
        setIsError(isErr);
    };

    const handleSetReminder = () => {
        if (!("Notification" in window)) {
            showMessage("Sorry, your browser does not support desktop notifications.", true);
            return;
        }

        if (Notification.permission === "granted") {
            scheduleNotification();
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    scheduleNotification();
                }
            });
        } else {
            showMessage("You have disabled notifications. Please enable them in your browser settings to use this feature.", true);
        }
    };

    const scheduleNotification = () => {
        if (!reminderTime) {
            showMessage("Please select a time for the reminder.", true);
            return;
        }
        const now = new Date();
        const selectedTime = new Date(reminderTime);
        const delay = selectedTime.getTime() - now.getTime();

        if (delay < 0) {
            showMessage("Please select a time in the future.", true);
            return;
        }

        setTimeout(() => {
            new Notification("Time to Study!", {
                body: "This is your reminder to start your study session. You can do it!",
                icon: '/vite.svg'
            });
        }, delay);

        showMessage(`Success! Your reminder is set for ${selectedTime.toLocaleTimeString()}`, false);
    };

    return (
        <div className="page-container">
            <div className="page-header" data-aos="fade-up">
                <h1>Study Reminders</h1>
                <p>A simple tool to help you stay disciplined.</p>
            </div>
            <div className="form-container" data-aos="fade-up">
                <h2><i className="fas fa-stopwatch" style={{marginRight: '10px'}}></i>Set a New Reminder</h2>
                <p style={{textAlign: 'center', marginBottom: '20px'}}>
                    Choose a date and time. Your browser will send you a notification to remind you to study.
                    <br/>
                    <small>(Make sure you allow notifications for this site when asked)</small>
                </p>
                <input 
                    type="datetime-local" 
                    className="reminder-input"
                    value={reminderTime}
                    onChange={e => setReminderTime(e.target.value)}
                />
                <button onClick={handleSetReminder} className="find-notes-button" style={{width: '100%'}}>
                    Set Reminder
                </button>
                {message && <p className={`reminder-message ${isError ? 'error' : 'success-message'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default StudyRemindersPage;