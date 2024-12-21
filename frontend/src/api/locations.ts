import api from './index'; // Centralized API function

// Fetch all locations
export const getAllLocations = async () => {
  return await api('/locations/'); // Fetch all locations from the backend
};

// Fetch a single location by ID
export const getLocationById = async (id: string) => {
  return await api(`/locations/${id}/`); // Fetch a specific location by ID
};

// Create a new location
export const createLocation = async (locationData: {
  name: string;
  address: string;
}) => {
  return await api('/locations/', {
    method: 'POST',
    body: locationData // Send new location data to the backend
  });
};

// Update an existing location by ID
export const updateLocation = async (
  id: string,
  updatedData: { name?: string; address?: string }
) => {
  return await api(`/locations/${id}/`, {
    method: 'PUT',
    body: updatedData // Send updated location data to the backend
  });
};

// Delete a location by ID
export const deleteLocation = async (id: string) => {
  return await api(`/locations/${id}/`, {
    method: 'DELETE' // Delete a specific location by ID
  });
};
