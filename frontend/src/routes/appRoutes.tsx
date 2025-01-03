import { RouteObject } from 'react-router-dom';
import App from 'App'; // Top-level wrapper
import MainLayout from 'layouts/MainLayout';
import MainLayoutProvider from 'providers/MainLayoutProvider';
import { dashboardRoutes } from './dashboardRoutes';
import { clientManagementRoutes } from './clientManagementRoutes';
import { operationsManagementRoutes } from './operationsManagementRoutes';
import { settingsRoutes } from './settingsRoutes';
import { themeRoutes } from './Routes'; // Import theme-specific routes
import { authRoutes } from './authRoutes'; // Import authentication routes
import Error404 from 'pages/error/Error404'; // Import Error404 component
import Default from 'pages/pages/landing/Default'; // Import Default Landing Page
import Ecommerce from 'pages/dashboard/ecommerce'; // Main landing page
import { fleetRoutes } from './fleetRoutes'; // Import fleetRoutes

export const appRoutes: RouteObject[] = [
  {
    element: <App />, // Top-level wrapper
    children: [
      // Routes without MainLayout (standalone)
      {
        path: '/pages/landing/default',
        element: <Default /> // Default Landing Page
      },
      {
        path: '/auth',
        children: [
          ...authRoutes // Authentication routes without MainLayout
        ]
      },
      // Routes with MainLayout
      {
        element: (
          <MainLayoutProvider>
            <MainLayout />
          </MainLayoutProvider>
        ),
        children: [
          {
            index: true, // Default route for "/"
            element: <Ecommerce />
          },
          ...dashboardRoutes,
          ...clientManagementRoutes,
          ...operationsManagementRoutes,
          ...settingsRoutes,
          ...themeRoutes,
          ...fleetRoutes,
          {
            path: '*',
            element: <Error404 /> // Catch-all route
          }
        ]
      }
    ]
  }
];
