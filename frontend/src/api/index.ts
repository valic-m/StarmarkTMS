const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

/**
 * Extracts the tenant name from the hostname (e.g., "starmark.localhost").
 */
const getTenantFromHostname = (): string => {
  const hostname = window.location.hostname; // e.g., "starmark.localhost"
  console.log('Extracting tenant from hostname:', hostname); // Debug log the hostname
  const parts = hostname.split('.');
  if (parts.length > 1) {
    const tenant = parts[0]; // Extract subdomain as tenant
    console.log('Current tenant from hostname:', tenant); // Debug log the extracted tenant
    return tenant;
  }
  console.error('No valid tenant detected in hostname.');
  throw new Error('No valid tenant detected'); // Throw an error if no tenant is found
};

/**
 * Interface for API request options.
 */
interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; // HTTP methods
  body?: Record<string, unknown> | string | FormData; // Allow JSON, raw string, or FormData
  headers?: Record<string, string>; // Optional custom headers
}

/**
 * Centralized API function to make HTTP requests.
 * Automatically includes the "X-Tenant" header.
 *
 * @param url - The relative API endpoint.
 * @param options - Configuration for the request (method, body, headers).
 * @returns The JSON response from the API.
 */
const api = async (url: string, options: ApiOptions = {}): Promise<any> => {
  const tenant = localStorage.getItem('tenant') || getTenantFromHostname(); // Get tenant dynamically
  console.log('Using tenant:', tenant); // Debug log the tenant being used
  const { method = 'GET', body, headers = {} } = options;

  // Configure the request
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type':
        body instanceof FormData ? 'multipart/form-data' : 'application/json',
      Accept: 'application/json',
      'X-Tenant': tenant, // Include tenant in headers
      ...headers
    },
    credentials: 'include' // Include cookies for cross-origin requests
  };

  // Serialize JSON body
  if (body && !(body instanceof FormData)) {
    config.body = JSON.stringify(body); // Serialize JSON objects to strings
  } else if (body) {
    config.body = body as string | FormData; // Allow raw strings or FormData
  }

  try {
    // Debug log the API request details
    console.log('Making API request:', {
      url: `${baseUrl}${url}`,
      method: config.method,
      headers: config.headers,
      body: config.body
    });

    const response = await fetch(`${baseUrl}${url}`, config);

    // Handle non-2xx responses
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `API request failed with status ${response.status}: ${errorText}`
      ); // Debug log the error
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parse and return the JSON response
    const data = await response.json();
    console.log('API response:', data); // Debug log the API response
    return data;
  } catch (error) {
    // Enhance error reporting for network issues or other unexpected issues
    console.error('API request error:', error); // Debug log the error
    throw error; // Re-throw for further handling in calling code
  }
};

// Export `baseUrl` and `api` for use in other modules
export default api;
export { baseUrl };
