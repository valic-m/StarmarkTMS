import Footer from 'components/footers/Footer';
import useSettingsMountEffect from 'hooks/useSettingsMountEffect';
import { useAppContext } from 'providers/AppProvider';
import { useEffect, useMemo } from 'react';

const Showcase = () => {
  useSettingsMountEffect({
    showSettingPanelButton: false
  });
  const {
    config: { theme },
    setConfig
  } = useAppContext();

  const mountTheme = useMemo(() => {
    return theme;
  }, [theme]);

  useEffect(() => {
    setConfig({
      theme: 'light'
    });
    return () => {
      setConfig({
        theme: mountTheme
      });
    };
  }, []);

  return (
    <>
      <Footer className="d-flex justify-content-center bg-body border-0" />
    </>
  );
};

export default Showcase;
