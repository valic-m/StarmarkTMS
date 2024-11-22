import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
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

  return (
    <>
      {!isStylesheetLoaded ? (
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
      ) : (
        <>
          <Outlet /> {/* Render routed child components */}
          {showSettingPanelButton && (
            <>
              <SettingsToggle />
              <SettingsPanel />
            </>
          )}
        </>
      )}
    </>
  );
};

export default App;
