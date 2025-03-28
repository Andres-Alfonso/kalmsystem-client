// src/routes/index.tsx
import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from '../components/Navbar';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-blue-500 p-8 sm:p-10">
              <h1 className="text-center text-3xl font-bold text-white">Panel de Métricas</h1>
              <p className="mt-2 text-center text-white text-opacity-90">
                Sistema de visualización de métricas integrado con Laravel
              </p>
            </div>
            
            <div className="p-8 sm:p-10">
              {isAuthenticated ? (
                <div>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          ¡Bienvenido de nuevo, <strong>{user?.email}</strong>!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Tu Panel</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {user && user.roles.includes("Admin") && (
                      <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">Administración</h3>
                            <p className="text-sm text-gray-500">Panel de administración de métricas</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to="/metrics/admin"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                          >
                            Ir al panel
                          </Link>
                        </div>
                      </div>
                    )}
                    
                    {user && (user.roles.includes("admin") || user.roles.includes("auditor")) && (
                      <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow p-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">Métricas</h3>
                            <p className="text-sm text-gray-500">Ver todas las métricas y reportes</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Link
                            to="/metrics"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                          >
                            Ver métricas
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          Debes iniciar sesión para acceder al panel de métricas.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Acceso al sistema</h2>
                  <p className="mb-6 text-gray-600">
                    Para acceder a las métricas, debes iniciar sesión a través del sistema principal de Laravel.
                  </p>
                  
                  <a
                    href="http://tu-aplicacion-laravel.com/metrics1"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Iniciar sesión
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}