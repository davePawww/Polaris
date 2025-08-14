import { lazy } from 'react';
import { RouterProvider } from 'react-router/dom';
import { createBrowserRouter, redirect } from 'react-router';
import AuthLayout from '@/features/auth/components/AuthLayout';
import Layout from '@/components/layout/Layout';

const Home = lazy(() => import('@/features/home/pages/Home'));
const Settings = lazy(() => import('@/features/settings/pages/Settings'));

const Login = lazy(() => import('@/features/auth/pages/Login'));

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    // TODO: Create the ErrorBoundary component
    errorElement: <div>Error</div>,
    // TODO: Create the ProtectedRoute
    // loader: authLoader
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'settings',
        Component: Settings,
      },
    ],
  },
  {
    path: 'auth',
    Component: AuthLayout,
    children: [
      {
        index: true,
        loader: () => redirect('/auth/login'),
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
