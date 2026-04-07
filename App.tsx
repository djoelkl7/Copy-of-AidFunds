import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import DashboardHome from './pages/DashboardHome';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import InvestmentPlansPage from './pages/InvestmentPlansPage';

const MainLayout: React.FC = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="bg-light-bg dark:bg-black text-light-text dark:text-white font-sans">
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/investment-plans" element={<InvestmentPlansPage />} />
            </Route>

            {/* Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>

            {/* Legacy Redirects */}
            <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />
          </Routes>
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
