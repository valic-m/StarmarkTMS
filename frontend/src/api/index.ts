const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; // Allowable HTTP methods
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
    // Make the API request
    const response = await fetch(`${baseUrl}${url}`, config);

    // Throw an error if the response status is not OK (2xx)
    if (!response.ok) {
      const errorText = await response.text(); // Try to get error details
      throw new Error(errorText || 'API request failed'); // Throw a descriptive error
    }

    // Return the parsed JSON response
    return await response.json();
  } catch (error) {
    // Enhance error reporting for network issues or other unexpected issues
    if (error instanceof TypeError) {
      throw new Error(`Network error or invalid response: ${error.message}`);
    }
    throw error; // Re-throw for further handling in calling code
  }
};

export default api;
