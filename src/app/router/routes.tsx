import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ProtectedRoute } from '@/components/ProtectedRouter';
import Loader from '../../components/Loader';
import { Layout } from '../layout/Layout';

const AuthPage = lazy(() => import('../../pages/AuthPage'));
const MainPage = lazy(() => import('../../pages/MainPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <MainPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<Loader />}>
            <AuthPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
