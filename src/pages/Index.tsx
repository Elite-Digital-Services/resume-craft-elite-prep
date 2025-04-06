
import React from 'react';
import { Navigate } from 'react-router-dom';

// Redirect from the index page to the landing page
const Index: React.FC = () => {
  return <Navigate to="/" replace />;
};

export default Index;
