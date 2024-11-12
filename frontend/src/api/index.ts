// src/api/index.ts

const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

const api = async (endpoint: string, { method = 'GET', body, headers = {} }: ApiOptions = {}) => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers, // Include any additional headers passed in the options
    },
    credentials: 'include', // if you need to include cookies
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }

  return response.json();
};

export default api;
