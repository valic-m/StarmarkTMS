// File: C:/Users/valic/Documents/Github/StarmarkTMS/frontend/src/services/customerService.ts

import { Customer } from '../types/Customer'; // Import the shared type definition

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000'; // Fallback to localhost if the environment variable is not set

// Function to fetch all customers from the API
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

// Function to fetch details of a specific customer by ID
export const getCustomerDetails = async (id: number): Promise<Customer> => {
  try {
    const response = await fetch(`${baseUrl}/api/customers/${id}`); // Ensure the endpoint is correct
    if (!response.ok) {
      throw new Error('Failed to fetch customer details');
    }
    const customer: Customer = await response.json();
    console.log('Fetched customer details:', customer); // For debugging purposes
    return customer;
  } catch (error) {
    console.error(`Error fetching details for customer ID ${id}:`, error);
    throw error;
  }
};

// Define an interface for the new customer data being added
interface NewCustomerData {
  name: string;
  email?: string;
  // Add other fields as required for customer creation
}

// Function to add a new customer
export const addCustomer = async (
  customerData: NewCustomerData
): Promise<Customer> => {
  try {
    const response = await fetch(`${baseUrl}/api/customers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customerData)
    });

    console.log('Response status:', response.status); // Debugging line

    if (!response.ok) {
      console.error('Failed to add customer');
      throw new Error('Failed to add customer');
    }

    const addedCustomer: Customer = await response.json();
    console.log('Customer added successfully:', addedCustomer);
    return addedCustomer;
  } catch (error) {
    console.error('Error in addCustomer:', error);
    throw error;
  }
};
