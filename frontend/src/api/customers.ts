import api from './index';

// Fetch all customers
export const fetchCustomers = async () => {
  try {
    const response = await api('/api/customers/');
    // Handle paginated response
    if (response.results) {
      return response.results;
    }
    // Handle plain array response
    if (Array.isArray(response)) {
      return response;
    }
    // Throw an error for unexpected response formats
    throw new Error('Unexpected API response format');
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error; // Re-throw to handle this in the calling function
  }
};

// Create a new customer
export const createCustomer = async (customerData: {
  name: string;
  email?: string;
}) => {
  try {
    const response = await api('/api/customers/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    });

    // Log the response for debugging
    console.log('API Response:', response);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating customer:', errorData);
      throw new Error(errorData.message || 'Failed to create customer');
    }

    // Ensure the response is parsed properly
    const result = await response.json();
    console.log('Customer created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error; // Ensure the error is caught in the calling code
  }
};

// Update an existing customer
export const updateCustomer = async (
  id: number,
  customerData: { name?: string; email?: string }
) => {
  try {
    const response = await api(`/api/customers/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error updating customer:', errorData);
      throw new Error(errorData.message || 'Failed to update customer');
    }

    return response.json();
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }
};

// Delete a customer
export const deleteCustomer = async (id: number) => {
  try {
    const response = await api(`/api/customers/${id}/`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error deleting customer:', errorData);
      throw new Error(errorData.message || 'Failed to delete customer');
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting customer:', error);
    throw error;
  }
};
