import api from '../api/index'; // Import the shared API handler

// Define the Company interface
interface Company {
  id: number;
  name: string;
  industry: string;
  // Add other fields as needed
}

// Fetch all companies from the API
export const getCompanies = async (): Promise<Company[]> => {
  try {
    const response = await api('/api/companies/');
    if (Array.isArray(response.results)) {
      // For paginated responses, return the `results` array
      return response.results;
    } else if (Array.isArray(response)) {
      // For non-paginated responses, return the array directly
      return response;
    }
    throw new Error('Unexpected API response format.');
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};

// Add a new company
export const addCompany = async (
  companyData: Omit<Company, 'id'>
): Promise<Company> => {
  try {
    const response = await api('/api/companies/', {
      method: 'POST',
      body: companyData
    });
    return response;
  } catch (error) {
    console.error('Error adding company:', error);
    throw error;
  }
};

// Fetch details of a specific company by ID
export const getCompanyDetails = async (id: number): Promise<Company> => {
  try {
    const response = await api(`/api/companies/${id}/`);
    return response;
  } catch (error) {
    console.error(`Error fetching company details for ID ${id}:`, error);
    throw error;
  }
};

// Update an existing company
export const updateCompany = async (
  id: number,
  companyData: Partial<Omit<Company, 'id'>>
): Promise<Company> => {
  try {
    const response = await api(`/api/companies/${id}/`, {
      method: 'PUT',
      body: companyData
    });
    return response;
  } catch (error) {
    console.error(`Error updating company with ID ${id}:`, error);
    throw error;
  }
};

// Delete a company by ID
export const deleteCompany = async (id: number): Promise<void> => {
  try {
    await api(`/api/companies/${id}/`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error(`Error deleting company with ID ${id}:`, error);
    throw error;
  }
};
