// src/routes/login.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Route = createFileRoute('/login')({
  component: Login
});

function Login() {
  const navigate = useNavigate({ from: '/login' });
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState<string | null>(null);

  // Si ya está autenticado, redirigir a la página principal
  if (isAuthenticated) {
    navigate({ to: '/' });
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Inicio de Sesión</h1>
        
        {message && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded">
            {message}
          </div>
        )}
        
        <div className="text-center mb-6">
          <p className="text-gray-600 mb-4">
            Este es un punto de acceso externo. Para iniciar sesión, debes autenticarte desde el sistema principal.
          </p>
          
          <p className="text-gray-700 mb-4">
            Si has sido redirigido desde el sistema principal y estás viendo esta pantalla, 
            es posible que haya ocurrido un error durante la autenticación.
          </p>
          
          <div className="mt-6">
            <a 
              href="http://tu-aplicacion-laravel.com/metrics1" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Volver al sistema principal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}