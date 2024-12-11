import { RouteObject } from 'react-router-dom';
import Ecommerce from 'pages/dashboard/Ecommerce';
import ProjectManagement from 'pages/dashboard/ProjectManagement';
import Crm from 'pages/dashboard/Crm';
import TravelAgency from 'pages/dashboard/TravelAgency';

// Define dashboard routes
export const dashboardRoutes: RouteObject[] = [
  {
    index: true, // Default route for "/dashboard" or the landing page
    element: <Ecommerce /> // Ecommerce dashboard as the default landing page
  },
  {
    path: 'project-management',
    element: <ProjectManagement />
  },
  {
    path: 'crm',
    element: <Crm />
  },
  {
    path: 'travel-agency',
    element: <TravelAgency />
  }
];
