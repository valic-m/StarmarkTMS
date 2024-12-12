import { RouteObject } from 'react-router-dom';
import App from 'App'; // Top-level wrapper
import MainLayout from 'layouts/MainLayout';
import MainLayoutProvider from 'providers/MainLayoutProvider';
import { dashboardRoutes } from './dashboardRoutes';
import { clientManagementRoutes } from './clientManagementRoutes';
import { operationsManagementRoutes } from './operationsManagementRoutes';
import { settingsRoutes } from './settingsRoutes';
import { themeRoutes } from './Routes'; // Import from Routes.tsx
import Error404 from 'pages/error/Error404'; // Import Error404 component
import Default from 'pages/pages/landing/Default'; // Import Default Landing Page
import Ecommerce from 'pages/dashboard/ecommerce'; // Main landing page
import { authRoutes } from './authRoutes'; // Import auth routes

export const appRoutes: RouteObject[] = [
  {
    element: <App />,
    children: [
      // Route without MainLayout for Default Landing Page
      {
        path: '/pages/landing/default',
        element: <Default /> // Default landing page
      },
      {
        element: (
          <MainLayoutProvider>
            <MainLayout />
          </MainLayoutProvider>
        ),
        children: [
          {
            index: true, // Default route for "/"
            element: <Ecommerce /> // Render Ecommerce as the landing page
          },
          ...dashboardRoutes, // Include dashboard routes
          ...clientManagementRoutes, // Include client management routes
          ...operationsManagementRoutes, // Include operations management routes
          ...settingsRoutes, // Include settings routes
          ...themeRoutes, // Include theme-specific routes
          ...authRoutes, // Include authentication routes
          {
            path: '*',
            element: <Error404 /> // Catch-all route
          }
        ]
      }
    ]
  }
];
