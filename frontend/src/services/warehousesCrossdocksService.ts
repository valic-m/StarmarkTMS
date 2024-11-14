import api from '../api';

interface WarehouseCrossdock {
  id: number;
  name: string;
  location: string;
  // Add other fields as needed
}

export const getWarehousesCrossdocks = async (): Promise<
  WarehouseCrossdock[]
> => {
  return api('/api/warehouses_crossdocks/');
};

export const addWarehouseCrossdock = async (
  data: Omit<WarehouseCrossdock, 'id'>
) => {
  return api('/api/warehouses_crossdocks/', {
    method: 'POST',
    body: data
  });
};
