// File: C:/Users/valic/Documents/Github/StarmarkTMS/frontend/src/services/customerService.ts

import { Customer } from '../types/Customer'; // Import the shared type definition

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000'; // Fallback to localhost if the environment variable is not set

// Function to fetch customers from the API
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/customers/`);
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    const data: Customer[] = await response.json();
    console.log('Fetched customer data:', data); // For debugging purposes
    return data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return []; // Return an empty array if there's an error to maintain return type consistency
  }
};

// Define an interface for the new customer data being added
interface NewCustomerData {
  name: string;
  email?: string;
  // Add other fields as required for customer creation
}

// Function to add a new customer
export const addCustomer = async (customerData: NewCustomerData) => {
  try {
    const response = await fetch(`${baseUrl}/api/customers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    });

    console.log('Response status:', response.status); // Debugging line

    if (response.ok) {
      console.log('Customer added successfully');
      return response.json();
    } else {
      console.error('Failed to add customer');
      throw new Error('Failed to add customer');
    }
  } catch (error) {
    console.error('Error in addCustomer:', error);
    throw error;
  }
};
