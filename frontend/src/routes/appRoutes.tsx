import { RouteObject } from 'react-router-dom';

// Import feature-specific routes
import { operationsManagementRoutes } from './operationsManagementRoutes';
import { dashboardRoutes } from './dashboardRoutes';
import { clientManagementRoutes } from './clientManagementRoutes';
import { settingsRoutes } from './settingsRoutes';

// Combine all feature-specific routes into one export
export const appRoutes: RouteObject[] = [
  ...operationsManagementRoutes, // Routes for Operations Management
  ...dashboardRoutes, // Routes for Dashboard
  ...clientManagementRoutes, // Routes for Client Management
  ...settingsRoutes // Routes for Settings
];
