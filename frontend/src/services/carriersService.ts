import api from '../api';

interface Carrier {
  id: number;
  name: string;
  phoneNumber: string;
  // Add other fields as needed
}

export const getCarriers = async (): Promise<Carrier[]> => {
  return api('/api/carriers/');
};

export const addCarrier = async (carrierData: Omit<Carrier, 'id'>) => {
  return api('/api/carriers/', {
    method: 'POST',
    body: carrierData
  });
};
