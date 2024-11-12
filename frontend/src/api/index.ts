// src/api/index.ts

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown> | string; // Allow both JSON object and string
  headers?: Record<string, string>;
}

const api = async (url: string, options: ApiOptions = {}) => {
  const { method = 'GET', body, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers
    },
    credentials: 'include'
  };

  // If body is an object, stringify it. Otherwise, use it directly (assuming it's already a string)
  if (body && typeof body === 'object') {
    config.body = JSON.stringify(body);
  } else {
    config.body = body as string | undefined;
  }

  const response = await fetch(`${baseUrl}${url}`, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }

  return response.json();
};

export default api;
