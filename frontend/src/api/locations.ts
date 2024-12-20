import api from './index'; // Centralized API

// Fetch all locations
export const getAllLocations = async () => {
  return await api('/locations/'); // Adjust the endpoint as per your backend
};

// Fetch a single location by ID
export const getLocationById = async (id: string) => {
  return await api(`/locations/${id}/`);
};

// Create a new location
export const createLocation = async (locationData: {
  name: string;
  address: string;
}) => {
  return await api('/locations/', {
    method: 'POST',
    body: locationData
  });
};

// Update an existing location by ID
export const updateLocation = async (
  id: string,
  updatedData: Record<string, unknown>
) => {
  return await api(`/locations/${id}/`, {
    method: 'PUT',
    body: updatedData
  });
};

// Delete a location by ID
export const deleteLocation = async (id: string) => {
  return await api(`/locations/${id}/`, {
    method: 'DELETE'
  });
};
