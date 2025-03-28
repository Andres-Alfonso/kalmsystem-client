import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/metrics/groups')({
  component: RouteComponent,
})

function RouteComponent() {
  const [grupos, setGrupos] = useState([
    { id: 1, nombre: "Administradores", miembros: 5, accesos: 128, ultimoAcceso: "2025-03-25" },
    { id: 2, nombre: "Editores", miembros: 12, accesos: 87, ultimoAcceso: "2025-03-27" },
    { id: 3, nombre: "Colaboradores", miembros: 24, accesos: 63, ultimoAcceso: "2025-03-28" },
    { id: 4, nombre: "Invitados", miembros: 48, accesos: 32, ultimoAcceso: "2025-03-20" },
    { id: 5, nombre: "Soporte", miembros: 8, accesos: 105, ultimoAcceso: "2025-03-26" },
  ])
  
  const [ordenarPor, setOrdenarPor] = useState('nombre')
  const [direccion, setDireccion] = useState('asc')
  const [busqueda, setBusqueda] = useState('')
  
  const ordenarGrupos = (campo) => {
    if (ordenarPor === campo) {
      setDireccion(direccion === 'asc' ? 'desc' : 'asc')
    } else {
      setOrdenarPor(campo)
      setDireccion('asc')
    }
  }
  
  const gruposFiltrados = grupos
    .filter(grupo => 
      grupo.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => {
      let valorA = a[ordenarPor]
      let valorB = b[ordenarPor]
      
      if (typeof valorA === 'string') {
        valorA = valorA.toLowerCase()
        valorB = valorB.toLowerCase()
      }
      
      if (direccion === 'asc') {
        return valorA > valorB ? 1 : -1
      } else {
        return valorA < valorB ? 1 : -1
      }
    })

  return <>
    <div className='min-h-screen bg-gray-50'>
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className='bg-white rounded-lg shadow-md p-5'>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Acceso a los grupos de la zona privada</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar grupo..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => ordenarGrupos('nombre')}
                  >
                    <div className="flex items-center">
                      Nombre
                      {ordenarPor === 'nombre' && (
                        <svg className={`ml-1 w-4 h-4 ${direccion === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => ordenarGrupos('miembros')}
                  >
                    <div className="flex items-center">
                      Miembros
                      {ordenarPor === 'miembros' && (
                        <svg className={`ml-1 w-4 h-4 ${direccion === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => ordenarGrupos('accesos')}
                  >
                    <div className="flex items-center">
                      Total Accesos
                      {ordenarPor === 'accesos' && (
                        <svg className={`ml-1 w-4 h-4 ${direccion === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => ordenarGrupos('ultimoAcceso')}
                  >
                    <div className="flex items-center">
                      Último Acceso
                      {ordenarPor === 'ultimoAcceso' && (
                        <svg className={`ml-1 w-4 h-4 ${direccion === 'desc' ? 'transform rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gruposFiltrados.length > 0 ? (
                  gruposFiltrados.map((grupo) => (
                    <tr key={grupo.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{grupo.nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{grupo.miembros}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{grupo.accesos}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(grupo.ultimoAcceso).toLocaleDateString('es-ES')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Ver detalles
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          Exportar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No se encontraron resultados para "{busqueda}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{gruposFiltrados.length}</span> de <span className="font-medium">{grupos.length}</span> grupos
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Anterior
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}