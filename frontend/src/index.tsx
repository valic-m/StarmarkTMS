import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppProvider from 'providers/AppProvider';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import ChatWidgetProvider from 'providers/ChatWidgetProvider';
import { AuthProvider } from 'context/AuthProvider'; // Import AuthProvider
import { appRoutes } from 'routes/appRoutes'; // Use centralized app routes

const roles = ['admin', 'manager']; // Example roles (fetch or manage dynamically after login)

// Create the router using the centralized appRoutes
const router = createBrowserRouter(appRoutes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <SettingsPanelProvider>
        <ChatWidgetProvider>
          <BreakpointsProvider>
            <AuthProvider roles={roles}>
              <RouterProvider router={router} /> {/* Use the new router */}
            </AuthProvider>
          </BreakpointsProvider>
        </ChatWidgetProvider>
      </SettingsPanelProvider>
    </AppProvider>
  </React.StrictMode>
);
