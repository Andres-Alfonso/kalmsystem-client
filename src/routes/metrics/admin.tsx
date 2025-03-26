// src/routes/metrics/admin.tsx
import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';

export const Route = createFileRoute('/metrics/admin')({
  component: MetricsAdmin,
});

interface UserData {
  id: string;
  email: string;
  role: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

const mockUsers: UserData[] = [
  { id: '1', email: 'admin@example.com', role: 'admin', lastLogin: '2024-03-25 10:30:45', status: 'active' },
  { id: '2', email: 'auditor@example.com', role: 'auditor', lastLogin: '2024-03-24 14:22:15', status: 'active' },
  { id: '3', email: 'user1@example.com', role: 'user', lastLogin: '2024-03-23 09:12:32', status: 'active' },
  { id: '4', email: 'user2@example.com', role: 'user', lastLogin: '2024-03-22 16:45:11', status: 'inactive' },
  { id: '5', email: 'user3@example.com', role: 'user', lastLogin: '2024-03-21 11:35:27', status: 'active' },
];

function MetricsAdmin() {
  const { hasRole, user } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Verificar si el usuario es administrador
  if (!hasRole('Admin')) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-red-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acceso Restringido</h2>
            <p className="text-gray-600 mb-6">
              No tienes permisos para acceder a la sección de administración.
              Esta sección está disponible solo para administradores.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-blue-600">
            <h1 className="text-xl font-bold text-white">Panel de Administración</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Usuarios del Sistema</h2>
              
              {isLoading ? (
                <div className="py-12 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Usuario
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rol
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Último acceso
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <span className="text-gray-500 font-medium">
                                  {user.email.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {user.email}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {user.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                                user.role === 'auditor' ? 'bg-blue-100 text-blue-800' : 
                                'bg-green-100 text-green-800'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastLogin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4">Editar</button>
                            <button className={`${user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}>
                              {user.status === 'active' ? 'Desactivar' : 'Activar'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Configuración del Sistema</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Configuración de API</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Configura los parámetros de conexión con la API de Laravel.
                  </p>
                  <button className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Configurar
                  </button>
                </div>
                
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Alertas</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Configura las alertas automáticas para métricas críticas.
                  </p>
                  <button className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Configurar
                  </button>
                </div>
                
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Permisos</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Administra los roles y permisos de los usuarios.
                  </p>
                  <button className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Configurar
                  </button>
                </div>
                
                <div className="bg-white rounded-lg border p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Backups</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Configura la política de backups de la base de datos.
                  </p>
                  <button className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Configurar
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Estado del servidor</h3>
              <div className="flex items-center">
                <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                <p className="text-sm text-gray-600">
                  Todos los sistemas operando normalmente. Última verificación: 26/03/2025 09:45
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}