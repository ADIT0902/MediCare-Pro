import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import LoginForm from './components/auth/LoginForm';
import AdminLayout from './components/layout/AdminLayout';
import DoctorLayout from './components/layout/DoctorLayout';
import PatientLayout from './components/layout/PatientLayout';
import Landing from './pages/Landing';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  // Route based on user role
  switch (user.role) {
    case 'admin':
      return <AdminLayout />;
    case 'doctor':
      return <DoctorLayout />;
    case 'patient':
      return <PatientLayout />;
    default:
      return <Landing />;
  }
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;