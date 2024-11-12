// C:\Users\valic\Documents\Github\StarmarkTMS\frontend\src\api\customers.ts
import api from './index';  // Ensure this imports your main `api` function

// Fetch all customers
export const fetchCustomers = async () => {
  return api('/api/customers/');
};

// Create a new customer
export const createCustomer = async (customerData: { name: string; email?: string }) => {
  return api('/api/customers/', {
    method: 'POST',
    body: customerData,
  });
};

// Update a customer
export const updateCustomer = async (id: number, customerData: { name?: string; email?: string }) => {
  return api(`/api/customers/${id}/`, {
    method: 'PUT',
    body: customerData,
  });
};

// Delete a customer
export const deleteCustomer = async (id: number) => {
  return api(`/api/customers/${id}/`, {
    method: 'DELETE',
  });
};
