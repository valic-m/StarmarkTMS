import api from '../api';

interface DriverOperator {
  id: number;
  name: string;
  licenseNumber: string;
  // Add other fields as needed
}

export const getDriversOperators = async (): Promise<DriverOperator[]> => {
  return api('/api/drivers_operators/');
};

export const addDriverOperator = async (operatorData: Omit<DriverOperator, 'id'>) => {
  return api('/api/drivers_operators/', {
    method: 'POST',
    body: operatorData,
  });
};
