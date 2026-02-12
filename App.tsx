import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import InvestmentPlansPage from './pages/InvestmentPlansPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="bg-light-bg dark:bg-black text-light-text dark:text-white font-sans">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/investment-plans" element={<InvestmentPlansPage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
