import axios from 'axios';
import { baseUrl } from './index'; // Import baseUrl from index.ts

const API_URL = `${baseUrl}/api/users`; // Centralized API URL

// Login function
export const login = async (email: string, password: string) => {
  console.log('Imported baseUrl:', baseUrl); // Debug
  console.log('API_URL:', API_URL); // Debug
  console.log('Final Login URL:', `${API_URL}/login/`); // Debug
  try {
    const response = await axios.post(`${API_URL}/login/`, { email, password });
    console.log('Login successful:', response.data); // Debug
    localStorage.setItem('authToken', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error.response?.data || 'An error occurred';
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

// Logout function
export const logout = () => {
  console.log('Logging out...');
  localStorage.removeItem('authToken'); // Remove token from local storage
  localStorage.removeItem('user'); // Optionally remove user data
};

// Retrieve Auth Token
export const getAuthToken = () => {
  const token = localStorage.getItem('authToken');
  console.log('Retrieved Auth Token:', token); // Debug
  return token;
};
