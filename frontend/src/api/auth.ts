import api from 'api/index'; // Import the centralized API function

/**
 * Login function
 * Sends a POST request to the backend with the user's email and password.
 * Stores the returned token and tenant in local storage.
 *
 * @param email - The user's email
 * @param password - The user's password
 * @returns Promise<void>
 */
export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await api('/api/auth/login/', {
      method: 'POST',
      body: { email, password }
    });

    const { token, tenant } = response; // Assume the backend returns tenant info
    localStorage.setItem('token', token); // Save the auth token
    localStorage.setItem('tenant', tenant); // Save the tenant name
    console.log('Logged in tenant:', tenant);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

/**
 * Logout function
 * Clears the authentication token and tenant from local storage.
 */
export const logout = (): void => {
  console.log('Logging out...');
  localStorage.removeItem('token'); // Remove the auth token
  localStorage.removeItem('tenant'); // Remove the tenant info
};

/**
 * Retrieve Auth Token
 * Retrieves the authentication token from local storage.
 *
 * @returns The auth token or null if not found
 */
export const getAuthToken = (): string | null => {
  const token = localStorage.getItem('token');
  console.log('Retrieved Auth Token:', token);
  return token;
};

/**
 * Retrieve Tenant
 * Retrieves the current tenant name from local storage.
 *
 * @returns The tenant name or null if not found
 */
export const getTenant = (): string | null => {
  const tenant = localStorage.getItem('tenant');
  console.log('Retrieved Tenant:', tenant);
  return tenant;
};
