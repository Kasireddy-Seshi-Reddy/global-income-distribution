import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import CursorGlow from './components/CursorGlow';
import AnalyticsTracker from './components/AnalyticsTracker';
import AdminRoute from './components/AdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import About from './pages/About';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import QueryManagement from './pages/admin/QueryManagement';
import SessionAnalytics from './pages/admin/SessionAnalytics';
import ModerationLogs from './pages/admin/ModerationLogs';

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnalyticsTracker />
      <CursorGlow />
      <Navbar isInitialLoad={isInitialLoad} />
      <main style={{
        opacity: isInitialLoad ? 0 : 1,
        pointerEvents: isInitialLoad ? 'none' : 'auto',
        transition: 'opacity 0.8s ease'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="queries" element={<QueryManagement />} />
            <Route path="session-analytics" element={<SessionAnalytics />} />
            <Route path="moderation" element={<ModerationLogs />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
