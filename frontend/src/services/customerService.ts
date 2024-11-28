import api from '../api'; // Import the shared API handler
import { Customer } from '../types/Customer'; // Import the shared Customer type

// Fetch all customers
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await api('/api/customers/');
    if (Array.isArray(response.results)) {
      return response.results.map(mapServiceCustomerToCustomer); // Map results to Customer type
    } else if (Array.isArray(response)) {
      return response.map(mapServiceCustomerToCustomer); // Handle direct array responses
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
    const response = await api(`/api/customers/${slug}/`);
    return mapServiceCustomerToCustomer(response); // Map the response to Customer type
  } catch (error) {
    console.error(`Error fetching customer details for slug ${slug}:`, error);
    throw error;
  }
};

// Utility: Map raw service data to the shared Customer type
const mapServiceCustomerToCustomer = (data: any): Customer => ({
  id: data.id,
  name: data.name,
  slug: data.slug || '', // Ensure slug is always a string
  email: data.email,
  phone: data.phone,
  contact_name: data.contact_name,
  priority:
    data.priority && ['active', 'dnu', 'factoring'].includes(data.priority)
      ? (data.priority as 'active' | 'dnu' | 'factoring')
      : null // Validate and map priority values
  // Add other fields as needed, mapped from the API response
});
