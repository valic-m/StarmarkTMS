import { RouteObject } from 'react-router-dom';
import ProjectManagement from 'pages/dashboard/ProjectManagement';
import Crm from 'pages/dashboard/Crm';
import TravelAgency from 'pages/dashboard/TravelAgency';
import Ecommerce from 'pages/dashboard/ecommerce';

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    children: [
      {
        path: '', // This should be an empty string for the index route
        element: <Ecommerce />
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
    ]
  }
];
