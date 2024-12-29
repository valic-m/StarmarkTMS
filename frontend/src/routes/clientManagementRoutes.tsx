import { RouteObject } from 'react-router-dom'; // Import RouteObject for type definition
import AddCustomer from 'pages/client-management/AddCustomer';
import CustomerListPage from 'pages/client-management/CustomerListPage';
import AddLocation from 'pages/client-management/AddLocation';
import ShipperReceiverListPage from 'pages/client-management/ShipperReceiverListPage';
import AddCrossDock from 'pages/client-management/AddCrossDock';
import CrossDockListPage from 'pages/client-management/CrossDockListPage';
import TmsCustomerDetails from '../pages/client-management/tmsCustomerDetails';
import LocationDetailPage from 'pages/client-management/LocationDetailPage'; // Unified Detail Page

// Define the client management routes
export const clientManagementRoutes: RouteObject[] = [
  {
    path: '/client-management',
    children: [
      {
        path: 'customers',
        children: [
          {
            path: 'add',
            element: <AddCustomer />
          },
          {
            path: 'list',
            element: <CustomerListPage />
          },
          {
            path: ':slug', // Route for TmsCustomerDetails
            element: <TmsCustomerDetails />
          }
        ]
      },
      {
        path: 'shippers-receivers',
        children: [
          {
            path: 'add',
            element: <AddLocation />
          },
          {
            path: 'list',
            element: <ShipperReceiverListPage />
          },
          {
            path: ':id', // Unified Detail Route
            element: <LocationDetailPage /> // Unified Detail Page
          }
        ]
      },
      {
        path: 'cross-dock',
        children: [
          {
            path: 'add',
            element: <AddCrossDock />
          },
          {
            path: 'list',
            element: <CrossDockListPage />
          }
        ]
      },
      {
        path: 'locations',
        children: [
          {
            path: ':id',
            element: <LocationDetailPage />
          }
        ]
      }
    ]
  }
];
