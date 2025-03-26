// src/routes/unauthorized.tsx
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/unauthorized')({
  component: Unauthorized
});

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-red-600">Acceso No Autorizado</h1>
        
        <div className="flex justify-center text-red-500 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V8a3 3 0 00-3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <p className="text-gray-700 text-center mb-6">
          No tienes los permisos necesarios para acceder a esta página.
          Si crees que esto es un error, contacta al administrador del sistema.
        </p>
        
        <div className="flex justify-center">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ir a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}