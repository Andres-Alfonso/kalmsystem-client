// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';

interface ProtectedRouteProps {
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRoles = [] 
}) => {
  const { isAuthenticated, hasAnyRole } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      if (isAuthenticated) {
        // Si ya está autenticado, verifica si el token sigue siendo válido
        const isTokenValid = await authService.checkTokenValidity();
        
        if (!isTokenValid) {
          // Si el token no es válido, redirige al login
          navigate({ to: '/login' });
          return;
        }
        
        // Si se requieren roles específicos, verifica si el usuario los tiene
        if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
          navigate({ to: '/unauthorized' });
          return;
        }
        
        setIsValid(true);
      } else {
        // Si no está autenticado, redirige al login
        navigate({ to: '/login' });
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, hasAnyRole, navigate, requiredRoles]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  }

  return isValid ? <Outlet /> : null;
};