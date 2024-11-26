// src/services/customerService.ts

import api from '../api'; // Import the shared API handler

// Define the Customer interface
export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  contact_name?: string;
  priority?: string;
  slug?: string; // Add slug field
  // Add other fields as needed
}

// Fetch all customers
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await api('/api/customers/');
    if (Array.isArray(response.results)) {
      return response.results;
    } else if (Array.isArray(response)) {
      return response;
    }
    throw new Error('Unexpected API response format.');
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

// Fetch customer details by slug
export const getCustomerDetailsBySlug = async (
  slug: string
): Promise<Customer> => {
  try {
    const response = await api(`/api/customers/${slug}/`); // Use the slug for the URL
    return response;
  } catch (error) {
    console.error(`Error fetching customer details for slug ${slug}:`, error);
    throw error;
  }
};
