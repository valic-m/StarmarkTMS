import api from './index'; // Centralized API function
import { Location } from '../types/Location'; // Import the shared Location type

// Fetch all locations
export const getAllLocations = async (): Promise<Location[]> => {
  console.log(`API URL being called: /api/locations/`);
  const data = await api('/api/locations/');
  return data.map((item: any) => ({
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
    shipping_hours: item.shipping_hours,
    load_time: item.load_time,
    shipping_manager_name: item.shipping_manager_name,
    shipping_manager_phone: item.shipping_manager_phone,
    shipping_manager_email: item.shipping_manager_email,
    rating: item.rating,
    comments: item.comments,
    directions: item.directions,
    do_not_load: item.do_not_load
  }));
};

// Fetch a single location by ID
export const getLocationById = async (id: string): Promise<Location> => {
  console.log(`API URL being called: /api/locations/${id}/`);
  const item = await api(`/api/locations/${id}/`);
  return {
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
    shipping_hours: item.shipping_hours,
    load_time: item.load_time,
    shipping_manager_name: item.shipping_manager_name,
    shipping_manager_phone: item.shipping_manager_phone,
    shipping_manager_email: item.shipping_manager_email,
    rating: item.rating,
    comments: item.comments,
    directions: item.directions,
    do_not_load: item.do_not_load
  };
};

// Create a new location
export const createLocation = async (
  locationData: Partial<Location>
): Promise<Location> => {
  console.log(`API URL being called: /api/locations/`);
  const item = await api('/api/locations/', {
    method: 'POST',
    body: locationData
  });
  return {
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
    shipping_hours: item.shipping_hours,
    load_time: item.load_time,
    shipping_manager_name: item.shipping_manager_name,
    shipping_manager_phone: item.shipping_manager_phone,
    shipping_manager_email: item.shipping_manager_email,
    rating: item.rating,
    comments: item.comments,
    directions: item.directions,
    do_not_load: item.do_not_load
  };
};

// Update a location
export const updateLocation = async (
  id: string,
  updatedData: Partial<Location>
): Promise<Location> => {
  console.log(`API URL being called: /api/locations/${id}/`);
  const item = await api(`/api/locations/${id}/`, {
    method: 'PUT',
    body: updatedData
  });
  return {
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
    shipping_hours: item.shipping_hours,
    load_time: item.load_time,
    shipping_manager_name: item.shipping_manager_name,
    shipping_manager_phone: item.shipping_manager_phone,
    shipping_manager_email: item.shipping_manager_email,
    rating: item.rating,
    comments: item.comments,
    directions: item.directions,
    do_not_load: item.do_not_load
  };
};

// Delete a location
export const deleteLocation = async (id: string): Promise<void> => {
  console.log(`API URL being called: /api/locations/${id}/`);
  await api(`/api/locations/${id}/`, {
    method: 'DELETE'
  });
};
