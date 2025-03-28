/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UnauthorizedImport } from './routes/unauthorized'
import { Route as MetricsImport } from './routes/metrics'
import { Route as LoginImport } from './routes/login'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as MetricsIndexImport } from './routes/metrics/index'
import { Route as MetricsGroupsImport } from './routes/metrics/groups'
import { Route as MetricsDailyImport } from './routes/metrics/daily'
import { Route as MetricsClientImport } from './routes/metrics/client'
import { Route as MetricsAdminImport } from './routes/metrics/admin'
import { Route as AuthValidImport } from './routes/auth/valid'

// Create/Update Routes

const UnauthorizedRoute = UnauthorizedImport.update({
  id: '/unauthorized',
  path: '/unauthorized',
  getParentRoute: () => rootRoute,
} as any)

const MetricsRoute = MetricsImport.update({
  id: '/metrics',
  path: '/metrics',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MetricsIndexRoute = MetricsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => MetricsRoute,
} as any)

const MetricsGroupsRoute = MetricsGroupsImport.update({
  id: '/groups',
  path: '/groups',
  getParentRoute: () => MetricsRoute,
} as any)

const MetricsDailyRoute = MetricsDailyImport.update({
  id: '/daily',
  path: '/daily',
  getParentRoute: () => MetricsRoute,
} as any)

const MetricsClientRoute = MetricsClientImport.update({
  id: '/client',
  path: '/client',
  getParentRoute: () => MetricsRoute,
} as any)

const MetricsAdminRoute = MetricsAdminImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => MetricsRoute,
} as any)

const AuthValidRoute = AuthValidImport.update({
  id: '/auth/valid',
  path: '/auth/valid',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/metrics': {
      id: '/metrics'
      path: '/metrics'
      fullPath: '/metrics'
      preLoaderRoute: typeof MetricsImport
      parentRoute: typeof rootRoute
    }
    '/unauthorized': {
      id: '/unauthorized'
      path: '/unauthorized'
      fullPath: '/unauthorized'
      preLoaderRoute: typeof UnauthorizedImport
      parentRoute: typeof rootRoute
    }
    '/auth/valid': {
      id: '/auth/valid'
      path: '/auth/valid'
      fullPath: '/auth/valid'
      preLoaderRoute: typeof AuthValidImport
      parentRoute: typeof rootRoute
    }
    '/metrics/admin': {
      id: '/metrics/admin'
      path: '/admin'
      fullPath: '/metrics/admin'
      preLoaderRoute: typeof MetricsAdminImport
      parentRoute: typeof MetricsImport
    }
    '/metrics/client': {
      id: '/metrics/client'
      path: '/client'
      fullPath: '/metrics/client'
      preLoaderRoute: typeof MetricsClientImport
      parentRoute: typeof MetricsImport
    }
    '/metrics/daily': {
      id: '/metrics/daily'
      path: '/daily'
      fullPath: '/metrics/daily'
      preLoaderRoute: typeof MetricsDailyImport
      parentRoute: typeof MetricsImport
    }
    '/metrics/groups': {
      id: '/metrics/groups'
      path: '/groups'
      fullPath: '/metrics/groups'
      preLoaderRoute: typeof MetricsGroupsImport
      parentRoute: typeof MetricsImport
    }
    '/metrics/': {
      id: '/metrics/'
      path: '/'
      fullPath: '/metrics/'
      preLoaderRoute: typeof MetricsIndexImport
      parentRoute: typeof MetricsImport
    }
  }
}

// Create and export the route tree

interface MetricsRouteChildren {
  MetricsAdminRoute: typeof MetricsAdminRoute
  MetricsClientRoute: typeof MetricsClientRoute
  MetricsDailyRoute: typeof MetricsDailyRoute
  MetricsGroupsRoute: typeof MetricsGroupsRoute
  MetricsIndexRoute: typeof MetricsIndexRoute
}

