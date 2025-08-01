import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';

// Components and Pages
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import NotesPage from './pages/NotesPage';
import SmartPrepZonePage from './pages/SmartPrepZonePage';
import RequestNotePage from './pages/RequestNotePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import CollegeUpdatesPage from './pages/CollegeUpdatesPage';
import StudyRemindersPage from './pages/StudyRemindersPage';

function App() {
  useEffect(() => { AOS.init({ duration: 1000, once: true }); }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes (No Login Needed) */}
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="contact" element={<ContactUsPage />} />
          <Route path="notes" element={<NotesPage />} />

          {/* Protected Routes (Login Required) */}
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="smart-prep" element={<SmartPrepZonePage />} /> {/* CORRECTED ROUTE */}
            <Route path="request-note" element={<RequestNotePage />} />
            <Route path="updates" element={<CollegeUpdatesPage />} />
            <Route path="reminders" element={<StudyRemindersPage />} />
          </Route>
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminRoute />}>
            <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;