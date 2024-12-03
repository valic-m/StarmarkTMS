// File: C:\Users\valic\PycharmProjects\StarmarkTMS\frontend\src\App.tsx

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; // Main layout with navbar, footer, etc.
import Ecommerce from './pages/dashboard/ecommerce'; // Dashboard page
import SettingsPage from './pages/settings/SettingsPage'; // Settings page
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import useToggleStyle from 'hooks/useToggleStyle';
import { useAppContext } from 'providers/AppProvider';
import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';

const App: React.FC = () => {
  const { isStylesheetLoaded } = useToggleStyle();
  const {
    settingsPanelConfig: { showSettingPanelButton },
    setSettingsPanelConfig
  } = useSettingsPanelContext();
  const {
    config: { theme, isRTL }
  } = useAppContext();

  useEffect(() => {
    setSettingsPanelConfig({ openSettingPanel: false });
  }, [isRTL]);

  if (!isStylesheetLoaded) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: theme === 'dark' ? '#000' : '#fff'
        }}
      />
    );
  }

  return (
    <>
      <Routes>
        {/* Use MainLayout for all routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Ecommerce />} /> {/* Dashboard */}
          <Route path="/settings/*" element={<SettingsPage />} />{' '}
          {/* Settings */}
        </Route>
      </Routes>

      {/* Render Settings Panel and Toggle outside <Routes> */}
      {showSettingPanelButton && (
        <>
          <SettingsToggle />
          <SettingsPanel />
        </>
      )}
    </>
  );
};

export default App;