const MetricsRouteChildren: MetricsRouteChildren = {
  MetricsAdminRoute: MetricsAdminRoute,
  MetricsClientRoute: MetricsClientRoute,
  MetricsDailyRoute: MetricsDailyRoute,
  MetricsGroupsRoute: MetricsGroupsRoute,
  MetricsIndexRoute: MetricsIndexRoute,
}

const MetricsRouteWithChildren =
  MetricsRoute._addFileChildren(MetricsRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/metrics': typeof MetricsRouteWithChildren
  '/unauthorized': typeof UnauthorizedRoute
  '/auth/valid': typeof AuthValidRoute
  '/metrics/admin': typeof MetricsAdminRoute
  '/metrics/client': typeof MetricsClientRoute
  '/metrics/daily': typeof MetricsDailyRoute
  '/metrics/groups': typeof MetricsGroupsRoute
  '/metrics/': typeof MetricsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/unauthorized': typeof UnauthorizedRoute
  '/auth/valid': typeof AuthValidRoute
  '/metrics/admin': typeof MetricsAdminRoute
  '/metrics/client': typeof MetricsClientRoute
  '/metrics/daily': typeof MetricsDailyRoute
  '/metrics/groups': typeof MetricsGroupsRoute
  '/metrics': typeof MetricsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/login': typeof LoginRoute
  '/metrics': typeof MetricsRouteWithChildren
  '/unauthorized': typeof UnauthorizedRoute
  '/auth/valid': typeof AuthValidRoute
  '/metrics/admin': typeof MetricsAdminRoute
  '/metrics/client': typeof MetricsClientRoute
  '/metrics/daily': typeof MetricsDailyRoute
  '/metrics/groups': typeof MetricsGroupsRoute
  '/metrics/': typeof MetricsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/login'
    | '/metrics'
    | '/unauthorized'
    | '/auth/valid'
    | '/metrics/admin'
    | '/metrics/client'
    | '/metrics/daily'
    | '/metrics/groups'
    | '/metrics/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/login'
    | '/unauthorized'
    | '/auth/valid'
    | '/metrics/admin'
    | '/metrics/client'
    | '/metrics/daily'
    | '/metrics/groups'
    | '/metrics'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/login'
    | '/metrics'
    | '/unauthorized'
    | '/auth/valid'
    | '/metrics/admin'
    | '/metrics/client'
    | '/metrics/daily'
    | '/metrics/groups'
    | '/metrics/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  LoginRoute: typeof LoginRoute
  MetricsRoute: typeof MetricsRouteWithChildren
  UnauthorizedRoute: typeof UnauthorizedRoute
  AuthValidRoute: typeof AuthValidRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  LoginRoute: LoginRoute,
  MetricsRoute: MetricsRouteWithChildren,
  UnauthorizedRoute: UnauthorizedRoute,
  AuthValidRoute: AuthValidRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/login",
        "/metrics",
        "/unauthorized",
        "/auth/valid"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/metrics": {
      "filePath": "metrics.tsx",
      "children": [
        "/metrics/admin",
        "/metrics/client",
        "/metrics/daily",
        "/metrics/groups",
        "/metrics/"
      ]
    },
    "/unauthorized": {
      "filePath": "unauthorized.tsx"
    },
    "/auth/valid": {
      "filePath": "auth/valid.tsx"
    },
    "/metrics/admin": {
      "filePath": "metrics/admin.tsx",
      "parent": "/metrics"
    },
    "/metrics/client": {
      "filePath": "metrics/client.tsx",
      "parent": "/metrics"
    },
    "/metrics/daily": {
      "filePath": "metrics/daily.tsx",
      "parent": "/metrics"
    },
    "/metrics/groups": {
      "filePath": "metrics/groups.tsx",
      "parent": "/metrics"
    },
    "/metrics/": {
      "filePath": "metrics/index.tsx",
      "parent": "/metrics"
    }
  }
}
ROUTE_MANIFEST_END */
