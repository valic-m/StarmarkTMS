import { RouteObject } from 'react-router-dom';
import App from 'App'; // Top-level wrapper
import MainLayout from 'layouts/MainLayout';
import MainLayoutProvider from 'providers/MainLayoutProvider';
import { dashboardRoutes } from './dashboardRoutes';
import { clientManagementRoutes } from './clientManagementRoutes';
import { operationsManagementRoutes } from './operationsManagementRoutes';
import { settingsRoutes } from './settingsRoutes';
import Error404 from 'pages/error/Error404';
import { themeRoutes } from './Routes'; // Import from Routes.tsx

export const appRoutes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        element: (
          <MainLayoutProvider>
            <MainLayout />
          </MainLayoutProvider>
        ),
        children: [
          ...dashboardRoutes,
          ...clientManagementRoutes,
          ...operationsManagementRoutes,
          ...settingsRoutes,
          ...themeRoutes, // Include theme-specific routes
          {
            path: '*',
            element: <Error404 /> // Catch-all route
          }
        ]
      }
    ]
  }
];
