import { RouteObject } from 'react-router-dom';
import AddDriver from 'pages/fleet/AddDriver';
import AddTrailer from 'pages/fleet/AddTrailer';
import AddTruck from 'pages/fleet/AddTruck';
import DriverList from 'pages/fleet/DriverList';
import TrailerList from 'pages/fleet/TrailerList';
import TruckListPage from 'pages/fleet/TruckListPage';
import TruckDetailPage from 'pages/fleet/TruckDetailPage'; // new import

export const fleetRoutes: RouteObject[] = [
  {
    path: '/fleet',
    children: [
      {
        path: 'drivers',
        children: [
          {
            path: 'add',
            element: <AddDriver />
          },
          {
            path: 'list',
            element: <DriverList />
          }
        ]
      },
      {
        path: 'trailers',
        children: [
          {
            path: 'add',
            element: <AddTrailer />
          },
          {
            path: 'list',
            element: <TrailerList />
          }
        ]
      },
      {
        path: 'trucks',
        children: [
          {
            path: 'add',
            element: <AddTruck />
          },
          {
            path: 'list',
            element: <TruckListPage />
          },
          {
            // dynamic route for truck detail
            path: ':id',
            element: <TruckDetailPage />
          }
        ]
      }
    ]
  }
];
