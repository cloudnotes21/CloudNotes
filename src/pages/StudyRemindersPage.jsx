import React, { useState } from 'react';

const StudyRemindersPage = () => {
    const [reminderTime, setReminderTime] = useState('');
    const [message, setMessage] = useState('');

    const handleSetReminder = () => {
        if (!("Notification" in window)) {
            setMessage("This browser does not support desktop notification.");
        } else if (Notification.permission === "granted") {
            scheduleNotification();
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    scheduleNotification();
                }
            });
        }
    };

    const scheduleNotification = () => {
        if (!reminderTime) {
            setMessage("Please select a time for the reminder.");
            return;
        }
        const now = new Date();
        const selectedTime = new Date(reminderTime);
        const delay = selectedTime.getTime() - now.getTime();

        if (delay < 0) {
            setMessage("Please select a future time.");
            return;
        }

        setTimeout(() => {
            new Notification("Study Reminder!", {
                body: "It's time to hit the books! Good luck!",
                icon: '/vite.svg' // You can change this to your logo
            });
        }, delay);

        setMessage(`Reminder set for ${selectedTime.toLocaleTimeString()}`);
    };

    return (
        <div className="page-container">
            <div className="page-header" data-aos="fade-up">
                <h1>Study Reminders</h1>
                <p>Set a browser notification to remind you to study.</p>
            </div>
            <div className="reminder-card" data-aos="fade-up">
                <h2>Set a New Reminder</h2>
                <p>Choose a time and we'll send you a notification.</p>
                <input 
                    type="datetime-local" 
                    className="reminder-input"
                    value={reminderTime}
                    onChange={e => setReminderTime(e.target.value)}
                />
                <button onClick={handleSetReminder} className="find-notes-button">Set Reminder</button>
                {message && <p className="reminder-message">{message}</p>}
            </div>
        </div>
    );
};

export default StudyRemindersPage;