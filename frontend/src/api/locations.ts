// src/api/locations.ts

import axios from 'axios';
import { Location } from 'types/Location';

// Replace with your actual API base URL
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Fetches all locations from the backend.
 * @returns A promise that resolves to an array of Location objects.
 */
export const getAllLocations = async (): Promise<Location[]> => {
  const response = await axios.get(`${API_BASE_URL}/locations/`);
  return response.data.map((item: any) => ({
    id: item.id,
    company_name: item.company_name,
    contact_person: item.contact_person,
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
    categories: item.categories, // Assuming categories are sent as array of IDs
    charges_lumper: item.charges_lumper,
    lumper_fee: item.lumper_fee,
    rating: item.rating,
    comments: item.comments,
    directions: item.directions
    // Removed photos
  }));
};

/**
 * Creates a new location in the backend.
 * @param locationData - The data for the new location.
 * @returns A promise that resolves to the created Location object.
 */
export const createLocation = async (
  locationData: Partial<Location>
): Promise<Location> => {
  const response = await axios.post(`${API_BASE_URL}/locations/`, locationData);
  return {
    id: response.data.id,
    company_name: response.data.company_name,
    contact_person: response.data.contact_person,
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
    directions: response.data.directions
    // Removed photos
  };
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
  const response = await axios.put(
    `${API_BASE_URL}/locations/${id}/`,
    locationData
  );
  return {
    id: response.data.id,
    company_name: response.data.company_name,
    contact_person: response.data.contact_person,
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
    directions: response.data.directions
    // Removed photos
  };
};

/**
 * Deletes a location from the backend.
 * @param id - The ID of the location to delete.
 * @returns A promise that resolves when the location is deleted.
 */
export const deleteLocation = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/locations/${id}/`);
};
