import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: AppLayout,
})

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">My Dashboard</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {/* Profile dropdown could go here */}
              <div className="text-sm font-medium text-gray-500">Welcome, User</div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow h-[calc(100vh-4rem)] pt-5">
          <nav className="px-2 space-y-1">
            <Link 
              to="/" 
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 [&.active]:bg-blue-100 [&.active]:text-blue-700"
              activeProps={{ className: 'active' }}
            >
              <span className="truncate">Home</span>
            </Link>
            <Link 
              to="/about" 
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 [&.active]:bg-blue-100 [&.active]:text-blue-700"
              activeProps={{ className: 'active' }}
            >
              <span className="truncate">About</span>
            </Link>
            <Link 
              to="/metrics" 
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-100 [&.active]:bg-blue-100 [&.active]:text-blue-700"
              activeProps={{ className: 'active' }}
            >
              <span className="truncate">Metrics</span>
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Router devtools - only in development */}
      {/* {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />} */}
    </div>
  )
}