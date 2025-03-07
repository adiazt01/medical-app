/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedRouteImport } from './routes/protected/route'
import { Route as IndexImport } from './routes/index'
import { Route as ProtectedIndexImport } from './routes/protected/index'
import { Route as ProductsIndexImport } from './routes/products/index'
import { Route as ProductsProductIdImport } from './routes/products/$productId'
import { Route as AuthRegisterImport } from './routes/auth/register'
import { Route as AuthLoginImport } from './routes/auth/login'

// Create/Update Routes

const ProtectedRouteRoute = ProtectedRouteImport.update({
  id: '/protected',
  path: '/protected',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedIndexRoute = ProtectedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => ProtectedRouteRoute,
} as any)

const ProductsIndexRoute = ProductsIndexImport.update({
  id: '/products/',
  path: '/products/',
  getParentRoute: () => rootRoute,
} as any)

const ProductsProductIdRoute = ProductsProductIdImport.update({
  id: '/products/$productId',
  path: '/products/$productId',
  getParentRoute: () => rootRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  id: '/auth/register',
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/auth/login',
  path: '/auth/login',
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
    '/protected': {
      id: '/protected'
      path: '/protected'
      fullPath: '/protected'
      preLoaderRoute: typeof ProtectedRouteImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof rootRoute
    }
    '/products/$productId': {
      id: '/products/$productId'
      path: '/products/$productId'
      fullPath: '/products/$productId'
      preLoaderRoute: typeof ProductsProductIdImport
      parentRoute: typeof rootRoute
    }
    '/products/': {
      id: '/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof ProductsIndexImport
      parentRoute: typeof rootRoute
    }
    '/protected/': {
      id: '/protected/'
      path: '/'
      fullPath: '/protected/'
      preLoaderRoute: typeof ProtectedIndexImport
      parentRoute: typeof ProtectedRouteImport
    }
  }
}

// Create and export the route tree

interface ProtectedRouteRouteChildren {
  ProtectedIndexRoute: typeof ProtectedIndexRoute
}

const ProtectedRouteRouteChildren: ProtectedRouteRouteChildren = {
  ProtectedIndexRoute: ProtectedIndexRoute,
}

const ProtectedRouteRouteWithChildren = ProtectedRouteRoute._addFileChildren(
  ProtectedRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/protected': typeof ProtectedRouteRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/products/$productId': typeof ProductsProductIdRoute
  '/products': typeof ProductsIndexRoute
  '/protected/': typeof ProtectedIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/products/$productId': typeof ProductsProductIdRoute
  '/products': typeof ProductsIndexRoute
  '/protected': typeof ProtectedIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/protected': typeof ProtectedRouteRouteWithChildren
  '/auth/login': typeof AuthLoginRoute
  '/auth/register': typeof AuthRegisterRoute
  '/products/$productId': typeof ProductsProductIdRoute
  '/products/': typeof ProductsIndexRoute
  '/protected/': typeof ProtectedIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/protected'
    | '/auth/login'
    | '/auth/register'
    | '/products/$productId'
    | '/products'
    | '/protected/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth/login'
    | '/auth/register'
    | '/products/$productId'
    | '/products'
    | '/protected'
  id:
    | '__root__'
    | '/'
    | '/protected'
    | '/auth/login'
    | '/auth/register'
    | '/products/$productId'
    | '/products/'
    | '/protected/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ProtectedRouteRoute: typeof ProtectedRouteRouteWithChildren
  AuthLoginRoute: typeof AuthLoginRoute
  AuthRegisterRoute: typeof AuthRegisterRoute
  ProductsProductIdRoute: typeof ProductsProductIdRoute
  ProductsIndexRoute: typeof ProductsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ProtectedRouteRoute: ProtectedRouteRouteWithChildren,
  AuthLoginRoute: AuthLoginRoute,
  AuthRegisterRoute: AuthRegisterRoute,
  ProductsProductIdRoute: ProductsProductIdRoute,
  ProductsIndexRoute: ProductsIndexRoute,
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
        "/protected",
        "/auth/login",
        "/auth/register",
        "/products/$productId",
        "/products/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/protected": {
      "filePath": "protected/route.tsx",
      "children": [
        "/protected/"
      ]
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/auth/register": {
      "filePath": "auth/register.tsx"
    },
    "/products/$productId": {
      "filePath": "products/$productId.tsx"
    },
    "/products/": {
      "filePath": "products/index.tsx"
    },
    "/protected/": {
      "filePath": "protected/index.tsx",
      "parent": "/protected"
    }
  }
}
ROUTE_MANIFEST_END */
