import { createBrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'
import { MainLayout } from '@/components/MainLayout/MainLayout'
import { RouteGuard } from '@/components/RouteGuard/RouteGuard'
import { AboutPage } from '@/pages/AboutPage/AboutPage'
import { CartPage } from '@/pages/CartPage/CartPage'
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage'
import { LoginPage } from '@/pages/LoginPage/LoginPage'
import { MainPage } from '@/pages/MainPage/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage/NotFoundPage'
import { ProductPage } from '@/pages/ProductPage/ProductPage'

import { RegisterPage } from '@/pages/RegisterPage/RegisterPage'
import { UserProfilePage } from '@/pages/UserProfilePage/UserProfilePage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: 'login',
        element: (
          <RouteGuard redirectIf="authorized" redirectTo="/main">
            <LoginPage />
          </RouteGuard>
        ),
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: '/',
        element: <MainPage />,
        index: true,
      },
      {
        path: 'catalog',
        element: <CatalogPage />,
      },
      {
        path: 'catalog/:categoryId',
        element: <CatalogPage />,
      },
      {
        path: 'product/:productId',
        element: <ProductPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'profile',
        element: (
          <RouteGuard redirectIf="unauthorized" redirectTo="/login">
            <UserProfilePage />
          </RouteGuard>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
