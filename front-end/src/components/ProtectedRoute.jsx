import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user = getCurrentUser();

  // Non connecté
  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  // Connecté mais mauvais rôle
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
