import { RouteObject } from 'react-router-dom';
import SettingsSitemap from 'pages/settings/SettingsPage';

// Define the settings routes
export const settingsRoutes: RouteObject[] = [
  {
    path: '/settings',
    element: <SettingsSitemap />
  }
];
