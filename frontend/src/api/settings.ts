// File: C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\api\settings.ts

import api from './index';

export const fetchSettingsCategories = async () => {
  const response = await api('/api/settings/categories/');
  return response;
};
