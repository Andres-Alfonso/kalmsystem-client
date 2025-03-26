// src/routes/auth/valid.tsx
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { authService } from '../../services/authService';

export const Route = createFileRoute('/auth/valid')({
  component: TokenValidator
});

function TokenValidator() {
  const [validating, setValidating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate({ from: '/auth/valid' });

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Obtener el token de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
          setError('No se proporcionó un token de autenticación');
          setValidating(false);
          return;
        }

        // Validar el token con el servicio de autenticación
        const isValid = await authService.validateExternalToken(token);

        if (isValid) {
          // Si el token es válido, redirige a la página principal
          navigate({ to: '/' });
        } else {
          setError('El token proporcionado no es válido');
          setValidating(false);
        }
      } catch (err) {
        console.error('Error al validar el token:', err);
        setError('Error al procesar la autenticación');
        setValidating(false);
      }
    };

    validateToken();
  }, [navigate]);

  if (validating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-4">Validando autenticación</h1>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <p className="mt-4 text-center text-gray-600">Estamos verificando tu identidad...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-center mb-4 text-red-600">Error de autenticación</h1>
          <div className="flex justify-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="mt-4 text-center text-gray-700">{error}</p>
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => navigate({ to: '/login' })}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ir al inicio de sesión
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Este punto no debería alcanzarse normalmente, ya que el componente
  // redirige a la página principal cuando la autenticación es exitosa
  return null;
}