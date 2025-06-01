import { createBrowserRouter, redirect } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'
import { MainLayout } from '@/components/MainLayout/MainLayout'
import { customerStore } from '@/entities/customer/model/customer.store'
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
        element: <LoginPage />,

        loader: async () => {
          if (customerStore.isAuth) {
            return redirect('/')
          }
          return null
        },
      },
      {
        path: 'register',
        element: <RegisterPage />,
        loader: async () => {
          if (customerStore.isAuth) {
            return redirect('/')
          }
          return null
        },
      },
      {
        path: '/',
        element: <MainPage />,
        index: true,
      },
      {
        path: 'catalog/:pageNumber',
        element: <CatalogPage />,
      },
      {
        path: 'catalog/category/:categorySlug',
        element: <CatalogPage />,
      },
      {
        path: 'catalog/product/:slug',
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
        element: <UserProfilePage />,
        loader: async () => {
          if (!customerStore.isAuth) {
            return redirect('/')
          }
          return null
        },
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
