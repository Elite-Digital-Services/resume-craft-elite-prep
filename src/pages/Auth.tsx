
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

const Auth: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    // Set active tab based on URL query parameter
    const params = new URLSearchParams(location.search);
    if (params.get('tab') === 'signup') {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }, [location.search]);

  // If already logged in, redirect to resume builder
  if (user && !loading) {
    return <Navigate to="/resume" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-eliteblue dark:text-eliteblue-light">
          Resume Builder Account
        </h1>
        
        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            Create an account to save your resumes and access them from anywhere.
          </p>
        </div>
        
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <AuthForm initialTab={activeTab} />
        )}
      </div>
    </div>
  );
};

export default Auth;
