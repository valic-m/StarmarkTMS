// File: C:\Users\valic\PycharmProjects\StarmarkTMS\frontend\src\index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import AppProvider from 'providers/AppProvider';
import BreakpointsProvider from 'providers/BreakpointsProvider';
import SettingsPanelProvider from 'providers/SettingsPanelProvider';
import ChatWidgetProvider from 'providers/ChatWidgetProvider';
import { AuthProvider } from 'context/AuthProvider'; // Import AuthProvider
import { router } from 'Routes';

const roles = ['admin', 'manager']; // Example roles (fetch or manage dynamically after login)

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
              <RouterProvider router={router} />
            </AuthProvider>
          </BreakpointsProvider>
        </ChatWidgetProvider>
      </SettingsPanelProvider>
    </AppProvider>
  </React.StrictMode>
);
