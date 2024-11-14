import api from '../api';

interface Dispatch {
  id: number;
  dispatchNumber: string;
  status: string;
  // Add other fields as needed
}

export const getDispatches = async (): Promise<Dispatch[]> => {
  return api('/api/dispatch/');
};

export const addDispatch = async (dispatchData: Omit<Dispatch, 'id'>) => {
  return api('/api/dispatch/', {
    method: 'POST',
    body: dispatchData
  });
};
