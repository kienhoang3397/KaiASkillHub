import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ContractProvider } from './context/ContractContext';
import { WalletProvider } from './components/WalletProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import StudentDashboard from './components/StudentDashboard';
import AdminPanel from './components/AdminPanel';
import NetworkStatus from './components/NetworkStatus';
import CourseList from './components/CourseList';
import CoursePage from './components/CoursePage';
import { ROUTES, TOAST_CONFIG } from './config/constants';

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <NetworkStatus />
        <div className="space-y-6">
          <StudentDashboard />
          <Routes>
            <Route path={ROUTES.home} element={<CourseList />} />
            <Route path={ROUTES.course} element={<CoursePage />} />
          </Routes>
          <AdminPanel />
        </div>
      </div>
      <Toaster position={TOAST_CONFIG.position} />
    </div>
  );
};

function App() {
  return (
    <WalletProvider>
      <ContractProvider>
        <Router>
          <AppContent />
        </Router>
      </ContractProvider>
    </WalletProvider>
  );
}

export default App;