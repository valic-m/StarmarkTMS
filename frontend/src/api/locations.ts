// src/api/locations.ts

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { Location } from 'types/Location';

// Use environment variables for the API base URL
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Creates an Axios instance with default configurations.
 * Includes interceptors to handle authentication tokens.
 */
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request interceptor to include the authentication token in headers.
 * Also adds debug logs to verify token retrieval and header setting.
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    console.log('Retrieved Token:', token); // Debug log

    if (token) {
      // Initialize headers if undefined
      config.headers = config.headers ?? {};

      // Set the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization Header Set:', config.headers.Authorization); // Debug log
    } else {
      console.warn('No token found in localStorage.');
    }

    return config;
  },
  error => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle global responses or errors.
 * Specifically logs unauthorized access attempts.
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized access - perhaps redirect to login.');
        // Optional: Implement logout or redirect logic here
      } else {
        console.error(
          `API responded with status ${error.response.status}:`,
          error.response.data
        );
      }
    } else if (error.request) {
      console.error('No response received from API:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Fetches all locations from the backend.
 * @returns A promise that resolves to an array of Location objects.
 */
export const getAllLocations = async (): Promise<Location[]> => {
  try {
    const response: AxiosResponse = await axiosInstance.get('/locations/');
    return response.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      phone_number: item.phone_number,
      email: item.email,
      address_line1: item.address_line1,
      address_line2: item.address_line2,
      city: item.city,
      state: item.state,
      zip_code: item.zip_code,
      shipping_hours_from: item.shipping_hours_from,
      shipping_hours_to: item.shipping_hours_to,
      load_time: item.load_time,
      do_not_load: item.do_not_load,
      no_reefers: item.no_reefers,
      categories: item.categories, // Assuming this is an array of category IDs
      charges_lumper: item.charges_lumper,
      lumper_fee: item.lumper_fee,
      rating: item.rating,
      comments: item.comments,
      directions: item.directions,
      lat: item.lat,
      lng: item.lng,
      operating_hours: item.operating_hours // Ensure this is correctly formatted
    }));
  } catch (error) {
    console.error('Error fetching all locations:', error);
    throw error;
  }
};

/**
 * Fetches a single location by ID from the backend.
 * @param id - The ID of the location.
 * @returns A promise that resolves to a Location object.
 */
export const getLocationById = async (id: number): Promise<Location> => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      `/locations/${id}/`
    );
    return {
      id: response.data.id,
      name: response.data.name,
      phone_number: response.data.phone_number,
      email: response.data.email,
      address_line1: response.data.address_line1,
      address_line2: response.data.address_line2,
      city: response.data.city,
      state: response.data.state,
      zip_code: response.data.zip_code,
      shipping_hours_from: response.data.shipping_hours_from,
      shipping_hours_to: response.data.shipping_hours_to,
      load_time: response.data.load_time,
      do_not_load: response.data.do_not_load,
      no_reefers: response.data.no_reefers,
      categories: response.data.categories,
      charges_lumper: response.data.charges_lumper,
      lumper_fee: response.data.lumper_fee,
      rating: response.data.rating,
      comments: response.data.comments,
      directions: response.data.directions,
      lat: response.data.lat,
      lng: response.data.lng,
      operating_hours: response.data.operating_hours
    };
  } catch (error) {
    console.error(`Error fetching location with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new location in the backend.
 * @param locationData - The data for the new location.
 * @returns A promise that resolves to the created Location object.
 */
export const createLocation = async (
  locationData: Partial<Location>
): Promise<Location> => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      '/locations/',
      locationData
    );
    return {
      id: response.data.id,
      name: response.data.name,
      phone_number: response.data.phone_number,
      email: response.data.email,
      address_line1: response.data.address_line1,
      address_line2: response.data.address_line2,
      city: response.data.city,
      state: response.data.state,
      zip_code: response.data.zip_code,
      shipping_hours_from: response.data.shipping_hours_from,
      shipping_hours_to: response.data.shipping_hours_to,
      load_time: response.data.load_time,
      do_not_load: response.data.do_not_load,
      no_reefers: response.data.no_reefers,
      categories: response.data.categories,
      charges_lumper: response.data.charges_lumper,
      lumper_fee: response.data.lumper_fee,
      rating: response.data.rating,
      comments: response.data.comments,
      directions: response.data.directions,
      lat: response.data.lat,
      lng: response.data.lng,
      operating_hours: response.data.operating_hours
    };
  } catch (error) {
    console.error('Error creating new location:', error);
    throw error;
  }
};

/**
 * Updates an existing location in the backend.
 * @param id - The ID of the location to update.
 * @param locationData - The updated data for the location.
 * @returns A promise that resolves to the updated Location object.
 */
export const updateLocation = async (
  id: number,
  locationData: Partial<Location>
): Promise<Location> => {
  try {
    const response: AxiosResponse = await axiosInstance.put(
      `/locations/${id}/`,
      locationData
    );
    return {
      id: response.data.id,
      name: response.data.name,
      phone_number: response.data.phone_number,
      email: response.data.email,
      address_line1: response.data.address_line1,
      address_line2: response.data.address_line2,
      city: response.data.city,
      state: response.data.state,
      zip_code: response.data.zip_code,
      shipping_hours_from: response.data.shipping_hours_from,
      shipping_hours_to: response.data.shipping_hours_to,
      load_time: response.data.load_time,
      do_not_load: response.data.do_not_load,
      no_reefers: response.data.no_reefers,
      categories: response.data.categories,
      charges_lumper: response.data.charges_lumper,
      lumper_fee: response.data.lumper_fee,
      rating: response.data.rating,
      comments: response.data.comments,
      directions: response.data.directions,
      lat: response.data.lat,
      lng: response.data.lng,
      operating_hours: response.data.operating_hours
    };
  } catch (error) {
    console.error(`Error updating location with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a location from the backend.
 * @param id - The ID of the location to delete.
 * @returns A promise that resolves when the location is deleted.
 */
export const deleteLocation = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/locations/${id}/`);
  } catch (error) {
    console.error(`Error deleting location with ID ${id}:`, error);
    throw error;
  }
};
