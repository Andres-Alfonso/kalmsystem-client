// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, AuthState, User } from '../services/authService';

// Propiedades del contexto de autenticación
interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  logout: () => void;
}

// Crear el contexto con valores por defecto
const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  hasRole: () => false,
  hasAnyRole: () => false,
  logout: () => {},
});

// Props para el proveedor de autenticación
interface AuthProviderProps {
  children: React.ReactNode;
}

// Proveedor de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Estado local para mantener la información de autenticación
  const [authState, setAuthState] = useState<AuthState>(authService.getState());

  useEffect(() => {
    // Suscribirse a cambios en el servicio de autenticación
    const unsubscribe = authService.subscribe(newState => {
      setAuthState(newState);
    });

    // Limpiar suscripción al desmontar
    return () => unsubscribe();
  }, []);

  // Función para cerrar sesión
  const logout = () => {
    authService.clearSession();
  };

  // Verificar si el usuario tiene un rol específico
  const hasRole = (role: string): boolean => {
    return authService.hasRole(role);
  };

  // Verificar si el usuario tiene al menos uno de los roles proporcionados
  const hasAnyRole = (roles: string[]): boolean => {
    return authService.hasAnyRole(roles);
  };

  // Valor del contexto
  const contextValue: AuthContextProps = {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    hasRole,
    hasAnyRole,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);