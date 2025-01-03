const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// Debug log to confirm correct value of baseUrl
console.log('Exporting baseUrl:', baseUrl);

/**
 * Centralized API function for making HTTP requests.
 * @param url - The relative API endpoint.
 * @param options - Configuration for the request (method, body, headers).
 * @returns The JSON response from the API.
 */
interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'; // <-- added 'PATCH' here
  body?: Record<string, unknown> | string; // Allow JSON object or raw string
  headers?: Record<string, string>; // Optional custom headers
}

const api = async (url: string, options: ApiOptions = {}) => {
  const { method = 'GET', body, headers = {} } = options;

  // Configure the request
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json', // Default Content-Type
      Accept: 'application/json', // Accept JSON responses
      ...headers // Merge with any provided custom headers
    },
    credentials: 'include' // Include cookies for cross-origin requests by default
  };

  // Handle body serialization if the body is a JSON object or other valid input
  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    config.body = JSON.stringify(body); // Serialize JSON objects to strings
  } else if (body) {
    config.body = body as string | undefined; // Allow raw strings or undefined
  }

  try {
    // Debug log the full API request details
    console.log('Making API request:', {
      url: `${baseUrl}${url}`,
      method: config.method,
      headers: config.headers,
      body: config.body
    });

    // Make the API request
    const response = await fetch(`${baseUrl}${url}`, config);

    // Throw an error if the response status is not OK (2xx)
    if (!response.ok) {
      const errorText = await response.text(); // Try to get error details
      throw new Error(errorText || 'API request failed'); // Throw a descriptive error
    }

    // Return the parsed JSON response
    const data = await response.json();
    console.log('API response:', data); // Debug log the API response
    return data;
  } catch (error) {
    // Enhance error reporting for network issues or other unexpected issues
    if (error instanceof TypeError) {
      console.error('Network error or invalid response:', error.message);
      throw new Error(`Network error or invalid response: ${error.message}`);
    }
    console.error('Unexpected error during API request:', error);
    throw error; // Re-throw for further handling in calling code
  }
};

// Export `baseUrl` and `api` for use in other modules
export default api;
export { baseUrl };
