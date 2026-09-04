import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { Loader } from '@mantine/core';
import '../index.css'
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    
    return <div className="modal-overlay1"><Loader/></div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}