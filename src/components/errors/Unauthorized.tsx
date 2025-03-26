import React from 'react'

export const Unauthorized = () => {
  return (
    <>
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
    </>
  )
}
