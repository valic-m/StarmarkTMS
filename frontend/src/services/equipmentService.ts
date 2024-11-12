import api from '../api';

interface Equipment {
  id: number;
  name: string;
  serialNumber: string;
  // Add other fields as needed
}

export const getEquipments = async (): Promise<Equipment[]> => {
  return api('/api/equipment/');
};

export const addEquipment = async (equipmentData: Omit<Equipment, 'id'>) => {
  return api('/api/equipment/', {
    method: 'POST',
    body: equipmentData,
  });
};
