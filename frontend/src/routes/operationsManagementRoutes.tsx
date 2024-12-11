import { RouteObject } from 'react-router-dom';
import CreateNewLoad from 'pages/operations/CreateNewLoad';
import LoadList from 'pages/operations/LoadList';
import AvailableLoads from 'pages/operations/AvailableLoads';
import DispatchedLoads from 'pages/operations/DispatchedLoads';
import DeliveredLoads from 'pages/operations/DeliveredLoads';
import CreateDispatch from 'pages/operations/CreateDispatch';
import ActiveTrips from 'pages/operations/ActiveTrips';
import DispatchHistory from 'pages/operations/DispatchHistory';

export const operationsManagementRoutes: RouteObject[] = [
  {
    path: '/operations-management',
    children: [
      {
        path: 'load',
        children: [
          { path: 'create-new-load', element: <CreateNewLoad /> },
          { path: 'load-list', element: <LoadList /> },
          { path: 'available-loads', element: <AvailableLoads /> },
          { path: 'dispatched-loads', element: <DispatchedLoads /> },
          { path: 'delivered-loads', element: <DeliveredLoads /> }
        ]
      },
      {
        path: 'dispatch',
        children: [
          { path: 'create-dispatch', element: <CreateDispatch /> },
          { path: 'active-trips', element: <ActiveTrips /> },
          { path: 'dispatch-history', element: <DispatchHistory /> }
        ]
      }
    ]
  }
];
